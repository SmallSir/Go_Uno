package controllers

import (
	"Go_Uno/Uno/models"
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strconv"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/garyburd/redigo/redis"
	"github.com/gorilla/websocket"
)

type GameController struct {
	beego.Controller
	o orm.Ormer
}

var roomlist *roomtable

/*
以下为测试样例
var ranklist []Rankname
*/

//初始化房间表
func init() {
	roomlist = newRoomTable()
	/*
			以下为测试样例
		ranklist = make([]Rankname, 10)
	*/
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

	//获取榜单信息
	conn, err := redis.Dial("tcp", beego.AppConfig.String("redis_ip")+":"+beego.AppConfig.String("redis_port"))
	if err != nil {
		return
	}
	if _, err := conn.Do("AUTH", "12345"); err != nil {
		conn.Close()
		log.Println("redis密码不对")
		return
	}
	// 函数退出时关闭连接
	defer conn.Close()
	user_map, err := redis.IntMap(conn.Do("ZREVRANGE", "rank", 0, 10, "withscores"))
	if err != nil {
		log.Println("获取榜单失败")
	}
	ranklist := make([]Rankname, 10)
	i := 0
	o := orm.NewOrm()
	for user := range user_map {
		id, _ := strconv.Atoi(user)
		rankuser := models.User{Id: id}
		o.Read(&rankuser)
		ranklist[i].Username = rankuser.Name
		ranklist[i].Usergrades = user_map[user]
		ranklist[i].User = true
		i += 1
	}
	if len(user_map) < 10 {
		for i := len(user_map); i < 10; i += 1 {
			ranklist[i].User = false
		}
	}
	remsg.One = ranklist[0]
	remsg.Two = ranklist[1]
	remsg.Three = ranklist[2]
	remsg.Four = ranklist[3]
	remsg.Five = ranklist[4]
	remsg.Six = ranklist[5]
	remsg.Seven = ranklist[6]
	remsg.Eight = ranklist[7]
	remsg.Nine = ranklist[8]
	remsg.Ten = ranklist[9]
	remsg.UserName = game.GetSession("name").(string)
	/*
		以下为测试样例
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
	*/

	defer func() {
		ret, _ := json.Marshal(remsg)
		game.Data["json"] = string(ret)
		game.EnableRender = false
		game.ServeJSON()
	}()
}

//退出
func (game *GameController) ExitDaTing() {
	game.DelSession("id")
	game.DelSession("name")
	reurl := &GetUrl{}
	ret, _ := json.Marshal(reurl)
	game.Data["json"] = string(ret)
	game.EnableRender = false
	game.ServeJSON()
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
	r := roomlist.rooms[roomname]
	go r.playRoom()

	oldname, check := game.userjoinroom(playerid, roomname)
	if check != true {
		if oldname != "" && oldname != roomname {
			msg = "你已经加入了一个房间，游戏还没结束哦，快去吧，房间号是" + oldname
			return
		}
	}
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

	oldname, check := game.userjoinroom(playerid, roomname)
	if check != true {
		if oldname != "" && oldname != roomname {
			msg = "你已经加入了一个房间，游戏还没结束哦，快去吧，房间号是" + oldname
			return
		}
	}

	//设置seesion中的房间名称
	game.SetSession("roomname", roomname)
	ok = true
	msg = "房间创建成功"
	url = "/game/" + strconv.Itoa(playerid) + "/" + roomname
}

func (game *GameController) ConnectionWebSocket() {
	if game.GetSession("id") == nil || game.GetSession("name") == nil {
		game.Redirect("/", 302)
	}
	if game.GetSession("roomname") == nil {
		game.Redirect("/dating/"+strconv.Itoa(game.GetSession("id").(int)), 302)
	}
	//获取玩家的昵称和id，以及所在房间
	roomname := game.GetSession("roomname").(string)
	playername := game.GetSession("name").(string)
	playerid := game.GetSession("id").(int)
	//检查与url中所记录的信息是否相同
	if roomname != game.Ctx.Input.Param(":roomid") || strconv.Itoa(playerid) != game.Ctx.Input.Param(":userid") {
		game.Redirect("/", 302)
	}
	game.Data["roomname"] = roomname
	game.Data["name"] = playername
	game.Data["id"] = playerid
	game.TplName = "playroom.html"
}

//离开房间
func (game *GameController) Leave() {
	reulr := GetUrl{}
	reulr.Url = "/dating/" + strconv.Itoa(game.GetSession("id").(int))
	game.DelSession("roomname")
	ret, _ := json.Marshal(reulr)
	game.Data["json"] = string(ret)
	game.EnableRender = false
	game.ServeJSON()
}

//建立WebSocket
func (game *GameController) ConnectionWebSockets() {
	if game.GetSession("id") == nil || game.GetSession("name") == nil {
		game.Redirect("/", 302)
	}
	if game.GetSession("roomname") == nil {
		game.Redirect("/dating/"+strconv.Itoa(game.GetSession("id").(int)), 302)
	}
	playerid := game.GetSession("id").(int)
	playername := game.GetSession("name").(string)
	roomname := game.GetSession("roomname").(string)
	//建立websocket
	ws, err := websocket.Upgrade(game.Ctx.ResponseWriter, game.Ctx.Request, nil, 1024, 1024)

	//检查websocket是否建立成功
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(game.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		log.Println("无法连接,错误为", err)
		return
	}
	p := NewPlayer(ws, playerid, playername, roomname)

	//加入房间
	r := roomlist.rooms[roomname]
	r.subscribe <- p
	log.Println(strconv.Itoa(playerid) + "已经进入了" + roomname)
	//监听从而获得由前端发来的信息
	for {
		var cident Incident
		err := ws.ReadJSON(&cident)
		if err != nil {
			log.Println(err)
			if r.game == false {
				game.DelSession("roomname")
			}
			r.unsubscribe <- playerid
			return
		}
		r.publish <- cident
	}
}

func (game *GameController) userjoinroom(id int, roomname string) (string, bool) {
	//将玩家与房间进行捆绑
	conn, err := redis.Dial("tcp", beego.AppConfig.String("redis_ip")+":"+beego.AppConfig.String("redis_port"))
	if err != nil {
		log.Println("无法打开redis服务器，完成用户和房间的捆绑")
		return "", false
	}
	if _, err := conn.Do("AUTH", "12345"); err != nil {
		conn.Close()
		log.Println("redis密码不对")
		return "", false
	}
	// 函数退出时关闭连接
	defer conn.Close()
	//先检查用户有没有在其他房间且房间正在游戏，如果有的话就不能加入
	isExist, err := redis.Bool(conn.Do("hexists", "room", id))
	if err != nil {
		log.Println("无法获取用户信息")
		return "", false
	}
	if isExist == true {
		room, err := redis.String(conn.Do("hget", "room", id))
		if err != nil {
			log.Println("用户已存在某个房间，无法获取")
			return "", false
		} else {
			if room == roomname {
				return "", true
			} else {
				return room, false
			}
		}
	}
	_, err = conn.Do("hset", "room", id, roomname)
	if err != nil {
		log.Println("无法添加用户和房间")
		return "", false
	}
	return "", true
}
