package routers

import (
	"Go_Uno/Uno/controllers"

	"github.com/astaxie/beego"
)

func init() {
	//首页
	beego.Router("/", &controllers.UserController{})
	//登录
	beego.Router("/login", &controllers.UserController{}, "post:Login")
	//注册页面
	beego.Router("/register", &controllers.UserController{}, "get:GetRegister")
	//注册
	beego.Router("/register", &controllers.UserController{}, "post:Register")
	//发送邮箱验证码
	beego.Router("/emailyzm", &controllers.UserController{}, "post:EmailCheck")
	//主页面
	beego.Router("/dating/?:id", &controllers.GameController{}, "get:Dating")
	//显示榜单
	beego.Router("/rank", &controllers.GameController{}, "post:GetRank")
	//创建房间
	beego.Router("/create", &controllers.GameController{}, "post:Register")
	//进入房间
	beego.Router("/join", &controllers.GameController{}, "post:Join")
	//房间
	beego.Router("/uno/?id/?roomid", &controllers.GameController{}, "get:ConnectionWebSocket")

}
