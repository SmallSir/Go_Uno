//别名
var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;

//所有的牌+背面
//蓝色
var b0 = Sprite.fromImage('../static/img/Cartas/BlueCard/0blue.jpg')
var b1 = Sprite.fromImage('../static/img/Cartas/BlueCard/1blue.jpg')
var b2 = Sprite.fromImage('../static/img/Cartas/BlueCard/2blue.jpg')
var b3 = Sprite.fromImage('../static/img/Cartas/BlueCard/3blue.jpg')
var b4 = Sprite.fromImage('../static/img/Cartas/BlueCard/4blue.jpg')
var b5 = Sprite.fromImage('../static/img/Cartas/BlueCard/5blue.jpg')
var b6 = Sprite.fromImage('../static/img/Cartas/BlueCard/6blue.jpg')
var b7 = Sprite.fromImage('../static/img/Cartas/BlueCard/7blue.jpg')
var b8 = Sprite.fromImage('../static/img/Cartas/BlueCard/8blue.jpg')
var b9 = Sprite.fromImage('../static/img/Cartas/BlueCard/9blue.jpg')
var bs = Sprite.fromImage('../static/img/Cartas/BlueCard/blueBloq.jpg')
var bra = Sprite.fromImage('../static/img/Cartas/BlueCard/blueCompra.jpg')
var bre = Sprite.fromImage('../static/img/Cartas/BlueCard/blueInverte.jpg')

//绿色
var g0 = Sprite.fromImage('../static/img/Cartas/GreenCard/0green.jpg')
var g1 = Sprite.fromImage('../static/img/Cartas/GreenCard/1green.jpg')
var g2 = Sprite.fromImage('../static/img/Cartas/GreenCard/2green.jpg')
var g3 = Sprite.fromImage('../static/img/Cartas/GreenCard/3green.jpg')
var g4 = Sprite.fromImage('../static/img/Cartas/GreenCard/4green.jpg')
var g5 = Sprite.fromImage('../static/img/Cartas/GreenCard/5green.jpg')
var g6 = Sprite.fromImage('../static/img/Cartas/GreenCard/6green.jpg')
var g7 = Sprite.fromImage('../static/img/Cartas/GreenCard/7green.jpg')
var g8 = Sprite.fromImage('../static/img/Cartas/GreenCard/8green.jpg')
var g9 = Sprite.fromImage('../static/img/Cartas/GreenCard/9green.jpg')
var gs = Sprite.fromImage('../static/img/Cartas/GreenCard/greenBloq.jpg')
var gra = Sprite.fromImage('../static/img/Cartas/GreenCard/greenCompra.jpg')
var gre = Sprite.fromImage('../static/img/Cartas/GreenCard/greenInverte.jpg')//红色
//红色
var r0 = Sprite.fromImage('../static/img/Cartas/RedCard/0red.png')
var r1 = Sprite.fromImage('../static/img/Cartas/RedCard/1red.png')
var r2 = Sprite.fromImage('../static/img/Cartas/RedCard/2red.png')
var r3 = Sprite.fromImage('../static/img/Cartas/RedCard/3red.png')
var r4 = Sprite.fromImage('../static/img/Cartas/RedCard/4red.png')
var r5 = Sprite.fromImage('../static/img/Cartas/RedCard/5red.png')
var r6 = Sprite.fromImage('../static/img/Cartas/RedCard/6red.png')
var r7 = Sprite.fromImage('../static/img/Cartas/RedCard/7red.png')
var r8 = Sprite.fromImage('../static/img/Cartas/RedCard/8red.png')
var r9 = Sprite.fromImage('../static/img/Cartas/RedCard/9red.png')
var rs = Sprite.fromImage('../static/img/Cartas/RedCard/redBloq.png')
var rra = Sprite.fromImage('../static/img/Cartas/RedCard/redCompra.png')
var rre = Sprite.fromImage('../static/img/Cartas/RedCard/redInverte.png')

//黄色
var g0 = Sprite.fromImage('../static/img/Cartas/YellowCard/0yellow.jpg')
var g1 = Sprite.fromImage('../static/img/Cartas/YellowCard/1yellow.jpg')
var g2 = Sprite.fromImage('../static/img/Cartas/YellowCard/2yellow.jpg')
var g3 = Sprite.fromImage('../static/img/Cartas/YellowCard/3yellow.jpg')
var g4 = Sprite.fromImage('../static/img/Cartas/YellowCard/4yellow.jpg')
var g5 = Sprite.fromImage('../static/img/Cartas/YellowCard/5yellow.jpg')
var g6 = Sprite.fromImage('../static/img/Cartas/YellowCard/6yellow.jpg')
var g7 = Sprite.fromImage('../static/img/Cartas/YellowCard/7yellow.jpg')
var g8 = Sprite.fromImage('../static/img/Cartas/YellowCard/8yellow.jpg')
var g9 = Sprite.fromImage('../static/img/Cartas/YellowCard/9yellow.jpg')
var gs = Sprite.fromImage('../static/img/Cartas/YellowCard/yellowBloq.jpg')
var gra = Sprite.fromImage('../static/img/Cartas/YellowCard/yellowCompra.jpg')
var gre = Sprite.fromImage('../static/img/Cartas/YellowCard/yellowInverte.jpg')//红色
//功能牌
var wild = Sprite.fromImage('../static/img/Cartas/EspecialCard/coringa.png')
var wildraw = Sprite.fromImage('../static/img/Cartas/EspecialCard/coringaCompra.jpg')
//背面
var back_card = Sprite.fromImage('../static/img/outras/uno_back.jpg')
//选色按钮(黄，红，绿，蓝) + 操作按钮(出牌，摸牌,+2,+4,uno)
var color_container = new container();
var outcard;
var getcard;
var uno;
var gettwo,getfour;

//四副牌
var dong_container = new container();
var nan_container = new container();
var xi_container = new container();
var bei_container = new container();

//东南西北标记(东南西北 + 玩家名称)
var dong,nan,xi,bei;

//倒计时表(东南西北)


//中央出牌牌堆
var center_cards = new container();

//剩余牌数(东南西北)
var dong_number,nan_number,xi_number,bei_number;

//顺时针逆时针方向
var direction = 0;
var l = new graphics();

l.lineStyle(10, 0xffd900, 1);
l.arcTo(1200,200,800,400,555);
var r = new graphics();

//功能牌效果展示(选色，+2，+4，反向，停止)
var select_color;
var two_cards;
var four_cards;
var skip;


var app = new PIXI.Application(1340, 625, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
app.stage.addChild(l);

