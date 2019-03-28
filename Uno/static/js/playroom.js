//别名
var Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    container = PIXI.Container;
    graphics = PIXI.Graphics;
    text = PIXI.Text;

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
var yellowbutton = Sprite.fromImage('../static/img/button/yellowbutton.png');
var redbutton = Sprite.fromImage('../static/img/button/redbutton.png');
var greenbutton = Sprite.fromImage('../static/img/button/greenbutton.png');
var bluebutton = Sprite.fromImage('../static/img/button/bluebutton.png');
var color_container = new container();
var outcard = Sprite.fromImage('../static/img/button/outcard.png');
var getcard = Sprite.fromImage('../static/img/button/getcard.png');
var uno = Sprite.fromImage('../static/img/button/uno.png');
var gettwo = Sprite.fromImage('../static/img/button/addtwo.png');
var getfour = Sprite.fromImage('../static/img/button/addfour.png');

//四副牌
var dong_container = new container();
var nan_container = new container();
var xi_container = new container();
var bei_container = new container();

//东南西北标记(东南西北 + 玩家名称)
var dong = text('东');
var nan = text('南');
var xi = text('西');
var bei = text('北');
//倒计时表(东南西北)


//中央出牌牌堆
var center_cards = new container();

//剩余牌数(东南西北)
var dong_number,nan_number,xi_number,bei_number;

//顺时针逆时针方向
var direction = 0;
var ssz = new Sprite.fromImage("../static/img/shunshizhen.png")
var nsz = new Sprite.fromImage("../static/img/nishizhen.png")

//功能牌效果展示(选色(红,黄,蓝,绿)，+2，+4，反向，停止，uno)
var select_color;
var select_green = text("绿色");
var select_red = text('红色');
var select_blue = text('蓝色');
var select_yellow = text('黄色');
var two_cards = text('+2！！！');
var four_cards = text('+4！！！');
var reverse = text('转！！！');
var skip = text('禁！！！');
var call_uno = text('UNO！！！');


var app = new PIXI.Application(1340, 625, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);


