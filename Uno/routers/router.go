package routers

import (
	"Uno/controllers"
	"github.com/astaxie/beego"
)

func init() {
	//登录
	beego.Router("/",&controllers.UserController{})
	//注册
	beego.Router("/register",&controllers.UserController{},"get:GetRegister")
	beego.ROuter("/register/re"，&controllers.UserController{},"post:Register")
	//主页面

	//房间

	
}
