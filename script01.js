

window.addEventListener('load', add_svg);
window.addEventListener('load', addGame);

window.addEventListener('resize', addGame);

var contr1 = document.getElementById('control_1');
var contr2 = document.getElementById('control_2');
var contr3 = document.getElementById('control_3');
contr1.addEventListener('touchstart', control1, false);
contr2.addEventListener('touchstart', control2, false);
contr3.addEventListener('touchstart', for_control3, false);
const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
const stringName='LOKTEV_TEST_INFO';
var num =0; //номер игры
//var numGame = 0;
var recordValNew = {};
var recordVal = {
  numGame:
          {"shtraf" : '',//счет штрафных очков
          "ball": 0, //счет пойманных яиц
          "timeStart": '', //начало игры
          "timeEnd": ""} //окончание игры
};
var timerStart = 0; //отслеживание выбора режима игры
var flagZaya=0; //отслеживание появление зайца
var flag = 0; //для обнуления счета
var controlSec, flagSec;


setInterval(get_size, 1000/4);

function get_size(){
  var sec = control3();
  zayac_move(timerStart, sec);
  gameA(timerStart, sec); //запуск игры А
  gameB(timerStart, sec); //запуск игры Б
//  preview_game(timerStart, sec);

  document.getElementById('ochki').innerText = recordVal.numGame.ball || 0;
addGame();
}

function addGame() {
  var sizePart = {};
  var widthEl = 0;
  var heightEl = 0;
 // var screen_size = get_size();
  var newWid = window.innerWidth;
  var newHeig = window.innerHeight;
  var allPartGame = document.getElementById('place_game_out');

  if (newWid < 621) {
    widthEl = newWid-20;
    heightEl = newHeig-20;
   // console.log('tyt', widthEl, heightEl);
    allPartGame.style.width = widthEl + 'px';
    allPartGame.style.height = heightEl + 'px';
   document.getElementById('div_icon').style.display = "none";

   document.getElementById('conteiner').style.opacity = 0;
   document.querySelector('#modal_win > div:nth-child(1) > button').style.opacity = 0;
   document.querySelector('#modal_win').style.opacity = 0;
    var recGame = document.getElementById('records');
      recGame.style.height = widthEl + 'px';
      recGame.style.width ='0px';
      if(recGame.style.opacity === '1')
        recGame.style.width = heightEl + 'px';
      else
         recGame.style.width = '0px';
      recGame.style.transform = 'translate(-50%,-50%) rotate(90deg)';

    //для канвас делаем новые размеры после ротейт
    var placeForGame = document.getElementById('place_for_game');
        placeForGame.style.width = "100%";
        placeForGame.style.height = "100%";   
    var placeGame = placeForGame.getBoundingClientRect();

    var newW = 0.855 * placeGame.height;
    var newH = 0.865 * placeGame.width;

    var placeLayer4 = document.getElementById('for_game_layer4');
        placeLayer4.style.width = newW + 'px';
        placeLayer4.style.height = newH + 'px';
        placeLayer4.style.transform = 'rotate(90deg) translate(-' + 0.5 * newH + 'px,' + 0.5 * newW + 'px)';


    var imgs = document.getElementById('img_game');
        imgs.style.width = newW + 'px';
        imgs.style.height = newH + 'px';
        imgs.style.transform = 'rotate(90deg) translate(-' + 0.5 * newH + 'px,' + 0.5 * newW + 'px)';//'translate(-'+ 0.5*layer4.height + 'px, -' + + 0.5 * layer4.width+'px) rotate(90deg)';
  
    var canvas = document.getElementById('game_canvas');
        sizePart.gamePartW = document.getElementById('for_game_layer4').offsetWidth;
        sizePart.gamePartH = document.getElementById('for_game_layer4').offsetHeight;
        sizePart.gamePartW = newW;
        sizePart.gamePartH = newH;   
        canvas.style.transform = 'translate(-' + 0.5 * newW + 'px,-' + 0.5 * newH + 'px) rotate(90deg)';//'translate(-50%, -50%) rotate(90deg)';
        //canvas.style.transition = none;


    var botGran = document.getElementById('place_for_game');
    var elemGran = botGran.getBoundingClientRect();
    //плашки
    var forLeft = elemGran.height - 16;
    var forBottom = elemGran.width - document.getElementsByClassName('bottom')[0].offsetWidth / 2 + 4;//9;
    document.getElementsByClassName('bottom')[0].style.transform = 'translate(' + forBottom + 'px, 3px) rotateY(90deg)';
    document.getElementsByClassName('left')[0].style.transform = 'translate(-2px, ' + forLeft + 'px) rotateX(90deg)';
    document.getElementsByClassName('right')[0].style.transform = 'transform: translate(-0,5%, -9px) rotateX(90deg)';   
    //подписи
    var elemLabel = forBottom - document.getElementsByClassName('to_bottom')[0].offsetHeight/2;    
    document.getElementsByClassName('to_bottom')[0].style.left = elemLabel + 'px';
    document.getElementsByClassName('to_bottom')[0].style.top = '50%';

    var logo1 = document.getElementById('logo');
    var elem_logo = logo1.getBoundingClientRect(); 
    document.getElementById('svg1').style.transform = 'rotate(90deg)';
    document.getElementById('svg1').style.top = elem_logo.y + 'px';
    document.getElementById('svg1').style.left = elem_logo.x + 'px';

    var control_6 = document.getElementById('control_6');
    var control = control_6.getBoundingClientRect();
    document.getElementById('svg2').style.top = control.top - 4 + 'px';
    document.getElementById('svg2').style.left = control.x - 5 + 'px';
    document.getElementById('svg2').style.transform = 'rotate(90deg) translate(-11px, 2px)';
  }
  else if (newWid > 620 && newWid < 1061) {
    widthEl = newWid * 0.92;
    heightEl = newHeig * 0.92;
    allPartGame.style.width = widthEl + 'px';
    allPartGame.style.height = heightEl + 'px';
    allPartGame.style.transform = 'translate(-50%,-50%)';
    document.getElementById('div_icon').style.display = "none";
  
    document.querySelector('#modal_win > div:nth-child(1) > button').style.opacity = 0;
    document.querySelector('#modal_win').style.opacity = 0;
    document.getElementById('conteiner').style.opacity = 0;
    var recGame = document.getElementById('records');
    recGame.style.height = widthEl + 'px';
    recGame.style.width = '0px';
    if(recGame.style.opacity === '1')
       recGame.style.width = heightEl + 'px';
    else  
      recGame.style.height = '0px';
    recGame.style.transform = 'translate(-50%,-50%) rotate(90deg)';

    var placeII = document.getElementById('place_game_II');
    var placeGameII = placeII.getBoundingClientRect();

  //  var placeIIW = placeGameII.width;
    var placeIIH = placeGameII.height;
    var pnewH = placeIIH;   
    var pnewW = 0.75 * placeIIH;      
    var placeForGame = document.getElementById('place_for_game');
    var placeGame = placeForGame.getBoundingClientRect();
        placeForGame.style.width = pnewW + 'px';
        placeForGame.style.height = pnewH + 'px'; 
    
    var newW = 0.87 * pnewH;//placeGame.height; 0.87 
    var newH =  0.88 * pnewW;//placeGame.width;0.90

    var placeLayer4 = document.getElementById('for_game_layer4');
        placeLayer4.style.width = newW + 'px';
        placeLayer4.style.height = newH + 'px';
        placeLayer4.style.transform = 'rotate(90deg) translate(-' + 0.5 * newH + 'px,' + 0.5 * newW + 'px)';
  

  //  var layer4 = placeLayer4.getBoundingClientRect();
    var imgs = document.getElementById('img_game');
        imgs.style.width = newW + 'px';
        imgs.style.height = newH + 'px';
        imgs.style.transform = 'rotate(90deg) translate(-' + 0.5 * newH + 'px,' + 0.5 * newW + 'px)';//'translate(-50%, -50%) rotate(90deg)';

    var canvas = document.getElementById('game_canvas');
        canvas.style.transform = 'rotate(90deg) translate(-' + 0.5 * newH + 'px,' + 0.5 * newW + 'px)';//'translate(-50%, -50%) rotate(90deg)';

        sizePart.gamePartW = newW;
        sizePart.gamePartH = newH;

    var botGran = document.getElementById('place_for_game');
    var elemGran = botGran.getBoundingClientRect();
    //плашки
    var forLeft = elemGran.height - document.getElementsByClassName('left')[0].offsetHeight / 2 - 2;
    var forBottom = elemGran.width - document.getElementsByClassName('bottom')[0].offsetWidth / 2 + 4;
    document.getElementsByClassName('bottom')[0].style.transform = 'translate(' + forBottom + 'px, 4px) rotateY(90deg)';
    document.getElementsByClassName('left')[0].style.transform = 'translate(-6px, ' + forLeft + 'px) rotateX(90deg)';
    document.getElementsByClassName('right')[0].style.transform = 'translate(-6px, -10px) rotateX(90deg)';
    //подписи
    var elemLabel = forBottom-4  - document.getElementsByClassName('to_bottom')[0].offsetHeight/2;   
    document.getElementsByClassName('to_bottom')[0].style.left = elemLabel + 7 + 'px';
    document.getElementsByClassName('to_bottom')[0].style.top = '50%';


    var logo1 = document.getElementById('logo');
    var elem_logo = logo1.getBoundingClientRect(); 
    document.getElementById('svg1').style.transform = 'rotate(90deg)';
    document.getElementById('svg1').style.top = elem_logo.y + 'px';
    document.getElementById('svg1').style.left = elem_logo.x + 'px';


    var control_6 = document.getElementById('control_6');
    var control = control_6.getBoundingClientRect();
    document.getElementById('svg2').style.top = control.top - 4 + 'px';
    document.getElementById('svg2').style.left = control.x - 5 + 'px';
    document.getElementById('svg2').style.transform = 'rotate(90deg) translate(-12px, 2px)';

  }
  else if (newWid > 1060) {
    widthEl = 0.68 * newWid;
    heightEl = 0.7 * newHeig;
    allPartGame.style.width = widthEl + 'px';
    allPartGame.style.height = heightEl + 'px';
    allPartGame.style.transform = 'translate(-50%,-50%)';

    document.getElementById('div_icon').style.display = "block";
    var myDialod = document.getElementById('modal_win');
    if(!myDialod.open)
      {
          myDialod.style.width = '0px';
          myDialod.style.height = '0px'; 
          myDialod.style.padding = '0px'; 
          myDialod.style.margin = '0px';  
          myDialod.style.zIndex = '-2';   
          document.getElementById('conteiner').style.opacity = 0;
          document.querySelector('#modal_win > div:nth-child(1) > button').style.opacity = 0;
      } 
      else{
        document.querySelector('#modal_win').style.opacity = 1;
        myDialod.style.width = widthEl + 'px';
        myDialod.style.height = heightEl + 'px';   
        myDialod.style.left = '50%';
        myDialod.style.top = '50%'; 
        myDialod.style.transform = 'translate(-50%,-50%)';
        myDialod.style.zIndex = '10'; 
        document.getElementById('conteiner').style.opacity = 1;
        document.getElementById('conteiner').height = heightEl*0.94 + 'px';  
        document.querySelector('#modal_win > div:nth-child(1) > button').style.opacity = 1;
      }
        
    var recGame = document.getElementById('records');
    recGame.style.width = widthEl + 'px';
    if(recGame.style.opacity === '1')
       recGame.style.height = heightEl + 'px';
    else  
       recGame.style.height = '0px';
    recGame.style.transform = 'translate(-50%,-50%)';

    var placeForGame = document.getElementById('place_for_game');
      placeForGame.style.width = "94%";
      placeForGame.style.height = "90%"; 

    var gameLayer4 = document.getElementById('for_game_layer4');
    var layer4 = gameLayer4.getBoundingClientRect();
    var newW = 0.57 * widthEl;
    var newH = 0.7206 * heightEl;

    var placeLayer4 = document.getElementById('for_game_layer4');
        placeLayer4.style.width = newW +'px';
        placeLayer4.style.height = newH +'px';
        placeLayer4.style.transform = 'translate(-50%, -50%) rotate(0deg)';


    var canvas = document.getElementById('game_canvas');
        canvas.style.transform = 'translate(-50%, -50%) rotate(0deg)';

        sizePart.gamePartW = document.getElementById('for_game_layer4').offsetWidth;
        sizePart.gamePartH = document.getElementById('for_game_layer4').offsetHeight;

    var imgs = document.getElementById('img_game');
        imgs.style.width = newW +'px';
        imgs.style.height = newH +'px';
        imgs.style.transform = 'translate(-50%, -50%) rotate(0deg)';

    var botGran = document.getElementById('place_for_game');
    var elemGran = botGran.getBoundingClientRect();

    //плашки
    var forRight = elemGran.width - document.getElementsByClassName('right')[0].offsetWidth / 2;
    var forBottom = elemGran.height - document.getElementsByClassName('bottom')[0].offsetHeight / 2;;    
    document.getElementsByClassName('bottom')[0].style.transform = 'translate(0px,' + forBottom + 'px) rotateX(90deg)';
    document.getElementsByClassName('right')[0].style.transform = 'translate(' + forRight + 'px, 0px) rotateY(90deg)';
    document.getElementsByClassName('left')[0].style.transform = 'translate(-15px, 0px) rotateY(90deg)';   
    //подписи
    var forLabelBot = forBottom -4 - document.getElementsByClassName('to_bottom')[0].offsetHeight/2;//document.getElementById('for_game_layer2').offsetHeight;    
    document.getElementsByClassName('to_bottom')[0].style.top = forLabelBot + 'px';
    document.getElementsByClassName('to_bottom')[0].style.left = '50%';


    var logo1 = document.getElementById('logo');
    var elem_logo = logo1.getBoundingClientRect(); 
    document.getElementById('svg1').style.transform = 'rotate(0deg)';
    document.getElementById('svg1').style.top = elem_logo.y + 'px';
    document.getElementById('svg1').style.left = elem_logo.x + 'px';
    
    var control_6 = document.getElementById('control_6');
    var control = control_6.getBoundingClientRect();
    document.getElementById('svg2').style.top = control.top - 4 + 'px';
    document.getElementById('svg2').style.left = control.x - 5 + 'px';
    document.getElementById('svg2').style.transform = 'rotate(0deg)';
  }
  add_canvas(sizePart);
}

function add_svg() {
  //рисуем логотип
  var logo1 = document.getElementById('logo');
  var elem_logo = logo1.getBoundingClientRect();  

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var logoW = document.getElementById('logo').offsetWidth;
  var logoH = document.getElementById('logo').offsetHeight;
  var svgX = elem_logo.x;
  var svgY = elem_logo.y;
  svg.setAttribute('width', logoW);
  svg.setAttribute('height', logoH);
  svg.style.position = 'absolute';
  svg.style.top = svgY + 'px';
  svg.style.left = svgX + 'px';
  svg.id = 'svg1';

  var part = [];
  var masXY = {
    0: { 11: 0.1, 12: 0.2, 21: 0.3, 22: 0.2 },//и
    1: { 11: 0.3, 12: 0.2, 21: 0.1, 22: 0.65 },//и
    2: { 11: 0.1, 12: 0.65, 21: 0.55, 22: 0.2 },//и
    3: { 11: 0.55, 12: 0.2, 21: 0.35, 22: 0.65 },//и
    4: { 11: 0.1, 12: 0.9, 21: 0.25, 22: 0.9 },//m
    5: { 11: 0.25, 12: 0.9, 21: 0.7, 22: 0.45 },//m
    6: { 11: 0.7, 12: 0.45, 21: 0.5, 22: 0.9 },//m
    7: { 11: 0.5, 12: 0.9, 21: 0.9, 22: 0.45 },//m
    8: { 11: 0.9, 12: 0.45, 21: 0.7, 22: 0.9 }//m
  };

  for (var i = 0; i < 9; i++) {
    part[i] = document.createElementNS(svg.namespaceURI, 'line');
    part[i].setAttribute('x1', logoW * masXY[i][11]);
    part[i].setAttribute('y1', logoH * masXY[i][12]);
    part[i].setAttribute('x2', logoW * masXY[i][21]);
    part[i].setAttribute('y2', logoH * masXY[i][22]);
    part[i].setAttribute('stroke', 'black');
    part[i].setAttribute('stroke-width', 3);
    svg.appendChild(part[i]);
  }
  document.body.appendChild(svg);

  var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  var control_6 = document.getElementById('control_6');
  var control = control_6.getBoundingClientRect();
 // console.log('tyt', control.top, control.x);
  var controlW = 2.5 * document.getElementById('control_6').offsetWidth;
  var controlH = 2.5 * document.getElementById('control_6').offsetHeight;

  for (var i = 0; i < 11; i++) {
    if (i < 3 || i > 7) {
      var curcleItem = document.createElementNS(svg2.namespaceURI, 'circle');
      var curcleItemX = controlW * 0.6 + controlW * 0.5 * Math.sin(360 / 12 / 180 * Math.PI * (i + 1));
      var curcleItemY = controlW * 0.6 - controlW * 0.5 * Math.cos(360 / 12 / 180 * Math.PI * (i + 1));
      curcleItem.setAttribute('cx', curcleItemX*0.7);
      curcleItem.setAttribute('cy', curcleItemY);
      curcleItem.setAttribute('r', 1.5);
      curcleItem.setAttribute("fill", "black");
      svg2.appendChild(curcleItem);
    }
  }

  svg2.setAttribute('width', controlW);
  svg2.setAttribute('height', controlH);
  svg2.style.position = 'absolute';
  svg2.style.top = control.top - 4 + 'px';
  svg2.style.left = control.x - 5 + 'px';
  svg2.id = 'svg2';
  document.body.appendChild(svg2);
}

function add_canvas(sizeP) {
  const xmlns = "http://www.w3.org/2000/svg";
  var canvas = document.getElementById('game_canvas');
  const canvasPart = canvas.getContext("2d");
  canvasPart.clearRect(0, 0, canvasPart.canvas.width, canvasPart.canvas.height);
  canvasPart.canvas.width = sizeP.gamePartW;
  canvasPart.canvas.height = sizeP.gamePartH;

  const ctx = canvas.getContext("2d");
  var posGameX = Math.round(sizeP.gamePartW, 2);
  var posGameY = Math.round(sizeP.gamePartH, 2);

  //крыша
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = "#941121";
  ctx.strokeStyle = 'grey';
  for (var i = 0; i < 2; i++) {
    ctx.moveTo(posGameX * 0.01, posGameY * 0.13);
    ctx.lineTo(posGameX * 0.075, posGameY * 0.01);
    ctx.lineTo(posGameX * 0.18, posGameY * 0.23);
    ctx.stroke();
    if (i === 0) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.fillStyle = "#851E1F";
      ctx.strokeStyle = '#851E1F';
    }
  }

  //труба
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ff0000";
  ctx.moveTo(posGameX * 0.11, posGameY * 0.07);
  ctx.lineTo(posGameX * 0.15, posGameY * 0.07);
  ctx.lineTo(posGameX * 0.15, posGameY * 0.15);
  ctx.fill();

  ctx.stroke();
  ctx.closePath();
  //выход
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#5A5F60";
  ctx.moveTo(posGameX * 0.15, posGameY * 0.15);
  ctx.lineTo(posGameX * 0.15, posGameY * 0.09);
  ctx.lineTo(posGameX * 0.17, posGameY * 0.09);
  ctx.lineTo(posGameX * 0.17, posGameY * 0.16);
  ctx.lineTo(posGameX * 0.21, posGameY * 0.2);
  ctx.lineTo(posGameX * 0.21, posGameY * 0.03);
  ctx.lineTo(posGameX * 0.17, posGameY * 0.09);
  //окно
  ctx.moveTo(posGameX * 0.17, posGameY * 1.6);
  ctx.lineTo(posGameX * 0.21, posGameY * 1.62);
  ctx.stroke();

  //склон  4 шт
  var posY = [0, 0.215, 0, 0.215];
  var posX = {
    0: { 0: 0, 1: 0.11, 2: 0.2, 3: 0.165, 4: 0.165 },
    1: { 0: 0, 1: 0.11, 2: 0.2, 3: 0.165, 4: 0.165 },
    2: { 0: 1, 1: 0.89, 2: 0.8, 3: 0.835, 4: 0.835 },
    3: { 0: 1, 1: 0.89, 2: 0.8, 3: 0.835, 4: 0.835 }
  };
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#6B4C21";
  for (i = 0; i < 4; i++) {
    ctx.moveTo(posGameX * posX[i][0], posGameY * (0.27 + posY[i]));
    ctx.lineTo(posGameX * posX[i][1], posGameY * (0.27 + posY[i]));
    ctx.lineTo(posGameX * posX[i][2], posGameY * (0.385 + posY[i]));

    //подпорка
    ctx.moveTo(posGameX * posX[i][3], posGameY * (0.35 + posY[i]));
    ctx.lineTo(posGameX * posX[i][4], posGameY * (0.45 + posY[i]));
    ctx.stroke();
  }
  //забор
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.strokeStyle = "#6B4C21";
  ctx.moveTo(posGameX * 0.01, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.01, posGameY * 0.62);
  ctx.moveTo(posGameX * 0.043, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.043, posGameY * 0.62);
  ctx.moveTo(posGameX * 0.083, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.083, posGameY * 0.62);

  ctx.moveTo(posGameX * 0.120, posGameY * 0.52);
  ctx.lineTo(posGameX * 0.120, posGameY * 0.645);
  ctx.moveTo(posGameX * 0.152, posGameY * 0.55);
  ctx.lineTo(posGameX * 0.152, posGameY * 0.675);
  ctx.fillStyle = "#6B4C21";
  ctx.stroke();

  //забор
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.strokeStyle = "#6B4C21";
  ctx.moveTo(posGameX * 0.99, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.99, posGameY * 0.62);
  ctx.moveTo(posGameX * 0.957, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.957, posGameY * 0.62);
  ctx.moveTo(posGameX * 0.917, posGameY * 0.495);
  ctx.lineTo(posGameX * 0.917, posGameY * 0.62);
  ctx.moveTo(posGameX * 0.88, posGameY * 0.52);
  ctx.lineTo(posGameX * 0.88, posGameY * 0.645);
  ctx.moveTo(posGameX * 0.848, posGameY * 0.55);
  ctx.lineTo(posGameX * 0.848, posGameY * 0.675);
  ctx.fillStyle = "#6B4C21";
  ctx.stroke();

  //куст
  var setRad = [20, 8, 8, 20, 8]; //радиусы большого круга для отрисовки кустов
  var flag = 1;
  var setX = [1, 2.95, 16.7, 18.8, 18.8], setY = [1, 1.04, 1.04, 1, 0.1]; //смещение кустов по оси х, у
  ctx.beginPath();
  ctx.lineWidth = 1;
  for (var i = 0; i < 5; i++) //всего 4 куста в ряд
  {
    ctx.moveTo(posGameX * 0.05 * setX[i] + setRad[i], posGameY * 0.7 * setY[i]);
    ctx.arc(posGameX * 0.05 * setX[i], posGameY * 0.7 * setY[i], setRad[i], 0, Math.PI * 2, true);
    for (var j = 0; j < 12; j++) {
      var degX = posGameX * 0.05 * setX[i] - setRad[i] * Math.sin(360 / 12 / 180 * Math.PI * (j + 1));
      var degY = posGameY * 0.7 * setY[i] - setRad[i] * Math.cos(360 / 12 / 180 * Math.PI * (j + 1));
      ctx.moveTo(degX, degY);
      ctx.arc(degX, degY, 5 + flag, 0, Math.PI * 2, true);
      flag = flag + 1;
      if (flag == 3)
        flag = flag + 3;
      if (flag == 7)
        flag = 2;
    }
    flag = 1;
    ctx.fillStyle = "#2C390B";
    ctx.fill();
  }


  //большая трава
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#2C390B";
  var flag = 0;
  for (var i = 0; i < 2; i++) {
    x = 0;
    if (i == 1)
      flag = 0.8;
    ctx.moveTo(posGameX * (flag), posGameY * 0.85);
    for (var j = 1; j < 4; j++) {
      ctx.lineTo(posGameX * (0.01 + x + flag), posGameY * 0.88);
      ctx.lineTo(posGameX * (0.02 + x + flag), posGameY * 0.86);
      ctx.lineTo(posGameX * (0.05 + x + flag), posGameY * 0.88);
      ctx.lineTo(posGameX * (0.09 + x + flag), posGameY * 0.86);
      ctx.lineTo(posGameX * (0.11 + x + flag), posGameY * 0.89);
      ctx.lineTo(posGameX * (0.15 + x + flag), posGameY * 0.86);
      ctx.lineTo(posGameX * (0.16 + x + flag), posGameY * 0.89);
      x = j * 0.015;
    }
    ctx.lineTo(posGameX * (0.01 + flag), posGameY * 0.89);
    ctx.fill();
    ctx.stroke();
  }
  //трава 4 шт. по центру
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#2C390B";
  var flag = 1, x;
  var sdvigX = [0.1, 0.25, 0.4, 0.3];
  var sdvigY = [0, 0.053, 0, 0.09];
  for (var i = 0; i < 4; i++) {
    x = 0;
    if (i == 3)
      flag = 0.8;
    ctx.moveTo(posGameX * (0.186 + sdvigX[i]), posGameY * (0.89 * flag + sdvigY[i]));//3
    for (var j = 0; j < 2; j++) {
      ctx.lineTo(posGameX * (0.186 + x + sdvigX[i]), posGameY * (0.91 * flag + sdvigY[i]));//-0.1
      ctx.lineTo(posGameX * (0.195 + x + sdvigX[i]), posGameY * (0.89 * flag + sdvigY[i]));//3
      ctx.lineTo(posGameX * (0.201 + x + sdvigX[i]), posGameY * (0.91 * flag + sdvigY[i]));//3
      ctx.lineTo(posGameX * (0.211 + x + sdvigX[i]), posGameY * (0.89 * flag + sdvigY[i]));//3
      ctx.lineTo(posGameX * (0.224 + x + sdvigX[i]), posGameY * (0.91 * flag + sdvigY[i]));//3
      ctx.lineTo(posGameX * (0.235 + x + sdvigX[i]), posGameY * (0.89 * flag + sdvigY[i]));//3
      ctx.lineTo(posGameX * (0.241 + x + sdvigX[i]), posGameY * (0.91 * flag + sdvigY[i]));
      x = x + 0.055; //0.19 - разница между х-ми первой и последней точки
    }
    ctx.lineTo(posGameX * (0.186 + sdvigX[i]), posGameY * (0.91 * flag + sdvigY[i]));
    ctx.fill();
    ctx.stroke();
  }
}

function control1(event) {
  eo = window.event;
  eo.preventDefault();
  control_event();
  document.getElementById('gameA').style.opacity = 1;
  document.getElementById('ochki').style.opacity = 1;
  document.getElementById('control_4').style.background = 'red';
  document.getElementById('control_8').style.background = 'black';
  timerStart = 1;
  controlSec = 3;

  recordVal.numGame.shtraf = 0;
  recordVal.numGame.ball = 0;

  var getTime = get_time();
  recordVal.numGame.timeStart = str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);
  //numGame = num + 1; 
  left_top();
}
function control2(event) {
  eo = window.event;
  eo.preventDefault();
  control_event();
  document.getElementById('gameB').style.opacity = 1;
  document.getElementById('ochki').style.opacity = 1;
  document.getElementById('control_4').style.background = 'black';
  document.getElementById('control_8').style.background = 'red';
  timerStart = 2;
  controlSec = 2;
 
  recordVal.numGame.shtraf = 0;
  recordVal.numGame.ball = 0;
  var getTime = get_time();
  recordVal.numGame.timeStart = str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);
  left_top();
}
function control_event(){

  var but1 = document.getElementById('but1');
  var but2 = document.getElementById('but2');
  var but3 = document.getElementById('but3');
  var but4 = document.getElementById('but4');

  but1.addEventListener('touchstart', left_top, false);
  but2.addEventListener('touchstart', left_bot, false);
  but3.addEventListener('touchstart', right_top, false);
  but4.addEventListener('touchstart', right_bot, false); 

  document.addEventListener('keydown', but_press, false);


  var imgs = document.getElementsByClassName('imgsGame');
  for(var i=0; i<imgs.length; i++)
    imgs[i].style.opacity = 0;
  var imgs = document.getElementsByClassName('chiken');
  for(var i=0; i<imgs.length; i++)
    imgs[i].style.opacity = 1;

}


function but_press(event){
 eo = window.event;
 eo.preventDefault();

 if(eo.code === 'ShiftLeft') 
    left_top();
 if(eo.code === 'ControlLeft')
    left_bot();
 if(eo.code === 'ArrowUp')
    right_top(eo);
 if(eo.code === 'ArrowDown')
    right_bot(eo);

}
function left_top(){
    var volk = document.getElementsByClassName('volk');
    var hend = document.getElementsByClassName('hend');
    volk[1].style.opacity = 1;
    volk[0].style.opacity = 0;
      for(var i=0; i<hend.length; i++)
          hend[i].style.opacity = 0;
      hend[0].style.opacity = 1;
}
function left_bot(){
  eo = window.event;
  eo.preventDefault();
    var volk = document.getElementsByClassName('volk');
    var hend = document.getElementsByClassName('hend');
    volk[1].style.opacity = 1;
    volk[0].style.opacity = 0;
    for(var i=0; i<hend.length; i++)
      hend[i].style.opacity = 0;
    hend[3].style.opacity = 1; 
}
function right_top(event){
  eo = window.event;
  eo.preventDefault();
    var volk = document.getElementsByClassName('volk');
    var hend = document.getElementsByClassName('hend');
    volk[0].style.opacity = 1;
    volk[1].style.opacity = 0;
    for(var i=0; i<hend.length; i++)
      hend[i].style.opacity = 0;
    hend[2].style.opacity = 1; 
}
function right_bot(event){
  eo = window.event;
  eo.preventDefault();
    var volk = document.getElementsByClassName('volk');
    var hend = document.getElementsByClassName('hend');
    volk[0].style.opacity = 1;
    volk[1].style.opacity = 0;
    for(var i=0; i<hend.length; i++)
      hend[i].style.opacity = 0;
    hend[1].style.opacity = 1;  
}
function for_control3(){
  document.getElementById('curTime').style.opacity = 1;
  timerStart = 4;
}
function get_time(){
  const currTime=new Date();
  var full_time = {};
  full_time.hour = currTime.getHours();
  full_time.min = currTime.getMinutes();
  full_time.sec = currTime.getSeconds();
  full_time.msec = currTime.getMilliseconds()/1000;
  return full_time;
}
function control3() {
  var time_control = get_time();
 // const currTime=new Date();
 
  var hour = time_control.hour;
  var min = time_control.min;
  var sec = time_control.sec;
  var msec = time_control.msec;
  //alert(msec +"$"+ sec);
 // console.log('msec', msec);
  if(msec < 0.26)
    msec = 0.25;
    else if(msec > 0.25 && msec < 0.51)
      msec = 0.5;
      else if(msec > 0.5 && msec < 0.76)
        msec = 0.75;
        else if(msec > 0.75)
          msec = 0;
  document.getElementById('curTime').innerText = str0l(hour,2) + ':' + str0l(min,2)+ ':' + str0l(sec,2);
 // }
 return sec+ msec;
}
function str0l(val,len) {
  let strVal=val.toString();
  while (strVal.length < len)
      strVal='0'+strVal;
  return strVal;
}
function randomDiap(n,m) {
  return Math.floor(Math.random()*(m-n+1))+n;
}

function createTimerPromiseZaya(obj, obj_next, val, time, result) {

  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        flagZaya = val;
        obj.style.opacity = val;
        obj_next.style.opacity = val;
        resolve(result);
        if(!obj || !obj_next)
          reject("ошибка!!!"); 
      }, 1000*time);
  });

}
function zayac_move(timerStart, sec){
  if(timerStart === 1 || timerStart === 2) //если игра запущена
  {
  var zaya = document.getElementById('zayac');
  var hends = document.getElementsByClassName('hend_z'); 
  var rand = randomDiap(0,1); //разные руки зайца
  
  if(sec % 24 === 0)
    {
      createTimerPromiseZaya(zaya, hends[rand], 1, 4, 2)
      .then( result => {
        return createTimerPromiseZaya(zaya, hends[rand], 0, 2, 3);
        })  
      .catch( error => {
        console.log("случилась ошибка: "+error);
      });
   }
 }   
}

function createTimerPromise(obj, obj_next, time, result) {

  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        obj.style.opacity = 0;
        obj_next.style.opacity = 1;
        soundClickEg();
        resolve(result);
        if(result === 10)
          reject("игра окончена!!!"); 
      }, 1000/time);
  });

}

function createTimerPromise2(obj_next, result) {

  return new Promise( (resolve,reject) => {
     setTimeout( () => {
      if(obj_next)
      {
        obj_next.style.opacity = 0;
        resolve(result);
      }
       if(!obj_next)
         reject("игра окончена!!!"); 
     }, 1000/2);
 });

}

function gameA(timerStart, sec){
  if(timerStart === 1  && sec % controlSec === 0)//на стартке: 1 в 3 сек
  {
    //игра А. В зависимости от кол-ва штрафных очков - используются разные склоны
    var num_sklon = {
      0:{0:1, 1:2, 2:4},
      0.5:{0:1, 1:2, 2:4},
      1:{0:1, 1:2, 2:3},
      1.5:{0:1, 1:2, 2:3},
      2:{0:2, 1:3, 2:4},
      2.5:{0:2, 1:3, 2:4},
    };
    if(recordVal.numGame.shtraf < 3.5)
    {
    var num = num_sklon[recordVal.numGame.shtraf][randomDiap(0,2)];  
      game(num);
    } 
    else 
    timerStart = 0;
  }
}
function gameB(timerStart, sec){
  if(timerStart === 2 && sec % controlSec === 0)
  {
    //игра B. Используются все лотки произвольно
    var num_sklon = {
      0:{0:1, 1:2, 2:3, 3:4}
    };
    var num = num_sklon[0][randomDiap(0,3)];
    if(recordVal.numGame.shtraf < 3.5)
      game(num);
    else 
    timerStart = 0;
  }
}
function game(num)
{
  var eg1 = document.getElementsByClassName('eg_left_top');
  var eg2 = document.getElementsByClassName('eg_left_bot');
  var eg3 = document.getElementsByClassName('eg_right_top');
  var eg4 = document.getElementsByClassName('eg_right_bot');
  var bd1 = document.getElementById('bdyj_left1');
  var bd2 = document.getElementById('bdyj_left2');    
  var bd3 = document.getElementById('bdyj_right1');
  var bd4 = document.getElementById('bdyj_right2');
  var cypL = document.getElementsByClassName('cyplenok_left');
  var cypR = document.getElementsByClassName('cyplenok_right');
  var hend = document.getElementsByClassName('hend');
  var eg = {
      1:{"eg": eg1, "bd":bd1, "cyp":cypL, "hend": hend[0]},
      2:{"eg": eg2,"bd":bd2, "cyp":cypL, "hend": hend[3]},
      3:{"eg": eg3,"bd":bd3, "cyp":cypR, "hend": hend[2]},
      4:{"eg": eg4,"bd":bd4, "cyp":cypR, "hend": hend[1]}
  }
  move_ags(eg[num]);
}

function move_ags(newEg){
  (newEg.eg)[0].style.opacity = 1;
 createTimerPromise((newEg.eg)[0], (newEg.eg)[1], controlSec/2, 0)
      .then( result => {
        if(timerStart !=0)
          return createTimerPromise((newEg.eg)[1], (newEg.eg)[2], controlSec/2, 2)
        return createTimerPromise((newEg.eg)[1], (newEg.eg)[2], controlSec/2, 10)
        })   
        .then( result => {
          if(timerStart !=0)
            return createTimerPromise((newEg.eg)[2], (newEg.eg)[3],controlSec/2, 2)
          return createTimerPromise((newEg.eg)[2], (newEg.eg)[3],controlSec/2, 10)
          })  
          .then( result => {
            if(timerStart !=0)
              return createTimerPromise((newEg.eg)[3], (newEg.eg)[4],controlSec/2, 2)
            return createTimerPromise((newEg.eg)[3], (newEg.eg)[4],controlSec/2, 10)
            }) 
            .then( result => {
              if(timerStart !=0)
                return createTimerPromise2((newEg.eg)[4], 2)
              return createTimerPromise2(timerStart, 0)
              }) 
              .then( result => {
                if(timerStart !=0)
                {
                  if((newEg.hend).style.opacity === "1") 
                {
                  recordVal.numGame.ball = recordVal.numGame.ball + 1;
                    if(recordVal.numGame.ball === 200 || recordVal.numGame.ball === 500)  //обнуление штрафов при достижении некоторого кол-ва баллов
                    recordVal.numGame.shtraf = 0;
                    console.log("Очки: ", recordVal.numGame.ball);
                    return createTimerPromise2((newEg.eg)[4], 2)
                }
                else 
                {
                soundClick();
                newEg.bd.style.opacity = 1;
                    return move_bdyj(newEg);
                }}
                })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
      //скорость увеличивается и падает в зависимости от кол-ва баллов
      var ball_flag=0;
        if(recordVal.numGame.ball > 100)
          ball_flag = Array.from(recordVal.numGame.ball)[0] + '00';
      if(recordVal.numGame.ball < (26 + ball_flag))
        flagSec = controlSec;
        else if(recordVal.numGame.ball > (25 + ball_flag) && recordVal.numGame.ball < (51 + ball_flag))
          controlSec = flagSec - 0.5;
          else if(recordVal.numGame.ball > (50 + ball_flag) && recordVal.numGame.ball < (76 + ball_flag))
            controlSec = flagSec-1;
            else if(recordVal.numGame.ball > (75 + ball_flag) && recordVal.numGame.ball < (100 + ball_flag))
              controlSec = flagSec-1.5; 

  }
 function move_bdyj(newEg){
  createTimerPromise2(newEg.bd, 2)
      .then( result => {
        if(flagZaya === 1)
          {
            recordVal.numGame.shtraf = recordVal.numGame.shtraf + 0.5;
          move_cyp(newEg);
          flagZaya = 0;          
          }  
          else if(flagZaya === 0)
           {
            recordVal.numGame.shtraf = recordVal.numGame.shtraf + 1;
            window.navigator.vibrate(200);  
            }
      console.log("Штрафные:", recordVal.numGame.shtraf);            
      if(recordVal.numGame.shtraf > 2.5)
          timerStart = 0;   
       if(recordVal.numGame.shtraf >=  0.5)
        {
           document.getElementsByClassName('bant')[0].style.opacity = 1;
        }
        if(recordVal.numGame.shtraf >=  1.5)
          {
             document.getElementsByClassName('bant')[1].style.opacity = 1;
          }
          if(recordVal.numGame.shtraf >=  2.5)
            {
               document.getElementsByClassName('bant')[2].style.opacity = 1;
            }
      if(recordVal.numGame.shtraf > 2.5)
      {
        timerStart = 0;         
        document.getElementById('game_over').style.opacity = 1;
        var getTime = get_time();
        recordVal.numGame.timeEnd = str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);
        records_game(recordVal);
        return true;
      }             
        })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
     
 } 
function move_cyp(newEg){
    createTimerPromise(newEg.bd, (newEg.cyp)[0], controlSec, 2)
    .then( result => {
      return createTimerPromise((newEg.cyp)[0], (newEg.cyp)[1],controlSec, 2)
      })  
      .then( result => {
        return createTimerPromise((newEg.cyp)[1], (newEg.cyp)[2],controlSec, 2)
        }) 
        .then( result => {
          return createTimerPromise((newEg.cyp)[2], (newEg.cyp)[3],controlSec, 2)
          }) 
          .then( result => {
            return createTimerPromise2((newEg.cyp)[3], 2)
            }) 
.catch( error => {
console.log("случилась ошибка: "+error);
});
}
function soundClickEg() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/eg.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
function soundClick() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'audio/bdyj.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
function records_game(record){
  var rec_table = document.querySelectorAll("#recVal tbody")[0];
  var nextTr = document.createElement("tr");
 num = num + 1;

 
  var tdNumer = document.createElement("td");
  tdNumer.innerHTML = num;

  var tdBall = document.createElement("td");
  tdBall.innerHTML = record.numGame.ball;


  var tdShtraf = document.createElement("td");
  tdShtraf.innerHTML = record.numGame.shtraf;


  var tdStart = document.createElement("td");
  tdStart.innerHTML = record.numGame.timeStart;
  


  var tdEnd = document.createElement("td");
  tdEnd.innerHTML = record.numGame.timeEnd;



  nextTr.appendChild(tdNumer);
  nextTr.appendChild(tdBall);
  nextTr.appendChild(tdShtraf);
  nextTr.appendChild(tdStart);
  nextTr.appendChild(tdEnd);
  rec_table.appendChild(nextTr);
}
function show_records(){
 
  timerStart = 0;
  var recGame = document.getElementById('records');
      recGame.style.transition = "0.8s ease";
      recGame.style.zIndex = 100;
      recGame.style.opacity = 1; 
  document.getElementById('place_game_in').style.opacity = 0;
  document.getElementById('game_canvas').style.opacity = 0;
  var gameSVG = document.getElementsByTagName('svg');
      for(var i=0; i<gameSVG.length; i++)
        gameSVG[i].style.opacity = 0;
}
function showGame(){
  timerStart = 0;
  var recGame = document.getElementById('records');

document.getElementById('records').style.opacity = 0;
recGame.style.height = "0px"; 
recGame.style.zIndex = 1;
 document.getElementById('place_game_in').style.opacity = 1;
 document.getElementById('game_canvas').style.opacity = 1;
  var gameSVG = document.getElementsByTagName('svg');
      for(var i=0; i<gameSVG.length; i++)
      {
        gameSVG[i].style.opacity = 1;
        gameSVG[i].style.transition = "0.8s ease";  
      }  
  document.getElementById('place_game_in').style.transition = "0.8s ease";  
  document.getElementById('game_canvas').style.transition = "0.8s ease";  
}
function volk_move(timerStart){
  if(timerStart === 4)
  {
    var eg1 = document.getElementById("eg5_left_top").style.opacity;
    var eg2 = document.getElementById("eg5_left_bot").style.opacity;
    var eg3 = document.getElementById("eg5_right_top").style.opacity;
    var eg4 = document.getElementById("eg5_right_bot").style.opacity;
    if(eg1 === "1")
      left_top();
    else if(eg2 === "1")
      left_bot();
    else if(eg3 === "1")
      right_top();
    else if(eg4 === "1")
      right_bot();
  }
}
function preview_game(timerStart, sec){
  
  if(timerStart === 4)
  {
    control_event();
    controlSec = 3;
    gameA(timerStart, sec);
    volk_move(timerStart);
  } 

}




//----AJAX
function storeInfo() {
  updatePassword=Math.random();
  $.ajax({
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'LOCKGET', n : stringName, p : updatePassword },
          success : lockGetReady, error : errorHandler
      }
  );
}

function lockGetReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else {
      const info={
          name : 'game',
          age : recordVal
      };

      $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'UPDATE', n : stringName,
                  v : JSON.stringify(info), p : updatePassword },
              success : updateReady, error : errorHandler
          }
      );
      alert('Данные оттправлены на сервер!');
  }
}

function updateReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
}

function restoreInfo() {
  $.ajax(
      {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'READ', n : stringName },
          success : readReady, error : errorHandler
      }
  );
}

function readReady(callresult) {
  if ( callresult.error!=undefined )
      alert(callresult.error);
  else if ( callresult.result!="" ) {
      const info=JSON.parse(callresult.result);
      records_game(info.age);
      
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
function showModal(){
  var myDialod = document.getElementById('modal_win');
  
  myDialod.show();
  updateSlider();
}
function closeModal(){
  var myDialod = document.getElementById('modal_win');
  
  myDialod.close();
}
//слайдер
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
/*for mini*/ 

const sliderMIN = document.querySelector('.slider-min');
const slidesMIN = Array.from(sliderMIN.querySelectorAll('img'));
const prevButtonMIN = document.querySelector('.prev-button-min');
const nextButtonMIN = document.querySelector('.next-button-min');



const slideCount = slides.length;
const slideCountMIN = slidesMIN.length;
var slideIndex = 0;
var slideIndexMIN = 0;
var infoImg = {
  0: 'лапа волка идет вверх и влево - Shift/touch',
  1: 'лапа волка идет вверх и вправо - стрелка вверх/touch',
  2: 'лапа волка идет вниз и влево - Ctrl/touch',
  3: 'лапа волка идет вниз и вправо - стрелка вниз/touch',
  4: 'выбрать режим игры "А" - click мышью/touch',
  5: 'выбрать режим игры "B" - click мышью/touch',
  6: 'выбрать "Bремя" - click мышью/touch',
  7: 'показать общие результаты игры" - двойной click мышью "Bремя"'
};
slidesMIN[slideIndex].style.border = '2px solid white';


// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
prevButtonMIN.addEventListener('click', showPreviousSlide);
nextButtonMIN.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSliderMIN();
}
/*2*/ 
// Функция для показа предыдущего слайда
function showPreviousSlideMIN() {
  slideIndexMIN = (slideIndexMIN - 1 + slideCountMIN) % slideCountMIN;
  updateSliderMIN();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}
/*2 */
// Функция для показа следующего слайда
function showNextSlideMIN() {
  slideIndexMIN = (slideIndexMIN + 1) % slideCountMIN;
  updateSliderMIN();
}
// Функция для обновления отображения слайдера
function updateSlider() {
  var scrollLeft = slidesMIN.scrollLeft;
  var textImg = document.getElementById('mainText');
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
      textImg.innerText = 'Управление игрой: ' + infoImg[index];
      slidesMIN.forEach((element) => 
        element.style.border = 'none');
      slidesMIN[slideIndex].style.border = '2px solid white';
    } else {
      slide.style.display = 'none';
    }
  });
}

/*2 */
// Функция для обновления отображения слайдера
function updateSliderMIN() {
  slidesMIN.forEach((slideMIN, index) => {
    if (index === slideIndexMIN) {; 
        slideIndex = slideIndexMIN;     
        updateSlider();
    } 
  });
}

slidesMIN.forEach((slideMIN, index) => {
  slideMIN.addEventListener('click', () => {
    slideIndex = index;     
        updateSlider();
    console.log(index);
    });
});