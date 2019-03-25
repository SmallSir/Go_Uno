package routers

import (
	"Go_Uno/Uno/controllers"

	"github.com/astaxie/beego"
)

func init() {
	//登录
	//beego.Router("/",&controllers.UserController{})
	//注册
	//beego.Router("/register",&controllers.UserController{},"get:GetRegister")
	//beego.Router("/register/re",&controllers.UserController{},"post:Register")
	//主页面
	beego.Router("/", &controllers.GameController{})
	//
	beego.Router("/create", &controllers.GameController{}, "post:Register")
	beego.Router("/uno/:roomname", &controllers.GameController{}, "get:Join")
	//房间

}
