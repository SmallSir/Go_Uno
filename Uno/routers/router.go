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
	beego.Router("/dating", &controllers.GameController{}, "get:GetRank")
	//创建房间
	beego.Router("/create", &controllers.GameController{}, "post:Register")
	//进入房间
	beego.Router("/join", &controllers.GameController, "post:Join")
	//房间
	//beego.Router("/uno/:roomname", &controllers.GameController{}, "post:Join")

}
