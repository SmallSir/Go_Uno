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

	flag := roomlist.CheckRoom(roomname, roompassword)

	if flag == true {
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

	flag := roomlist.CheckRoom(roomname, roompassword)
	if flag == false {
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
	flag, err := r.RemoveCard(playerid, c)
	if flag {
		//返回一个值表示出牌错误
	} else {
		if err != nil {
			//表示下一个出牌的人要先喊uno
		}
	}
	/*
		发牌信息发给其他玩家
		轮到下一个玩家
	*/
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
