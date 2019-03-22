package controllers

import (
	"encoding/json"
	"errors"
	"log"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
)

type PlayerRoom struct {
	//玩家数量
	players_number int
	//已经准备人数
	ready_number int
	//玩家信息
	players []*Player
	//房间信息
	player_room Room
	//目前已有的人数
	stay_number int
	//房间的牌
	room_cards Cards
	//当前的颜色
	latest_color string
	//执行方向
	dirction int
	//当前的号码
	latest_number string
	//当前状态
	latest_state string
	//玩家编号(东北西南)
	playerno []int
	//下一个玩家编号
	nextplayer int
	//玩家进入管道
	subscribe chan *Player
	//玩家准备管道
	ready chan PlayerReady
	//玩家事件管道
	publish chan CardStateMsg
	//玩家退出管道
	unsubscribe chan int
	//玩家选色管道
	selectcolor chan SelectColor
}

//创建房间
func NewRoom(room Room, number int) *PlayerRoom {
	newroom := PlayerRoom{players_number: number, players: make([]*Player, number),
		player_room: room, ready_number: 0, dirction: 0,
		stay_number: 1, playerno: make([]int, 4, 4), nextplayer: 0,
		subscribe:   make(chan *Player, 4),
		ready:       make(chan PlayerReady, 4),
		publish:     make(chan CardStateMsg),
		unsubscribe: make(chan int, 4),
		selectcolor: make(chan SelectColor)}
	//_, err := newroom.AddPlayer(p)
	//if err != nil {
	//	log.Println(err)
	//}
	return &newroom
}

//游戏房间
func (rm *PlayerRoom) playRoom() {
	for {
		select {
		case sub := <-rm.subscribe:
			rm.AddPlayer(sub)
		case event := <-rm.publish:
			if event.Behavior == 1 { //表示为出牌事件
				nowplayer,check := rm.RemoveCard(event.PlayerId, Card{number: event.Number, color: event.Color, state: event.State})
				rm.cbroadcastWebSocket(event,nowplayer,check)
			} else { //表示为摸牌事件
				check := 0
				nowplayer:=rm.GetCard(event.PlayerId, event.CN)
				rm.cbroadcastWebSocket(event,nowplayer,check)
			}
		//case unsub := <-rm.unsubscribe:
		case re := <-rm.ready:
			if re.ready == true {
				rm.UnreadyPlayer(re.Playerid)
			} else {
				rm.ReadyPlayer(re.Playerid)
			}
			rm.broadcastWebSocket(re)
		case sc := <-rm.selectcolor:
			rm.latest_color = sc.color
			rm.broadcastWebSocket(sc)
		}
	}
}
func (rm *PlayerRoom) cbroadcastWebSocket(msg CardStateMsg,nowplayer int,check int) {
	switch{
	case msg.Behavior == 1: //摸牌
		for _, p := range rm.players {

		}
	case msg.Behavior == 0: //出牌
		for _, p := range rm.players {

		}
	}
}

//准备、取消准备、选色广播
func (rm *PlayerRoom) broadcastWebSocket(msg interface{}) {
	switch data := msg.(type) {
	case SelectColor, PlayerReady:
		d, err := json.Marshal(msg)
		if err != nil {
			beego.Error("无法将数据转为json")
			return
		}
		for _, p := range rm.players {
			ws := p.rwc
			if ws != nil {
				if ws.WriteMessage(websocket.TextMessage, d) != nil {
					beego.Error("玩家 %d 掉线", p.player_id)
				}
			}
		}
	}
}

//添加玩家
func (rm *PlayerRoom) AddPlayer(pl *Player) (bool, error) {
	if rm.stay_number == rm.players_number {
		return false, errors.New("人数已满不能，请稍后再试")
	}
	rm.stay_number++
	//给玩家安排位置
	for i, p := range rm.playerno {
		if p == 0 {
			rm.playerno[i] = pl.player_id
			break
		}
	}
	//添加玩家信息
	rm.players = append(rm.players, pl)
	log.Printf("已经将 %s 玩家 加入到 %s 房间", pl.player_name, rm.player_room.room_name)
	return true, nil
}

//移除玩家
func (rm *PlayerRoom) RemovePlayer(playerid int) (bool, error) {
	for j, p := range rm.players {
		if p.player_id == playerid {
			rm.players[j].deregister()
			new_player := make([]*Player, rm.players_number)
			new_player = append(rm.players[:j], rm.players[j+1:]...)
			rm.players = new_player
			rm.stay_number--
			for i, p := range rm.playerno {
				if p == playerid {
					rm.playerno[i] = 0
					break
				}
			}
			log.Printf("已经将 %d 玩家从 %s 房间移除", playerid, rm.player_room.room_name)
			//注销房间
			if rm.stay_number == 0 {
				return true, errors.New("房间已经没有人了，可以删除")
			}
			return true, nil
		}
	}
	return false, errors.New("玩家不存在，无法删除，删除失败")
}

//玩家准备
func (rm *PlayerRoom) ReadyPlayer(player_id int) error {
	if rm.ready_number == rm.players_number {
		return errors.New("人数已经满了不得再准备")
	}
	for i, p := range rm.players {
		if p.player_id == player_id {
			rm.players[i].state = true
			break
		}
	}
	rm.ready_number++
	if rm.ready_number == rm.players_number {
		rm.PlayGame()
	}
	return nil
}

//玩家取消准备
func (rm *PlayerRoom) UnreadyPlayer(player_id int) error {
	if rm.ready_number == 0 {
		return errors.New("没有任何人准备，不存在准备状态")
	}
	for i, p := range rm.players {
		if p.player_id == player_id {
			rm.players[i].state = false
			break
		}
	}
	rm.ready_number--
	return nil
}

//开始游戏
func (rm *PlayerRoom) PlayGame() {
	rm.latest_color = "null"
	rm.latest_number = "-1"
	rm.latest_state = "-1"
	//rm.latest_id = -1
	rm.room_cards.Start()
	for i, _ := range rm.players {
		rm.players[i].player_cards.cards = append(rm.room_cards.AddCards(7)[:])
		rm.players[i].player_cards.number = 7
		rm.players[i].player_cards.Sort()
	}
}

//获得出牌信息
func (rm *PlayerRoom) RemoveCard(p_id int, rc Card) (int, int) {
	/*不同返回值的效果不同
	-1表示出牌不符合规则
	0表示正常出牌
	1表示这个人要喊UNO
	2表示玩家打了+2下一个人必须摸牌跳过
	3表示玩家打了+4下一个人必须摸牌跳过
	4表示玩家打了wild选择颜色
	*/
	flag := 0
	nowplayer := -1
	if rm.latest_state != rc.state && rm.latest_state != "-1" && rm.latest_color != "null" && rm.latest_color != rc.color && rm.latest_number != rc.number && rc.state != "wildraw" && rc.state != "wild" {
		return -1, nowplayer
	}
	for i, p := range rm.players {
		if p.player_id == p_id {
			nowplayer = i
			//改变玩家手牌信息
			rm.players[i].player_cards.Remove_Card(rc)
			//改变这把的牌堆信息
			rm.room_cards.OutCards(rc)
			//修改目前信息
			rm.latest_color = rc.color
			//rm.latest_id = p_id
			rm.latest_state = rc.state
			rm.latest_number = rc.number
			//检查出了最后一张牌且是状态牌的情况
			if rm.players[i].player_cards.number == 0 && rm.latest_number == "-1" {
				rm.GetCard(p_id, 1)
			}
			break
		}
	}
	if rm.latest_state == "reverse" {
		rm.dirction = 1 - rm.dirction
	}
	if rm.dirction == 0 {
		if rm.latest_state == "skip" {
			rm.nextplayer = (rm.nextplayer + 2) % 4
		} else {
			rm.nextplayer = (rm.nextplayer + 1) % 4
		}
	} else {
		if rm.latest_state == "skip" {
			rm.nextplayer = (rm.nextplayer + 2) % 4
		} else {
			rm.nextplayer = (rm.nextplayer + 3) % 4
		}
	}
	if rm.latest_state == "wild" {
		//表示是选色
		flag = 4
	}
	if rm.latest_state == "wildraw" {
		//表示是+4
		flag = 3
	}
	if rm.latest_state == "draw" {
		//表示是+2
		flag = 2
	}
	check := rm.CheckUno(p_id)
	if check == true {
		flag = 1
	}
	return flag, nowplayer
}

//选择花色
func (rm *PlayerRoom) SelectColor(color string) {
	rm.latest_color = color
}

//获得摸牌信息
func (rm *PlayerRoom) GetCard(p_id int, rn int) int {
	index := -1
	for i, p := range rm.players {
		if p.player_id == p_id {
			rm.players[i].player_cards.Insert_Card(rm.room_cards.AddCards(rn))
			index = i
			break
		}
	}
	if rm.dirction == 0 {
		rm.nextplayer = (rm.nextplayer + 1) % 4
	} else {
		rm.nextplayer = (rm.nextplayer + 3) % 4
	}
	return index
}

//判断UNO
func (rm *PlayerRoom) CheckUno(p_id int) bool {
	for _, p := range rm.players {
		if p_id == p.player_id {
			if p.player_cards.number == 1 {
				return true
			} else {
				return false
			}
		}
	}
	return false
}
