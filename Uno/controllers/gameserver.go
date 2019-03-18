package controllers

import (
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

//创建房间
func (game *GameController) Register() {
	//获取房间账号密码
	roomname := game.GetString("room_name")
	roompassword := game.GetString("room_password")

	flag := roomlist.CheckRoom(roomname,roompassword)
	
	if flag == true{
		//房间存在不得使用
	}
	//创建房间
	roomlist.CreateRoom(roomname, roompassword)
	//获取房间
	r := roomlist.rooms[roomname]
	playername, flag := game.GetSession("name").(string)

	if flag == false {
		//重新登录界面
	}

	playerid, flag := game.GetSession("id").(int)
	if flag == false {
		//重新登录界面
	}

	//房间信息发送给redis
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
	r.AddPlayer(p)
	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
}

//玩家准备
func (game *GameController) Ready() {
	roomname, _ := game.GetSession("roomname").(string)
	playerid, _ := game.GetSession("id").(int)
	r := roomlist.rooms[roomname]
	flag := r.ReadyPlayer(playerid)
	if flag != nil {

	} else {

	}
}

//玩家取消准备
func (game *GameController) UnReady() {
	roomname, _ := game.GetSession("roomname").(string)
	playerid, _ := game.GetSession("id").(int)
	r := roomlist.rooms[roomname]
	flag := r.UnreadyPlayer(playerid)
	if flag != nil {

	} else {

	}
}

//加入房间
func (game *GameController) Join() {
		//获取房间账号密码
	roomname := game.GetString("room_name")
	roompassword := game.GetString("room_password")

	flag := roomlist.CheckRoom(roomname,roompassword)
	if flag == false{
		//房间不存在
	}
	//获取房间
	r := roomlist.rooms[roomname]
	playername, flag := game.GetSession("name").(string)

	if flag == false {
		//重新界面
	}

	playerid, flag := game.GetSession("id").(int)
	if flag == false {
		//重新界面
	}

	//房间信息发送给redis
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
	r.AddPlayer(p)
	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
}

//离开房间
func (game *GameController) Leave() {
	
}

//玩家出牌
func (game *GameController) RemoveCards() {

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
