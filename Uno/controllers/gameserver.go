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
	roomname := game.GetString("room_name")
	roompassword := game.GetString("room_password")

	playername, flag := game.GetSession("name").(string)

	if flag == false{
		//重新登录界面
	}

	playerid, flag := game.GetSession("id").(int)
	if flag == false{
		//重新登录界面
	}

	flag = roomlist.CheckRoom(roomname)
	if flag == true {
		//房间名已经有了，返回错误让他重新输入
	}
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
	roomlist.CreateRoom(roomname, roompassword, playername, playerid, ws)
	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
}

//加入房间
func (game *GameController) Join() {

}

//玩家出牌
func (game *GameController) RemoveCards() {

}

//玩家摸牌
func (game *GameController) AddCards() {

}

//玩家选颜色
func (game *GameController) SelectColor() {
	color := game.GetString("color")
	roomname := game.GetSession("roomname").(string)
	flag := roomlist.CheckRoom(roomname)
	if flag == false {
		log.Println("房间号错误")
		return
	}
	r := roomlist.rooms[roomname]
	r.latest_color = color
}
