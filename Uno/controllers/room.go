package controllers

import "errors"

type PlayerRoom struct {
	//玩家数量
	players_number int
	//已经准备人数
	ready_number int
	//玩家信息
	players []Player
	//房间信息
	player_room Room
	//目前已有的人数
	stay_number int
	//房间的牌
	room_cards Cards
	//当前的颜色
	latest_color string
	//当前的号码
	latest_number string
	//上一个出牌人id
	//latest_id int
}

//创建房间
func (rm *PlayerRoom) Room(room Room, number int, player Player) *PlayerRoom {
	newroom := PlayerRoom{players_number: number, players: make([]Player, number), player_room: room, ready_number: 0, stay_number: 1}
	rm.players = append(rm.players, player)
	return &newroom
}

//添加玩家
func (rm *PlayerRoom) AddPlayer(player Player) (bool, error) {
	if rm.stay_number == rm.players_number {
		return false, errors.New("人数已满不能，请稍后再试")
	}
	rm.stay_number++
	player.room_name = rm.player_room.room_name
	rm.players = append(rm.players, player)
	return true, nil
}

//移除玩家
func (rm *PlayerRoom) RemovePlayer(player Player) (bool, error) {
	for i, p := range rm.players {
		if p.player_id == player.player_id {
			new_player := make([]Player, rm.players_number)
			new_player = append(rm.players[:i], rm.players[i+1:]...)
			rm.players = new_player
			rm.stay_number--
			if rm.stay_number == 0 {
				return true, errors.New("房间已经没有人了，可以删除")
			}
			return true, nil
		}
	}
	return false, errors.New("玩家不存在，无法删除，删除失败")
}

//玩家准备
func (rm *PlayerRoom) ReadyPlayer() error {
	if rm.ready_number == rm.players_number {
		return errors.New("人数已经满了不得再准备")
	}
	rm.ready_number++
	if rm.ready_number == rm.players_number {
		rm.PlayGame()
	}
	return nil
}

//玩家取消准备
func (rm *PlayerRoom) UnreadyPlayer() error {
	if rm.ready_number == 0 {
		return errors.New("没有任何人准备，不存在准备状态")
	}
	rm.ready_number--
	return nil
}

//开始游戏
func (rm *PlayerRoom) PlayGame() {
	rm.latest_color = "null"
	rm.latest_number = "-1"
	//rm.latest_id = -1
	rm.room_cards.Start()
	for _, p := range rm.players {
		p.player_cards.cards = append(rm.room_cards.AddCards(7)[:])
		p.player_cards.number = 7
		p.player_cards.Sort()
	}
}

//获得出牌信息
func (rm *PlayerRoom) RemoveCard(p_id int, rc Card) (bool, error) {
	if rm.latest_color != "null" && rm.latest_color != rc.color && rm.latest_number != rc.number && rc.state != "wildraw" && rc.state != "wild" {
		return false, errors.New("出的牌不对")
	}
	for _, p := range rm.players {
		if p.player_id == p_id {
			//改变玩家手牌信息
			p.player_cards.Remove_Card(rc)
			//改变这把的牌堆信息
			rm.room_cards.OutCards(rc)
			//修改目前信息
			rm.latest_color = rc.color
			//rm.latest_id = p_id
			rm.latest_number = rc.number
			break
		}
	}
	return true, nil
}

//选择花色
func (rm *PlayerRoom) SelectColor(color string) {
	rm.latest_color = color
}

//获得摸牌信息
func (rm *PlayerRoom) GetCard(p_id int, rn int) {
	for _, p := range rm.players {
		if p.player_id == p_id {
			p.player_cards.Insert_Card(rm.room_cards.AddCards(rn))
		}
	}
}
