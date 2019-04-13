//别名
var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

//统计用户点击牌数目
var card_num = false;
//选中卡牌信息
var cs_color,cs_state,sc_number;

//鼠标与纸牌的交互
function cardout(){
    this.y = this.y + 20;
}
function cardover(){
    this.y = this.y - 20;
}
function cardclick(){
    if(my_dir == "nan")
        var x = nan_container.getChildIndex(this);
    else if(my_dir == "dong")
        var x = dong_container.getChildIndex(this);
    else if(my_dir == "bei")
        var x = bei_container.getChildIndex(this);
    else
        var x = xi_container.getChildIndex(this);
    if(card_num == false)
    {
        this.y = this.y - 20;
        card_num = true;
        if(my_dir == "dong")
        {
            dongcards[x].sc = true;
            sc_color = dongcards[x].color;
            sc_number = dongcards[x].number;
            sc_state = dongcards[x].state;
        }
        else if(my_dir == "xi")
        {
            xicards[x].sc = true;
            sc_number = xicards[x].number;
            sc_color = xicards[x].color;
            sc_state = xicards[x].state;
        }
        else if(my_dir == "nan")
        {
            nancards[x].sc = true;
            sc_number = nancards[x].number;
            sc_color = nancards[x].color;
            sc_state = nancards[x].state;
        }
        else
        {
            beicards[x].sc = true;
            sc_number = beicards[x].number;
            sc_color = beicards[x].color;
            sc_state = beicards[x].state;
        }    
    }
    else
    {
        if(my_dir == "dong")
        {
            if(dongcards[x].sc == true)
            {
                this.y = this.y + 20;
                card_num = false;
                dongcards[x].sc = false;
            }
            else
                alert("不能选多张牌");
        }
        else if(my_dir == "xi")
        {
            if(xicards[x].sc == true)
            {
                this.y = this.y + 20;
                card_num = false;
                xicards[x].sc = false;
            }
            else
                alert("不能选多张牌");
        }
        else if(my_dir == "nan")
        {
            if(nancards[x].sc == true)
            {
                this.y = this.y + 20;
                card_num = false;
                nancards[x].sc = false;
            }
            else
                alert("不能选多张牌");
        }
        else
        {
            if(beicards[x].sc == true)
            {
                this.y = this.y + 20;
                card_num = false;
                beicards[x].sc = false;
            }
            else
                alert("不能选多张牌");
        }
    }
}

//功能牌
var wild = Sprite.fromImage('../static/img/Cartas/EspecialCard/x.png')
var wildraw = Sprite.fromImage('../static/img/Cartas/EspecialCard/j.jpg')
//背面
var back_card = Sprite.fromImage('../static/img/outras/uno_back.jpg')

//按钮中文字style
var buttonstyle = {
    fontSize: '20px',
}

var yellowbutton,yellowbutton_text,redbutton,redbutton_text,greenbutton,greenbutton_text,bluebutton,bluebutton_text; //选色按钮
//选色按钮(黄，红，绿，蓝) + 操作按钮(准备,取消准备,出牌，摸牌,+2,+4,uno)
function yellowclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:2,sccolor:"yellow",position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
yellowbutton = new graphics();
yellowbutton.beginFill(0xFFAA01, 1);
yellowbutton.interactive = true;
yellowbutton.buttonMode = true;
yellowbutton_text = new PIXI.Text("黄色",buttonstyle);
yellowbutton_text.interactive = true;
yellowbutton_text.buttonMode = true;
yellowbutton.on('pointertap',yellowclick);
yellowbutton_text.on('pointertap',yellowclick);

function redclick(){
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:2,sccolor:"red",position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
redbutton = new graphics();
redbutton.beginFill(0xFF5555,1);
redbutton.interactive = true;
redbutton.buttonMode = true;
redbutton_text = new PIXI.Text("红色",buttonstyle);
redbutton_text.interactive = true;
redbutton_text.buttonMode = true;
redbutton.on('pointertap',redclick);
redbutton_text.on('pointertap',redclick);

function greenclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:2,sccolor:"green",position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
greenbutton = new graphics();
greenbutton.beginFill(0x55AA55,1);
greenbutton.interactive = true;
greenbutton.buttonMode = true;
greenbutton_text = new PIXI.Text("绿色",buttonstyle);
greenbutton_text.interactive = true;
greenbutton_text.buttonMode = true;
greenbutton.on('pointertap',greenclick);
greenbutton_text.on('pointertap',greenclick);

function blueclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:2,sccolor:"blue",position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
bluebutton = new graphics();
bluebutton.beginFill(0x5455FF,1);
bluebutton.interactive = true;
bluebutton.buttonMode = true;
bluebutton_text = new PIXI.Text("蓝色",buttonstyle);
bluebutton_text.interactive = true;
bluebutton_text.buttonMode = true;
bluebutton.on('pointertap',blueclick);
bluebutton_text.on('pointertap',blueclick);

var color_container = new container();
color_container.addChild(yellowbutton);
color_container.addChild(yellowbutton_text);
color_container.addChild(redbutton);
color_container.addChild(redbutton_text);
color_container.addChild(greenbutton);
color_container.addChild(greenbutton_text);
color_container.addChild(bluebutton);
color_container.addChild(bluebutton_text);

color_container.x = 400;
color_container.y = 430;
redbutton.drawRoundedRect(0, 0, 80, 35, 15);
redbutton_text.x = 20,redbutton_text.y = 5;
greenbutton.drawRoundedRect(120,0,80,35,15);
greenbutton_text.x = 140,greenbutton_text.y = 5;
yellowbutton.drawRoundedRect(240,0,80,35,15);
yellowbutton_text.x = 260,yellowbutton_text.y = 5;
bluebutton.drawRoundedRect(360,0,80,35,15);
bluebutton_text.x = 380,bluebutton_text.y = 5;

//准备按钮
function readyclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:1,ready:true,position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
var ready_people = new graphics();
ready_people.beginFill(0xc0c0c0,1);
ready_people.interactive = true;
ready_people.buttonMode = true;
ready_people.drawRoundedRect(600,430,80,35,15);
var ready_people_text = new PIXI.Text("准备",buttonstyle);
ready_people_text.interactive = true;
ready_people_text.buttonMode = true;
ready_people_text.x = 620,ready_people_text.y = 435;
ready_people.on('pointertap',readyclick);
ready_people_text.on('pointertap',readyclick);

//不准备按钮
function unreadyclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:1,ready:false,position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
var unready_people = new graphics();
unready_people.beginFill(0xc0c0c0,1);
unready_people.interactive = true;
unready_people.buttonMode = true;
unready_people.drawRoundedRect(600,430,80,35,15);
var unready_people_text = new PIXI.Text("取消准备",buttonstyle);
unready_people_text.interactive = true;
unready_people_text.buttonMode = true;
unready_people_text.x = 600,unready_people_text.y = 435;
unready_people.on('pointertap',unreadyclick);
unready_people_text.on('pointertap',unreadyclick);

//出牌按钮
function outcardclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:0,position:x,ccolor:cs_color,cnumber:sc_number,cstate:sc_state};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
var outcard = new graphics();
outcard.beginFill(0xc0c0c0,1);
outcard.interactive = true;
outcard.buttonMode = true;
var outcard_text = new PIXI.Text("出牌",buttonstyle);
outcard_text.interactive = true;
outcard_text.buttonMode = true;
outcard.drawRoundedRect(500,430,80,35,15);
outcard_text.x = 520,outcard_text.y = 435;
outcard.on('pointertap',outcardclick);
outcard_text.on('pointertap',outcardclick);

//摸牌按钮
function getcardclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:4,position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
var getcard = new graphics();
getcard.beginFill(0xc0c0c0,1);
getcard.interactive = true;
getcard.buttonMode = true;
var getcard_text = new PIXI.Text("摸牌",buttonstyle);
getcard_text.interactive = true;
getcard_text.buttonMode = true;
getcard.drawRoundedRect(650,430,80,35,15);
getcard_text.x = 670,getcard_text.y = 435;
getcard.on('pointertap',getcardclick);
getcard_text.on('pointertap',getcardclick);

//喊UNO按钮
function unoclick()
{
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:3,position:x};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
}
var uno = new graphics();
uno.beginFill(0xc0c0c0,1);
uno.interactive = true;
uno.buttonMode = true;
uno.drawRoundedRect(600,430,80,35,15);
var uno_text = new PIXI.Text("UNO",buttonstyle);
uno_text.interactive = true;
uno_text.buttonMode = true;
uno_text.x = 620,uno_text.y = 435;
uno.on('pointertap',unoclick);
uno_text.on('pointertap',unoclick);

//四副牌
var dong_container = new container();
var dongcards = [];
var nan_container = new container();
var nancards = [];
var xi_container = new container();
var xicards = [];
var bei_container = new container();
var beicards = [];

//东南西北标记(东南西北 + 玩家名称)
var dongmark = new PIXI.Text('东');
var nanmark = new PIXI.Text('南');
var ximark = new PIXI.Text('西');
var beimark = new PIXI.Text('北');

//中央出牌牌堆
var center_cards = new container();
center_cards.x = 650,center_cards.y = 300;
//剩余牌数(东南西北)
var dong_number,nan_number,xi_number,bei_number;
var remaining_dong = new PIXI.Text('剩余牌数');
var remaining_xi = new PIXI.Text('剩余牌数');
var remaining_nan = new PIXI.Text('剩余牌数');
var remaining_bei = new PIXI.Text('剩余牌数');

//玩家名称和id
var dong_id,xi_id,nan_id,bei_id;
var dong_name,xi_name,nan_name,bei_name;
var my_dir;//玩家所处的位置

//玩家退出标识
var dong_exit = new PIXI.Text("已离开");
var xi_exit = new PIXI.Text("已离开");
var nan_exit = new PIXI.Text("已离开");
var bei_exit = new PIXI.Text("已离开");

//顺时针逆时针方向
var direction = 0;
var ssz = new Sprite.fromImage("../static/img/shunshizhen.png")
ssz.anchor.set(0.5);
ssz.anchor.set(0.5);
ssz.x = 650;
ssz.y = 300;
ssz.scale.x = 2.3;
ssz.scale.y = 2.3;

var nsz = new Sprite.fromImage("../static/img/nishizhen.png")
nsz.anchor.set(0.5);
nsz.x = 650;
nsz.y = 300;
nsz.scale.x = 2.3;
nsz.scale.y = 2.3;

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
var ready_dong  = new PIXI.Text('准备');
var ready_nan  = new PIXI.Text('准备');
var ready_xi  = new PIXI.Text('准备');
var ready_bei  = new PIXI.Text('准备');
var exit_dong = new PIXI.Text("离开");
var exit_nan = new PIXI.Text("离开");
var exit_xi = new PIXI.Text("离开");
var exit_bei = new PIXI.Text("离开");

var app = new PIXI.Application(document.documentElement.clientWidth,document.documentElement.clientHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

app.stage.addChild(center_cards);
//玩家这个位置牌堆x500,y530,牌的大小0.4,y相等,x为18相距
//其他人的牌比例均是0.3,左手边x150，y200,x相等,y间距18,rotation1.57
//对面x800,y100,x相距18，y相等,比例0.3,rotation3.14
//右手边x1050,y300,rotation4.71，比例0.3,x相等，y相距18
//随机方向(Math.random()*(6-0) + 0).toFixed(3)
//东南西北标记 玩家x400,y500 左手边rotation1.57,x150,y100 对面rotation3.14,x900,y100
//右手边x1050 y300,rotation4.71

//效果展示位置在x600,y350

//牌数展示 自己x500,y580 对面x900y50rotation3.14 左手x100y200rotation1.57 右手x1150y400rotation4.71

//东南西北四个对象
var dong = new container();
dong.addChild(dong_container);
dong.addChild(dongmark);
dong.addChild(remaining_dong);
dong_number = new PIXI.Text("8");
dong_name = new PIXI.Text("测试1");
dong.addChild(dong_number);
dong.addChild(dong_name);
dong.addChild(dong_exit);

var xi = new container();
xi.addChild(xi_container);
xi.addChild(ximark);
xi.addChild(remaining_xi);
xi_name = new PIXI.Text("测试2");
xi_number = new PIXI.Text("10");
xi.addChild(xi_number);
xi.addChild(xi_name);
xi.addChild(xi_exit);

var nan = new container();
nan.addChild(nan_container);
nan.addChild(nanmark);
nan.addChild(remaining_nan);
nan_number = new PIXI.Text("20");
nan_name = new PIXI.Text("WhaleFall");
nan.addChild(nan_number);
nan.addChild(nan_name);
nan.addChild(nan_exit);

var bei = new container();
bei.addChild(bei_container);
bei.addChild(beimark);
bei.addChild(remaining_bei);
bei_number = new PIXI.Text("15");
bei_name = new PIXI.Text("吃葡萄不吐葡萄皮");
bei.addChild(bei_number);
bei.addChild(bei_name);
bei.addChild(bei_exit);

//倒计时效果
//比赛倒计时
function bsdjs(){
    var clock = '';
    var nums = 10;
    var countdown1,countdown2;
    var flag = -1;
    clock = setInterval(doLoop, 1000);
    function doLoop(){
        nums--;
        if(nums >  0){
            var x = nums + ""
            if(flag != 0)
            {
                if(flag == -1)
                {
                    flag = 0;
                }
                else
                {
                    flag = 1 - flag;
                    app.stage.removeChild(countdown2);
                }
                countdown1 = new PIXI.Text(x);
                app.stage.addChild(countdown1);
                countdown1.x = 900;
                countdown1.y = 400;
            }
            else{
                flag = 1 - flag;
                app.stage.removeChild(countdown1);
                countdown2 = new PIXI.Text(x);
                app.stage.addChild(countdown2);
                countdown2.x = 900;
                countdown2.y = 400;
            }
        } else{
            clearInterval(clock)
            if(flag != 0)
            {
                app.stage.removeChild(countdown2);
            }
            else
            {
                app.stage.removeChild(countdown1);
            }
            flag = -1;
            nums = 10;//重置时间
            /*
            默认选择摸牌操作
            */
        }
    }
}

//比赛结束后的榜单
var xs_one,gr_one,xs_two,gr_two,xs_three,gr_three,xs_four,gr_four;
var rank = new container()
var rank_name = new PIXI.Text("排名")
var rank_xs = new PIXI.Text("玩家")
var rank_gr = new PIXI.Text("分数")
var name_one = new PIXI.Text("第一")
gr_one = new PIXI.Text("获胜")
var name_two = new PIXI.Text("第二")
var name_three = new PIXI.Text("第三")
var name_four = new PIXI.Text("第四")

function frank(){
    rank.addChild(rank_name);
    rank.addChild(rank_xs);
    rank_xs.x = 200,rank_xs.y = 0;
    rank.addChild(rank_gr);
    rank_gr.x = 400,rank_gr.y = 0;

    rank.addChild(name_one)
    name_one.x = 0,name_one.y = 50;
    rank.addChild(xs_one)
    xs_one.x = 200,xs_one.y = 50;
    rank.addChild(gr_one)
    gr_one.x = 400,gr_one.y = 50;

    rank.addChild(name_two)
    name_two.x = 0,name_two.y = 100;
    rank.addChild(xs_two)
    xs_two.x = 200,xs_two.y = 100;
    rank.addChild(gr_two)
    gr_two.x = 400,gr_two.y = 100;

    rank.addChild(name_three)
    name_three.x = 0,name_three.y = 150;
    rank.addChild(xs_three)
    xs_three.x = 200,xs_three.y = 150;
    rank.addChild(gr_three)
    gr_three.x = 400,gr_three.y = 150;

    rank.addChild(name_four)
    name_four.x = 0,name_four.y = 200;
    rank.addChild(xs_four)
    xs_four.x = 200,xs_four.y = 200;
    rank.addChild(gr_four)
    gr_four.x = 400,gr_four.y = 200;

    //移除内容
    dong_container.removeChildren();
    xi_container.removeChildren();
    nan_container.removeChildren();
    bei_container.removeChildren();
    center_cards.removeChildren();
    if(direction == 0)
    {
        app.stage.removeChild(ssz);
    } else{
        app.stage.removeChild(nsz);
    }
    dong.removeChild(dong_container);
    dong.removeChild(dong_number);
    nan.removeChild(nan_container);
    nan.removeChild(nan_number);
    xi.removeChild(xi_container);
    xi.removeChild(xi_number);
    bei.removeChild(bei_container);
    bei.removeChild(bei_number);
    app.stage.removeChild(center_cards);

    app.stage.addChild(rank)
    rank.x = 400,rank.y = 100;
}
//榜单倒计时
function bddjs(){
    var clock = '';
    var nums = 5;
    clock = setInterval(doLoop,1000);
    function doLoop(){
        nums--;
        if(nums <= 0){
            clearInterval(clock);
            nums = 10;
            app.stage.removeChild(rank)
            app.stage.addChild(ready_people);
            app.stage.addChild(ready_people_text);
            ready_people.drawRoundedRect(600,400,80,35,15);
            ready_people_text.x = 620,ready_people_text.y = 405;
        }
    }
} 

var basepath = '../static/img/Cartas/';
var bluepath = 'BlueCard/';
var redpath = 'RedCard/';
var greenpath = 'GreenCard/';
var yellowpath = 'YellowCard/';
var specialpath = 'EspecialCard/';
my_dir = "dong";
for(var i = 0;i < 15;i++)
{
    var one = new Sprite.fromImage(basepath + bluepath + '0.jpg')
    one.x = i*18;
    one.anchor.set(0.5);
    one.y = 0;
    one.scale.x = 0.4;
    one.scale.y = 0.4;
    one.interactive = true;
    one.buttonMode = true;
    card = {color : "blue",number : "0", state : "-1",sc : false};
    dongcards.push(card);
    one.on('pointerover',cardover);
    one.on('pointerout',cardout);
    one.on('pointertap',cardclick);
    dong_container.addChild(one);
}
dong_container.x = 100;
dong_container.y = 80;
dongmark.x = 0;
dongmark.y = 80;
remaining_dong.x = 0;
remaining_dong.y = 150;
dong_number.x = 120;
dong_number.y = 150;
dong_name.x = 180;
dong_name.y = 150;
dong.x = 400
dong.y = 500;
app.stage.addChild(dong);

for(var i = 0;i < 8;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*35;
    one.anchor.set(0.5);
    one.y = 0;
    xi_container.addChild(one);
}
xi_container.scale.x = 0.3,xi_container.scale.y = 0.3;
xi_container.x = 100,xi_container.y = -50;
ximark.x = 0,ximark.y = -100;
remaining_xi.x = 0,remaining_xi.y = 50;
xi_number.x = 120,xi_number.y = 50;
xi_name.x = 180,xi_name.y = 50
xi.x = 150;
xi.y = 150;
xi.rotation = 1.57;
app.stage.addChild(xi);

for(var i = 0;i < 50;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*35;
    one.y = 0;
    one.anchor.set(0.5);
    nan_container.addChild(one);
}
nan_container.scale.x = 0.3,nan_container.scale.y = 0.3;
nan_container.x = 50,nan_container.y = -50;
nanmark.x = -50,nanmark.y = -50;
remaining_nan.x = -50,remaining_nan.y = 50;
nan_number.x = 70,nan_number.y = 50;
nan_name.x = 130,nan_name.y = 50;
nan.x = 900;
nan.y = 100;
nan.rotation = 3.14;
app.stage.addChild(nan);


for(var i = 0;i < 20;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*35;
    one.y = 0;
    one.anchor.set(0.5);
    bei_container.addChild(one);
}
bei_container.scale.x = 0.3,bei_container.scale.y = 0.3;
bei_container.x = 0,bei_container.y = 100;
beimark.x = -100,beimark.y = 50;
remaining_bei.x = -100,remaining_bei.y = 150;
bei_number.x = 20,bei_number.y = 150;
bei_name.x = 80,bei_name.y = 150;
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

app.stage.addChild(select_red);
select_red.x = 600;
select_red.y = 400;

app.stage.addChild(ssz);
app.stage.addChild(color_container);

//创建webscoket
socket = new WebSocket('ws://' + window.location.host + '/ws/join?uname=' + $('#uname').text());//websocket的内容需要修改
socket.onmessage = function(event){
    var data = JSON.parse(event.data);
    data.Type
    switch(data.Type){
    case 0: //加入
        if(data.host == true)
        {
            if(data.position == 0)//表示东
            {
                my_dir = "dong";
                dong_id = data.playerid;

                dong.x = 400,dong.y = 500;
                remaining_dong.x = 0,remaining_dong.y = 150;
                dongmark.x = 0,dongmark.y = 80;
                dong_container.x = 100,dong_container.y = 80;

                ximark.x = -50,ximark.y = -50;
                xi_container.x = 50,xi_container.y = -50;
                remaining_xi.x = -50,remaining_xi.y = 50;
                xi.x = 900,xi.y = 100;

                nan.x = 150,nan.y = 150;
                nanmark.x = 0,nanmark.y = -100;
                nan_container.x = 100,nan_container.y = -50;
                remaining_nan.x = 0,remaining_nan.y = 50;

                beimark.x = -100,beimark.y = 50;
                bei_container.x = 0,bei_container.y = 100;
                remaining_bei.x = -100,remaining_bei.y = 150;
                bei.x = 1050,bei.y = 400;
            }
            else if(data.position == 1)//表示北
            {
                my_dir = "bei";
                bei_id = data.playerid;

                beimark.x = 0,beimark.y = 80;
                bei_container.x = 100,bei_container.y = 80;
                remaining_bei.x = 0,remaining_bei.y = 150;
                bei.x = 400,bei.y = 500;

                nanmark.x = -50,nanmark.y = -50;
                nan_container.x = 50,nan_container.y = -50;
                remaining_nan.x = -50,remaining_nan.y = 50;
                nan.x = 900,nan.y = 100;

                dongmark.x = 0,dongmark.y = -100;
                dong_container.x = 100,dong_container.y = -50;
                remaining_dong.x = 0,remaining_dong.y = 50;
                dong.x = 150,dong.y = 150;

                ximark.x = -100,ximark.y = 50;
                xi_container.x = 0,xi_container.y = 100;
                remaining_xi.x = -100,remaining_xi.y = 150;
                xi.x = 1050,xi.y = 400;
            }
            else if(data.position == 2)//表示西
            {
                my_dir = "xi";
                xi_id = data.playerid;

                ximark.x = 0,ximark.y = 80;
                xi_container.x = 100,xi_container.y = 80;
                remaining_xi.x = 0,remaining_xi.y = 150;
                xi.x = 400,xi.y = 500;

                dongmark.x = -50,dongmark.y = -50;
                dong_container.x = 50,dong_container.y = -50;
                remaining_dong.x = -50,remaining_dong.y = 50;
                dong.x = 900,dong.y = 100;

                nanmark.x = 0,nanmark.y = -100;
                nan_container.x = 100,nan_container.y = -50;
                remaining_nan.x = 0,remaining_nan.y = 50;
                nan.x = 150,nan.y = 150;

                beimark.x = -100,beimark.y = 50;
                bei_container.x = 0,bei_container.y = 100;
                remaining_bei.x = -100,remaining_bei.y = 150;
                bei.x = 1050,bei.y = 400;
            }
            else//表示南
            {
                my_dir = "nan";
                nan_id = data.playerid;

                nanmark.x = 0,nanmark.y = 80;
                nan_container.x = 100,nan_container.y = 80;
                remaining_nan.x = 0,remaining_nan.y = 150;
                nan.x = 400,nan.y = 500;

                beimark.x = -50,beimark.y = -50;
                bei_container.x = 50,bei_container.y = -50;
                remaining_bei.x = -50,remaining_bei.y = 50;
                bei.x = 900,bei.y = 100;

                ximark.x = 0,ximark.y = -100;
                xi_container.x = 100,xi_container.y = -50;
                remaining_xi.x = 0,remaining_xi.y = 50;
                xi.x = 150,xi.y = 150;

                dongmark.x = -100,dongmark.y = 50;
                dong_container.x = 0,dong_container.y = 100;
                remaining_dong.x = -100,remaining_dong.y = 150;
                dong.x = 1050,dong.y = 400;
            }
        }
        else
        {
            if(data.position == 0)//表示东
            {
                dong_id = data.playerid;
                dong_name = new PIXI.Text(data.playername);
                dong.addChild(dong_name);
                if(my_dir == "dong")
                {
                    dong_name.x = 180,dong_name.y = 150;
                } 
                else if(my_dir == "xi")
                {
                    dong_name.x = 130,dong_name.y = 50;
                } 
                else if(my_dir == "nan")
                {
                    dong_name.x = 80,dong_name.y = 150;
                }
                else
                {
                    dong_name.x = 180,dong_name.y = 50;
                }
            }
            else if(data.position == 1)//表示北
            {
                bei_id = data.playerid;
                bei_name = new PIXI.Text(data.playername);
                bei.addChild(bei_name);
                if(my_dir == "dong")
                {
                    bei_name.x = 80,bei_name.y = 150;
                } 
                else if(my_dir == "xi")
                {
                    bei_name.x = 180,bei_name.y = 50;
                } 
                else if(my_dir == "nan")
                {
                    bei_name.x = 130,bei_name.y = 50;
                }
                else
                {
                    bei_name.x = 180,bei_name.y = 150;
                }
            }
            else if(data.position == 2)//表示西
            {
                xi_id = data.playerid;
                xi_name = new PIXI.Text(data.playername);
                xi.addChild(xi_name);
                if(my_dir == "dong")
                {
                    xi_name.x = 130,xi_name.y = 50;
                } 
                else if(my_dir == "xi")
                {
                    xi_name.x = 180,xi_name.y = 150;
                } 
                else if(my_dir == "nan")
                {
                    xi_name.x = 180,xi_name.y = 50;
                }
                else
                {
                    xi_name.x = 80,xi_name.y = 150;
                }
            }
            else //表示南
            {
                nan_id = nan.playerid;
                nan_name = new PIXI.Text(data.playername);
                nan.addChild(nan_name);
                if(my_dir == "dong")
                {
                    nan_name.x = 180,nan_name.y = 50;
                } 
                else if(my_dir == "xi")
                {
                    nan_name.x = 80,xi_name.y = 150;
                } 
                else if(my_dir == "nan")
                {
                    nan_name.x = 180,nan_name.y = 150;
                }
                else
                {
                    nan_name.x = 130,nan_name.y = 50;
                }
            }
        }
        break;
    case 1: //离开
        if(data.state == true)
        {
            if(data.position == 0)
            {
                dong.addChild(dong_exit);
            }
            else if(data.position == 1)
            {
                bei.addChild(bei_exit);
            }
            else if(data.position == 2)
            {
                xi.addChild(xi_exit);
            }
            else
            {
                nan.addChild(nan_exit);
            }
        }
        else
        {
            if(data.position == 0)
            {
                dong.removeChild(dong_name);
            }
            else if(data.position == 1)
            {
                bei.removeChild(bei_name);
            }
            else if(data.position == 2)
            {
                xi.removeChild(xi_name);
            }
            else
            {
                nan.removeChild(nan_name);
            }
        }
        break;
    case 2: //准备与取消准备
        if(data.playerid == nan_id)
        {
            if(data.ready == false)
            {
                if(my_dir != "nan")
                {
                    app.stage.removeChild(ready_nan);
                }
                else
                {
                    app.stage.removeChild(ready_nan);
                    app.stage.removeChild(unready_people);
                    app.stage.removeChild(unready_people_text);
                    app.stage.addChild(ready_people);
                    app.stage.addChild(ready_people_text);
                }
            }
            else
            {
                if(my_dir != "nan")
                {
                    app.stage.addChild(ready_nan);
                    if(my_dir == "bei")
                    {
                        ready_nan.x = 600,ready_nan.y = 150;
                    }
                    else if(my_dir == "xi")
                    {
                        ready_nan.x = 300,ready_nan.y = 300;
                    }
                    else
                    {
                        ready_nan.x = 900,ready_nan.y = 300;
                    }
                }
                else
                {
                    app.stage.addChild(ready_nan);
                    ready_nan.x = 600,ready_nan.y = 350;
                    app.stage.addChild(unready_people);
                    app.stage.addChild(unready_people_text);
                    app.stage.removeChild(ready_people);
                    app.stage.removeChild(ready_people_text);
                }
            }
        }
        else if(data.playerid == bei_id)
        {
            if(data.ready == false)
            {
                if(my_dir != "bei")
                {
                    app.stage.removeChild(ready_bei);
                }
                else
                {
                    app.stage.removeChild(ready_bei);
                    app.stage.removeChild(unready_people);
                    app.stage.removeChild(unready_people_text);
                    app.stage.addChild(ready_people);
                    app.stage.addChild(ready_people_text);
                }
            }
            else
            {
                if(my_dir != "bei")
                {
                    app.stage.addChild(ready_bei);
                    if(my_dir == "nan")
                    {
                        ready_bei.x = 600,ready_bei.y = 150;
                    }
                    else if(my_dir == "dong")
                    {
                        ready_bei.x = 300,ready_bei.y = 300;
                    }
                    else
                    {
                        ready_bei.x = 900,ready_bei.y = 300;
                    }
                }
                else
                {
                    app.stage.addChild(ready_bei);
                    ready_bei.x = 600,ready_bei.y = 350;
                    app.stage.addChild(unready_people);
                    app.stage.addChild(unready_people_text);
                    app.stage.removeChild(ready_people);
                    app.stage.removeChild(ready_people_text);
                }
            }
        }
        else if(data.playerid == xi_id)
        {
            if(data.ready == false)
            {
                if(my_dir != "xi")
                {
                    app.stage.removeChild(ready_xi);
                }
                else
                {
                    app.stage.removeChild(ready_xi);
                    app.stage.removeChild(unready_people);
                    app.stage.removeChild(unready_people_text);
                    app.stage.addChild(ready_people);
                    app.stage.addChild(ready_people_text);
                }
            }
            else
            {
                if(my_dir != "xi")
                {
                    app.stage.addChild(ready_xi);
                    if(my_dir == "dong")
                    {
                        ready_xi.x = 600,ready_xi.y = 150;
                    }
                    else if(my_dir == "bei")
                    {
                        ready_xi.x = 300,ready_xi.y = 300;
                    }
                    else
                    {
                        ready_xi.x = 900,ready_xi.y = 300;
                    }
                }
                else
                {
                    app.stage.addChild(ready_xi);
                    ready_xi.x = 600,ready_xi.y = 350;
                    app.stage.addChild(unready_people);
                    app.stage.addChild(unready_people_text);
                    app.stage.removeChild(ready_people);
                    app.stage.removeChild(ready_people_text);
                }
            }
        }
        else{
            if(data.ready == false)
            {
                if(my_dir != "dong")
                {
                    app.stage.removeChild(ready_dong);
                }
                else
                {
                    app.stage.removeChild(ready_dong);
                    app.stage.removeChild(unready_people);
                    app.stage.removeChild(unready_people_text);
                    app.stage.addChild(ready_people);
                    app.stage.addChild(ready_people_text);
                }
            }
            else
            {
                if(my_dir != "dong")
                {
                    app.stage.addChild(ready_dong);
                    if(my_dir == "xi")
                    {
                        ready_dong.x = 600,ready_dong.y = 150;
                    }
                    else if(my_dir == "nan")
                    {
                        ready_dong.x = 300,ready_dong.y = 300;
                    }
                    else
                    {
                        ready_dong.x = 900,ready_dong.y = 300;
                    }
                }
                else
                {
                    app.stage.addChild(ready_dong);
                    ready_dong.x = 600,ready_dong.y = 350;
                    app.stage.addChild(unready_people);
                    app.stage.addChild(unready_people_text);
                    app.stage.removeChild(ready_people);
                    app.stage.removeChild(ready_people_text);
                }
            }
        }
        break;
    case 3: //榜单信息
        xs_one = new PIXI.Text(data.xs_one);
        xs_two = new PIXI.Text(data.xs_two);
        gr_two = new PIXI.Text(data.gr_two);
        xs_three = new PIXI.Text(data.xs_three);
        gr_three = new PIXI.Text(data.gr_three);
        xs_four = new PIXI.Text(data.xs_four);
        gr_four = new PIXI.Text(data.gr_four);
        frank();
        bddjs();
        break;
    case 4: //比赛信息
        break;
    }
}
