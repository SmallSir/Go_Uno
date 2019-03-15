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

func NewPlayer(rwc *websocket.Conn, player_id int, player_name string) *Player {
	return &Player{player_name: player_name, player_id: player_id, rwc: rwc, state: false, player_cards: UserCard{cards: make([]Card, 0, 108), number: 0}}
}
