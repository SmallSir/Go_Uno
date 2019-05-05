package controllers

import (
	"Go_Uno/Uno/models"
	"crypto/tls"
	"encoding/json"
	"log"
	"math/rand"
	"strconv"
	"time"

	"github.com/garyburd/redigo/redis"

	"github.com/go-gomail/gomail"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

/*以下是测试样例
func init() {
	test = make([]useregister, 4)
	testid = make([]int, 4)
	test[0].Email = "280690951@qq.com"
	test[0].Password = "1234567"
	test[0].Username = "test1"

	test[1].Email = "921951510@qq.com"
	test[1].Password = "1234567"
	test[1].Username = "吃葡萄不吐葡萄皮"

	test[2].Email = "280690954@qq.com"
	test[2].Password = "1234567"
	test[2].Username = "hh哈哈"

	test[3].Email = "280690952@qq.com"
	test[3].Password = "1234567"
	test[3].Username = "##哈哈ss"

	testid[0] = 5
	testid[1] = 6
	testid[2] = 7
	testid[3] = 10
}
*/

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
	//返回信息
	ok := false
	msg := ""
	url := ""

	//获取登录玩家的信息
	user := Userlogin{}
	err := json.Unmarshal(User.Ctx.Input.RequestBody, &user)
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

	//获取数据库中用户的信息
	o := orm.NewOrm()
	player := models.User{Id: -1}
	err = o.Raw("select id,name from user where email = ? and password = ?", email, password).QueryRow(&player)
	log.Println(player)
	if err != nil || player.Id == -1 {
		if err != nil {
			msg = err.Error()
		} else {
			msg = "用户不存在，请确认帐号和密码"
		}
		url = "/"
		return
	}

	/*
		以下测试样例
		var id int
		var username string
		flag := false
		for i, _ := range test {
			log.Println(email, password, test[i].Email, test[i].Password)
			if test[i].Email == email && test[i].Password == password {
				username = test[i].Username
				id = testid[i]
				flag = true
				break
			}
		}
		if flag == false {
			msg = "用户不存在"
			url = "/"
			return
		}
	*/
	//正确的话设置玩家的id和name到session
	User.SetSession("id", player.Id)
	User.SetSession("name", player.Name)

	ok = true
	url = "/dating/" + strconv.Itoa(player.Id)

}

//Register 是实现用户注册功能
func (User *UserController) Register() {
	//返回信息
	ok := false
	msg := ""
	url := ""

	//获取玩家注册信息
	user := Useregister{}
	err := json.Unmarshal(User.Ctx.Input.RequestBody, &user)
	if err != nil {
		msg = "信息出错，重新填写"
		return
	}
	email := user.Email
	password := user.Password
	username := user.Username
	yzm := user.Code

	//检查邮箱是否注册
	o := orm.NewOrm()
	x := models.User{Email: email, Id: -1}
	err = o.Raw("select id from user where email = ?", email).QueryRow(&x)
	log.Println(err)
	if err == nil || x.Id != -1 {
		msg = "邮箱已被注册"
		url = "/register"
		return
	}

	//检查用户名是否注册
	y := models.User{Name: username, Id: -1}
	err = o.Raw("select id from user where name = ?", username).QueryRow(&y)
	if err == nil || y.Id != -1 {
		msg = "用户名已被注册"
		url = "/register"
		return
	}

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
	conn, err := redis.Dial("tcp", beego.AppConfig.String("redis_ip")+":"+beego.AppConfig.String("redis_port"))
	if err != nil {
		msg = err.Error()
		return
	}
	/*if _, err := conn.Do("AUTH", "12345"); err != nil {
		conn.Close()
		log.Println("redis密码不对")
		return
	}*/
	// 函数退出时关闭连接
	defer conn.Close()
	//先检查验证码是否存在，然后在获取检查内容是否合格
	isExit, err := redis.Bool(conn.Do("EXISTS", email))
	if err != nil {
		log.Println("数据库有问题，无法查询邮箱-验证码")
	}
	if isExit == false {
		msg = "验证码已失效，请重新申请"
		url = "/register"
		return
	}
	redisyzm, err := redis.Int(conn.Do("get", email))
	if err != nil {
		msg = "无法获取验证码，请稍后再试"
		url = "/register"
		return
	}
	strredisyzm := strconv.Itoa(redisyzm)
	if yzm != strredisyzm {
		msg = "验证码不正确，请重新输入"
		url = "/register"
		return
	}
	log.Println("注册环节过了redis")
	/*
		以下是测试样例
		if yzm != 12345 {
			msg = "验证码错误"
			return
		}
	*/

	//将注册信息放到数据库
	newuser := models.User{Name: username, Password: password, Score: 0, Email: email}
	id, err := o.Insert(&newuser)
	if err == nil {
		log.Print(id)
	} else {
		msg = err.Error()
		url = "/register"
		return
	}
	msg = "注册完成"
	url = "/"
	ok = true
	return
}

//向邮箱传递验证码
func (User *UserController) EmailCheck() {
	//获取邮箱信息
	user := Userlogin{}
	err := json.Unmarshal(User.Ctx.Input.RequestBody, &user)
	email := user.Email
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
		User.ServeJSON()
	}()

	//生成一个六位验证码
	yzm := int(rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(1000000))
	x := strconv.Itoa(yzm)
	sendemail := "验证码:" + x
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

	log.Println(yzm)
	//将验证码存到redis
	conn, err := redis.Dial("tcp", beego.AppConfig.String("redis_ip")+":"+beego.AppConfig.String("redis_port"))
	if err != nil {
		log.Println("无法连接数据库，无法实现验证码存到redis")
		return
	}
	/*if _, err := conn.Do("AUTH", "12345"); err != nil {
		conn.Close()
		log.Println("redis密码不对")
		return
	}*/
	// 函数退出时关闭连接
	defer conn.Close()
	//操作方法是先查找email是否有存在的验证码，有的话删除，没有的话就正常添加
	isExit, err := redis.Bool(conn.Do("EXISTS", email))
	if err != nil {
		log.Println("数据库有问题，无法查询邮箱-验证码")
	}
	if isExit == true {
		_, err = conn.Do("del", email)
		if err != nil {
			log.Println("数据库有问题，无法删除验证码")
		}
	}
	_, err = conn.Do("set", email, yzm, "EX", "60")
	if err != nil {
		msg = "无法添加验证码,请稍后再试"
		return
	}

	ok = true
	msg = "成功发送验证码，请前往邮箱查看"
	return
}
