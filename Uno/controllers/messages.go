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

//加入房间返回的数据格式
type JoinRoom struct {
	Type       int    `json:"Type"`       //返回的状态
	Position   int    `json:"position"`   //加入玩家所处的位置
	PlayerId   string `json:"playerid"`   //玩家的id
	PlayerName string `json:"playername"` //玩家的名字
}

//离开房间返回的数据格式
type LeaveRoom struct {
	Type     int `json:"Type"`     //返回的状态
	Position int `json:"position"` //离开玩家所处的位置
}

//比赛结束后的返回的榜单数据格式
type GameOverRank struct {
	xs_one   string `json:"name_one"` //第一名名字
	xs_two   string `json:"xs_two"`   //第二个名字
	gr_two   string `json:"gr_two"`   //第二名分数
	xs_three string `json:"xs_three"` //第三名名字
	gr_three string `json:"gr_three"` //第三名分数
	xs_four  string `json:"xs_four"`  //第四名名字
	gr_four  string `json:"gr_four"`  //第四名分数
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
	Color    string `json:"color"`    //选择颜色
	Playerid int    `json:"playerid"` //选择颜色的玩家id
}

//玩家选择准备or取消准备
type PlayerReady struct {
	Type     int  `json:"Type"`     //类型
	Ready    bool `json:"ready"`    //选择的准备状态
	Playerid int  `json:"playerid"` //准备状态更改的玩家id
}

//获取的rank信息包含的内容
type Rankname struct {
	Username   string `json:"username"` //获取的玩家姓名
	Usergrades int    `json:"grades"`   //玩家得分
}

//返回到大厅的rank排行榜信息
type Rank struct {
	One   Rankname `json:"one"`   //第一名
	Two   Rankname `json:"two"`   //第二名
	Three Rankname `json:"three"` //第三名
	Four  Rankname `json:"four"`  //第四名
	Five  Rankname `json:"five"`  //第五名
	Six   Rankname `json:"six"`   //第六名
	Seven Rankname `json:"seven"` //第七名
	Eight Rankname `json:"eight"` //第八名
	Nine  Rankname `json:"nine"`  //第九名
	Ten   Rankname `json:"ten"`   //第十名
}

//用户登录接收的数据格式
type Userlogin struct {
	Email    string `json:"email"`    //登录邮箱
	Password string `json:"password"` //登录密码
}

//用户注册接收的数据格式
type useregister struct {
	email    string `json:"email"`    //登录邮箱
	password string `json:"password"` //密码
	username string `json:"username"` //用户名
	code     string `json:"yzm"`      //邮箱验证码
}
