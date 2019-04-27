package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strconv"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
)

type GameController struct {
	beego.Controller
}

var roomlist *roomtable

/*
以下为测试样例
*/
var ranklist []Rankname

//初始化房间表
func init() {
	roomlist = newRoomTable()
	/*
		以下为测试样例
	*/
	ranklist = make([]Rankname, 10)
}

//大厅页面
func (game *GameController) Dating() {
	game.TplName = "dating.html"
}

//获取rank榜单信息
func (game *GameController) GetRank() {
	geturl := GetUrl{}
	//log.Println(strconv.Itoa(game.GetSession("id").(int)))
	_ = json.Unmarshal(game.Ctx.Input.RequestBody, &geturl)
	xx := geturl.Url
	url := xx[29:]
	//检测是否偷偷进入，如果是的话就跳转到登陆界面
	remsg := &Rank{}
	remsg.State = true
	if game.GetSession("id") == nil || url != strconv.Itoa(game.GetSession("id").(int)) {
		remsg.State = false
	}
	/*
		把从redis获取的内容全部传递到remsg中即可
	*/
	/*
		以下为测试样例
	*/
	ranklist[0].Usergrades = 1500
	ranklist[0].Username = "大佬大佬"
	ranklist[0].User = true
	remsg.One = ranklist[0]
	ranklist[1].Usergrades = 1499
	ranklist[1].Username = "bilibili比利"
	ranklist[1].User = true
	remsg.Two = ranklist[1]
	ranklist[2].Usergrades = 1200
	ranklist[2].Username = "!!哈哈"
	ranklist[2].User = true
	remsg.Three = ranklist[2]
	ranklist[3].Usergrades = 1150
	ranklist[3].Username = "嘟嘟嘟嘟"
	ranklist[3].User = true
	remsg.Four = ranklist[3]
	ranklist[4].Usergrades = 1000
	ranklist[4].Username = "smallsir"
	ranklist[4].User = true
	remsg.Five = ranklist[4]
	ranklist[5].Usergrades = 900
	ranklist[5].Username = "哈哈"
	ranklist[5].User = true
	remsg.Six = ranklist[5]
	ranklist[6].Usergrades = 800
	ranklist[6].Username = "4545"
	ranklist[6].User = true
	remsg.Seven = ranklist[6]
	ranklist[7].Usergrades = 700
	ranklist[7].Username = "daskd"
	ranklist[7].User = true
	remsg.Eight = ranklist[7]
	ranklist[8].Usergrades = 500
	ranklist[8].Username = "最后的测试"
	ranklist[8].User = true
	remsg.Nine = ranklist[8]
	ranklist[9].Usergrades = 100
	ranklist[9].Username = "吃葡萄不吐葡萄皮"
	ranklist[9].User = true
	remsg.Ten = ranklist[9]

	defer func() {
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()
}

//创建房间
func (game *GameController) Register() {
	playerid := game.GetSession("id").(int)
	//获取账号密码
	roommsg := RoomMsg{}
	err := json.Unmarshal(game.Ctx.Input.RequestBody, &roommsg)
	roomname := roommsg.RoomName
	roompassword := roommsg.RoomPassWord
	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	if err != nil {
		msg = "无法获取创建房间信息"
		return
	}

	flag, _ := roomlist.CheckRoom(roomname, roompassword)

	//检查房间名称是否只有英文和数字，密码是否大于六位
	var hzRegexp = regexp.MustCompile("[a-z0-9A-Z]+$")
	if hzRegexp.MatchString(roomname) != true {
		msg = "房间名必须由数字和字母组成"
		return
	}
	if hzRegexp.MatchString(roompassword) != true {
		msg = "房间密码必须有数字或字母组成"
		return
	}
	if len(roomname) < 3 || len(roomname) > 7 {
		msg = "房间名长度不得小于3或者大于7"
		return
	}
	if len(roompassword) < 4 || len(roompassword) > 9 {
		msg = "房间密码长度不得小于4或者大于9"
		return
	}

	if flag == true {
		//房间存在不得使用
		msg = "房间已存在"
		return
	}

	//创建房间
	roomlist.CreateRoom(roomname, roompassword)

	//房间信息发送给redis

	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
	ok = true
	msg = "房间创建成功"
	url = "/game/" + strconv.Itoa(playerid) + "/" + roomname
	return
}

//加入房间
func (game *GameController) Join() {
	playerid := game.GetSession("id").(int)
	//获取账号密码
	roommsg := RoomMsg{}
	err := json.Unmarshal(game.Ctx.Input.RequestBody, &roommsg)
	roomname := roommsg.RoomName
	roompassword := roommsg.RoomPassWord
	//返回信息
	ok := false
	msg := ""
	url := ""

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()

	//获取房间名称和密码状态
	if err != nil {
		msg = "无法获取创建房间信息"
		return
	}

	flag, c := roomlist.CheckRoom(roomname, roompassword)

	if flag == false {
		msg = "房间账号不存在，请确认后再输入"
		return
	}
	if c == false {
		msg = "房间密码错误，请确认后再输入"
		return
	}

	//检查房间人数是否允许在进入
	r := roomlist.rooms[roomname]
	if r.stay_number == 4 {
		msg = "房间人数已经满了，无法在进入"
		return
	}

	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
	ok = true
	msg = "房间创建成功"
	url = "/game/" + strconv.Itoa(playerid) + "/" + roomname
}

func (game *GameController) ConnectionWebSocket() {
	log.Println("第一")
	//检查Session
	if game.GetSession("roomname") == nil || game.GetSession("id") == nil || game.GetSession("name") == nil {
		game.Redirect("/", 302)
	}
	log.Println("第二")
	//获取玩家的昵称和id，以及所在房间
	roomname := game.GetSession("roomname").(string)
	playername := game.GetSession("name").(string)
	playerid := game.GetSession("id").(int)
	//检查与url中所记录的信息是否相同
	if roomname != game.Ctx.Input.Param(":roomid") || strconv.Itoa(playerid) != game.Ctx.Input.Param(":userid") {
		game.Redirect("/", 302)
	}
	log.Println("第三")
	game.Data["roomname"] = roomname
	game.Data["name"] = playername
	game.Data["id"] = playerid
	log.Println("第四")
	game.TplName = "playroom.html"
	log.Println("第五")
}

//建立WebSocket
func (game *GameController) ConnectionWebSockets() {

	log.Println("第一步")
	if game.GetSession("roomname") == nil || game.GetSession("id") == nil || game.GetSession("name") == nil {
		game.Redirect("/", 302)
	}

	log.Println("第二步")
	if game.Data["id"].(int) != game.GetSession("id").(int) || game.Data["roomname"].(string) != game.GetSession("roomname").(string) {
		game.Redirect("/dating/"+strconv.Itoa(game.Data["id"].(int)), 302)
	}

	log.Println("第三步")
	playerid := game.Data["id"].(int)
	log.Println("第五步")
	playername := game.Data["name"].(string)
	log.Println("第六步")
	roomname := game.Data["roomname"].(string)

	log.Println("第七步")
	//建立websocket
	ws, err := websocket.Upgrade(game.Ctx.ResponseWriter, game.Ctx.Request, nil, 1024, 1024)

	log.Println("第八步")
	//检查websocket是否建立成功
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(game.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		log.Println("无法连接,错误为", err)
		return
	}
	p := NewPlayer(ws, playerid, playername, roomname)

	log.Println("第六步")
	//加入房间
	r := roomlist.rooms[roomname]
	r.subscribe <- p

	//监听从而获得由前端发来的信息
	for {
		var cident Incident
		err := ws.ReadJSON(&cident)
		if err != nil {
			r.unsubscribe <- playerid
		}
		r.publish <- cident
	}
}
