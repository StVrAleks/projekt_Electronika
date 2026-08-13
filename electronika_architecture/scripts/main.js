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
    zaya: null,
    hends: null,
    curTime: null,
    gameOver: null  
};

import { add_svg } from '../utils/add_svg.js';
import { add_canvas } from '../utils/add_canvas.js'; 
import { gameState } from '../core/gameState.js';
import { soundClickEg } from '../services/soundClick.js';
import { GameControls } from '../services/buttonController.js';
import { GameRandomizer } from '../utils/randomizer.js';
import { RecordsManager } from '../services/recordsManager.js';
import { globalClearAllTimers } from  '../services/clearTimer.js';
import { TimerService } from '../services/timeService.js';
import { GAME_CONFIG } from '../core/gameConfig.js';


window.addEventListener('load', () => {
  add_svg();
  addGame();
});

window.addEventListener('resize', () => {
  addGame();
  const recGame = document.getElementById('records');
  if(recGame.style.opacity === '0' || recGame.style.opacity === "") 
    add_svg(); 
});

document.addEventListener('DOMContentLoaded', () => {
    const btn1 = document.getElementById('control_1');
    if (btn1) {
        // Запуск игры при нажатии на кнопку "Игра А"
        btn1.addEventListener('click', (event) => {control1(event);});
        btn1.addEventListener('touchstart', (event) => {control1(event);});
    }
    const btn2 = document.getElementById('control_5');
    if (btn2) {
        // Запуск игры Б при нажатии на кнопку "Игра Б"
        btn2.addEventListener('click', (event) => {control2(event);});
        btn2.addEventListener('touchstart', (event) => {control2(event);});
    }

    const btn3 = document.getElementById('control_9');
    if (btn3) {
        // при нажатии на кнопку "Время" или двойное нажатие для отображения рекордов
        btn3.addEventListener('click', (event) => {for_control3(event);});
        btn3.addEventListener('dblclick', (event) => {records.showRecords();});  
        btn3.addEventListener('touchstart', (event) => {for_control3(event);});           
    }
    const btn4 = document.getElementById('but_close_modal');
    if (btn4) {
        // Закрываем модальное окно с инструкцией игры
        btn4.addEventListener('click', (event) => {DOM.instruction.close();});
        btn4.addEventListener('touchstart', (event) => {DOM.instruction.close();});           
    }   
     const btn5 = document.getElementById('submit_val');
    if (btn5) {
        // Нажатие кнопки "Сохранить" в таблице рекордов для добавления текущей игры в общую таблицу
        btn5.addEventListener('click', (event) => {records.saveRecord();});
        btn5.addEventListener('touchstart', (event) => {records.saveRecord();});           
    }  
    const btn6 = document.getElementById('close_form');
    if (btn6) {
        // Обновление таблицы рекордов 
        btn6.addEventListener('click', (event) => {records.refreshTable();});
        btn6.addEventListener('touchstart', (event) => {records.refreshTable();});           
    }  
    const btn7 = document.getElementById('icon');
    if (btn7) {
        // Нажатие на кнопку 'i' показывает инструкцию пользователя
        btn7.addEventListener('click', (event) => {DOM.instruction.show();});
        btn7.addEventListener('touchstart', (event) => {DOM.instruction.show();});           
    } 
    const btn8 = document.getElementById('top_menu_close');
    if (btn8) {
        // Нажатие "х" над таблицей рекордов закрывает таблицу рекордов
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
DOM.zaya = document.getElementById('zayac');
DOM.hends = document.getElementsByClassName('hend_z'); 
DOM.curTime = document.getElementById('curTime');

});

const controls = new GameControls();
const randomizer = new GameRandomizer();
const records = new RecordsManager('recVal', 'records');
const timeInGame = new TimerService();

const soundEg = './audio/eg.mp3';
const soundBdj = 'audio/bdyj.mp3';

gameState.gameIntervalId = setInterval(get_size, GAME_CONFIG.TICK_RATE);
/*-------------------------------------- */
/* Вспомогательные и дополняющие функции */
/*-------------------------------------- */
function controlMove(numEgg, numEggNext, timerVal, status, statusFalse){
// Если игра остановлена или переключена в режим "Время", прерываем цепочку
  if (gameState.timerStart === 0 || gameState.timerStart === 4) {
    numEgg.style.opacity = 0; // На всякий случай тушим текущий лоток
    return Promise.reject("Игра принудительно остановлена");
  }

  if(gameState.timerStart !=0 && gameState.timerStart != 4)
      return createTimerPromise(numEgg, numEggNext,timerVal, status)
    return createTimerPromise(numEgg, numEggNext,timerVal, statusFalse)
}
/*------------------------------------------------ */
/* Основная часть */
/*-------------------------------------------------*/
function get_size(){

  var sec = control3();
  if (gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
    zayac_move(gameState.timerStart, sec);
  if (gameState.timerStart === GAME_CONFIG.STATES.GAME_A || gameState.timerStart === GAME_CONFIG.STATES.STOPPED)
    gameA(gameState.timerStart, sec); //запуск игры А
  if (gameState.timerStart === GAME_CONFIG.STATES.GAME_B || gameState.timerStart === GAME_CONFIG.STATES.STOPPED)
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
  if(gameState.timerStart === 2)
    globalClearAllTimers();
  DOM.gameA.style.opacity = 1;
  DOM.ochki.style.opacity = 1;
  DOM.control4.style.background = 'red';
  DOM.control8.style.background = 'black';
  gameState.timerStart = 1;
  gameState.controlSec = 3;

  gameState.recordVal.numGame.shtraf = 0;
  gameState.recordVal.numGame.ball = 0;

  gameState.recordVal.numGame.timeStart = timeInGame.getFormattedTime();

  controls.leftTop();
}
function control2(event) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();

  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A)
    globalClearAllTimers();
  DOM.gameB.style.opacity = 1;
  DOM.ochki.style.opacity = 1;
  DOM.control4.style.background = 'black';
  DOM.control8.style.background = 'red';
  gameState.timerStart = 2;
  gameState.controlSec = 2;
 
  gameState.recordVal.numGame.shtraf = 0;
  gameState.recordVal.numGame.ball = 0;
  gameState.recordVal.numGame.timeStart = timeInGame.getFormattedTime();

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

  DOM.curTime.style.opacity = 1;
  gameState.timerStart = GAME_CONFIG.STATES.SHOW_TIME;  
  controls.hiddenVolk(); 
  globalClearAllTimers(); 
  control3();   
}

function control3() {

timeInGame.update(); 
DOM.curTime.innerText = timeInGame.getFormattedTime();
DOM.curTime.style.opacity = 1;
return timeInGame.getGameSecond();

}

function createTimerPromiseZaya(obj, obj_next, val, time, result) {

  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        if(!obj || !obj_next)
          reject("ошибка!!!");         
        gameState.flagZaya = val;
        obj.style.opacity = val;
        obj_next.style.opacity = val;
        resolve(result);
      }, 1000*time);
  });

}
function zayac_move(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A || gameState.timerStart === GAME_CONFIG.STATES.GAME_B) //если игра запущена
  {
  const rand = randomizer.getIndexFromTwo(); //разные руки зайца 
  if(sec % 24 === 0)
    {
      createTimerPromiseZaya(DOM.zaya, DOM.hends[rand], GAME_CONFIG.TIMER_PROMISE_ZAYA_VISIBLE, GAME_CONFIG.TIMER_PROMISE_ZAYA_VISIBLE_TIME, 2)
      .then( result => {
        return createTimerPromiseZaya(DOM.zaya, DOM.hends[rand], GAME_CONFIG.TIMER_PROMISE_ZAYA_INVISIBLE, GAME_CONFIG.TIMER_PROMISE_ZAYA_INVISIBLE_TIME, 3);
        })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
   }
 }   
}

function createTimerPromise(obj, obj_next, time, result) {
  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        if(result === GAME_CONFIG.TIMER_PROMISE_REJECT)
          reject("игра окончена!!!");         
        obj.style.opacity = 0;
        obj_next.style.opacity = 1;
        soundClickEg(soundEg)
        resolve(result);
      }, 1000/time);
  });
}

function createTimerPromise2(obj_next, result) {
  return new Promise( (resolve,reject) => {
     setTimeout( () => {
       if(!obj_next)
         reject("игра окончена!!!");       
      if(obj_next)
      {
        obj_next.style.opacity = 0;
        resolve(result);
      }
     }, 1000/2);
 });
}

function gameA(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A  && sec % gameState.controlSec === 0)//на стартке: 1 в 3 сек
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
    const eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
    };
    if(gameState.recordVal.numGame.shtraf < 3.5)
    {
      const randomIndex = randomizer.getNextIndex(); 
      const num = num_sklon[gameState.recordVal.numGame.shtraf][randomIndex];
      move_ags(eg[num]);//game(num);
    } 
    else 
    gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
function gameB(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_B && sec % gameState.controlSec === 0)
  {
    //игра B. Используются все лотки произвольно
    const num_sklon = {
      0:{0:1, 1:2, 2:3, 3:4}
    };
    const eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
    };
    const randomIndex = randomizer.getNextIndex(); 
    const num = num_sklon[0][randomIndex];
    if(gameState.recordVal.numGame.shtraf < 3.5)
      move_ags(eg[num]);//game(num);
    else 
     gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
function move_ags(newEg){
  (newEg.eg)[0].style.opacity = 1;
  const egTimer=controlTimerGame(gameState.recordVal.numGame.ball, gameState.controlSec);
  const egSpeed = egTimer/2;
  createTimerPromise((newEg.eg)[0], (newEg.eg)[1], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE)
      .then( result => {
          return controlMove((newEg.eg)[1], (newEg.eg)[2], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE, GAME_CONFIG.TIMER_PROMISE_REJECT);
        })   
        .then( result => {
            return controlMove((newEg.eg)[2], (newEg.eg)[3], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE, GAME_CONFIG.TIMER_PROMISE_REJECT);
          })  
          .then( result => {
              return controlMove((newEg.eg)[3], (newEg.eg)[4], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE, GAME_CONFIG.TIMER_PROMISE_REJECT);
            }) 
            .then( result => {
              if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
                return createTimerPromise2((newEg.eg)[4], 2)
              return createTimerPromise2(gameState.timerStart, 0)
              }) 
              .then( result => {
                if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
                {
                  if((newEg.hend).style.opacity === "1") 
                    {
                    gameState.recordVal.numGame.ball = gameState.recordVal.numGame.ball + 1;
                    if(gameState.recordVal.numGame.ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_200 || gameState.recordVal.numGame.ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_500)  //обнуление штрафов при достижении некоторого кол-ва баллов
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

      if(ball > GAME_CONFIG.SCORE_POINTS.POINT_100)
          ball_flag = Array.from(ball)[0] + '00';
      if(ball < (GAME_CONFIG.SCORE_POINTS.POINT_25 + 1 + ball_flag))
        flagSec = controlSec;
        else if(ball > (GAME_CONFIG.SCORE_POINTS.POINT_25 + ball_flag) && ball < (GAME_CONFIG.SCORE_POINTS.POINT_25  + 1 + ball_flag))
          flagSec = controlSec + GAME_CONFIG.EGG_SPEED_UP_25;
          else if(ball > (GAME_CONFIG.SCORE_POINTS.POINT_50 + ball_flag) && ball < (GAME_CONFIG.SCORE_POINTS.POINT_75 + 1 + ball_flag))
            flagSec = controlSec + GAME_CONFIG.EGG_SPEED_UP_50;
            else if(ball > (GAME_CONFIG.SCORE_POINTS.POINT_75 + ball_flag) && ball < (GAME_CONFIG.SCORE_POINTS.POINT_100 + ball_flag))
              flagSec = controlSec + GAME_CONFIG.EGG_SPEED_UP_75; 
             gameState.controlSec=flagSec;
      return  gameState.controlSec;    
 }

 function move_bdyj(newEg){
  createTimerPromise2(newEg.bd, 2)
      .then( result => {
        if(gameState.flagZaya === 1)
          {
            gameState.recordVal.numGame.shtraf = gameState.recordVal.numGame.shtraf + GAME_CONFIG.FULL_PENALTY_LIMIT;
          move_cyp(newEg);
          gameState.flagZaya = 0;          
          }  
          else if(gameState.flagZaya === 0)
           {
            gameState.recordVal.numGame.shtraf = gameState.recordVal.numGame.shtraf + GAME_CONFIG.FULL_PENALTY_LIMIT;
            window.navigator.vibrate(200);  
            }
      console.log("Штрафные:", gameState.recordVal.numGame.shtraf);            
      if(gameState.recordVal.numGame.shtraf > GAME_CONFIG.MAX_PENALTY)
        {
          DOM.bant[2].style.opacity = 1;
          gameState.timerStart = GAME_CONFIG.STATES.STOPPED;   
          controls.hiddenVolk();
          DOM.gameOver.style.opacity = 1;
          //записываем рекорды
          gameState.recordVal.numGame.timeEnd = timeInGame.getFormattedTime();
          records.saveRecord();
          records.records_game(gameState.recordVal);
          globalClearAllTimers();        
          return true;
        }  
      if(gameState.recordVal.numGame.shtraf >=  GAME_CONFIG.MIN_PENALTY)
           DOM.bant[0].style.opacity = 1;
      if(gameState.recordVal.numGame.shtraf >=  GAME_CONFIG.MEDIUM_PENALTY)
            DOM.bant[1].style.opacity = 1;
      if(gameState.recordVal.numGame.shtraf ===  GAME_CONFIG.MAX_PENALTY)
            DOM.bant[2].style.opacity = 1;
           
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

