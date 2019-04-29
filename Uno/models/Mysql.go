package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

//初始化数据库的状态
func Init() {
	dbhost := beego.AppConfig.String("dbhost")         //MySQL数据库的地址
	dbport := beego.AppConfig.String("dbport")         //MySQL数据库的端口号
	dbuser := beego.AppConfig.String("dbuser")         //MySQL数据库的用户名
	dbpassword := beego.AppConfig.String("dbpassword") //MySQL数据库的密码
	dbname := beego.AppConfig.String("dbname")         //MySQL数据库名程
	if dbport == "" {
		dbport = "3306"
	}
	dsn := dbuser + ":" + dbpassword + "@tcp(" + dbhost + ":" + dbport + ")/" + dbname + "?charset=utf8&loc=Asia%2FShanghai"
	orm.RegisterDataBase("default", "mysql", dsn) //注册一个名为default的数据库
	orm.RegisterModel(new(User))                  //对定义的modle创建
}

type User struct {
	Id       int
	Email    string
	Name     string
	Password string
	Score    int
}

//返回带前缀的表名
func TableName(str string) string {
	return beego.AppConfig.String("dbprefix") + str
}
