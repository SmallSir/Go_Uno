package controllers

import "github.com/astaxie/beego"

type GameController struct {
	beego.Controller
}

var roomlist *roomtable

//初始化房间表
func init(){
	RoomList = newRoomTable()
}

//创建客户端

//玩家出牌

//玩家摸牌

//玩家选颜色