package controllers

import (
	"encoding/json"
	"errors"
	"log"
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
	//玩家事件管道
	publish chan Incident
	//玩家退出管道
	unsubscribe chan int
	//累计的需要的摸牌数量
	getcardsnumber int
	//已经累加的排队
	addcardsnums int
}

//创建房间
func NewRoom(room Room, number int) *PlayerRoom {
	newroom := PlayerRoom{players_number: number, players: make([]*Player, number),
		player_room: room, ready_number: 0, dirction: 0,
		stay_number: 1, playerno: make([]int, 4, 4), nextplayer: 0,
		subscribe:    make(chan *Player, 4),
		publish:      make(chan Incident),
		unsubscribe:  make(chan int, 4),
		addcardsnums: 0}
	return &newroom
}

//游戏房间
func (rm *PlayerRoom) playRoom() {
	for {
		select {}
	}
}
func (rm *PlayerRoom) cbroadcastWebSocket(msg CardStateMsg, nowplayer int, check int) {
	switch {
	case msg.Behavior == 1: //摸牌
		for _, p := range rm.players {
			if p.player_id == rm.playerno[nowplayer] {

			} else {

			}
		}
	case msg.Behavior == 0: //出牌
		if check == -1 {
			remsg := &ReCardMsg{}
			remsg.Ok = false
			data, err := json.Marshal(remsg)
			if err != nil {
				log.Println("无法将数据转为json")
				return
			}
			for _, p := range rm.players {
				if p.player_id == rm.playerno[nowplayer] {
					p.rwc.WriteJSON(data)
					break
				}
			}
			return
		}
		for _, p := range rm.players {
			if p.player_id == rm.playerno[nowplayer] {

			} else {

			}
		}
	}
}

//准备、取消准备、选色广播
func (rm *PlayerRoom) broadcastWebSocket(msg interface{}) {
	switch msg.(type) {
	case SelectColor, PlayerReady:
		d, err := json.Marshal(msg)
		if err != nil {
			log.Println("无法将数据转为json")
			return
		}
		for _, p := range rm.players {
			ws := p.rwc
			if ws != nil {
				if ws.WriteJSON(d) != nil {
					log.Println("玩家 %d 已经掉线", p.player_id)
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
	2表示玩家打了+2下一个人摸牌或者继续+2或者+4
	3表示玩家打了+4下一个人摸牌或者继续+4
	4表示玩家打了wild选择颜色
	5表示玩家获胜
	*/
	flag := -1
	nowplayer := -1
	for i, p := range rm.playerno {
		if p == p_id {
			nowplayer = i
			break
		}
	}
	if rc.color == "red" || rc.color == "yellow" || rc.color == "green" || rc.color == "green" {
		if rc.color == rm.latest_number || rm.latest_color == "null" { //颜色相同符合条件
			if rm.latest_state != "raw" {
				flag = 0
			}
		}
		if rc.number == rm.latest_number && rc.number <= "9" && rc.number >= "0" { //号码相同符合条件
			flag = 0
		}
		if rc.state == rm.latest_state && (rc.state == "wild" || rc.state == "wildraw") { //功能相同符合条件
			flag = 0
		}
	}
	if rc.color == "z" { //万能牌
		if rc.state == rm.latest_state || (rm.latest_state == "raw" && rc.state == "wildraw") { //万能牌符合条件或者上一个出牌的是+2，这一次可以允许+4
			flag = 0
		}
	}
	if flag == -1 { //不符合出牌规矩
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
		rm.getcardsnumber += 4
		//表示是+4
		flag = 3
	}
	if rm.latest_state == "draw" {
		rm.getcardsnumber += 2
		//表示是+2
		flag = 2
	}
	//检查是否需要喊UNO
	check := rm.CheckUno(p_id)
	if check == true {
		flag = 1
	}
	//检查用户是否已经可以获胜
	check = rm.CheckWin(p_id)
	if check == true {
		flag = 5
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

//检查获胜状态
func (rm *PlayerRoom) CheckWin(p_id int) bool {
	for _, p := range rm.players {
		if p_id == p.player_id {
			if p.player_cards.number == 0 {
				return true
			} else {
				return false
			}
		}
	}
	return false
}
