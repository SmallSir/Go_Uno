package controllers

import (
	"regexp"
	"encoding/json"
	"log"
	"net/http"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
)

type GameController struct {
	beego.Controller
}

var roomlist *roomtable

//初始化房间表
func init() {
	roomlist = newRoomTable()
}

//测试
func (game *GameController) Get() {
	game.TplName = "index.html"
}

//创建房间
func (game *GameController) Register() {
	//获取账号密码
	roommsg := RoomMsg{}
	err := json.Unmarshal([]byte(game.Ctx.Input.RequestBody), roommsg)
	roomname := roommsg.RoomName
	roompassword := roommsg.RoomPassWord

	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	if err != nil {
		msg = "无法获取创建房间信息"
		return
	}

	flag := roomlist.CheckRoom(roomname, roompassword)

	//检查房间名称是否只有英文和数字，密码是否大于六位
	var hzRegexp = regexp.MustCompile("[a-z0-9A-Z]+$")
	if hzRegexp.MatchString(roomname) != true {
		msg = "房间名必须由数字和字母组成"
		return
	}
	if hzRegexp.MatchString(roompassword) != true{
		msg = "房间密码必须有数字或字母组成"
		return
	}
	if len(roomname) < 3 || len(roomname) > 7 {
		msg = "房间账号长度不得小于3或者大于7"
		return
	}
	if len(roompassword) < 4 || len(roompassword) > 9{
		msg = "房间密码长度不得小于4或者大于9"
		return
	}

	if flag == true {
		//房间存在不得使用
		msg = "房间已存在"
		return
	}

	//创建房间
	roomlist.CreateRoom(roomname, roompassword)

	//房间信息发送给redis

	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
	ok = true
	msg = "房间创建成功"
	url = "/uno/" + roomname
	return
}

//玩家准备
func (game *GameController) Ready() {
	//获取玩家信息
	roomname, _ := game.GetSession("roomname").(string)
	playerid, _ := game.GetSession("id").(int)
	//获取所在房间信息
	r := roomlist.rooms[roomname]

	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	err := r.ReadyPlayer(playerid)
	if err != nil {
		msg = err.Error()
	} else {
		ok = true
		msg = "已准备"
	}
}

//玩家取消准备
func (game *GameController) UnReady() {
	//获取玩家信息
	roomname, _ := game.GetSession("roomname").(string)
	playerid, _ := game.GetSession("id").(int)
	
	//获取所在房间信息
	r := roomlist.rooms[roomname]

	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	err := r.UnreadyPlayer(playerid)
	if err != nil {
		msg = err.Error()
	} else {
		ok = true
		msg = "已取消准备"
	}
}

//加入房间
func (game *GameController) Join() {
	//roomname := game.Ctx.Input.Param(":roomname")

	//获取账号密码
	roommsg := RoomMsg{}
	err := json.Unmarshal([]byte(game.Ctx.Input.RequestBody), roommsg)
	roomname := roommsg.RoomName
	roompassword := roommsg.RoomPassWord

	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	//获取房间名称和密码状态
	if err != nil {
		msg = "无法获取创建房间信息"
		return
	}

	flag := roomlist.CheckRoom(roomname, roompassword)

	if flag == false {
		msg = "房间不存在或密码错误，请确认后再输入"
		return
	}

	//把信息发送给里面的其他人

	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
	ok = true
	msg = "房间创建成功"
	url = "/uno/" + roomname
}

//建立WebSocket
func (game *GameController) ConnectionWebSocket() {
	//获取玩家的昵称和id，以及所在房间
	roomname := game.GetSession("roomname").(string)
	playerid := game.GetSession("id").(int)
	playername := game.GetSession("name").(string)

	//建立websocket
	ws, err := websocket.Upgrade(game.Ctx.ResponseWriter, game.Ctx.Request, nil, 1024, 1024)

	//检查websocket是否建立成功
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(game.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		beego.Error("Cannot setup WebSocket connection:", err)
		return
	}
	p := NewPlayer(ws, playerid, playername, roomname)

	r := roomlist.rooms[roomname]
	r.AddPlayer(p)
}

//离开房间
func (game *GameController) Leave() {
	playerid := game.GetSession("id").(int)
	roomname := game.GetSession("roomname").(string)
	r := roomlist.rooms[roomname]
	flag, err := r.RemovePlayer(playerid)
	//flag删除情况，err表示是否可以把整个房间移除
	if flag == true {
		log.Printf("删除成功")
		if err != nil {
			roomlist.RemoveRoom(roomname)
		}
	} else {
		log.Printf("玩家 %d 从 %s 房间删除失败", playerid, roomname)
	}

}

//玩家出牌
func (game *GameController) RemoveCards() {
	playerid := game.GetSession("id").(int)
	roomname := game.GetSession("roomname").(string)

	//获取牌信息
	color := game.GetString("color")
	state := game.GetString("state")
	number := game.GetString("number")

	c := Card{color: color, state: state, number: number}

	r := roomlist.rooms[roomname]
	flag := r.RemoveCard(playerid, c)
	if flag == -1 { //出牌有问题

	} else if flag == 0 { //正常出牌

	} else if flag == 1 { //下一个人要喊uno

	} else if flag == 2 { //下一个人+2并跳过
		r.GetCard(r.nextplayer, 2)
	} else if flag == 3 { //下一个人+4并跳过
		r.GetCard(r.nextplayer, 4)
	} else { //当前玩家选色

	}
}

//玩家摸牌,在没有上一个出牌人的相同颜色或者相同数字的情况下
func (game *GameController) AddCards() {
	roomname, _ := game.GetSession("roomname").(string)
	playerid, _ := game.GetSession("id").(int)
	r := roomlist.rooms[roomname]
	r.GetCard(playerid, 2)
}

//玩家选颜色
func (game *GameController) SelectColor() {
	color := game.GetString("color")
	roomname := game.GetSession("roomname").(string)
	r := roomlist.rooms[roomname]
	r.latest_color = color
}
