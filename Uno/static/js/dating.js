var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

var app = new PIXI.Application(document.documentElement.clientWidth,document.documentElement.clientHeight, {
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

var rank = new container();
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


//接收服务器发来的json
$.ajax({
    type: 'get',
    url: '/dating',
    data: {
        rank:"rank"
    },
    dataType: "json",
    success: function (ret) {
        data = JSON.parse(ret)
        if(data[one][user] != false)
        {
            var onen = new PIXI.Text(data[one][username],style_name)
            rank.add(onen);
            onen.x = 120,onen.y = 90;
            var oneg = new PIXI.Text(data[one][grades],style_name)
            rank.add(oneg);
            oneg.x = 120,oneg.y = 60;
        }

        if(data[two][user] != false)
        {
            var twon = new PIXI.Text(data[two][username],style_name)
            rank.addChild(twon);
            twon.x = 0,twon.y = 120;
            var twog = new PIXI.Text(data[two][grades],style_name)
            rank.addChild(twog);
            twog.x = 0,twog.y = 90;
        }

        if(data[three][user] != false)
        {
            var threen = new PIXI.Text(data[three][username],style_name)
            rank.addChild(threen);
            threen.x = 240,threen.y = 120;
            var threeg = new PIXI.Text(data[three][grades],style_name)
            rank.addChild(threeg);
            threeg.x = 240,threeg.y = 90;
        }

        if(data[four][user] != false)
        {
            var fourn = new PIXI.Text(data[four][username],style_name)
            rank.addChild(fourn);
            fourn.x = 240,fourn.y = 180;
            var fourg = new PIXI.Text(data[four][grades],style_name)
            rank.addChild(fourg);
            fourg.x = 120,fourg.y = 180;
        }

        if(data[five][user] != false)
        {
            var fiven = new PIXI.Text(data[five][username],style_name)
            rank.addChild(fiven);
            fiven.x = 240,fiven.y = 230;
            var fiveg = new PIXI.Text(data[five][grades],style_name)
            rank.addChild(fiveg);
            fiveg.x = 120,fiveg.y = 230;
        }

        if(data[six][user] != false)
        {
            var sixn = new PIXI.Text(data[six][username],style_name)
            rank.addChild(sixn);
            sixn.x = 240,sixn.y = 280;
            var sixg = new PIXI.Text(data[six][grades],style_name)
            rank.addChild(sixg);
            sixg.x= 120,sixg.y = 280;
        }

        if(data[seven][user] != false)
        {
            var sevenn = new PIXI.Text(data[seven][username],style_name) 
            rank.addChild(sevenn);
            sevenn.x = 240,sevenn.y = 330;
            var seveng = new PIXI.Text(data[seven][grades],style_name)
            rank.addChild(seveng);
            seveng.x = 120,sevenn.y = 330;
        }

        if(data[eight][user] != false)
        {
            var eighth = new PIXI.Text(data[eight][username],style_name)
            rank.addChild(eighth);
            eighth.x = 240,eighth.y = 380;
            var eightg = new PIXI.Text(data[eight][grades],style_name)
            rank.addChild(eightg);
            eightg.x = 120,eightg.y = 380;
        }

        if(data[nine][user] != false)
        {
            var ninen = new PIXI.Text(data[nine][username],style_name)
            rank.addChild(ninen);
            ninen.x = 240,ninen.y = 430;
            var nineg = new PIXI.Text(data[nine][grades],style_name)
            rank.addChild(nineg);
            nineg.x = 120,nineg.y = 430;
        }

        if(data[ten][user] != false)
        {
            var tenn = new PIXI.Text(data[ten][username],style_name)
            rank.addChild(tenn);
            tenn.x = 240,tenn.y = 480;
            var teng = new PIXI.Text(data[ten][grades],style_name)
            rank.addChild(teng);
            teng.x = 120,teng.y = 480;
        }
    },
    error:function(ret){
        console.log(ret)
    }
});


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



createroom.on('pointerdown', oncreate);
joinroom.on('pointerdown',onjoin);

function oncreate(){
    $.ajax({
        type:'post',
        url: '/create',
        data: {
        name: roomname.text,
        password: roompassword.text
        },
        dataType: "json",
        success:function(ret){
            ret = JSON.parse(ret)
            if(ret.state == true){
                window.location = ret.url;
            } else{
                alert(ret.message);
            }
        },
        error:function(ret){
            alert("请重新输入");
        }
    }) 
}


function onjoin(){
    $.ajax({
        type:'post',
        url: '/join',
        data: {
        name: roomname.text,
        password: roompassword.text
        },
        success:function(ret){
            ret = JSON.parse(ret)
            if(ret.state == true){
                window.location = ret.url
            } else{
                alert(ret.message);
            }
        },
        error:function(ret){
            console.log(ret)
        }
    }) 
}