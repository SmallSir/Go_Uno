package controllers

//创建房间or加入房间
type RoomMsg struct {
	//房间名称
	RoomName string `json:"name"`
	//房间密码
	RoomPassWord string `json:"password"`
}

//房间状态返回值
type ReRoomMsg struct {
	//返回的url(创建房间使用)
	Url string `json:"url"`
	//返回信息
	Msg string `json:"message"`
	//异常状态(true为正常,false为异常)
	Ok bool `json:"state"`
}

//出牌状态
type CardStateMsg struct {
	//出牌的颜色
	Color string `json:"color"`
	//出牌的号码
	Number string `json:"number"`
	//出牌状态
	State string `json:"state"`
	//玩家行为
	Behavior string `json:"behavior"`
}

type Card struct {
	//卡牌颜色
	color string
	//卡牌号码
	number string
	//卡牌功能
	state string
}

//房间信息
type Room struct {
	room_name     string
	room_password string
}
