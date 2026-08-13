//npx serve
const DOM = {
    instruction: null,
    layer4: null,
    canvas: null,
    gameA: null,
    ochki: null,
    control4: null,
    control_8: null,
    gameB: null,
    but1: null,
    but2: null,
    but3: null,
    but4: null,
    imgsGame: null,
    imgsChiken: null,
    eg1: null,
    eg2: null,
    eg3: null,
    eg4: null,
    but3: null,
    but4: null,
    bd1: null,
    bd2: null,
    bd3: null,
    bd4: null,    
    cypL: null,
    cypR: null,
    hend: null, 
    bant: null,
    gameOver: null  
};

window.addEventListener('load', () => {
  add_svg();
  addGame();
});

import { add_svg } from '../utils/add_svg.js'; 

window.addEventListener('resize', () => {
  addGame();
  const recGame = document.getElementById('records');
  if(recGame.style.opacity === '0' || recGame.style.opacity === "") 
    add_svg(); 
});

document.addEventListener('DOMContentLoaded', () => {
    const btn1 = document.getElementById('control_1');
    if (btn1) {
        // Назначаем выполнение нужного метода
        btn1.addEventListener('click', (event) => {control1(event);});
        btn1.addEventListener('touchstart', (event) => {control1(event);});
    }
    const btn2 = document.getElementById('control_5');
    if (btn2) {
        // Назначаем выполнение нужного метода
        btn2.addEventListener('click', (event) => {control2(event);});
        btn2.addEventListener('touchstart', (event) => {control2(event);});
    }

    const btn3 = document.getElementById('control_9');
    if (btn3) {
        // Назначаем выполнение нужного метода
        btn3.addEventListener('click', (event) => {for_control3(event);});
        btn3.addEventListener('dblclick', (event) => {records.showRecords();});  
        btn3.addEventListener('touchstart', (event) => {for_control3(event);});           
    }
    const btn4 = document.getElementById('but_close_modal');
    if (btn4) {
        // Назначаем выполнение нужного метода
        btn4.addEventListener('click', (event) => {closeModal();});
        btn4.addEventListener('touchstart', (event) => {closeModal();});           
    }   
     const btn5 = document.getElementById('submit_val');
    if (btn5) {
        // Назначаем выполнение нужного метода
        btn5.addEventListener('click', (event) => {records.saveRecord();});
        btn5.addEventListener('touchstart', (event) => {records.saveRecord();});           
    }  
    const btn6 = document.getElementById('close_form');
    if (btn6) {
        // Назначаем выполнение нужного метода
        btn6.addEventListener('click', (event) => {records.refreshTable();});
        btn6.addEventListener('touchstart', (event) => {records.refreshTable();});           
    }  
    const btn7 = document.getElementById('icon');
    if (btn7) {
        // Назначаем выполнение нужного метода-Инструкция
        btn7.addEventListener('click', (event) => {showModal();});
        btn7.addEventListener('touchstart', (event) => {showModal();});           
    } 
    const btn8 = document.getElementById('top_menu_close');
    if (btn8) {
        // Назначаем выполнение нужного метода - закрыть Рекорды
        btn8.addEventListener('click', (event) => {records.closeRecords();});
        btn8.addEventListener('touchstart', (event) => {records.closeRecords();});           
    }     

DOM.instruction = document.getElementById('modal_win');
DOM.layer4 = document.getElementById('for_game_layer4');
DOM.canvas = document.getElementById('game_canvas');
DOM.gameA = document.getElementById('gameA');
DOM.gameB = document.getElementById('gameB');
DOM.ochki = document.getElementById('ochki');
DOM.control4 = document.getElementById('control_4');
DOM.control8 = document.getElementById('control_8');
DOM.but1 = document.getElementById('but1');
DOM.but2 = document.getElementById('but2');
DOM.but3 = document.getElementById('but3');
DOM.but4 = document.getElementById('but4');
DOM.imgsGame = document.getElementsByClassName('imgsGame');
DOM.imgsChiken = document.getElementsByClassName('chiken');
DOM.eg1 = document.getElementsByClassName('eg_left_top');
DOM.eg2 = document.getElementsByClassName('eg_left_bot');
DOM.eg3 = document.getElementsByClassName('eg_right_top');
DOM.eg4 = document.getElementsByClassName('eg_right_bot');
DOM.bd1 = document.getElementById('bdyj_left1');
DOM.bd2 = document.getElementById('bdyj_left2');    
DOM.bd3 = document.getElementById('bdyj_right1');
DOM.bd4 = document.getElementById('bdyj_right2');
DOM.cypL = document.getElementsByClassName('cyplenok_left');
DOM.cypR = document.getElementsByClassName('cyplenok_right');
DOM.hend = document.getElementsByClassName('hend');
DOM.bant = document.getElementsByClassName('bant');
DOM.gameOver = document.getElementById('game_over');
});


import { add_canvas } from '../utils/add_canvas.js'; 
import { soundClickEg } from '../services/soundClick.js';
import { GameControls } from '../services/buttonController.js';
import { gameState } from '../core/gameState.js';
import { GameRandomizer } from '../utils/randomizer.js';
import { RecordsManager } from '../services/recordsManager.js';

const controls = new GameControls();
const randomizer = new GameRandomizer();
const records = new RecordsManager('recVal', 'records');

const soundEg = './audio/eg.mp3';
const soundBdj = 'audio/bdyj.mp3';
const stringName='GAME_INFO';

setInterval(get_size, 1000/4);
/* Вспомогательные и дополняющие функции */
function getRemInPixels() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
//работа со временем
function str0l(val,len) {
  let strVal=val.toString();
  while (strVal.length < len)
      strVal='0'+strVal;
  return strVal;
}
//рандом
function randomDiap(n,m) {
  return Math.floor(Math.random()*(m-n+1))+n;
}

//для работы с инструкцией
function showModal(){
  var myDialod = DOM.instruction;//document.getElementById('modal_win');
  myDialod.show();
}

function closeModal(){
  var myDialod = DOM.instruction;//document.getElementById('modal_win');
  myDialod.close();
}
/*------------------------------------------------ */
/*-------------------------------------------------*/
/* Основная часть */
function get_size(){

  var sec = control3();
  if (gameState.timerStart != 0)
    zayac_move(gameState.timerStart, sec);
  if (gameState.timerStart === 1 || gameState.timerStart === 0)
    gameA(gameState.timerStart, sec); //запуск игры А
  if (gameState.timerStart === 2 || gameState.timerStart === 0)
    gameB(gameState.timerStart, sec); //запуск игры Б

    DOM.ochki.innerText = gameState.recordVal.numGame.ball || 0;
}

function addGame() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
  const layer4 = DOM.layer4; 
  const canvas = DOM.canvas;
  if (!layer4 || !canvas) return;

  canvas.width = layer4.offsetWidth;
  canvas.height = layer4.offsetHeight;

  var sizePart = {
    gamePartW: canvas.width,
    gamePartH: canvas.height,
    remValue: rem 
  };
  add_canvas(sizePart);
}

function control1(event) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();
  DOM.gameA.style.opacity = 1;
  DOM.ochki.style.opacity = 1;
  DOM.control4.style.background = 'red';
  DOM.control8.style.background = 'black';
  gameState.timerStart = 1;
  gameState.controlSec = 3;

  gameState.recordVal.numGame.shtraf = 0;
  gameState.recordVal.numGame.ball = 0;

  const getTime = get_time();
  gameState.recordVal.numGame.timeStart = str0l(getTime.day,2) + '/' + str0l(getTime.month,2) +"_"+ str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);

  controls.leftTop();
}
function control2(event) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();
  DOM.gameB.style.opacity = 1;
  DOM.ochki.style.opacity = 1;
  DOM.control4.style.background = 'black';
  DOM.control8.style.background = 'red';
  gameState.timerStart = 2;
  gameState.controlSec = 2;
 
  gameState.recordVal.numGame.shtraf = 0;
  gameState.recordVal.numGame.ball = 0;
  const getTime = get_time();
  gameState.recordVal.numGame.timeStart = str0l(getTime.day,2) + '/' + str0l(getTime.month,2) +"_"+ str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);

  controls.leftTop();
}
function control_event(){

DOM.but1.addEventListener('touchstart', controls.leftTop, false);
DOM.but2.addEventListener('touchstart', controls.leftBot, false);
DOM.but3.addEventListener('touchstart', controls.rightTop, false);
DOM.but4.addEventListener('touchstart', controls.rightBot, false); 
  document.addEventListener('keydown', but_press, false);

  for(var i=0; i<DOM.imgsGame.length; i++)
    DOM.imgsGame[i].style.opacity = 0;

  for(var i=0; i<DOM.imgsChiken.length; i++)
    DOM.imgsChiken[i].style.opacity = 1;
}

function but_press(event){
const eo = event || window.event; 
  if (eo && typeof eo.preventDefault === 'function') {
      eo.preventDefault();
  }

 if(eo.code === 'ShiftLeft') 
    controls.leftTop(eo);
 if(eo.code === 'ControlLeft')
    controls.leftBot(eo);
 if(eo.code === 'ArrowUp')
   controls.rightTop(eo);
 if(eo.code === 'ArrowDown')
  controls.rightBot(eo);

}
function for_control3(){
  document.getElementById('curTime').style.opacity = 1;
  gameState.timerStart = 4;
}
function get_time(){
  const currTime=new Date();
  var full_time = {};
  full_time.day = currTime.getDay();
  full_time.month = currTime.getMonth();
  full_time.hour = currTime.getHours();
  full_time.min = currTime.getMinutes();
  full_time.sec = currTime.getSeconds();
  full_time.msec = currTime.getMilliseconds()/1000;
  return full_time;
}

function control3() {
  const time_control = get_time();
  const hour = time_control.hour;
  const min = time_control.min;
  const sec = time_control.sec;
  let msec = time_control.msec;
  if(msec < 0.26)
    msec = 0.25;
    else if(msec > 0.25 && msec < 0.51)
      msec = 0.5;
      else if(msec > 0.5 && msec < 0.76)
        msec = 0.75;
        else if(msec > 0.75)
          msec = 0;
  document.getElementById('curTime').innerText = str0l(hour,2) + ':' + str0l(min,2)+ ':' + str0l(sec,2);

 return sec+ msec;
}

function createTimerPromiseZaya(obj, obj_next, val, time, result) {

  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        gameState.flagZaya = val;
        obj.style.opacity = val;
        obj_next.style.opacity = val;
        resolve(result);
        if(!obj || !obj_next)
          reject("ошибка!!!"); 
      }, 1000*time);
  });

}
function zayac_move(timerStart, sec){
  if(gameState.timerStart === 1 || gameState.timerStart === 2) //если игра запущена
  {
  const zaya = document.getElementById('zayac');
  const hends = document.getElementsByClassName('hend_z'); 
  const rand = randomDiap(0,1); //разные руки зайца
  
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
        soundClickEg(soundEg)
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
  if(gameState.timerStart === 1  && sec % gameState.controlSec === 0)//на стартке: 1 в 3 сек
  {
    //игра А. В зависимости от кол-ва штрафных очков - используются разные склоны
    const num_sklon = {
      0:{0:1, 1:2, 2:4},
      0.5:{0:1, 1:2, 2:4},
      1:{0:1, 1:2, 2:3},
      1.5:{0:1, 1:2, 2:3},
      2:{0:2, 1:3, 2:4},
      2.5:{0:2, 1:3, 2:4},
    };
    if(gameState.recordVal.numGame.shtraf < 3.5)
    {
      const randomIndex = randomizer.getNextIndex(); 
      const num = num_sklon[gameState.recordVal.numGame.shtraf][randomIndex];
      game(num);
    } 
    else 
    gameState.timerStart = 0;
  }
}
function gameB(timerStart, sec){
  if(gameState.timerStart === 2 && sec % gameState.controlSec === 0)
  {
    //игра B. Используются все лотки произвольно
    const num_sklon = {
      0:{0:1, 1:2, 2:3, 3:4}
    };
    const num = num_sklon[0][randomDiap(0,3)];
    if(gameState.recordVal.numGame.shtraf < 3.5)
      game(num);
    else 
    gameState.timerStart = 0;
  }
}
function game(num)
{
  const eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
  }
  move_ags(eg[num]);
}

function move_ags(newEg){
  (newEg.eg)[0].style.opacity = 1;
  const egTimer=controlTimerGame(gameState.recordVal.numGame.ball, gameState.controlSec);
  createTimerPromise((newEg.eg)[0], (newEg.eg)[1], egTimer/2, 0)
      .then( result => {
        if(gameState.timerStart !=0)
          return createTimerPromise((newEg.eg)[1], (newEg.eg)[2], egTimer/2, 2)
        return createTimerPromise((newEg.eg)[1], (newEg.eg)[2], egTimer/2, 10)
        })   
        .then( result => {
          if(gameState.timerStart !=0)
            return createTimerPromise((newEg.eg)[2], (newEg.eg)[3],egTimer/2, 2)
          return createTimerPromise((newEg.eg)[2], (newEg.eg)[3],egTimer/2, 10)
          })  
          .then( result => {
            if(gameState.timerStart !=0)
              return createTimerPromise((newEg.eg)[3], (newEg.eg)[4],egTimer/2, 2)
            return createTimerPromise((newEg.eg)[3], (newEg.eg)[4],egTimer/2, 10)
            }) 
            .then( result => {
              if(gameState.timerStart !=0)
                return createTimerPromise2((newEg.eg)[4], 2)
              return createTimerPromise2(gameState.timerStart, 0)
              }) 
              .then( result => {
                if(gameState.timerStart !=0)
                {
                  if((newEg.hend).style.opacity === "1") 
                    {
                    gameState.recordVal.numGame.ball = gameState.recordVal.numGame.ball + 1;
                    if(gameState.recordVal.numGame.ball === 200 || gameState.recordVal.numGame.ball === 500)  //обнуление штрафов при достижении некоторого кол-ва баллов
                    gameState.recordVal.numGame.shtraf = 0;
                    return createTimerPromise2((newEg.eg)[4], 2)
                   }
                else 
                {
                soundClickEg(soundBdj);
                newEg.bd.style.opacity = 1;
                    return move_bdyj(newEg);
                }}
                })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
 }

 function controlTimerGame(ball, controlSec){
        //скорость увеличивается и падает в зависимости от кол-ва баллов
       let flagSec = 0, ball_flag = 0;

      if(ball > 100)
          ball_flag = Array.from(ball)[0] + '00';
      if(ball < (26 + ball_flag))
        flagSec = controlSec;
        else if(ball > (25 + ball_flag) && ball < (51 + ball_flag))
          flagSec = controlSec + 1;
          else if(ball > (50 + ball_flag) && ball < (76 + ball_flag))
            flagSec = controlSec + 2;
            else if(ball > (75 + ball_flag) && ball < (100 + ball_flag))
              flagSec = controlSec+3; 
             gameState.controlSec=flagSec;
      return  gameState.controlSec;    
 }

 function move_bdyj(newEg){
  createTimerPromise2(newEg.bd, 2)
      .then( result => {
        if(gameState.flagZaya === 1)
          {
            gameState.recordVal.numGame.shtraf = gameState.recordVal.numGame.shtraf + 0.5;
          move_cyp(newEg);
          gameState.flagZaya = 0;          
          }  
          else if(gameState.flagZaya === 0)
           {
            gameState.recordVal.numGame.shtraf = gameState.recordVal.numGame.shtraf + 1;
            window.navigator.vibrate(200);  
            }
      console.log("Штрафные:", gameState.recordVal.numGame.shtraf);            
      if(gameState.recordVal.numGame.shtraf > 2.5)
          gameState.timerStart = 0;   
      if(gameState.recordVal.numGame.shtraf >=  0.5)
           DOM.bant[0].style.opacity = 1;
      if(gameState.recordVal.numGame.shtraf >=  1.5)
            DOM.bant[1].style.opacity = 1;
      if(gameState.recordVal.numGame.shtraf >=  2.5)
            DOM.bant[2].style.opacity = 1;
      if(gameState.recordVal.numGame.shtraf > 2.5)
      {
        gameState.timerStart = 0;         
        DOM.gameOver.style.opacity = 1;
        const getTime = get_time();
        gameState.recordVal.numGame.timeEnd = str0l(getTime.hour,2) + ':' + str0l(getTime.min,2)+ ':' + str0l(getTime.sec,2);
        gameState.recStorage.addValue(gameState.recordVal.numGame.timeStart, gameState.recordVal.numGame);
        records.records_game(gameState.recordVal);
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


