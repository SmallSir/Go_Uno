package controllers

import (
	"errors"
	"log"
	"strconv"
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
	//上一个玩家编号
	lastplayer int
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
	//是否在比赛状态
	game bool
	//榜单信息
	rankmsg []RankSort
}

//创建房间
func NewRoom(room Room, number int) *PlayerRoom {
	newroom := PlayerRoom{players_number: number, players: make([]*Player, number),
		player_room: room, ready_number: 0, dirction: 0,
		stay_number: 0, playerno: make([]int, 4, 4), nextplayer: 0,
		subscribe:    make(chan *Player, 4),
		publish:      make(chan Incident, 10),
		unsubscribe:  make(chan int, 4),
		rankmsg:      make([]RankSort, 4),
		game:         false,
		lastplayer:   0,
		addcardsnums: 0}
	for i, _ := range newroom.playerno {
		newroom.playerno[i] = -1
	}
	return &newroom
}

//游戏房间
func (rm *PlayerRoom) playRoom() {
FOREND:
	for {
		select {
		case sub := <-rm.subscribe: //加入
			flag, index := rm.AddPlayer(sub)
			if flag == false { //表示为用户是新加入的
				jr := &JoinRoom{}
				jr.Type = 0
				jr.Position = index
				jr.State = false
				jr.PlayerId = sub.player_id
				jr.PlayerName = sub.player_name
				jr.Pready = false
				//把新用户加入房间的信息发送给所有人
				for i, _ := range rm.players {
					if i != index {
						jr.Host = false
					} else {
						jr.Host = true
					}
					if rm.playerno[i] != -1 {
						ws := rm.players[i].rwc
						ws.WriteJSON(jr)
					}
				}
				//将房间内的情况发送给新用户
				ws := sub.rwc
				for i, p := range rm.players {
					if rm.playerno[i] == -1 {
						continue
					}
					if p.player_id == sub.player_id {
						continue
					}
					jr.Host = false
					jr.PlayerId = p.player_id
					jr.PlayerName = p.player_name
					jr.Position = i
					if rm.players[i].state == true {
						jr.Pready = true
					} else {
						jr.Pready = false
					}
					ws.WriteJSON(jr)
				}
			} else { //用户是在游戏中退出重连
				//向离线玩家发送所有玩家的目前状态
				msg := &JoinRoom{}
				msg.Type = 0
				msg.State = true
				msg.ReConnect = rm.GetPosition(index)
				for i, _ := range rm.players {
					if i == index {
						msg.Host = true
						msg.Cards = rm.players[i].player_cards.cards
						log.Println("重连用户为", i, "他的手牌信息为", msg.Cards)
						log.Println("重连用户为", i, "他的手牌信息", rm.players[i].player_cards.cards)
						if rm.nextplayer == index {
							msg.OutPeople = true
						} else {
							msg.OutPeople = false
						}
					} else {
						msg.Host = false
						msg.OutPeople = false
					}
					msg.Position = i
					msg.PlayerId = rm.players[i].player_id
					msg.PlayerName = rm.players[i].player_name
					msg.Number = rm.players[i].player_cards.number
					if rm.playerno[index] != -1 {
						ws := rm.players[index].rwc
						ws.WriteJSON(msg)
					}
				}

				//给其他玩家发送玩家重连信息
				for i, _ := range rm.players {
					msg := &JoinRoom{}
					msg.ReConnect = rm.GetPosition(index)
					msg.Type = 0
					msg.Position = index
					msg.State = true
					if i != index && rm.playerno[index] != -1 {
						ws := rm.players[i].rwc
						ws.WriteJSON(msg)
					}
				}
			}
			break
		case unsub := <-rm.unsubscribe: //离开,传进来的是玩家的id
			log.Println("有人离开", unsub)
			msg := &LeaveRoom{}
			msg.Type = 1
			if rm.game == true {
				msg.State = true
			} else {
				msg.State = false
			}
			flag, index, err := rm.RemovePlayer(unsub)
			if flag == false {
				continue
			}
			if err != nil {
				//将房间信息从redis中删除
				rm.players_number = -1
			}
			msg.Position = index
			for i, _ := range rm.players {
				if rm.playerno[i] != -1 {
					ws := rm.players[i].rwc
					ws.WriteJSON(msg)
				}
			}
			if rm.nextplayer == index && rm.game == true {
				log.Println("需要进这里")
				flag := rm.GetNextPlayer()
				if flag == false {
					break FOREND
				}
			}
			break
		case event := <-rm.publish: //事件
			if event.Type == 0 { //事件为出牌
				rc := Card{Color: event.Ccolor, State: event.Cstate, Number: event.Cnumber}
				flag := rm.RemoveCard(event.Position, rc)
				msg := &Reincident{}
				msg.State = false
				if flag == -1 {
					msg.Type = -1
					msg.Incident = -1
					if rm.playerno[event.Position] != -1 {
						ws := rm.players[event.Position].rwc
						ws.WriteJSON(msg)
					} else {
						msg.Type = 4
						msg.Incident = 1
						msg.Position = event.Position
						if rm.getcardsnumber == 0 {
							rm.GetCard(event.Position, 1)
						} else {
							rm.GetCard(event.Position, rm.getcardsnumber)
							rm.getcardsnumber = 0
						}
						msg.CardsNumber = rm.players[event.Position].player_cards.number
						msg.Direction = rm.dirction
						msg.State = false
						for i, _ := range rm.players {
							msg.CardsNumber = rm.players[i].player_cards.number
							msg.Cardss = rm.players[i].player_cards.cards
							msg.Position = i
							for j, _ := range rm.players {
								if rm.nextplayer == i && j == i {
									msg.OutPeople = true
								} else {
									msg.OutPeople = false
								}
								if rm.playerno[j] != -1 {
									ws := rm.players[j].rwc
									ws.WriteJSON(msg)
								}
							}
						}
					}
				} else if flag != 5 { //表示出牌信息正常
					rm.lastplayer = event.Position
					msg.Type = 4
					msg.Incident = 0
					msg.Ccolor = event.Ccolor
					msg.Cstate = event.Cstate
					msg.Cnumber = string(event.Cnumber)
					msg.Position = event.Position
					msg.CardsNumber = rm.players[event.Position].player_cards.number
					msg.Cardss = rm.players[event.Position].player_cards.cards
					msg.Direction = rm.dirction
					if flag == 3 || flag == 4 {
						msg.Sc = true
					} else if flag == 1 {
						msg.Uno = true
					}
					for i, _ := range rm.players {
						if flag == 1 || flag == 3 || flag == 4 { //表示玩家出的是wild牌或者喊UNO
							if rm.lastplayer == i {
								msg.OutPeople = true
							} else {
								msg.OutPeople = false
							}
						} else {
							if rm.nextplayer == i {
								msg.OutPeople = true
							} else {
								msg.OutPeople = false
							}
						}
						if rm.playerno[i] != -1 {
							ws := rm.players[i].rwc
							ws.WriteJSON(msg)
						}
					}
					if rm.playerno[rm.nextplayer] == -1 {
						flag := rm.GetNextPlayer()
						if flag == false {
							break FOREND
						}
					}
				} else { //游戏获胜
					rm.game = false
					rm.rankmsg = make([]RankSort, 4)
					for i, _ := range rm.players {
						rm.rankmsg[i].name = rm.players[i].player_name
						rm.rankmsg[i].id = rm.players[i].player_id
						rm.rankmsg[i].score = rm.SumScore(i)
					}
					rm.ScoreSort()
					msg := &GameOverRank{}
					msg.Type = 3
					msg.Xs_one = rm.rankmsg[0].name
					msg.Gr_one = strconv.Itoa(rm.rankmsg[0].score)
					msg.Xs_two = rm.rankmsg[1].name
					msg.Gr_two = strconv.Itoa(rm.rankmsg[1].score)
					msg.Xs_three = rm.rankmsg[2].name
					msg.Gr_three = strconv.Itoa(rm.rankmsg[2].score)
					msg.Xs_four = rm.rankmsg[3].name
					msg.Gr_four = strconv.Itoa(rm.rankmsg[3].score)
					for i, _ := range rm.players {
						if rm.playerno[i] != -1 {
							ws := rm.players[i].rwc
							ws.WriteJSON(msg)
						}
					}
					/*
						redis修改积分
					*/
					//将游戏中已经离开的玩家清除房间
					for i, p := range rm.playerno {
						if p == -1 {
							rm.unsubscribe <- rm.players[i].player_id
						}
					}
					//数据清零等待重新再开
					rm.ready_number = 0
					rm.addcardsnums = 0
					for i, _ := range rm.players {
						rm.players[i].state = false
					}
					rm.game = false
				}
			} else if event.Type == 1 { //事件为准备事件
				msg := &PlayerReady{}
				msg.Type = 2
				msg.Playerid = rm.players[event.Position].player_id
				msg.Ready = event.Ready
				if event.Ready == true { //事件为准备
					rm.ReadyPlayer(event.Position)
				} else { //事件为取消准备
					rm.UnreadyPlayer(event.Position)
				}
				msg.ReadyNumber = rm.ready_number
				for i, _ := range rm.players {
					if rm.playerno[i] != -1 {
						ws := rm.players[i].rwc
						ws.WriteJSON(msg)
					}
				}
				if rm.ready_number == rm.players_number { //检查是否都准备好了，立即开始游戏
					rm.game = true
					rm.PlayGame()
					msg := &Reincident{}
					msg.Type = 4
					msg.Incident = 1
					msg.State = false
					msg.Direction = rm.dirction
					for i, _ := range rm.players {
						msg.CardsNumber = rm.players[i].player_cards.number
						msg.Cardss = rm.players[i].player_cards.cards
						msg.Position = i
						for j, _ := range rm.players {
							if rm.nextplayer == i && j == i {
								msg.OutPeople = true
							} else {
								msg.OutPeople = false
							}
							if rm.playerno[j] != -1 {
								ws := rm.players[j].rwc
								ws.WriteJSON(msg)
							}
						}
					}
				}
			} else if event.Type == 2 { //事件为选色
				rm.SelectColor(event.Sccolor)
				msg := &Reincident{}
				msg.Type = 4
				msg.Incident = 2
				msg.Position = event.Position
				msg.Direction = rm.dirction
				msg.State = false
				msg.Wsc = event.Sccolor
				flag := rm.CheckUno(rm.players[event.Position].player_id)
				if flag == true {
					msg.Uno = true
					for i, _ := range rm.players {
						if event.Position == i {
							msg.OutPeople = true
						} else {
							msg.OutPeople = false
						}
						if rm.playerno[i] != -1 {
							ws := rm.players[i].rwc
							ws.WriteJSON(msg)
						}
					}
				} else {
					for i, _ := range rm.players {
						if rm.nextplayer == i {
							msg.OutPeople = true
						} else {
							msg.OutPeople = false
						}
						if rm.playerno[i] != -1 {
							ws := rm.players[i].rwc
							ws.WriteJSON(msg)
						}
					}
				}
			} else if event.Type == 3 { //事件为喊UNO
				msg := &Reincident{}
				msg.Type = 4
				msg.Wuno = true
				msg.Incident = 3
				msg.Position = event.Position
				msg.Direction = rm.dirction
				for i, _ := range rm.players {
					if rm.nextplayer == i {
						msg.OutPeople = true
					} else {
						msg.OutPeople = false
					}
					if rm.playerno[i] != -1 {
						ws := rm.players[i].rwc
						ws.WriteJSON(msg)
					}
				}
			} else { //事件为摸牌
				msg := &Reincident{}
				msg.Type = 4
				msg.Incident = 1
				msg.Position = event.Position
				if rm.getcardsnumber == 0 {
					rm.GetCard(event.Position, 1)
				} else {
					rm.GetCard(event.Position, rm.getcardsnumber)
					rm.getcardsnumber = 0
				}
				msg.CardsNumber = rm.players[event.Position].player_cards.number
				msg.Direction = rm.dirction
				msg.State = false
				for i, _ := range rm.players {
					if i == event.Position {
						msg.Cardss = rm.players[event.Position].player_cards.cards
					}
					if rm.nextplayer == i {
						msg.OutPeople = true
					} else {
						msg.OutPeople = false
					}
					if rm.playerno[i] != -1 {
						ws := rm.players[i].rwc
						ws.WriteJSON(msg)
					}
				}
				if rm.playerno[rm.nextplayer] == -1 {
					flag := rm.GetNextPlayer()
					if flag == false {
						break FOREND
					}
				}
			}
			if rm.players_number == -1 {
				break FOREND
			}
			break
		}
	}
}

//添加玩家
func (rm *PlayerRoom) AddPlayer(pl *Player) (bool, int) {
	rm.stay_number++
	index := -1
	flag := false
	//检查该玩家是否存在房间内
	if rm.game == true {
		for i, p := range rm.players {
			if p.player_id == pl.player_id {
				rm.playerno[i] = pl.player_id
				index = i
				flag = true
				break
			}
		}
	}
	//给玩家安排位置
	if flag == false {
		for i, p := range rm.playerno {
			if p == -1 || p == 0 {
				rm.playerno[i] = pl.player_id
				index = i
				break
			}
		}
	}
	//添加玩家信息,如果是
	if flag == false {
		rm.players[index] = pl
	}
	rm.players[index].rwc = pl.rwc
	return flag, index
}

//移除玩家
func (rm *PlayerRoom) RemovePlayer(playerid int) (bool, int, error) {
	for j, p := range rm.players {
		if p.player_id == playerid {
			if p.state == true && rm.game == false {
				rm.ready_number--
			}
			rm.players[j].deregister()
			rm.stay_number--
			rm.playerno[j] = -1
			//注销房间
			if rm.stay_number == 0 {
				return true, j, errors.New("房间已经没有人了，可以删除")
			}
			return true, j, nil
		}
	}
	return false, -1, errors.New("玩家不存在，无法删除，删除失败")
}

//玩家准备
func (rm *PlayerRoom) ReadyPlayer(index int) {
	if rm.players[index].state == false {
		rm.ready_number++
	}
	rm.players[index].state = true
}

//玩家取消准备
func (rm *PlayerRoom) UnreadyPlayer(index int) {
	if rm.players[index].state == true {
		rm.ready_number--
	}
	rm.players[index].state = false
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
func (rm *PlayerRoom) RemoveCard(index int, rc Card) int {
	/*不同返回值的效果不同
	-1表示出牌不符合规则
	0表示正常出牌
	1表示这个人要喊UN表示玩家打了+2下一个人摸牌或者继续+2或者+4
	3表示玩家打了+4下一个人摸牌或者继续+4
	4表示玩家打了wild选择颜色
	5表示玩家获胜
	*/
	flag := -1
	p_id := rm.playerno[index]
	if rm.latest_state == "wildraw" && rm.latest_color == "z" { //意味着如果出了+4，不能再出别的牌，除非一直+4
		if rc.State == "wildraw" {
			flag = 0
		}
	}
	if rc.Color == "red" || rc.Color == "yellow" || rc.Color == "green" || rc.Color == "blue" || rm.latest_color == "null" {
		if (rc.Color == rm.latest_color || rm.latest_color == "null") && rm.latest_state != "wildraw" && rm.latest_state != "raw" { //颜色相同符合条件
			flag = 0
		}
		if rc.Number == rm.latest_number && rc.Number <= "9" && rc.Number >= "0" { //号码相同符合条件
			flag = 0
		}
		if rc.State == rm.latest_state && (rc.State == "reverse" || rc.State == "skip" || rc.State == "raw") { //功能相同符合条件
			flag = 0
		}
	}
	if (rm.latest_state == "wildraw" || rm.latest_state == "raw") && rm.getcardsnumber == 0 {
		flag = 0
	}
	if rc.Color == "z" { //万能牌
		if rm.latest_state == "wildraw" || rm.latest_state == "raw" {
			if rc.State == "wildraw" {
				flag = 0
			} else {
				flag = -1
			}
		} else {
			flag = 0
		}
	}
	if flag == -1 { //不符合出牌规矩
		return -1
	}
	//改变玩家手牌信息
	rm.players[index].player_cards.Remove_Card(rc)
	//修改这把的牌堆信息
	rm.room_cards.OutCards(rc)
	//修改目前信息
	rm.latest_color = rc.Color
	rm.latest_state = rc.State
	rm.latest_number = rc.Number
	//检查用户出的最后一张牌是不是功能牌，是的话要加一张
	if rm.players[index].player_cards.number == 0 && rc.Number == "-1" {
		rm.players[index].player_cards.Insert_Card(rm.room_cards.AddCards(1))
	}
	if rm.latest_state == "reverse" {
		rm.dirction = 1 - rm.dirction
	}
	if rm.latest_state == "skip" {
		rm.nextplayer = (rm.nextplayer + 2) % 4
	} else {
		if rm.dirction == 0 {
			rm.nextplayer = (rm.nextplayer + 3) % 4
		} else {
			rm.nextplayer = (rm.nextplayer + 1) % 4
		}
	}
	if rm.latest_state == "wild" {
		//表示是选色
		flag = 4
	} else if rm.latest_state == "wildraw" {
		rm.getcardsnumber += 4
		//表示是+4
		flag = 3
	} else if rm.latest_state == "raw" {
		rm.getcardsnumber += 2
		//表示是+2
	}
	if flag != 0 {
		return flag
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
	return flag
}

//选择花色
func (rm *PlayerRoom) SelectColor(color string) {
	rm.latest_color = color
}

//获得摸牌信息
func (rm *PlayerRoom) GetCard(index int, rn int) {
	addcards := rm.room_cards.AddCards(rn)
	rm.players[index].player_cards.Insert_Card(addcards)
	if rm.dirction == 0 {
		rm.nextplayer = (rm.nextplayer + 3) % 4
	} else {
		rm.nextplayer = (rm.nextplayer + 1) % 4
	}
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

//统计比赛结束后的分数
func (rm *PlayerRoom) SumScore(index int) int {
	pcards := rm.players[index].player_cards.cards
	sum := 0
	for _, c := range pcards {
		if c.Number == "-1" {
			if c.Color == "z" {
				sum += 50
			} else {
				sum += 20
			}
		} else {
			x, _ := strconv.Atoi(c.Number)
			sum += x
		}
	}
	return sum
}

//将玩家获得的分数按照升序排序
func (rm *PlayerRoom) ScoreSort() {
	for i, _ := range rm.rankmsg {
		for j, _ := range rm.rankmsg {
			if j <= i {
				continue
			}
			if rm.rankmsg[j].score < rm.rankmsg[i].score {
				x := rm.rankmsg[j]
				rm.rankmsg[j] = rm.rankmsg[i]
				rm.rankmsg[i] = x
			}
		}
	}
}

func (rm *PlayerRoom) GetNextPlayer() bool {
	//直到找到一个没有离开的玩家轮到他进行操作了
	check := rm.nextplayer
	for {
		for i, _ := range rm.playerno {
			log.Println("玩家位置", i, "状态", rm.playerno[i])
		}
		log.Println("接下来的玩家是", rm.nextplayer)
		lmsg := &Reincident{}
		lmsg.Type = 4
		lmsg.Incident = 1
		//lmsg.Position = rm.nextplayer
		lmsg.Direction = rm.dirction
		lmsg.State = false
		//离线玩家会执行摸牌操作
		if rm.playerno[rm.nextplayer] == -1 {
			if rm.getcardsnumber != 0 {
				rm.players[rm.nextplayer].player_cards.Insert_Card(rm.room_cards.AddCards(rm.getcardsnumber))
				rm.getcardsnumber = 0
			} else {
				rm.players[rm.nextplayer].player_cards.Insert_Card(rm.room_cards.AddCards(1))
			}
			lmsg.Position = rm.nextplayer
			lmsg.CardsNumber = rm.players[rm.nextplayer].player_cards.number
			lmsg.OutPeople = false
			for i, _ := range rm.players {
				if rm.playerno[i] != -1 {
					ws := rm.players[i].rwc
					ws.WriteJSON(lmsg)
				}
			}
			rm.lastplayer = rm.nextplayer
			if rm.dirction == 0 {
				rm.nextplayer = (rm.nextplayer + 3) % 4
			} else {
				rm.nextplayer = (rm.nextplayer + 1) % 4
			}
		} else {
			lmsg.Position = rm.lastplayer
			lmsg.CardsNumber = rm.players[rm.lastplayer].player_cards.number
			for i, _ := range rm.players {
				if rm.nextplayer == i {
					lmsg.OutPeople = true
				} else {
					lmsg.OutPeople = false
				}
				if rm.playerno[i] != -1 {
					ws := rm.players[i].rwc
					ws.WriteJSON(lmsg)
				}
			}
			break
		}
		if check == rm.nextplayer {
			return false
		}
	}
	return true
}

func (rm *PlayerRoom) GetPosition(index int) string {
	if index == 0 {
		return "dong"
	}
	if index == 1 {
		return "bei"
	}
	if index == 2 {
		return "xi"
	}
	return "nan"
}
