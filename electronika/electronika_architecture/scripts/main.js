//npx serve
const DOM = {
    instruction: null, layer4: null, canvas: null,
    gameA: null, ochki: null, gameB: null, gameOver: null,curTime: null,  
    control4: null, control8: null, control6: null,
    but1: null, but2: null, but3: null, but4: null,
    imgsGame: null, imgsChiken: null,
    eg1: null, eg2: null, eg3: null, eg4: null,
    bd1: null, bd2: null, bd3: null, bd4: null,    
    cypL: null, cypR: null,
    hend: null, bant: null, rabbit: null, hends: null,
    logo: null, svg1: null, svg2: null, masXY : null
};

ininit(DOM); 

import { addSVG } from '../utils/add_svg.js';
import { add_canvas } from '../utils/add_canvas.js'; 
import { gameState } from '../core/gameState.js';
import { soundClickEg } from '../services/soundManager.js';
import { visibleManager } from '../services/visibleManager.js';
import { GameControls } from '../services/buttonManager.js';
import { GameRandomizer } from '../utils/randomizer.js';
import { RecordsManager } from '../services/recordsManager.js';
import { globalClearAllTimers } from  '../services/clearTimer.js';
import { TimerService } from '../services/timeService.js';
import { GAME_CONFIG } from '../core/gameConfig.js';
import { ininit } from '../core/gameInit.js';
import { Slider } from '../utils/instructionSVG.js';
import { PromiseGame } from '../services/promisesManager.js';
 
const addSVG1 = new addSVG();
const instructionSlider = new Slider();

window.addEventListener('load', () => {
  addGame();
  //инициализируем и создаем SVG элементы
  addSVG1.init_svg_structure(DOM);
  //изменяем размеры SVG
  addSVG1.update_svg_positions(DOM);
 
});

window.addEventListener('resize', () => {
  addGame();
  const recGame = document.getElementById('records');
  if(recGame.style.opacity === '0' || recGame.style.opacity === "") 
      addSVG1.update_svg_positions(DOM);
});

document.addEventListener('DOMContentLoaded', () => {
  ininit(DOM);
       const btn1 = document.getElementById('control_1');
        // Запуск игры при нажатии на кнопку "Игра А"
        btn1?.addEventListener('click', (event) => {control1(event);})
        btn1?.addEventListener('touchstart', (event) => {control1(event);})

    const btn2 = document.getElementById('control_5');
        // Запуск игры Б при нажатии на кнопку "Игра Б"
        btn2?.addEventListener('click', (event) => {control2(event);});
        btn2?.addEventListener('touchstart', (event) => {control2(event);});

    const btn3 = document.getElementById('control_9');
        // при нажатии на кнопку "Время" или двойное нажатие для отображения рекордов
        btn3?.addEventListener('click', (event) => {for_control3(event);});
        btn3?.addEventListener('dblclick', (event) => {records.showRecords();});  
        btn3?.addEventListener('touchstart', (event) => {for_control3(event);});           

    const btn4 = document.getElementById('submit_val');
        // Нажатие кнопки "Сохранить" в таблице рекордов для добавления текущей игры в общую таблицу
        btn4?.addEventListener('click', (event) => {records.saveRecord();});
        btn4?.addEventListener('touchstart', (event) => {records.saveRecord();});      

    const btn5 = document.getElementById('top_menu_close');
        // Нажатие "х" над таблицей рекордов закрывает таблицу рекордов
        btn5?.addEventListener('click', (event) => {records.closeRecords();});
        btn5?.addEventListener('touchstart', (event) => {records.closeRecords();});                    
 
    const btn6 = document.getElementById('close_form');
        // Обновление таблицы рекордов 
        btn6?.addEventListener('click', (event) => {records.refreshTable();});
        btn6?.addEventListener('touchstart', (event) => {records.refreshTable();});     

   const btn7 = document.getElementById('icon');
        // Нажатие на кнопку 'i' показывает инструкцию пользователя
        btn7?.addEventListener('click', (event) => {DOM.instruction.showModal(); instructionSlider.startSvgGuide();});
     //   btn7?.addEventListener('touchstart', (event) => {DOM.instruction.showModal(); startSvgGuide();});           

   const btn8 = document.getElementById('but_close_modal');
        // Закрываем модальное окно с инструкцией игры
        btn8?.addEventListener('click', (event) => {instructionSlider.stopSvgGuide(); DOM.instruction.close();});
     //   btn8?.addEventListener('touchstart', (event) => {stopSvgGuide(); DOM.instruction.close();});              
    DOM.but1.addEventListener('touchstart', () => {if(gameState.timerStart !== 'STOPPED') controls.leftTop();}, false);
    DOM.but2.addEventListener('touchstart', () => {if(gameState.timerStart !== 'STOPPED') controls.leftBot();}, false);
    DOM.but3.addEventListener('touchstart', () => {if(gameState.timerStart !== 'STOPPED') controls.rightTop();}, false);
    DOM.but4.addEventListener('touchstart', () => {if(gameState.timerStart !== 'STOPPED') controls.rightBot();}, false); 

    document.addEventListener('keydown', but_press, false);
});

const controls = new GameControls();
const randomizer = new GameRandomizer();
const records = new RecordsManager('recVal', 'records');
const timeInGame = new TimerService();
//const visibleManager = new VisibleStyle();
const controlPromises = new PromiseGame();

gameState.gameIntervalId = setInterval(get_size, GAME_CONFIG.TICK_RATE);
/*-------------------------------------- */
/* Вспомогательные и дополняющие функции */
/*-------------------------------------- */
function controlMove(numEgg, numEggNext, timerVal, status, statusFalse){
// Если игра остановлена или переключена в режим "Время", прерываем цепочку
  if (gameState.timerStart === GAME_CONFIG.STATES.STOPPED || gameState.timerStart === GAME_CONFIG.STATES.SHOW_TIME) {
     visibleManager.addVisible(numEgg);
    return Promise.reject("Игра принудительно остановлена");
  }

  if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED && gameState.timerStart != GAME_CONFIG.STATES.SHOW_TIME)
      return controlPromises.createTimerPromise(numEgg, numEggNext,timerVal, status)
    return controlPromises.createTimerPromise(numEgg, numEggNext,timerVal, statusFalse)
}
/*------------------------------------------------ */
/* Основная часть */
/*-------------------------------------------------*/
function get_size(){

  var sec = control3();
  if (gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
    rabbit_move(gameState.timerStart, sec);
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
//-----------------------------------
//******управление кнопками */
//-----------------------------------
function control1(event) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();
  if(gameState.timerStart ===  GAME_CONFIG.STATES.GAME_B)
    globalClearAllTimers();
  visibleManager.addVisible(DOM.ochki);
  visibleManager.addVisible(DOM.gameA);
  DOM.control4.style.background = 'red';
  DOM.control8.style.background = 'black';

  gameState.timerStart =  GAME_CONFIG.STATES.GAME_A;
  gameState.controlSec = GAME_CONFIG.START_TIMER.gameA; //3;

  gameState.recordVal.numGame.penalties = 0;
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
  visibleManager.addVisible(DOM.gameB);
  visibleManager.addVisible(DOM.ochki);
  
  DOM.control4.style.background = 'black';
  DOM.control8.style.background = 'red';
  
  gameState.timerStart =  GAME_CONFIG.STATES.GAME_B;
  gameState.controlSec = GAME_CONFIG.START_TIMER.gameB; // 2;
 
  gameState.recordVal.numGame.penalties = 0;
  gameState.recordVal.numGame.ball = 0;
  gameState.recordVal.numGame.timeStart = timeInGame.getFormattedTime();

  controls.leftTop();
}
function control_event(){

  for(var i=0; i<DOM.imgsGame.length; i++)
    visibleManager.removeVisible(DOM.imgsGame[i]);
  
  for(var i=0; i<DOM.imgsChiken.length; i++)
    visibleManager.addVisible(DOM.imgsChiken[i])
  
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
//-----------------------------------
//**********описание процесса игры */
//-----------------------------------

function rabbit_move(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A || gameState.timerStart === GAME_CONFIG.STATES.GAME_B) //если игра запущена
  {
  const rand = randomizer.getIndexFromTwo(); //разные руки зайца 
  if(sec % 24 === 0)
    {
      controlPromises.createTimerPromiseRabbit(DOM.rabbit, DOM.hends[rand], GAME_CONFIG.TIMER_PROMISE_RABBIT_VISIBLE, GAME_CONFIG.TIMER_PROMISE_RABBIT_VISIBLE_TIME, 2)
      .then( result => {
        return controlPromises.createTimerPromiseRabbit(DOM.rabbit, DOM.hends[rand], GAME_CONFIG.TIMER_PROMISE_RABBIT_INVISIBLE, GAME_CONFIG.TIMER_PROMISE_RABBIT_INVISIBLE_TIME, 3);
        })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
   }
 }   
}
function gameA(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A  && sec % gameState.controlSec === 0)//на стартке: 1 в 3 сек
  {
    //игра А. В зависимости от кол-ва штрафных очков - используются разные склоны
    const eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
    };
    if(gameState.recordVal.numGame.penalties < 3.5)
    {
      const randomIndex = randomizer.getNextIndex(); 
      const num = GAME_CONFIG.NUM_SKLON_GAME_A[gameState.recordVal.numGame.penalties][randomIndex];
      move_ags(eg[num]);
    } 
    else 
    gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
function gameB(timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_B && sec % gameState.controlSec === 0)
  {
    //игра B. Используются все лотки произвольно
    const eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
    };
    const randomIndex = randomizer.getNextIndex(); 
    const num = GAME_CONFIG.NUM_SCLON_GAME_B[0][randomIndex];
    if(gameState.recordVal.numGame.penalties < GAME_CONFIG.MAX_PENALTY_LIMIT)
      move_ags(eg[num]);
    else 
     gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
async function move_ags(newEg){

  visibleManager.addVisible((newEg.eg)[0]);
  const egTimer = controlTimerGame(gameState.recordVal.numGame.ball, gameState.controlSec);
    const egSpeed = egTimer/2;

  try {
    await  controlPromises.createTimerPromise((newEg.eg)[0], (newEg.eg)[1], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE);
  }
  catch(err){console.log('Случилась ошибка при запуске нового яйца', err);}
  try{
      for (let i = 1; i < (newEg.eg).length - 1; i++) {
        await controlMove((newEg.eg)[i], (newEg.eg)[i+1], egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE, GAME_CONFIG.TIMER_PROMISE_REJECT);
       }
  }
 catch(err){console.log('Случилась ошибка при скатывании яйца', err);}

 if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
      await controlPromises.createTimerPromise2((newEg.eg)[4], 2)
 
 try{
  const result = await controlPromises.createTimerPromise2(gameState.timerStart, 0);
  if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
  {
    if((newEg.hend).style.opacity === "1") 
      {
      gameState.recordVal.numGame.ball = gameState.recordVal.numGame.ball + 1;
      if(gameState.recordVal.numGame.ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_200 || gameState.recordVal.numGame.ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_500)  //обнуление штрафов при достижении некоторого кол-ва баллов
          gameState.recordVal.numGame.penalties = 0;
      await controlPromises.createTimerPromise2((newEg.eg)[4], 2)
      }
    else 
    {
    soundClickEg(GAME_CONFIG.SOUND_BDJ);
    visibleManager.addVisible(newEg.bd);
        await move_bdyj(newEg);
    }
  }}
  catch(err){console.log('Случилась ошибка после ската яйца',err);}
 }

 function controlTimerGame(ball, controlSec){
        //скорость увеличивается и падает в зависимости от кол-ва баллов
       let flagSec = 0, ball_flag = 0;

      if(ball > GAME_CONFIG.SCORE_POINTS.POINT_100)
          ball_flag = Math.floor(ball / 100) * 100;
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

 async function move_bdyj(newEg){

  try {
    await controlPromises.createTimerPromise2(newEg.bd, 2);
  }
  catch(err) {console.log("случилась ошибка: " + err); };
 
  try{
    if(gameState.flagRabbit === 1)
      {
        gameState.recordVal.numGame.penalties = gameState.recordVal.numGame.penalties + GAME_CONFIG.FULL_PENALTY_LIMIT;
        move_cyp(newEg);
        gameState.flagRabbit = 0;          
      }  
      else if(gameState.flagRabbit === 0)
        {
        gameState.recordVal.numGame.penalties = gameState.recordVal.numGame.penalties + GAME_CONFIG.FULL_PENALTY_LIMIT;
        window.navigator.vibrate(200);  
        }

  console.log("Штрафные:", gameState.recordVal.numGame.penalties);            
  if(gameState.recordVal.numGame.penalties > GAME_CONFIG.MAX_PENALTY)
    {
      visibleManager.addVisible(DOM.bant[2]);
      gameState.timerStart = GAME_CONFIG.STATES.STOPPED;   
      controls.hiddenVolk();
      visibleManager.addVisible(DOM.gameOver)
      //записываем рекорды
      gameState.recordVal.numGame.timeEnd = timeInGame.getFormattedTime();
      records.saveRecord();
      //очищаем таймеры
      globalClearAllTimers();        
      return true;
    }  
    if(gameState.recordVal.numGame.penalties ===  GAME_CONFIG.MAX_PENALTY)
          visibleManager.addVisible(DOM.bant[2]);
      else if(gameState.recordVal.numGame.penalties >=  GAME_CONFIG.MEDIUM_PENALTY)
            visibleManager.addVisible(DOM.bant[1]);   
        else if(gameState.recordVal.numGame.penalties >=  GAME_CONFIG.MIN_PENALTY)
            visibleManager.addVisible(DOM.bant[0]);      
    }
    catch( error) {
      console.log("случилась ошибка: " + error);
    };
     
 } 
async function move_cyp(newEg){
  const cypElements = newEg.cyp; // Массив шагов цыпленка
  const cypSpeed = gameState.controlSec; // Исправлено: берем из стейта

  try {
    // Двигаем цыпленка
    for (let i = 0; i < cypElements.length - 1; i++) {
      await controlPromises.createTimerPromise(cypElements[i], cypElements[i + 1], cypSpeed, 2);
    }
    // Скрываем цыпленка на последнем шаге
    await controlPromises.createTimerPromise2(cypElements[cypElements.length - 1], 2);
  } catch (error) {
    console.error("Ошибка при анимации цыпленка:", error);
  }
}
