//别名
var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

//统计用户点击牌数目
var card_num = false;
var inde = -1;
//选中卡牌信息
var sc_color,sc_state,sc_number;
//位置对应
var ps = ["dong","bei","xi","nan"];
//检查卡牌点击情况
function check()
{
    card_num = false;
    if(inde == -1)
        return;
    if(my_dir == "dong")
    {
        var one = dong_container.getChildAt(inde);
        one.y = one.y + 20;
    }
    else if(my_dir == "xi")
    {
        var one = xi_container.getChildAt(inde);
        one.y = one.y + 20;
    }
    else if(my_dir == "nan")
    {
        var one = nan_container.getChildAt(inde);
        one.y = one.y + 20;
    }
    else
    {
        var one = bei_container.getChildAt(inde);
        one.y = one.y + 20;
    }
    inde = -1;
}


//鼠标与纸牌的交互
function cardout(){ //鼠标移除
    this.y = this.y + 20;
}
function cardover(){ //鼠标经过
    this.y = this.y - 20;
}
function cardclick(){ //鼠标点击
    if(my_dir == "nan")
        inde = nan_container.getChildIndex(this);
    else if(my_dir == "dong")
        inde = dong_container.getChildIndex(this);
    else if(my_dir == "bei")
        inde = bei_container.getChildIndex(this);
    else
        inde = xi_container.getChildIndex(this);
    var x = inde;
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
var wild = Sprite.fromImage('/static/img/Cartas/EspecialCard/x.png')
var wildraw = Sprite.fromImage('/static/img/Cartas/EspecialCard/j.jpg')
//背面
var back_card = Sprite.fromImage('/static/img/outras/uno_back.jpg')

//按钮中文字style
var buttonstyle = {
    fontSize: '20px',
}

var yellowbutton,yellowbutton_text,redbutton,redbutton_text,greenbutton,greenbutton_text,bluebutton,bluebutton_text; //选色按钮
//选色按钮(黄，红，绿，蓝) + 操作按钮(准备,取消准备,出牌，摸牌,+2,+4,uno)
function yellowclick()
{
    app.stage.removeChild(color_container);
    bsnums = -10;
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
    check();
}
yellowbutton = new graphics();
yellowbutton.beginFill(0xFFAA01, 1);
yellowbutton.interactive = true;
yellowbutton.buttonMode = true;
yellowbutton_text = new PIXI.Text("黄色",buttonstyle);
yellowbutton_text.interactive = true;
yellowbutton_text.buttonMode = true;
//yellowbutton.on('pointertap',yellowclick);
yellowbutton_text.on('pointertap',yellowclick);

function redclick(){
    app.stage.removeChild(color_container);
    bsnums = -10;
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
    check();
}
redbutton = new graphics();
redbutton.beginFill(0xFF5555,1);
redbutton.interactive = true;
redbutton.buttonMode = true;
redbutton_text = new PIXI.Text("红色",buttonstyle);
redbutton_text.interactive = true;
redbutton_text.buttonMode = true;
//redbutton.on('pointertap',redclick);
redbutton_text.on('pointertap',redclick);

function greenclick()
{
    app.stage.removeChild(color_container);
    bsnums = -10;
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
    check();
}
greenbutton = new graphics();
greenbutton.beginFill(0x55AA55,1);
greenbutton.interactive = true;
greenbutton.buttonMode = true;
greenbutton_text = new PIXI.Text("绿色",buttonstyle);
greenbutton_text.interactive = true;
greenbutton_text.buttonMode = true;
//greenbutton.on('pointertap',greenclick);
greenbutton_text.on('pointertap',greenclick);

function blueclick()
{
    app.stage.removeChild(color_container);
    bsnums = -10;
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
    check();
}
bluebutton = new graphics();
bluebutton.beginFill(0x5455FF,1);
bluebutton.interactive = true;
bluebutton.buttonMode = true;
bluebutton_text = new PIXI.Text("蓝色",buttonstyle);
bluebutton_text.interactive = true;
bluebutton_text.buttonMode = true;
//bluebutton.on('pointertap',blueclick);
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

//准备人数
var ready_number = 0;
//准备按钮
function readyclick()
{
    app.stage.removeChild(ready_people);
    app.stage.removeChild(ready_people_text);
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
//ready_people.on('pointertap',readyclick);
ready_people_text.on('pointertap',readyclick);

//不准备按钮
function unreadyclick()
{
    app.stage.removeChild(unready_people);
    app.stage.removeChild(unready_people_text);
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
//unready_people.on('pointertap',unreadyclick);
unready_people_text.on('pointertap',unreadyclick);

//出牌按钮
function outcardclick()
{
    app.stage.removeChild(outcard);
    app.stage.removeChild(outcard_text);
    app.stage.removeChild(getcard);
    app.stage.removeChild(getcard_text);
    bsnums = -10;
    if(my_dir == "dong")
        var x = 0;
    else if(my_dir == "bei")
        var x = 1;
    else if(my_dir == "xi")
        var x = 2;
    else
        var x = 3;
    var msg = {type:0,position:x,ccolor:sc_color,cnumber:sc_number,cstate:sc_state};
    var msgjson = JSON.stringify(msg);
    socket.send(msgjson);
    check();
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
//outcard.on('pointertap',outcardclick);
outcard_text.on('pointertap',outcardclick);

//摸牌按钮
function getcardclick()
{
    app.stage.removeChild(outcard);
    app.stage.removeChild(outcard_text);
    app.stage.removeChild(getcard);
    app.stage.removeChild(getcard_text);
    bsnums = -10;
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
    check();
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
//getcard.on('pointertap',getcardclick);
getcard_text.on('pointertap',getcardclick);

//喊UNO按钮
function unoclick()
{
    app.stage.removeChild(uno);
    app.stage.removeChild(uno_text);
    bsnums = -10;
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
    check();
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
//uno.on('pointertap',unoclick);
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
dong_id = -1,xi_id = -1,nan_id = -1,bei_id = -1
var dong_name,xi_name,nan_name,bei_name;
var my_dir;//玩家所处的位置

//玩家退出标识
var dong_exit = new PIXI.Text("已离开");
var xi_exit = new PIXI.Text("已离开");
var nan_exit = new PIXI.Text("已离开");
var bei_exit = new PIXI.Text("已离开");

//顺时针逆时针方向
var direction = 0;
var ssz = new Sprite.fromImage("/static/img/shunshizhen.png")
ssz.anchor.set(0.5);
ssz.anchor.set(0.5);
ssz.x = 650;
ssz.y = 300;
ssz.scale.x = 2.3;
ssz.scale.y = 2.3;

var nsz = new Sprite.fromImage("/static/img/nishizhen.png")
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

//默认初始状态即生成一个画布，和一个出牌的牌堆
var app = new PIXI.Application(document.documentElement.clientWidth,document.documentElement.clientHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

app.stage.addChild(center_cards);

//东南西北四个对象
var dong = new container();
dong.addChild(dong_container);
dong.addChild(dongmark);
dong.addChild(remaining_dong);

/*测试样例
dong_number = new PIXI.Text("4");
dong_name = new PIXI.Text("测试1");
dong.addChild(dong_number);
dong.addChild(dong_name);
*/

var xi = new container();
xi.addChild(xi_container);
xi.addChild(ximark);
xi.addChild(remaining_xi);

/*测试样例
xi_name = new PIXI.Text("测试2");
xi_number = new PIXI.Text("10");
xi.addChild(xi_number);
xi.addChild(xi_name);
*/

var nan = new container();
nan.addChild(nan_container);
nan.addChild(nanmark);
nan.addChild(remaining_nan);

/*测试样例
nan_number = new PIXI.Text("10");
nan_name = new PIXI.Text("WhaleFall");
nan.addChild(nan_number);
nan.addChild(nan_name);
*/

var bei = new container();
bei.addChild(bei_container);
bei.addChild(beimark);
bei.addChild(remaining_bei);

/*测试样例
bei_number = new PIXI.Text("15");
bei_name = new PIXI.Text("吃葡萄不吐葡萄皮");
bei.addChild(bei_number);
bei.addChild(bei_name);
*/

//倒计时效果
//比赛倒计时
var bsnums;
function bsdjs(k){
    var clock = '';
    bsnums = 15;
    var countdown1,countdown2;
    var flag = -1;
    clock = setInterval(doLoop, 1000);
    function doLoop(){
        bsnums--;
        if(bsnums >  0){
            var x = bsnums + ""
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
        } 
        else{
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
            if(bsnums == 0)
            {
                if(k == 0)
                    blueclick();
                if(k == 1)
                    getcardclick();
                if(k == -1)
                    unoclick();
            }
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

    dong.removeChild(dong_exit);
    xi.removeChild(xi_exit);
    nan.removeChild(nan_exit);
    bei.removeChild(bei_exit);

    ready_number = 0;
    if(direction == 0)
        app.stage.removeChild(ssz);
    else
        app.stage.removeChild(nsz);
    dong.removeChild(dong_number);
    nan.removeChild(nan_number);
    xi.removeChild(xi_number);
    bei.removeChild(bei_number);

    app.stage.addChild(rank)
    rank.x = 400,rank.y = 100;
}

//出牌、点击按钮效果倒计时
function xgdjs(x){
    var clock = '';
    var nums = 2;
    clock = setInterval(doLoop,1000);
    function doLoop(){
        nums--;
        if(nums <= 0){
            clearInterval(clock);
            nums = 2;
            if(x == 11)
                app.stage.removeChild(select_green);
            else if(x == 12)
                app.stage.removeChild(select_blue);
            else if(x == 13)
                app.stage.removeChild(select_red);
            else if(x == 14)
                app.stage.removeChild(select_yellow);
            else if(x == 21)
                app.stage.removeChild(two_cards);
            else if(x == 22)
                app.stage.removeChild(four_cards);
            else if(x == 3)
                app.stage.removeChild(reverse);
            else if(x == 4)
                app.stage.removeChild(skip);
            else if(x == 0)
                app.stage.removeChild(call_uno);
        }
    }
} 

//榜单倒计时
function bddjs(){
    var clock = '';
    var nums = 8;
    clock = setInterval(doLoop,1000);
    function doLoop(){
        nums--;
        if(nums <= 0){
            clearInterval(clock);
            nums = 8;
            app.stage.removeChild(rank);
            rank.removeChild(xs_one);
            rank.removeChild(gr_one);
            rank.removeChild(xs_two);
            rank.removeChild(gr_two);
            rank.removeChild(xs_three);
            rank.removeChild(gr_three);
            rank.removeChild(xs_four);
            rank.removeChild(gr_four);

            app.stage.addChild(ready_people);
            app.stage.addChild(ready_people_text)
            ready_number = 0;
        }
    }
} 

var basepath = '/static/img/Cartas/';
var bluepath = 'BlueCard/';
var redpath = 'RedCard/';
var greenpath = 'GreenCard/';
var yellowpath = 'YellowCard/';
var specialpath = 'EspecialCard/';
var unobackpath = '/static/img/outras/uno_back.jpg';
var my_dir;

//添加牌进入牌堆
function addcard(base,color,s,flag,x)
{
    var one = new Sprite.fromImage(base+color+s);
    if(flag == "center")
    {
        one.x = 0,one.y = 0;
        one.anchor.set(0.5);
        one.scale.x = 0.4;
        one.scale.y = 0.4;
        one.rotation = (Math.random()*(6-0) + 0).toFixed(3);
        center_cards.addChild(one);
    }
    else
    {
        one.x = x*35;
        one.anchor.set(0.5);
        one.y = 0;
        one.interactive = true;
        one.buttonMode = true;
        one.on('pointerover',cardover);
        one.on('pointerout',cardout);
        one.on('pointertap',cardclick);
        if(flag == "dong")
            dong_container.addChild(one);
        else if(flag == "bei")
            bei_container.addChild(one);
        else if(flag == "nan")
            nan_container.addChild(one);
        else
            xi_container.addChild(one);
    }
}

//实现确定牌的内容
function cardsmsg(color,state,number,flag,i){
    if(color == "blue")//是蓝牌
    {
        if(number == "0")
            addcard(basepath,bluepath,'0.jpg',flag,i);
        else if(number == "1")
            addcard(basepath,bluepath,'1.jpg',flag,i);
        else if(number == "2")
            addcard(basepath,bluepath,'2.jpg',flag,i);
        else if(number == "3")
            addcard(basepath,bluepath,'3.jpg',flag,i);
        else if(number == "4")
            addcard(basepath,bluepath,'4.jpg',flag,i);
        else if(number == "5")
            addcard(basepath,bluepath,'5.jpg',flag,i);
        else if(number == "6")
            addcard(basepath,bluepath,'6.jpg',flag,i);
        else if(number == "7")
            addcard(basepath,bluepath,'7.jpg',flag,i);
        else if(number == "8")
            addcard(basepath,bluepath,'8.jpg',flag,i);
        else if(number == "9")
            addcard(basepath,bluepath,'9.jpg',flag,i);
        else if(state == "skip")
            addcard(basepath,bluepath,'t.jpg',flag,i);
        else if(state == "reverse")
            addcard(basepath,bluepath,'z.jpg',flag,i);
        else if(state == "raw")
            addcard(basepath,bluepath,'j.jpg',flag,i);
    }
    else if(color == "red")//是红牌
    {
        if(number == "0")
            addcard(basepath,redpath,'0.png',flag,i);
        else if(number == "1")
            addcard(basepath,redpath,'1.png',flag,i);
        else if(number == "2")
            addcard(basepath,redpath,'2.png',flag,i);
        else if(number == "3")
            addcard(basepath,redpath,'3.png',flag,i);
        else if(number == "4")
            addcard(basepath,redpath,'4.png',flag,i);
        else if(number == "5")
            addcard(basepath,redpath,'5.png',flag,i);
        else if(number == "6")
            addcard(basepath,redpath,'6.png',flag,i);
        else if(number == "7")
            addcard(basepath,redpath,'7.png',flag,i);
        else if(number == "8")
            addcard(basepath,redpath,'8.png',flag,i);
        else if(number == "9")
            addcard(basepath,redpath,'9.png',flag,i);
        else if(state == "skip")
            addcard(basepath,redpath,'t.png',flag,i);
        else if(state == "reverse")
            addcard(basepath,redpath,'z.png',flag,i);
        else if(state == "raw")
            addcard(basepath,redpath,'j.png',flag,i);
    }
    else if(color == "green")//是绿牌
    {
        if(number == "0")
            addcard(basepath,greenpath,'0.jpg',flag,i);
        else if(number == "1")
            addcard(basepath,greenpath,'1.jpg',flag,i);
        else if(number == "2")
            addcard(basepath,greenpath,'2.jpg',flag,i);
        else if(number == "3")
            addcard(basepath,greenpath,'3.jpg',flag,i);
        else if(number == "4")
            addcard(basepath,greenpath,'4.jpg',flag,i);
        else if(number == "5")
            addcard(basepath,greenpath,'5.jpg',flag,i);
        else if(number == "6")
            addcard(basepath,greenpath,'6.jpg',flag,i);
        else if(number == "7")
            addcard(basepath,greenpath,'7.jpg',flag,i);
        else if(number == "8")
            addcard(basepath,greenpath,'8.jpg',flag,i);
        else if(number == "9")
            addcard(basepath,greenpath,'9.jpg',flag,i);
        else if(state == "skip")
            addcard(basepath,greenpath,'t.jpg',flag,i);
        else if(state == "reverse")
            addcard(basepath,greenpath,'z.jpg',flag,i);
        else if(state == "raw")
            addcard(basepath,greenpath,'j.jpg',flag,i);
    }
    else if(color == "yellow")//是黄牌
    {
        if(number == "0")
            addcard(basepath,yellowpath,'0.jpg',flag,i);
        else if(number == "1")
            addcard(basepath,yellowpath,'1.jpg',flag,i);
        else if(number == "2")
            addcard(basepath,yellowpath,'2.jpg',flag,i);
        else if(number == "3")
            addcard(basepath,yellowpath,'3.jpg',flag,i);
        else if(number == "4")
            addcard(basepath,yellowpath,'4.jpg',flag,i);
        else if(number == "5")
            addcard(basepath,yellowpath,'5.jpg',flag,i);
        else if(number == "6")
            addcard(basepath,yellowpath,'6.jpg',flag,i);
        else if(number == "7")
            addcard(basepath,yellowpath,'7.jpg',flag,i);
        else if(number == "8")
            addcard(basepath,yellowpath,'8.jpg',flag,i);
        else if(number == "9")
            addcard(basepath,yellowpath,'9.jpg',flag,i);
        else if(state == "skip")
            addcard(basepath,yellowpath,'t.jpg',flag,i);
        else if(state == "reverse")
            addcard(basepath,yellowpath,'z.jpg',flag,i);
        else if(state == "raw")
            addcard(basepath,yellowpath,'j.jpg',flag,i);
    }
    else//是功能牌
    {
        if(state == "wild")
            addcard(basepath,specialpath,'x.png',flag,i);
        else
            addcard(basepath,specialpath,'j.jpg',flag,i);
    }
}

/*测试样例
addcard(basepath,yellowpath,'0.jpg',"dong",0);
card = {color : "blue",number : "0", state : "-1",sc : false};
dongcards.push(card);
addcard(basepath,yellowpath,'7.jpg',"dong",1);
card = {color : "blue",number : "0", state : "-1",sc : false};
dongcards.push(card);
addcard(basepath,greenpath,'4.jpg',"dong",2);
card = {color : "blue",number : "0", state : "-1",sc : false};
dongcards.push(card);
addcard(basepath,greenpath,'2.jpg',"dong",3);
card = {color : "blue",number : "0", state : "-1",sc : false};
dongcards.push(card);
dong_container.scale.x = 0.4,dong_container.scale.y = 0.4;
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
*/

/*测试样例
for(var i = 0;i < 10;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*35;
    one.anchor.set(0.5);
    one.y = 0;
    nan_container.addChild(one);
}
nan_container.scale.x = 0.3,nan_container.scale.y = 0.3;
nan_container.x = 100,nan_container.y = -50;
nanmark.x = 0,nanmark.y = -100;
remaining_nan.x = 0,remaining_nan.y = 50;
nan_number.x = 120,nan_number.y = 50;
nan_name.x = 180,nan_name.y = 50
nan.x = 150;
nan.y = 150;
nan.rotation = 1.57;
app.stage.addChild(nan);
*/

/*测试样例
for(var i = 0;i < 10;i++)
{
    var one = new Sprite.fromImage('../static/img/outras/uno_back.jpg')
    one.x = i*35;
    one.y = 0;
    one.anchor.set(0.5);
    xi_container.addChild(one);
}
xi_container.scale.x = 0.3,xi_container.scale.y = 0.3;
xi_container.x = 50,xi_container.y = -50;
ximark.x = -50,ximark.y = -50;
remaining_xi.x = -50,remaining_xi.y = 50;
xi_number.x = 70,xi_number.y = 50;
xi_name.x = 130,xi_name.y = 50;
xi.x = 900;
xi.y = 100;
xi.rotation = 3.14;
app.stage.addChild(xi);
*/

/*测试样例
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
*/

/*测试样例
for(var i = 0;i < 1;i++)
{
    addcard(basepath,bluepath,'0.jpg',"center");
    addcard(basepath,bluepath,'1.jpg',"center");
    addcard(basepath,redpath,'1.jpg',"center");
    addcard(basepath,greenpath,'5.jpg',"center");
    addcard(basepath,yellowpath,'9.jpg',"center");
}
*/

/*
app.stage.addChild(ssz);
app.stage.addChild(color_container);
*/

function checkready()//检查是否所有用户均准备
{
    if(ready_number == 4)
    {
        app.stage.removeChild(ready_bei);
        app.stage.removeChild(ready_nan);
        app.stage.removeChild(ready_dong);
        app.stage.removeChild(ready_xi);

        app.stage.removeChild(ready_people);
        app.stage.removeChild(ready_people_text);

        app.stage.removeChild(unready_people);
        app.stage.removeChild(unready_people_text);
    }
}

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
var exit_room = new PIXI.Text("离开房间",exitstyle)
exit_room.interactive = true;
exit_room.buttonMode = true;
exit_room.on('pointertap',leave);
app.stage.addChild(exit_room);
exit_room.x = 1300,exit_room.y = 0;
//离开房间
function leave(){
    $.ajax({
        type:'post',
        url: '/leave',
        contentType: "application/json",
        dataType: "json",
        success:function(ret){
                window.location = ret.url;
        },
        error:function(ret){
            alert("退出失败");
        }
    }) 
}

//创建webscoket
socket = new WebSocket('ws://' + window.location.host + '/uno');//websocket的内容需要修改
socket.onmessage = function(event){
    var data = JSON.parse(event.data);
    switch(data.Type){
    case 0: //加入
        if(data.host == true) //是玩家自己加入房间，则通过确认玩家的位置将其他几个玩家的位置确定
        {
            if(data.position == 0)//表示东
            {
                my_dir = "dong";
                dong_id = data.playerid;
                dong_name = new PIXI.Text(data.playername);
                dong.addChild(dong_name);
                dong_name.x = 180,dong_name.y = 150;

                dong.x = 400,dong.y = 500;
                remaining_dong.x = 0,remaining_dong.y = 150;
                dongmark.x = 0,dongmark.y = 80;
                dong_container.x = 100,dong_container.y = 80;
                dong_container.scale.x = 0.4,dong_container.scale.y = 0.4;

                ximark.x = -50,ximark.y = -50;
                xi_container.x = 50,xi_container.y = -50;
                remaining_xi.x = -50,remaining_xi.y = 50;
                xi.x = 900,xi.y = 100;
                xi_container.scale.x = 0.3,xi_container.scale.y = 0.3;
                xi.rotation = 3.14;

                nan.x = 150,nan.y = 150;
                nanmark.x = 0,nanmark.y = -100;
                nan_container.x = 100,nan_container.y = -50;
                remaining_nan.x = 0,remaining_nan.y = 50;
                nan_container.scale.x = 0.3,nan_container.scale.y = 0.3;
                nan.rotation = 1.57

                beimark.x = -100,beimark.y = 50;
                bei_container.x = 0,bei_container.y = 100;
                remaining_bei.x = -100,remaining_bei.y = 150;
                bei.x = 1050,bei.y = 400;
                bei_container.scale.x = 0.3,bei_container.scale.y = 0.3;
                bei.rotation = 4.71;
            }
            else if(data.position == 1)//表示北
            {
                my_dir = "bei";
                bei_id = data.playerid;
                bei_name = new PIXI.Text(data.playername);
                bei.addChild(bei_name);
                bei_name.x = 180,bei_name.y = 150;

                beimark.x = 0,beimark.y = 80;
                bei_container.x = 100,bei_container.y = 80;
                remaining_bei.x = 0,remaining_bei.y = 150;
                bei.x = 400,bei.y = 500;
                bei_container.scale.x = 0.4,bei_container.scale.y = 0.4;

                nanmark.x = -50,nanmark.y = -50;
                nan_container.x = 50,nan_container.y = -50;
                remaining_nan.x = -50,remaining_nan.y = 50;
                nan.x = 900,nan.y = 100;
                nan_container.scale.x = 0.3,nan_container.scale.y = 0.3;
                nan.rotation = 3.14;

                dongmark.x = 0,dongmark.y = -100;
                dong_container.x = 100,dong_container.y = -50;
                remaining_dong.x = 0,remaining_dong.y = 50;
                dong.x = 150,dong.y = 150;
                dong_container.scale.x = 0.3,dong_container.scale.y = 0.3;
                dong.rotation = 1.57

                ximark.x = -100,ximark.y = 50;
                xi_container.x = 0,xi_container.y = 100;
                remaining_xi.x = -100,remaining_xi.y = 150;
                xi.x = 1050,xi.y = 400;
                xi_container.scale.x = 0.3,xi_container.scale.y = 0.3;
                xi.rotation = 4.71;
            }
            else if(data.position == 2)//表示西
            {
                my_dir = "xi";
                xi_id = data.playerid;
                xi_name = new PIXI.Text(data.playername);
                xi.addChild(xi_name);
                xi_name.x = 180,xi_name.y = 150;

                ximark.x = 0,ximark.y = 80;
                xi_container.x = 100,xi_container.y = 80;
                remaining_xi.x = 0,remaining_xi.y = 150;
                xi.x = 400,xi.y = 500;
                xi_container.scale.x = 0.4,xi_container.scale.y = 0.4;

                dongmark.x = -50,dongmark.y = -50;
                dong_container.x = 50,dong_container.y = -50;
                remaining_dong.x = -50,remaining_dong.y = 50;
                dong.x = 900,dong.y = 100;
                dong_container.scale.x = 0.3,dong_container.scale.y = 0.3;
                dong.rotation = 3.14;

                beimark.x = 0,beimark.y = -100
                bei_container.x = 100,bei_container.y = -50;
                remaining_bei.x = 0,remaining_bei.y = 50;
                bei.x = 150,bei.y = 150;
                bei_container.scale.x = 0.3,bei_container.scale.y = 0.3;
                bei.rotation = 1.57;

                nanmark.x = -100,nanmark.y = 50;
                nan_container.x = 0,nan_container.y = 100;
                remaining_nan.x = -100,remaining_nan.y = 150;
                nan.x = 1050,nan.y = 400;
                nan_container.scale.x = 0.3,nan_container.scale.y = 0.3;
                nan.rotation = 4.71;
            }
            else//表示南
            {
                my_dir = "nan";
                nan_id = data.playerid;
                nan_name = new PIXI.Text(data.playername);
                nan.addChild(nan_name);
                nan_name.x = 180,nan_name.y = 150;

                nanmark.x = 0,nanmark.y = 80;
                nan_container.x = 100,nan_container.y = 80;
                remaining_nan.x = 0,remaining_nan.y = 150;
                nan.x = 400,nan.y = 500;
                nan_container.scale.x = 0.4,nan_container.scale.y = 0.4;

                beimark.x = -50,beimark.y = -50;
                bei_container.x = 50,bei_container.y = -50;
                remaining_bei.x = -50,remaining_bei.y = 50;
                bei.x = 900,bei.y = 100;
                bei_container.scale.x = 0.3,bei_container.scale.y = 0.3;
                bei.rotation = 3.14;

                ximark.x = 0,ximark.y = -100;
                xi_container.x = 100,xi_container.y = -50;
                remaining_xi.x = 0,remaining_xi.y = 50;
                xi.x = 150,xi.y = 150;
                xi_container.scale.x = 0.3,xi_container.scale.y = 0.3;
                xi.rotation = 1.57;

                dongmark.x = -100,dongmark.y = 50;
                dong_container.x = 0,dong_container.y = 100;
                remaining_dong.x = -100,remaining_dong.y = 150;
                dong.x = 1050,dong.y = 400;
                dong_container.scale.x = 0.3,dong_container.scale.y = 0.3;
                dong.rotation = 4.71;
            }
            if(data.state == false) //非游戏中加入房间需要出现准备按钮
            {
                app.stage.addChild(ready_people);
                app.stage.addChild(ready_people_text);
            } 
            else {
                direction = data.direction
                if(data.direction == 0)
                    app.stage.addChild(ssz);
                else
                    app.stage.addChild(nsz);
                //添加玩家的牌信息
                if(data.position == 0)
                {
                    dong.removeChild(dong_number);
                    dong_number = new PIXI.Text(data.number);
                    dong_number.x = 120,dong_number.y = 150;
                    dong.addChild(dong_number);
                    dongcards = [];
                    dong_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        dongcards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"dong",i);
                    }
                }
                else if(data.position == 1)
                {
                    bei.removeChild(bei_number);
                    bei_number = new PIXI.Text(data.number);
                    bei_number.x = 120,bei_number.y = 150;
                    bei.addChild(bei_number);
                    beicards = [];
                    bei_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        beicards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"bei",i);
                    }
                }
                else if(data.position == 2)
                {
                    xi.removeChild(xi_number);
                    xi_number = new PIXI.Text(data.number);
                    xi_number.x = 120,xi_number.y = 150;
                    xi.addChild(xi_number);
                    xicards = [];
                    xi_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        xicards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"xi",i);
                    }
                }
                else
                {
                    nan.removeChild(nan_number);
                    nan_number = new PIXI.Text(data.number);
                    nan_number.x = 120,nan_number.y = 150;
                    nan.addChild(nan_number);
                    nancards = [];
                    nan_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        nancards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"nan",i);
                    }
                }
            }
            app.stage.addChild(dong);
            app.stage.addChild(xi);
            app.stage.addChild(nan);
            app.stage.addChild(bei);
        }
        else //如果是其他玩家加入房间
        {
            if(data.position == 0)//表示东
            {
                dong_id = data.playerid;
                dong_name = new PIXI.Text(data.playername);
                dong.addChild(dong_name);
                if(data.ready == true)
                {
                    app.stage.addChild(ready_dong)
                    if(my_dir == "dong")
                        ready_dong.x = 600,ready_dong.y = 350
                    if(my_dir == "xi")
                        ready_dong.x = 600,ready_dong.y = 150
                    if(my_dir == "nan")
                        ready_dong.x = 900,ready_dong.y = 300
                    if(my_dir == "bei")
                        ready_dong.x = 300,ready_dong.y = 300
                }
                if(my_dir == "dong")
                    dong_name.x = 180,dong_name.y = 150;
                else if(my_dir == "xi")
                    dong_name.x = 130,dong_name.y = 50;
                else if(my_dir == "nan")
                    dong_name.x = 80,dong_name.y = 150;
                else
                    dong_name.x = 180,dong_name.y = 50;
            }
            else if(data.position == 1)//表示北
            {
                bei_id = data.playerid;
                bei_name = new PIXI.Text(data.playername);
                bei.addChild(bei_name);
                if(data.ready == true)
                {
                    app.stage.addChild(ready_bei)
                    if(my_dir == "bei")
                        ready_bei.x = 600,ready_bei.y = 350
                    if(my_dir == "nan")
                        ready_bei.x = 600,ready_bei.y = 150
                    if(my_dir == "dong")
                        ready_bei.x = 900,ready_bei.y = 300
                    if(my_dir == "xi")
                        ready_bei.x = 300,ready_bei.y = 300
                }
                if(my_dir == "dong")
                    bei_name.x = 80,bei_name.y = 150;
                else if(my_dir == "xi")
                    bei_name.x = 180,bei_name.y = 50;
                else if(my_dir == "nan")
                    bei_name.x = 130,bei_name.y = 50;
                else
                    bei_name.x = 180,bei_name.y = 150;
            }
            else if(data.position == 2)//表示西
            {
                xi_id = data.playerid;
                xi_name = new PIXI.Text(data.playername);
                xi.addChild(xi_name);
                if(data.ready == true)
                {
                    app.stage.addChild(ready_xi)
                    if(my_dir == "xi")
                        ready_xi.x = 600,ready_xi.y = 350
                    if(my_dir == "dong")
                        ready_xi.x = 600,ready_xi.y = 150
                    if(my_dir == "bei")
                        ready_xi.x = 900,ready_xi.y = 300
                    if(my_dir == "nan")
                        ready_xi.x = 300,ready_xi.y = 300
                }
                if(my_dir == "dong")
                    xi_name.x = 130,xi_name.y = 50;
                else if(my_dir == "xi")
                    xi_name.x = 180,xi_name.y = 150;
                else if(my_dir == "nan")
                    xi_name.x = 180,xi_name.y = 50;
                else
                    xi_name.x = 80,xi_name.y = 150;
            }
            else //表示南
            {
                nan_id = data.playerid;
                nan_name = new PIXI.Text(data.playername);
                nan.addChild(nan_name);
                if(data.ready == true)
                {
                    app.stage.addChild(ready_nan)
                    if(my_dir == "nan")
                        ready_nan.x = 600,ready_nan.y = 350
                    if(my_dir == "bei")
                        ready_nan.x = 600,ready_nan.y = 150
                    if(my_dir == "xi")
                        ready_nan.x = 900,ready_nan.y = 300
                    if(my_dir == "dong")
                        ready_nan.x = 300,ready_nan.y = 300
                }
                if(my_dir == "dong")
                    nan_name.x = 180,nan_name.y = 50;
                else if(my_dir == "xi")
                    nan_name.x = 80,xi_name.y = 150;
                else if(my_dir == "nan")
                    nan_name.x = 180,nan_name.y = 150;
                else
                    nan_name.x = 130,nan_name.y = 50;
            }
            if(data.state == true)
            {
                if(data.position == 0)
                    dong.removeChild(dong_exit);
                else if(data.position == 1)
                    bei.removeChild(bei_exit);
                else if(data.position == 2)
                    xi.removeChild(xi_exit);
                else
                    nan.removeChild(nan_exit);
                if(my_dir == data.re)
                {
                    if(my_dir == "dong")
                    {
                        dong.removeChild(dong_number);
                        dong_number = new PIXI.Text(data.number);
                        dong_number.x = 120,dong_number.y = 150;
                        dong.addChild(dong_number);
                        dongcards = [];
                        dong_container.removeChildren();
                        for(var i = 0;i < data.cards.length;i++)
                        {
                            card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                            dongcards.push(card);
                                cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"dong",i);
                        }
                    }         
                    else if(my_dir == "nan")
                    {
                        nan.removeChild(nan_number);
                        nan_number = new PIXI.Text(data.number);
                        nan_number.x = 120,nan_number.y = 150;
                        nan.addChild(nan_number);
                        nancards = [];
                        nan_container.removeChildren();
                        for(var i = 0;i < data.cards.length;i++)
                        {
                            card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                            nancards.push(card);
                            cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"nan",i);
                        }
                    }
                    else if(my_dir == "bei")
                    {
                        bei.removeChild(bei_number);
                        bei_number = new PIXI.Text(data.number);
                        bei_number.x = 120,bei_number.y = 150;
                        bei.addChild(bei_number);
                        beicards = [];
                        bei_container.removeChildren();
                        for(var i = 0;i < data.cards.length;i++)
                        {
                            card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                            beicards.push(card);
                            cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"bei",i);
                        }
                    }
                    else 
                    {
                        xi.removeChild(xi_number);
                        xi_number = new PIXI.Text(data.number);
                        xi_number.x = 120,xi_number.y = 150;
                        xi.addChild(xi_number);
                        xicards = [];
                        xi_container.removeChildren();
                        for(var i = 0;i < data.cards.length;i++)
                        {
                            card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                            xicards.push(card);
                            cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"xi",i);
                        }
                    }
                }
                if(data.re != ps[data.position])
                {
                    if(data.position == 0)
                    {
                        dong.removeChild(dong_number);
                        dong_number = new PIXI.Text(data.number);
                        dong.addChild(dong_number);
                        dong_container.removeChildren();
                    }
                    else if(data.position == 1)
                    {
                        bei.removeChild(bei_number);
                        bei_number = new PIXI.Text(data.number);
                        bei.addChild(bei_number);
                        bei_container.removeChildren();
                    }
                    else if(data.position == 2)
                    {
                        xi.removeChild(xi_number)
                        xi_number = new PIXI.Text(data.number);
                        xi.addChild(xi_number);
                        xi_container.removeChildren();
                    }
                    else
                    {   
                        nan.removeChild(nan_number); 
                        nan_number = new PIXI.Text(data.number);
                        nan.addChild(nan_number);
                        nan_container.removeChildren();
                    }
                    //确定摆放位置
                    if(my_dir == "dong")
                    {
                        if(data.position == 0)
                            dong_number.x = 120,dong_number.y = 150;
                        else if(data.position == 1)
                            bei_number.x = 20,bei_number.y = 150;
                        else if(data.position == 2)
                            xi_number.x = 70,xi_number.y = 50;
                        else
                            nan_number.x = 120,nan_number.y = 50;
                    }
                    else if(my_dir == "xi")
                    {
                        if(data.position == 0)
                            dong_number.x = 70,dong_number.y = 50;
                        else if(data.position == 1)
                            bei_number.x = 120,bei_number.y = 50;
                        else if(data.position == 2)
                            xi_number.x = 120,xi_number.y = 150;
                        else
                            nan_number.x = 20,nan_number.y = 150;
                    }
                    else if(my_dir == "bei")
                    {
                        if(data.position == 0)
                            dong_number.x = 120,dong_number.y = 50;
                        else if(data.position == 1)
                            bei_number.x = 120,bei_number.y = 150;
                        else if(data.position == 2)
                            xi_number.x = 20,xi_number.y = 150;
                        else
                            nan_number.x = 70,nan_number.y = 50;
                    }
                    else
                    {
                    if(data.position == 0)
                        dong_number.x = 20,dong_number.y = 150;
                    else if(data.position == 1)
                        bei_number.x = 70,bei_number.y = 50;
                    else if(data.position == 2)
                        xi_number.x = 120,xi_number.y = 50;
                    else
                        nan_number.x = 120,nan_number.y = 150;
                    }
                    for(var i = 0;i < data.number;i++)
                    {
                        console.log("lalal")
                        var one = new Sprite.fromImage('/static/img/outras/uno_back.jpg')
                        one.x = i*35;
                        one.y = 0;
                        one.anchor.set(0.5);
                        if(data.position == 0)
                            dong_container.addChild(one);
                        else if(data.position == 1)
                            bei_container.addChild(one);
                        else if(data.position == 2)
                            xi_container.addChild(one);
                        else
                            nan_container.addChild(one);
                    }
                }
            }
        }
        break;
    case 1: //离开
        if(data.state == true) //如果在游戏状态中出现玩家离开，则在相应的位置显示离开状态
        {
            if(data.position == 0)
                dong.addChild(dong_exit);
            else if(data.position == 1)
                bei.addChild(bei_exit);
            else if(data.position == 2)
                xi.addChild(xi_exit);
            else
                nan.addChild(nan_exit);
        }
        else //如果玩家是在非游戏状态离开，则移除玩家名即可
        {
            if(data.position == 0)
            {
                dong.removeChild(dong_name);
                app.stage.removeChild(ready_dong);
            }
            else if(data.position == 1)
            {
                bei.removeChild(bei_name);
                app.stage.removeChild(ready_bei);
            }
            else if(data.position == 2)
            {
                xi.removeChild(xi_name);
                app.stage.removeChild(ready_xi);
            }
            else
            {
                nan.removeChild(nan_name);
                app.stage.removeChild(ready_nan);
            }
        }
        break;
    case 2: //准备与取消准备
        ready_number = data.readynumber
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
                        ready_nan.x = 900,ready_nan.y = 300;
                    }
                    else
                    {
                        ready_nan.x = 300,ready_nan.y = 300;
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
                        ready_bei.x = 900,ready_bei.y = 300;
                    }
                    else
                    {
                        ready_bei.x = 300,ready_bei.y = 300;
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
                        ready_xi.x = 900,ready_xi.y = 300;
                    }
                    else
                    {
                        ready_xi.x = 300,ready_xi.y = 300;
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
                        ready_dong.x = 900,ready_dong.y = 300;
                    }
                    else
                    {
                        ready_dong.x = 300,ready_dong.y = 300;
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
        checkready();
        break;
    case 3: //榜单信息
        xs_one = new PIXI.Text(data.xs_one);
        gr_one = new PIXI.Text(data.gr_one)
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
        if(data.direction != direction)//修改指针方向，是顺时针还是逆时针
        {
            if(data.direction == 1)
            {
                app.stage.removeChild(ssz);
                app.stage.addChild(nsz);
                direction = 1;
            }
            else
            {
                direction = 0;
                app.stage.removeChild(nsz);
                app.stage.addChild(ssz);
            }
        }
        else{
            if(data.direction == 0)
                app.stage.addChild(ssz);
            else
                app.stage.addChild(nsz);
        }
        if(data.incident == 0 || data.incident == 1) //0表示出牌1表示摸牌
        {
            if(data.incident == 0 && data.state == false) //出牌事件
            {
                cardsmsg(data.ccolor,data.cstate,data.cnumber,"center"); //将出牌信息放到出牌堆中
                if(data.ccolor == "z" && data.cstate == "wildraw") //出牌为+4状态的展示
                {
                    if(my_dir =="dong")
                    {
                        if(data.position == 0)
                            four_cards.x = 600,four_cards.y = 400;
                        else if(data.position == 1)
                            four_cards.x = 1000,four_cards.y = 300;
                        else if(data.position == 2)
                            four_cards.x = 800,four_cards.y = 200;
                        else
                            four_cards.x = 300,four_cards.y = 300;
                    }
                    else if(my_dir == "xi")
                    {   
                        if(data.position == 0)
                            four_cards.x = 800,four_cards.y = 200;
                        else if(data.position == 1)
                            four_cards.x = 300,four_cards.y = 300;
                        else if(data.position == 2)
                            four_cards.x = 600,four_cards.y = 400;
                        else
                            four_cards.x = 1000,four_cards.y = 300;
                    }
                    else if(my_dir == "nan")
                    {
                        if(data.position == 0)
                            four_cards.x = 1000,four_cards.y = 300;
                        else if(data.position == 1)
                            four_cards.x = 800,four_cards.y = 200;
                        else if(data.position == 2)
                            four_cards.x = 300,four_cards.y = 300;
                        else
                            four_cards.x = 600,four_cards.y = 400;
                    }
                    else
                    {
                        if(data.position == 0)
                            four_cards.x = 300,four_cards.y = 300;
                        else if(data.position == 1)
                            four_cards.x = 600,four_cards.y = 400;
                        else if(data.position == 2)
                            four_cards.x = 1000,four_cards.y = 300;
                        else
                            four_cards.x = 800,four_cards.y = 200;
                    }
                    app.stage.addChild(four_cards);
                    xgdjs(22);
                }
                else if(data.cnumber == "-1" && data.ccolor != "z") //出牌为功能牌的展示
                {
                    if(data.cstate == "skip")
                    {
                        if(my_dir =="dong")
                        {
                            if(data.position == 0)
                                skip.x = 600,skip.y = 400;
                            else if(data.position == 1)
                                skip.x = 1000,skip.y = 300;
                            else if(data.position == 2)
                                skip.x = 800,skip.y = 200;
                            else
                                skip.x = 300,skip.y = 300;
                        }   
                        else if(my_dir == "xi")
                        {   
                            if(data.position == 0)
                                skip.x = 800,skip.y = 200;
                            else if(data.position == 1)
                                skip.x = 300,skip.y = 300;
                            else if(data.position == 2)
                                skip.x = 600,skip.y = 400;
                            else
                                skip.x = 1000,skip.y = 300;
                        }
                        else if(my_dir == "nan")
                        {
                            if(data.position == 0)
                                skip.x = 1000,skip.y = 300;
                            else if(data.position == 1)
                                skip.x = 800,skip.y = 200;
                            else if(data.position == 2)
                                skip.x = 300,skip.y = 300;
                            else
                                skip.x = 600,skip.y = 400;
                        }
                        else
                        {
                            if(data.position == 0)
                                skip.x = 300,skip.y = 300;
                            else if(data.position == 1)
                                skip.x = 600,skip.y = 400;
                            else if(data.position == 2)
                                skip.x = 1000,skip.y = 300;
                            else
                                skip.x = 800,skip.y = 200;
                        }
                        app.stage.addChild(skip);
                        xgdjs(4);
                    }
                    else if(data.cstate == "reverse")
                    {
                        if(my_dir =="dong")
                        {
                            if(data.position == 0)
                                reverse.x = 600,reverse.y = 400;
                            else if(data.position == 1)
                                reverse.x = 1000,reverse.y = 300;
                            else if(data.position == 2)
                                reverse.x = 800,reverse.y = 200;
                            else
                                reverse.x = 300,reverse.y = 300;
                        }   
                        else if(my_dir == "xi")
                        {   
                            if(data.position == 0)
                                reverse.x = 800,reverse.y = 200;
                            else if(data.position == 1)
                                reverse.x = 300,reverse.y = 300;
                            else if(data.position == 2)
                                reverse.x = 600,reverse.y = 400;
                            else
                                reverse.x = 1000,reverse.y = 300;
                        }
                        else if(my_dir == "nan")
                        {
                            if(data.position == 0)
                                reverse.x = 1000,reverse.y = 300;
                            else if(data.position == 1)
                                reverse.x = 800,reverse.y = 200;
                            else if(data.position == 2)
                                reverse.x = 300,reverse.y = 300;
                            else
                                reverse.x = 600,reverse.y = 400;
                        }
                        else
                        {
                            if(data.position == 0)
                                reverse.x = 300,reverse.y = 300;
                            else if(data.position == 1)
                                reverse.x = 600,reverse.y = 400;
                            else if(data.position == 2)
                                reverse.x = 1000,reverse.y = 300;
                            else
                                reverse.x = 800,reverse.y = 200;
                        }
                        app.stage.addChild(reverse);
                        xgdjs(3);
                    }
                    else
                    {
                        if(my_dir =="dong")
                        {
                            if(data.position == 0)
                                two_cards.x = 600,two_cards.y = 400;
                            else if(data.position == 1)
                                two_cards.x = 1000,two_cards.y = 300;
                            else if(data.position == 2)
                                two_cards.x = 800,two_cards.y = 200;
                            else
                                two_cards.x = 300,two_cards.y = 300;
                        }   
                        else if(my_dir == "xi")
                        {   
                            if(data.position == 0)
                                two_cards.x = 800,two_cards.y = 200;
                            else if(data.position == 1)
                                two_cards.x = 300,two_cards.y = 300;
                            else if(data.position == 2)
                                two_cards.x = 600,two_cards.y = 400;
                            else
                                two_cards.x = 1000,two_cards.y = 300;
                        }
                        else if(my_dir == "nan")
                        {
                            if(data.position == 0)
                                two_cards.x = 1000,two_cards.y = 300;
                            else if(data.position == 1)
                                two_cards.x = 800,two_cards.y = 200;
                            else if(data.position == 2)
                                two_cards.x = 300,two_cards.y = 300;
                            else
                                two_cards.x = 600,two_cards.y = 400;
                        }
                        else
                        {
                            if(data.position == 0)
                                two_cards.x = 300,two_cards.y = 300;
                            else if(data.position == 1)
                                two_cards.x = 600,two_cards.y = 400;
                            else if(data.position == 2)
                                two_cards.x = 1000,two_cards.y = 300;
                            else
                                two_cards.x = 800,two_cards.y = 200;
                        }
                        app.stage.addChild(two_cards);
                        xgdjs(21);
                    }
                }
            }
            if(my_dir == ps[data.position]) //事件为玩家时更新手里的牌和数量的方式
            {
                if(my_dir == "dong")
                {
                    dong.removeChild(dong_number);
                    dong_number = new PIXI.Text(data.cardsnumber);
                    dong_number.x = 120,dong_number.y = 150;
                    dong.addChild(dong_number);
                    dongcards = [];
                    dong_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        dongcards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"dong",i);
                    }
                }
                else if(my_dir == "nan")
                {
                    nan.removeChild(nan_number);
                    nan_number = new PIXI.Text(data.cardsnumber);
                    nan_number.x = 120,nan_number.y = 150;
                    nan.addChild(nan_number);
                    nancards = [];
                    nan_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        nancards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"nan",i);
                    }
                }
                else if(my_dir == "bei")
                {
                    bei.removeChild(bei_number);
                    bei_number = new PIXI.Text(data.cardsnumber);
                    bei_number.x = 120,bei_number.y = 150;
                    bei.addChild(bei_number);
                    beicards = [];
                    bei_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        beicards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"bei",i);
                    }
                }
                else 
                {
                    xi.removeChild(xi_number);
                    xi_number = new PIXI.Text(data.cardsnumber);
                    xi_number.x = 120,xi_number.y = 150;
                    xi.addChild(xi_number);
                    xicards = [];
                    xi_container.removeChildren();
                    for(var i = 0;i < data.cards.length;i++)
                    {
                        card = {color:data.cards[i].color,number:data.cards[i].number,state:data.cards[i].state,sc:false};
                        xicards.push(card);
                        cardsmsg(data.cards[i].color,data.cards[i].state,data.cards[i].number,"xi",i);
                    }
                }
            }
            else//事件为其他玩家时更新手里的牌和数量的方式
            {
                if(data.position == 0)
                {
                    dong.removeChild(dong_number);
                    dong_number = new PIXI.Text(data.cardsnumber);
                    dong.addChild(dong_number);
                    dong_container.removeChildren();
                }
                else if(data.position == 1)
                {
                    bei.removeChild(bei_number);
                    bei_number = new PIXI.Text(data.cardsnumber);
                    bei.addChild(bei_number);
                    bei_container.removeChildren();
                }
                else if(data.position == 2)
                {
                    xi.removeChild(xi_number)
                    xi_number = new PIXI.Text(data.cardsnumber);
                    xi.addChild(xi_number);
                    xi_container.removeChildren();
                }
                else
                {   
                    nan.removeChild(nan_number); 
                    nan_number = new PIXI.Text(data.cardsnumber);
                    nan.addChild(nan_number);
                    nan_container.removeChildren();
                }
                //确定摆放位置
                if(my_dir == "dong")
                {
                    if(data.position == 0)
                        dong_number.x = 120,dong_number.y = 150;
                    else if(data.position == 1)
                        bei_number.x = 20,bei_number.y = 150;
                    else if(data.position == 2)
                        xi_number.x = 70,xi_number.y = 50;
                    else
                        nan_number.x = 120,nan_number.y = 50;
                }
                else if(my_dir == "xi")
                {
                    if(data.position == 0)
                        dong_number.x = 70,dong_number.y = 50;
                    else if(data.position == 1)
                        bei_number.x = 120,bei_number.y = 50;
                    else if(data.position == 2)
                        xi_number.x = 120,xi_number.y = 150;
                    else
                        nan_number.x = 20,nan_number.y = 150;
                }
                else if(my_dir == "bei")
                {
                    if(data.position == 0)
                        dong_number.x = 120,dong_number.y = 50;
                    else if(data.position == 1)
                        bei_number.x = 120,bei_number.y = 150;
                    else if(data.position == 2)
                        xi_number.x = 20,xi_number.y = 150;
                    else
                        nan_number.x = 70,nan_number.y = 50;
                }
                else
                {
                    if(data.position == 0)
                        dong_number.x = 20,dong_number.y = 150;
                    else if(data.position == 1)
                        bei_number.x = 70,bei_number.y = 50;
                    else if(data.position == 2)
                        xi_number.x = 120,xi_number.y = 50;
                    else
                        nan_number.x = 120,nan_number.y = 150;
                }
                for(var i = 0;i < data.cardsnumber;i++)
                {
                    var one = new Sprite.fromImage('/static/img/outras/uno_back.jpg')
                    one.x = i*35;
                    one.y = 0;
                    one.anchor.set(0.5);
                    if(data.position == 0)
                        dong_container.addChild(one);
                    else if(data.position == 1)
                        bei_container.addChild(one);
                    else if(data.position == 2)
                        xi_container.addChild(one);
                    else
                        nan_container.addChild(one);
                }
            }
        }
        else //事件为喊UNO和选色
        {
            if(my_dir == "dong")
            {
                if(data.position == 0)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 600,select_yellow.y = 400;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 600,select_red.y = 400;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 600,select_blue.y = 400;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 600,select_green.y = 400;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 600,call_uno.y = 400;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 1)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 1000,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 1000,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 1000,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 1000,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 1000,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 2)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 800,select_yellow.y = 200;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 800,select_red.y = 200;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 800,select_blue.y = 200;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 800,select_green.y = 200;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 800,call_uno.y = 200;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 300,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 300,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 300,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 300,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 300,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
            }
            else if(my_dir == "nan")
            {
                if(data.position == 0)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 1000,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 1000,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 1000,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 1000,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 1000,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 1)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 800,select_yellow.y = 200;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 800,select_red.y = 200;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 800,select_blue.y = 200;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 800,select_green.y = 200;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 800,call_uno.y = 200;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 2)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 300,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 300,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 300,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 300,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 300,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 600,select_yellow.y = 400;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 600,select_red.y = 400;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 600,select_blue.y = 400;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 600,select_green.y = 400;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 600,call_uno.y = 400;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
            }
            else if(my_dir == "xi")
            {
                if(data.position == 0)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 800,select_yellow.y = 200;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 800,select_red.y = 200;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 800,select_blue.y = 200;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 800,select_green.y = 200;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 800,call_uno.y = 200;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 1)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 300,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 300,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 300,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 300,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 300,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 2)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 600,select_yellow.y = 400;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 600,select_red.y = 400;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 600,select_blue.y = 400;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 600,select_green.y = 400;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 600,call_uno.y = 400;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 1000,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 1000,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 1000,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 1000,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 1000,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
            }
            else
            {
                if(data.position == 0)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 300,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 300,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 300,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 300,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 300,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 1)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 600,select_yellow.y = 400;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 600,select_red.y = 400;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 600,select_blue.y = 400;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 600,select_green.y = 400;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 600,call_uno.y = 400;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else if(data.position == 2)
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 1000,select_yellow.y = 300;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 1000,select_red.y = 300;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 1000,select_blue.y = 300;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 1000,select_green.y = 300;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 1000,call_uno.y = 300;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
                else
                {
                    if(data.incident == 2)
                    {
                        if(data.wsc == "yellow")
                        {
                            select_yellow.x = 800,select_yellow.y = 200;
                            app.stage.addChild(select_yellow);
                            xgdjs(14);
                        }
                        else if(data.wsc == "red")
                        {
                            select_red.x = 800,select_red.y = 200;
                            app.stage.addChild(select_red);
                            xgdjs(13);
                        }
                        else if(data.wsc == "blue")
                        {
                            select_blue.x = 800,select_blue.y = 200;
                            app.stage.addChild(select_blue);
                            xgdjs(12);
                        }
                        else
                        {
                            select_green.x = 800,select_green.y = 200;
                            app.stage.addChild(select_green);
                            xgdjs(11);
                        }
                    }
                    else
                    {
                        call_uno.x = 800,call_uno.y = 200;
                        app.stage.addChild(call_uno);
                        xgdjs(0);
                    }
                }
            }
        }
        if(data.outpeople == true) //接下来操作的用户为自己时
        {
            if(data.sc == false && data.uno == false)
            {
                app.stage.addChild(outcard);
                app.stage.addChild(outcard_text);
                app.stage.addChild(getcard);
                app.stage.addChild(getcard_text);
                bsdjs(1)
            }
            if(data.sc == true)
            {
                app.stage.addChild(color_container);
                bsdjs(0);
            }
            if(data.uno == true)
            {
                app.stage.addChild(uno);
                app.stage.addChild(uno_text);
                bsdjs(-1);
            }
        }
        break;
    case -1://错误
        alert("出牌内容不符合要求请重新出牌");
        bsnums = -10;
        app.stage.addChild(outcard);
        app.stage.addChild(outcard_text);
        app.stage.addChild(getcard);
        app.stage.addChild(getcard_text);
        bsdjs(1);
        break;
    }
}
