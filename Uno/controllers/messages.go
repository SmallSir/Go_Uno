package controllers

//创建房间or加入房间
type RoomMsg struct {
	//房间名称
	RoomName     string `json:"name"`
	//房间密码
	RoomPassWord string `json:"password"`
}

//出牌状态
type CardStateMsg struct{
	//出牌的颜色
	Color string `json:"color"`
	//出牌的号码
	Number string `json:"number"`
	//出牌的数量
	Numbers string `json:"numbers"`
	//出牌状态
	State string `json:"state"` 
}

//卡牌内容
type Card struct{
	//卡牌颜色
	color string
	//卡牌号码
	number string
	//卡牌功能
	state string
}