package controllers

import (
	"log"
	"regexp"
	"github.com/astaxie/beego"
)

//用户控制器
type UserController struct {
	beego.Controller
}

//Get 用于制定网页页面
func (login *UserController) Get() {
	login.TplName = "welcome.html"
}

//注册内容
func (re *UserController) GetRegister() {
	re.TplName = "register.html"
}

//Register 是实现用户注册功能
func (User *UserController) Register() {
	//邮箱
	email := User.GetString("email")
	//密码
	password := User.GetString("password")
	//验证码
	code := User.GetString("code")
	//用户名
	username := User.GetString("username")
	//读取redis的内容核查验证码
	//错误就返回，正确就进行数据库操作
	//数据库操作
	//返回注册成功
	log.Println("账号注册成功")
	User.Redirect("/", 302)
	return
}

//向邮箱传递验证码
func (user *UserController) EmailCheck(){
	email := user.GetString("email")
	pattern := `\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*` //匹配电子邮箱
	reg := regexp.MustCompile(pattern)
	check := reg.MatchString(email)
	if check == false{
		return
	}else{
		//向邮箱发送验证码
	}

}