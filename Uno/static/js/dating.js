var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

var app = new PIXI.Application(1340, 625, {
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

//退出按钮
var exitstyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 30,
    fill:"red",
    fontStyle: 'italic',
    fontWeight: 'bold',
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});
var exitgame = new PIXI.Text('退出',exitstyle);
exitgame.x = 1250;
exitgame.y = 20;
exitgame.interactive = true;
exitgame.buttonMode = true;
app.stage.addChild(exitgame); //点击退出后会跳转到前端网页

//exitgame.on("click",check());

//用户名
var usernamestyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
})
var username = new PIXI.Text("邱振豪",usernamestyle);
username.x = 20
username.y = 20
app.stage.addChild(username) //username来源是前端发送的内容


//排行榜
var style = new PIXI.TextStyle({
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#00ff99', // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
//冠军颜色
var style_first = new PIXI.TextStyle({
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '	#FFD700', // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440
});
//亚军颜色
var style_second = new PIXI.TextStyle({
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#C0C0C0', // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440
});
//季军颜色
var style_third = new PIXI.TextStyle({
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#B87333', // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440
});
//姓名和局数
var style_name = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ffffff', // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440
});

var rankname = new PIXI.Text('排行榜',style);
var first = new PIXI.Text('第一名',style_first);
var second = new PIXI.Text('第二名',style_second);
var third = new PIXI.Text('第三名',style_third);
var fourth = new PIXI.Text('第四名',style);
var fifth = new PIXI.Text('第五名',style);
var sixth = new PIXI.Text('第六名',style);
var serventh = new PIXI.Text('第七名',style);
var eighth = new PIXI.Text('第八名',style);
var nineth = new PIXI.Text('第九名',style);
var tenth = new PIXI.Text('第十名',style);

//测试样例
var x = new PIXI.Text('邱振豪',style_name);
var y = new PIXI.Text('500',style_name);
var xx = new PIXI.Text('邱豪',style_name);
var yy = new PIXI.Text('400',style_name);
var xxx = new PIXI.Text('振豪',style_name);
var yyy = new PIXI.Text('350',style_name);
var u = new PIXI.Text('邱振豪',style_name);
var z = new PIXI.Text('100',style_name);

//正式
var rank = new container();

rank.addChild(rankname);
rank.addChild(first);
rank.addChild(second);
rank.addChild(third);
rank.addChild(fourth);
rank.addChild(fifth);
rank.addChild(sixth);
rank.addChild(serventh);
rank.addChild(eighth);
rank.addChild(nineth);
rank.addChild(tenth);

rank.addChild(x);
rank.addChild(y);
rank.addChild(xx);
rank.addChild(yy);
rank.addChild(xxx);
rank.addChild(yyy);
rank.addChild(u);
rank.addChild(z);

app.stage.addChild(rank);
rank.x = 120,rank.y = 70;
rankname.x = 120,rank.y = 70;
first.x = 120,first.y = 30;
second.x = 0,second.y = 60;
third.x = 240,third.y = 60;
fourth.x = 0,fourth.y = 180;
fifth.x = 0,fifth.y = 230;
sixth.x = 0,sixth.y = 280;
serventh.x = 0,serventh.y = 330;
eighth.x = 0,eighth.y = 380;
nineth.x = 0,nineth.y = 430;
tenth.x = 0,tenth.y = 480;

//测试样例
y.x = 120,y.y = 60;
x.x = 120,x.y = 90;

yy.x = 0,yy.y = 90;
xx.x = 0,xx.y = 120;

yyy.x = 240,yyy.y = 90;
xxx.x = 240,xxx.y = 120;

u.x = 120,u.y = 180;
z.x = 240,z.y = 180;
//创建房间和加入房间

var roomname = new PIXI.TextInput({fontSize: '25pt'}, {fill: 0xEEEEEE});
roomname.x = 700;
roomname.y = 200;
roomname.placeholder = '请输入房间号....';
app.stage.addChild(roomname);
roomname.focus();


var roompassword = new PIXI.TextInput({fontSize: '25pt'}, {fill: 0xEEEEEE});
roompassword.x = 700;
roompassword.y = 300;
roompassword.placeholder = '请输入房间密码....';
app.stage.addChild(roompassword);
roompassword.focus();



var createroom = new PIXI.Text('创建房间',exitstyle)
createroom.interactive = true;
createroom.buttonMode = true;
app.stage.addChild(createroom);
createroom.x = 750;
createroom.y = 400;
var joinroom = new PIXI.Text('加入房间',exitstyle)
joinroom.interactive = true;
joinroom.buttonMode = true;
app.stage.addChild(joinroom);
joinroom.x = 950;
joinroom.y = 400;