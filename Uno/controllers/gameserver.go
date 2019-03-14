package controllers

import "github.com/astaxie/beego"

type GameController struct {
	beego.Controller
}

var roomlist *roomtable

//初始化房间表
func init() {
	RoomList = newRoomTable()
}

//创建房间
func (game *GameController) Register() {

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
	room_id := game.GetSession("room_id")
	flag := roomlist.CheckRoom(room_id)
}
