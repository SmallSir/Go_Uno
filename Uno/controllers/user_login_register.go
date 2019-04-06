package controllers

import (
	"encoding/json"
	"math/rand"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/utils"
)

//用户控制器
type UserController struct {
	beego.Controller
}

//Get 用于制定网页页面
func (login *UserController) Get() {
	login.TplName = "login.html"
}

//注册内容
func (re *UserController) GetRegister() {
	re.TplName = "register.html"
}

//Login 是实现用户登录功能
func (User *UserController) Login() {
	//获取登录玩家的信息
	user := Userlogin{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	email := user.Email
	password := user.Password

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
		User.Data["json"] = string(ret)
		User.EnableRender = false
		User.ServeJSON()
	}()

	/*检查账号密码*/

	//正确的话设置玩家的id和name到session
}

//Register 是实现用户注册功能
func (User *UserController) Register() {

	//获取玩家注册信息
	user := useregister{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	email := user.email
	password := user.password
	username := user.username
	yzm := user.code

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
		User.Data["json"] = string(ret)
		User.EnableRender = false
		User.ServeJSON()
	}()

	/*
		检查注册信息用户名和邮箱是否唯一，否则报错
	*/

	//检查验证码与邮箱是否一一对应

	return
}

//向邮箱传递验证码
func (User *UserController) EmailCheck() {
	//获取邮箱信息
	user := Userlogin{}
	err := json.Unmarshal([]byte(User.Ctx.Input.RequestBody), user)
	email := user.Email

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
		User.Data["json"] = string(ret)
		User.EnableRender = false
		User.ServeJSON()
	}()

	/*
		应检查邮箱是否已经注册过，注册过则报错
	*/

	//生成一个六位验证码
	yzm := rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(1000000)

	// 创建一个字符串变量，存放邮件的配置信息
	config :=
		`{"username":"280690956@qq.com","password":"qiu970505.","host":"smtp.qq.com","port":25}`
	// 通过存放配置信息的字符串，创建Email对象
	temail := utils.NewEMail(config)
	// 指定邮件的基本信息
	temail.To = []string{email}      //指定收件人邮箱地址
	temail.From = "280690956@qq.com" //指定发件人的邮箱地址
	temail.Subject = "UNO账号注册验证码"    //指定邮件的标题
	temail.HTML = `<html>
        <head>
        </head>
            <body>
            <div>UNO的验证码为 ${yzm} </div>
            </body>
        </html>` //指定邮件内容
	// 发送邮件
	err = temail.Send()
	if err != nil {
		msg = "邮件发送失败，请重新确认邮箱或更改邮箱"
		return
	}

	/*
		把验证码和邮箱同时发送到redis数据库保留，并限时2分钟
	*/

}
