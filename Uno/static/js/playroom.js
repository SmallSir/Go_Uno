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

//按钮中文字style
var buttonstyle = {
    fontSize: '20px',
}

var yellowbutton,yellowbutton_text,redbutton,redbutton_text,greenbutton,greenbutton_text,bluebutton,bluebutton_text; //选色按钮
//选色按钮(黄，红，绿，蓝) + 操作按钮(准备,取消准备,出牌，摸牌,+2,+4,uno)
yellowbutton = new graphics();
yellowbutton.beginFill(0xFFAA01, 1);
yellowbutton.interactive = true;
yellowbutton.buttonMode = true;
yellowbutton_text = new PIXI.Text("黄色",buttonstyle);
yellowbutton_text.interactive = true;
yellowbutton_text.buttonMode = true;

redbutton = new graphics();
redbutton.beginFill(0xFF5555,1);
redbutton.interactive = true;
redbutton.buttonMode = true;
redbutton_text = new PIXI.Text("红色",buttonstyle);
redbutton_text.interactive = true;
redbutton_text.buttonMode = true;

greenbutton = new graphics();
greenbutton.beginFill(0x55AA55,1);
greenbutton.interactive = true;
greenbutton.buttonMode = true;
greenbutton_text = new PIXI.Text("绿色",buttonstyle);
greenbutton_text.interactive = true;
greenbutton_text.buttonMode = true;

bluebutton = new graphics();
bluebutton.beginFill(0x5455FF,1);
bluebutton.interactive = true;
bluebutton.buttonMode = true;
bluebutton_text = new PIXI.Text("蓝色",buttonstyle);
bluebutton_text.interactive = true;
bluebutton_text.buttonMode = true;

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
var ready_people = new graphics();
ready_people.beginFill(0xc0c0c0,1);
ready_people.interactive = true;
ready_people.buttonMode = true;
ready_people.drawRoundedRect(600,430,80,35,15);
var ready_people_text = new PIXI.Text("准备",buttonstyle);
ready_people_text.interactive = true;
ready_people_text.buttonMode = true;
ready_people_text.x = 620,ready_people_text.y = 435;

//不准备按钮
var unready_people = new graphics();
unready_people.beginFill(0xc0c0c0,1);
unready_people.interactive = true;
unready_people.buttonMode = true;
unready_people.drawRoundedRect(600,430,80,35,15);
var unready_people_text = new PIXI.Text("取消准备",buttonstyle);
unready_people_text.interactive = true;
unready_people_text.buttonMode = true;
unready_people_text.x = 600,unready_people_text.y = 435;

//出牌按钮
var outcard = new graphics();
outcard.beginFill(0xc0c0c0,1);
outcard.interactive = true;
outcard.buttonMode = true;
var outcard_text = new PIXI.Text("出牌",buttonstyle);
outcard_text.interactive = true;
outcard_text.buttonMode = true;
outcard.drawRoundedRect(500,430,80,35,15);
outcard_text.x = 520,outcard_text.y = 435;

//摸牌按钮
var getcard = new graphics();
getcard.beginFill(0xc0c0c0,1);
getcard.interactive = true;
getcard.buttonMode = true;
var getcard_text = new PIXI.Text("摸牌",buttonstyle);
getcard_text.interactive = true;
getcard_text.buttonMode = true;
getcard.drawRoundedRect(650,430,80,35,15);
getcard_text.x = 670,getcard_text.y = 435;

//喊UNO按钮
var uno = new graphics();
uno.beginFill(0xc0c0c0,1);
uno.interactive = true;
uno.buttonMode = true;
uno.drawRoundedRect(600,430,80,35,15);
var uno_text = new PIXI.Text("UNO",buttonstyle);
uno_text.interactive = true;
uno_text.buttonMode = true;
uno_text.x = 620,uno_text.y = 435;
/*
//+2按钮
var gettwo = new graphics();
gettwo.beginFill(0xc0c0c0,1);
gettwo.interactive = true;
gettwo.buttonMode = true;
var gettwo_text = new PIXI.Text("+2",buttonstyle);
gettwo_text.interactive = true;
gettwo_text.buttonMode = true;

//+4按钮
var getfour = new graphics();
getfour.beginFill(0xc0c0c0,1);
getfour.interactive = true;
getfour.buttonMode = true;
var getfour_text = new PIXI.Text("+4",buttonstyle);
getfour_text.interactive = true;
getfour_text.buttonMode = true;*/

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

var app = new PIXI.Application(document.documentElement.clientWidth,document.documentElement.clientHeight, {backgroundColor : 0x1099bb});
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

//效果展示位置在x600,y350

//牌数展示 自己x500,y580 对面x900y50rotation3.14 左手x100y200rotation1.57 右手x1150y400rotation4.71

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
    app.stage.removeChild(dong_container);
    app.stage.removeChild(xi_container);
    app.stage.removeChild(nan_container);
    app.stage.removeChild(bei_container);
    app.stage.removeChild(center_cards);
    app.stage.removeChild(dong_number);
    app.stage.removeChild(xi_number);
    app.stage.removeChild(nan_number);
    app.stage.removeChild(bei_number);

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




app.stage.addChild(select_red);
select_red.x = 600;
select_red.y = 400;

app.stage.addChild(ssz);


app.stage.addChild(remaining_dong)
remaining_dong.x = 500;
remaining_dong.y = 580;

app.stage.addChild(remaining_xi)
remaining_xi.x = 100;
remaining_xi.y = 200;
remaining_xi.rotation = 1.57;

app.stage.addChild(remaining_nan)
remaining_nan.x = 900;
remaining_nan.y = 50;
remaining_nan.rotation = 3.14;

app.stage.addChild(remaining_bei)
remaining_bei.x = 1150;
remaining_bei.y = 400;
remaining_bei.rotation = 4.71;

app.stage.addChild(ready_nan);
ready_nan.x = 900,ready_nan.y = 300;
//创建webscoket
socket = new WebSocket('ws://' + window.location.host + '/ws/join?uname=' + $('#uname').text());//websocket的内容需要修改
socket.onmessage = function(event){
    var data = JSON.parse(event.data);
    data.Type
    switch(data.Type){
    case 0: //加入
        break;
    case 1: //离开
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
