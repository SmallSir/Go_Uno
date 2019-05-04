package models

import (
	"log"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

//初始化数据库的状态
func init() {
	dbhost := beego.AppConfig.String("dbhost")         //MySQL数据库的地址
	dbport := beego.AppConfig.String("dbport")         //MySQL数据库的端口号
	dbuser := beego.AppConfig.String("dbuser")         //MySQL数据库的用户名
	dbpassword := beego.AppConfig.String("dbpassword") //MySQL数据库的密码
	dbname := beego.AppConfig.String("dbname")         //MySQL数据库名程
	if dbport == "" {
		dbport = "3306"
	}
	dsn := dbuser + ":" + dbpassword + "@tcp(" + dbhost + ":" + dbport + ")/" + dbname + "?charset=utf8"
	if err := orm.RegisterDriver("mysql", orm.DRMySQL); err != nil {
		log.Println("注册driver有错")
	}
	if err := orm.RegisterDataBase("default", "mysql", dsn); err != nil {
		log.Println("数据库注册有误")
	} //注册一个名为default的数据库
	orm.RegisterModel(new(User)) //对定义的modle创建
	if err := orm.RunSyncdb("default", false, true); err != nil {
		log.Println("数据库运行失败")
	}
}

type User struct {
	Id       int
	Email    string
	Name     string
	Password string
	Score    int
}
