package main

import (
	_ "Go_Uno/Uno/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.BConfig.WebConfig.Session.SessionOn = true
	beego.SetStaticPath("/static", "static")
	beego.Run()
}
