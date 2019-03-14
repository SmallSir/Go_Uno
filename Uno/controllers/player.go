package controllers

import (
	"github.com/gorilla/websocket"
)

type Player struct {
	//是否准备
	state bool
	//玩家id
	player_id int
	//玩家昵称
	player_name string
	//玩家手牌
	player_cards UserCard
	//所在房间
	room_name string
	//WebSocket连接
	rwc *websocket.Conn
}
/*
//玩家选择准备or取消准备
func (p *Player) Ready(ready bool) bool {
	if p.state == ready {
		return false
	} else {
		p.state = ready
		return true
	}
}
*/