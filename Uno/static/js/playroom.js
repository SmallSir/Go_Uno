//别名
var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

//功能牌
var wild = Sprite.fromImage('../static/img/Cartas/EspecialCard/x.png')
var wildraw = Sprite.fromImage('../static/img/Cartas/EspecialCard/j.jpg')
//背面
var back_card = Sprite.fromImage('../static/img/outras/uno_back.jpg')

//选色按钮(黄，红，绿，蓝) + 操作按钮(出牌，摸牌,+2,+4,uno)
var yellowbutton = Sprite.fromImage('../static/img/button/yellowbutton.png');
yellowbutton.interactive = true;
yellowbutton.buttonMode = true;

var redbutton = Sprite.fromImage('../static/img/button/redbutton.png');
redbutton.interactive = true;
redbutton.buttonMode = true;

var greenbutton = Sprite.fromImage('../static/img/button/greenbutton.png');
greenbutton.interactive = true;
greenbutton.buttonMode = true;

var bluebutton = Sprite.fromImage('../static/img/button/bluebutton.png');
bluebutton.interactive = true;
bluebutton.buttonMode = true;

var color_container = new container();
color_container.addChild(yellowbutton);
color_container.addChild(redbutton);
color_container.addChild(greenbutton);
color_container.addChild(bluebutton);

var outcard = Sprite.fromImage('../static/img/button/outcard.png');
outcard.interactive = true;
outcard.buttonMode = true;

var getcard = Sprite.fromImage('../static/img/button/getcard.png');
getcard.interactive = true;
getcard.buttonMode = true;

var uno = Sprite.fromImage('../static/img/button/uno.png');
uno.interactive = true;
uno.buttonMode = true;

var gettwo = Sprite.fromImage('../static/img/button/addtwo.png');
gettwo.interactive = true;
gettwo.buttonMode = true;

var getfour = Sprite.fromImage('../static/img/button/addfour.png');
getfour.interactive = true;
getfour.buttonMode = true;

//四副牌
var dong_container = new container();
var nan_container = new container();
var xi_container = new container();
var bei_container = new container();

//东南西北标记(东南西北 + 玩家名称)
var dong = new PIXI.Text('东');
var nan = new PIXI.Text('南');
var xi = new PIXI.Text('西');
var bei = new PIXI.Text('北');
//倒计时表(东南西北)


//中央出牌牌堆
var center_cards = new container();

//剩余牌数(东南西北)
var dong_number,nan_number,xi_number,bei_number;
var remaining_dong = new PIXI.Text('剩余牌数');
var remaining_xi = new PIXI.Text('剩余牌数');
var remaining_nan = new PIXI.Text('剩余牌数');
var remaining_bei = new PIXI.Text('剩余牌数');

//顺时针逆时针方向
var direction = 0;
var ssz = new Sprite.fromImage("../static/img/shunshizhen.png")
var nsz = new Sprite.fromImage("../static/img/nishizhen.png")

//功能牌效果展示(选色(红,黄,蓝,绿)，+2，+4，反向，停止，uno)
var select_green = new PIXI.Text('绿色');
var select_red = new PIXI.Text('红色');
var select_blue = new PIXI.Text('蓝色');
var select_yellow = new PIXI.Text('黄色');
var two_cards = new PIXI.Text('+2');
var four_cards = new PIXI.Text('+4');
var reverse = new PIXI.Text('转');
var skip = new PIXI.Text('禁');
var call_uno = new PIXI.Text('UNO');


var app = new PIXI.Application(1340, 625, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

app.stage.addChild(dong_container);
app.stage.addChild(xi_container);
app.stage.addChild(nan_container);
app.stage.addChild(bei_container);

app.stage.addChild(center_cards);
//玩家这个位置牌堆x500,y530,牌的大小0.4,y相等,x为18相距
//其他人的牌比例均是0.3,左手边x150，y200,x相等,y间距18,rotation1.57
//对面x800,y100,x相距18，y相等,比例0.3,rotation3.14
//右手边x1050,y300,rotation4.71，比例0.3,x相等，y相距18
//随机方向(Math.random()*(6-0) + 0).toFixed(3)
//东南西北标记 玩家x400,y500 左手边rotation1.57,x150,y100 对面rotation3.14,x900,y100
//右手边x1050 y300,rotation4.71

//按钮的位置400,400,选择x相距120
//效果展示位置在x600,y350
var basepath = '../static/img/Cartas/';
var bluepath = 'BlueCard/';
var redpath = 'RedCard/';
var greenpath = 'GreenCard/';
var yellowpath = 'YellowCard/';
var specialpath = 'EspecialCard/';
for(var i = 0;i < 3;i++)
{
    var one = new Sprite.fromImage(basepath + bluepath + '0.jpg')
    one.x = i*18;
    one.anchor.set(0.5);
    one.y = 0;
    one.scale.x = 0.4;
    one.scale.y = 0.4;
    one.interactive = true;
    one.buttonMode = true;
    dong_container.addChild(one);
}
dong_container.x = 500;
dong_container.y = 530;
dong.x = 400
dong.y = 500;
app.stage.addChild(dong);

for(var i = 0;i < 3;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = 0;
    one.anchor.set(0.5);
    one.y = i*18;
    one.scale.x = 0.3;
    one.scale.y = 0.3;
    one.rotation =1.57; //1.57
    xi_container.addChild(one);
}
xi_container.x = 150;
xi_container.y = 200;
xi.x = 150;
xi.y = 100;
xi.rotation = 1.57;
app.stage.addChild(xi);

for(var i = 0;i < 3;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*18;
    one.y = 0;
    one.anchor.set(0.5);
    one.scale.x = 0.3;
    one.scale.y = 0.3;
    one.rotation =3.14; //1.57
    nan_container.addChild(one);
}
nan_container.x = 800;
nan_container.y = 100;
nan.x = 900;
nan.y = 100;
nan.rotation = 3.14;
app.stage.addChild(nan);


for(var i = 0;i < 3;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = 0;
    one.y = i*18;
    one.anchor.set(0.5);
    one.scale.x = 0.3;
    one.scale.y = 0.3;
    one.rotation =4.71; //1.57
    bei_container.addChild(one);
}
bei_container.x = 1050;
bei_container.y = 300;
bei.x = 1050;
bei.y = 400;
bei.rotation = 4.71;
app.stage.addChild(bei);


for(var i = 0;i < 3;i++)
{
    var one = new Sprite.fromImage(basepath + bluepath + '0.jpg')
    one.x = 0;
    one.y = 0;
    one.anchor.set(0.5);
    one.scale.x = 0.4;
    one.scale.y = 0.4;
    one.rotation = (Math.random()*(6-0) + 0).toFixed(3);
    center_cards.addChild(one);
}
center_cards.x = 650;
center_cards.y = 250;

app.stage.addChild(color_container);
color_container.x = 400;
color_container.y = 400;
redbutton.x = 0,redbutton.y = 0;
greenbutton.x = 120,redbutton.y = 0;
yellowbutton.x  = 240,yellowbutton = 0;
bluebutton.x = 360,bluebutton.y = 0;


app.stage.addChild(select_red);
select_red.x = 600;
select_red.y = 350;

app.stage.addChild(ssz);
ssz.anchor.set(0.5);
ssz.x = 650;
ssz.y = 250;
ssz.scale.x = 2.3;
ssz.scale.y = 2.3;

