package controllers

type Player struct {
	//是否准备
	state bool
	//玩家id
	player_id int
	//玩家昵称
	player_name string
	//玩家手牌
	player_cards UserCard
}

//玩家选择准备or取消准备
func (p *Player) Ready(ready bool) bool {
	if p.state == ready {
		return false
	} else {
		p.state = ready
		return true
	}
}

//只剩一张牌大声喊出UNO！！！！！！！！！！！！！！！！！！！
func (p *Player) Uno() {
	
}

//玩家摸牌
func (p *Player) GetCard() {

}

//玩家出牌
func (p *Player) RemoveCard() {

}

//玩家选择颜色
func (p *Player) SelectColor() {

}
