package controllers

import (
	"encoding/json"
	"net/http"
	"regexp"

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

//获取rank榜单信息
func (game *GameController) GetRank() {
	//redis访问获取排行榜的信息

	remsg := &Rank{}
	/*
		把从redis获取的内容全部传递到remsg中即可
	*/
	ret, _ := json.Marshal(remsg)
	game.Data["json"] = string(ret)
	game.EnableRender = false
	game.ServeJSON()
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

	flag, _ := roomlist.CheckRoom(roomname, roompassword)

	//检查房间名称是否只有英文和数字，密码是否大于六位
	var hzRegexp = regexp.MustCompile("[a-z0-9A-Z]+$")
	if hzRegexp.MatchString(roomname) != true {
		msg = "房间名必须由数字和字母组成"
		return
	}
	if hzRegexp.MatchString(roompassword) != true {
		msg = "房间密码必须有数字或字母组成"
		return
	}
	if len(roomname) < 3 || len(roomname) > 7 {
		msg = "房间名长度不得小于3或者大于7"
		return
	}
	if len(roompassword) < 4 || len(roompassword) > 9 {
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

	flag, c := roomlist.CheckRoom(roomname, roompassword)

	if flag == false {
		msg = "房间账号不存在，请确认后再输入"
		return
	}
	if c == false {
		msg = "房间密码错误，请确认后再输入"
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
	r.subscribe <- p
	defer r.ReadyPlayer(playerid)
	for {
		_, p, err := ws.ReadMessage()
		if err != nil {
			//断开连接解决办法
		}
		//判断发来的数据是否是选颜色
		sc := SelectColor{}
		err = json.Unmarshal(p, sc)
		if err == nil {
			r.selectcolor <- sc
			continue
		}
		//判断发来的数据是否是准备or取消准备
		re := PlayerReady{}
		err = json.Unmarshal(p, re)
		if err == nil {
			r.ready <- re
			continue
		}
		pc := CardStateMsg{}
		err = json.Unmarshal(p, re)
		if err == nil {
			r.publish <- pc
			continue
		}
	}
}
