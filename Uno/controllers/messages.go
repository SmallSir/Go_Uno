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
	Color    string `json:"color"`     //出牌的颜色
	Number   string `json:"number"`    //出牌的号码
	State    string `json:"state"`     //出牌状态
	Behavior int    `json:"behavior"`  //玩家行为(1表示摸牌,0表示出牌)
	PlayerId int    `json:"playerid"`  //玩家id
	CN       int    `json:"getnumber"` //玩家摸牌个数
}

//出牌返回数据格式
type ReCardMsg struct {
	Msg          string `json:"msg"`         //出牌的颜色
	Ok           bool   `json:"state"`       //异常状态(true为正常，false为出牌不符合规则或出牌信息无法获取)
	Direction    int    `json:"direction"`   //方向
	CardsNumbers int    `json:"cardsnumber"` //剩余牌的数量
	Select       bool   `json:"select"`      //是否选色
	C            []Card `json:"cards"`       //玩家现在手里的牌
	Uno          bool   `json:"uno"`         //是否需要喊UNO
}

//出牌返回数据给其他玩家
type ReOtherCardMsg struct {
	Color       string `json:"color"`       //出牌的颜色
	Number      string `json:"number"`      //出牌的号码
	State       string `json:"state"`       //出牌状态
	CardsNumber int    `json:"cardsnumber"` //出牌玩家剩余牌数
	Check       bool   `json:"check"`       //是否轮到该玩家
	Direction   int    `json:"direction"`   //方向
	Uno         bool   `json:"uno"`         //上一个玩家是否喊了UNO
	Behavior    int    `json:"behavior"`    //轮到该玩家后允许的行为
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

//玩家选择颜色
type SelectColor struct {
	color    string
	playerid int
}

//玩家选择准备or取消准备
type PlayerReady struct {
	ready    bool `json:"ready"`
	Playerid int  `json:"Playerid"`
}
