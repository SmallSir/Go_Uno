package controllers

//创建房间or加入房间
type RoomMsg struct {
	RoomName     string `json:"name"`     //房间名称
	RoomPassWord string `json:"password"` //房间密码
}

//房间状态返回值
type ReRoomMsg struct {
	Url string `json:"url"`     //返回的url(创建房间使用)
	Msg string `json:"message"` //返回信息
	Ok  bool   `json:"state"`   //异常状态(true为正常，false为异常)
}

//出牌接收数据格式
type CardStateMsg struct {
	Color    string `json:"color"`    //出牌的颜色
	Number   string `json:"number"`   //出牌的号码
	State    string `json:"state"`    //出牌状态
	Behavior string `json:"behavior"` //玩家行为
}

//出牌返回数据格式
type ReCardMsg struct {
	Msg          string `json:"msg"`         //出牌的颜色
	Ok           bool   `json:"state"`       //异常状态(true为正常，false为出牌不符合规则或出牌信息无法获取)
	Direction    int    `json:"direction"`   //方向
	CardsNumbers int    `json:"cardsnumber"` //剩余牌的数量
	Select       bool   `json:"select"`      //是否选色
}

//出牌返回数据给其他玩家
type ReOtherCardMsg struct {
	Color       string `json:"color"`       //出牌的颜色
	Number      string `json:"number"`      //出牌的号码
	State       string `json:"state"`       //出牌状态
	CardsNumber int    `json:"cardsnumber"` //出牌玩家剩余牌数
	Check       bool   `json:"check"`       //是否该玩家出牌
	Uno         int    `json:"uno"`         //0表示正常,1表示这个人可以喊Uno,-1表示玩家被禁止,2表示玩家+2,4表示玩家+4
	Direction   int    `json:"direction"`   //方向
}
type Card struct {
	color  string //卡牌颜色
	number string //卡牌号码
	state  string //卡牌功能
}

//房间信息
type Room struct {
	room_name     string //房间名称
	room_password string //房间密码
}
