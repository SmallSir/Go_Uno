package controllers

import (
	"crypto/tls"
	"encoding/json"
	"log"
	"math/rand"
	"time"

	"github.com/go-gomail/gomail"

	"github.com/astaxie/beego"
)

//内容为测试
var test []useregister
var testid []int

func init() {
	test := make([]useregister, 4)
	testid = make([]int, 4)
	test[0].email = "280690951@qq.com"
	test[0].password = "123456789"
	test[0].username = "test1"

	test[1].email = "921951510@qq.com"
	test[1].password = "123456789"
	test[1].username = "吃葡萄不吐葡萄皮"

	test[2].email = "280690954@qq.com"
	test[2].password = "123456789"
	test[2].username = "hh哈哈"

	test[3].email = "280690952@qq.com"
	test[3].password = "123456789"
	test[3].username = "##哈哈ss"

	testid[0] = 5
	testid[1] = 6
	testid[2] = 7
	testid[3] = 10
}

//用户控制器
type UserController struct {
	beego.Controller
}

//登陆界面
func (User *UserController) Get() {
	User.TplName = "login.html"
}

//注册界面
func (User *UserController) GetRegister() {
	User.TplName = "register.html"
}

//Login 是实现用户登录功能
func (User *UserController) Login() {
	User.TplName = "login.html"
	//返回信息
	ok := false
	msg := ""
	url := ""

	//获取登录玩家的信息
	user := Userlogin{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	if err != nil {
		msg = "信息错误，请重新输入"
		return
	}

	email := user.Email
	password := user.Password

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		User.Data["json"] = string(ret)
		User.EnableRender = false
		User.ServeJSON()
	}()

	/*检查账号密码*/
	/*
		以下测试样例
	*/
	var id int
	var username string
	for i, _ := range test {
		if test[i].email == email && test[i].password == password {
			username = test[i].username
			id = testid[i]
		}
	}
	ok = true
	url = "/dating"

	//正确的话设置玩家的id和name到session
	User.SetSession("id", id)
	User.SetSession("name", username)
}

//Register 是实现用户注册功能
func (User *UserController) Register() {
	User.TplName = "register.html"
	//返回信息
	ok := false
	msg := ""
	url := ""

	//获取玩家注册信息
	user := useregister{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	if err != nil {
		msg = "信息出错，重新填写"
		return
	}
	/*
		email := user.email
		password := user.password
		username := user.username
	*/
	yzm := user.code

	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		remsg.Url = url
		ret, _ := json.Marshal(remsg)
		User.Data["json"] = string(ret)
		User.EnableRender = false
		User.ServeJSON()
	}()

	//检查验证码与邮箱是否一一对应

	/*
		以下是测试样例
	*/
	if yzm != 12345 {
		msg = "验证码错误"
		return
	}
	url = "/"

	/*
		检测用户名的唯一性
	*/
	/*
		用户信息输入到MySQL
	*/
	return
}

//向邮箱传递验证码
func (User *UserController) EmailCheck() {
	User.TplName = "register.html"
	//获取邮箱信息
	user := Userlogin{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	email := user.Email
	log.Println([]byte(User.Ctx.Input.RequestBody))
	log.Println(user.Email)
	//返回信息
	ok := false
	msg := ""
	if err != nil {
		msg = err.Error()
		return
	}
	defer func() {
		remsg := &ReRoomMsg{}
		remsg.Msg = msg
		remsg.Ok = ok
		ret, _ := json.Marshal(remsg)
		User.Data["json"] = string(ret)
		User.EnableRender = false
		log.Println("这还是测试")
		User.ServeJSON()
	}()

	/*
		应检查邮箱是否已经注册过，注册过则报错
	*/

	//生成一个六位验证码
	yzm := rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(1000000)

	sendemail := "<h1>验证码" + string(yzm) + "</h1>"
	m := gomail.NewMessage()
	m.SetAddressHeader("From", "280690956@qq.com", "UNO官方")
	m.SetAddressHeader("To", email, email)
	m.SetHeader("Subject", "UNO账号注册验证码")
	m.SetBody("text/html", sendemail)
	d := gomail.NewPlainDialer("smtp.qq.com", 25, "280690956@qq.com", "ylrwvidjqlagbhjb")
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	if err := d.DialAndSend(m); err != nil {
		msg = err.Error()
		return
	}
	/*
		把验证码和邮箱同时发送到redis数据库保留，并限时2分钟
	*/

}
