//npm run dev
//******** */

const DOM : IDOM = {
    instruction: null, layer4: null, canvas: null,
    gameA: null, ochki: null, gameB: null, gameOver: null,curTime: null,  
    control4: null, control8: null, control6: null,
    but1: null, but2: null, but3: null, but4: null,
    imgsGame: null, imgsChiken: null,
    eg1: null, eg2: null, eg3: null, eg4: null,
    bd1: null, bd2: null, bd3: null, bd4: null,    
    cypL: null, cypR: null,
    hend: null, bant: null, rabbit: null, hends: null,
    logo: null, svg1: null, svg2: null, masXY : {} as IDOM['masXY']
};

import { ininit, IDOM } from '../core/gameInit.js';

ininit(DOM); 

import { AddSVG } from '../utils/add_svg.js';
import { add_canvas } from '../utils/add_canvas.js'; 
import { gameState } from '../core/gameState.js';
import { soundClickEg } from '../services/soundManager.js';
import { visibleManager } from '../services/visibleManager.js';
import { GameControls } from '../services/buttonManager.js';
import { GameRandomizer } from '../utils/randomizer.js';
import { RecordsManager } from '../services/recordsManager.js';
import { globalClearAllTimers } from  '../services/clearTimer.js';
import { TimerService } from '../services/timeService.js';
import { GAME_CONFIG, numSklonKeysA, numLotokKeysA, numSklonKeysB, numLotokKeysB, TypeNumEg, EgLineData } from '../core/gameConfig.js';

import { Slider } from '../utils/instructionSVG.js';
import { PromiseGame } from '../services/promisesManager.js';
 
const addSVG1: AddSVG = new AddSVG();
const instructionSlider:Slider = new Slider();

window.addEventListener('load', () => {
  addGame();
  //инициализируем и создаем SVG элементы
  addSVG1.init_svg_structure(DOM);
  //изменяем размеры SVG
  addSVG1.update_svg_positions(DOM);
 
});

window.addEventListener('resize', () => {
  addGame();
  const recGame = document.getElementById('records') as HTMLElement;
  if(recGame.style.opacity === '0' || recGame.style.opacity === "") 
      addSVG1.update_svg_positions(DOM);
});

document.addEventListener('DOMContentLoaded', () => {
  ininit(DOM);
       const btn1 = document.getElementById('control_1') as HTMLElement;
        // Запуск игры при нажатии на кнопку "Игра А"
        btn1?.addEventListener('click', (event) => {control1(event);})
        btn1?.addEventListener('touchstart', (event) => {control1(event);})

    const btn2 = document.getElementById('control_5') as HTMLElement;
        // Запуск игры Б при нажатии на кнопку "Игра Б"
        btn2?.addEventListener('click', (event) => {control2(event);});
        btn2?.addEventListener('touchstart', (event) => {control2(event);});

    const btn3 = document.getElementById('control_9') as HTMLElement;
        // при нажатии на кнопку "Время" или двойное нажатие для отображения рекордов
        btn3?.addEventListener('click', (event) => {for_control3();});
        btn3?.addEventListener('dblclick', (event) => {records.showRecords();});  
        btn3?.addEventListener('touchstart', (event) => {for_control3();});           

    const btn4 = document.getElementById('submit_val') as HTMLElement;
        // Нажатие кнопки "Сохранить" в таблице рекордов для добавления текущей игры в общую таблицу
        btn4?.addEventListener('click', (event) => {records.saveRecord();});
        btn4?.addEventListener('touchstart', (event) => {records.saveRecord();});      

    const btn5 = document.getElementById('top_menu_close') as HTMLElement;
        // Нажатие "х" над таблицей рекордов закрывает таблицу рекордов
        btn5?.addEventListener('click', (event) => {records.closeRecords();});
        btn5?.addEventListener('touchstart', (event) => {records.closeRecords();});                    
 
    const btn6 = document.getElementById('close_form') as HTMLElement;
        // Обновление таблицы рекордов 
        btn6?.addEventListener('click', (event) => {records.refreshTable();});
        btn6?.addEventListener('touchstart', (event) => {records.refreshTable();});     

   const btn7 = document.getElementById('icon') as HTMLElement;
        // Нажатие на кнопку 'i' показывает инструкцию пользователя
        btn7?.addEventListener('click', (event) => {DOM.instruction?.showModal(); instructionSlider.startSvgGuide();});
     //   btn7?.addEventListener('touchstart', (event) => {DOM.instruction.showModal(); startSvgGuide();});           

   const btn8 = document.getElementById('but_close_modal');
        // Закрываем модальное окно с инструкцией игры
        btn8?.addEventListener('click', (event) => {instructionSlider.stopSvgGuide(); DOM.instruction?.close();});
     //   btn8?.addEventListener('touchstart', (event) => {stopSvgGuide(); DOM.instruction.close();});              
    DOM.but1?.addEventListener('touchstart', (event) => {if(gameState.timerStart !== GAME_CONFIG.STATES.STOPPED) controls.leftTop(event);}, false);
    DOM.but2?.addEventListener('touchstart', (event) => {if(gameState.timerStart !== GAME_CONFIG.STATES.STOPPED) controls?.leftBot(event);}, false);
    DOM.but3?.addEventListener('touchstart', (event) => {if(gameState.timerStart !== GAME_CONFIG.STATES.STOPPED) controls?.rightTop(event);}, false);
    DOM.but4?.addEventListener('touchstart', (event) => {if(gameState.timerStart !== GAME_CONFIG.STATES.STOPPED) controls?.rightBot(event);}, false); 

    document.addEventListener('keydown', but_press, false);
    GAME_CONFIG.EGG = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend?.[0] as HTMLElement || null },
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend?.[3] as HTMLElement || null },
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend?.[1] as HTMLElement || null},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend?.[2] as HTMLElement || null }
    };
});

const controls : GameControls = new GameControls();
const randomizer : GameRandomizer = new GameRandomizer();
const records = new RecordsManager('recVal', 'records', 'GAME_INFO', DOM);
const timeInGame : TimerService = new TimerService();
const controlPromises = new PromiseGame();

gameState.gameIntervalId = window.setInterval(get_size, GAME_CONFIG.TICK_RATE);
/*-------------------------------------- */
/* Вспомогательные и дополняющие функции */
/*-------------------------------------- */
function controlMove(numEgg : HTMLElement, numEggNext : HTMLElement, timerVal : number, status : number, statusFalse : number): Promise<number>{
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

  var sec:number = control3();
  if (gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
    rabbit_move(sec);
  if (gameState.timerStart === GAME_CONFIG.STATES.GAME_A || gameState.timerStart === GAME_CONFIG.STATES.STOPPED)
    gameA(sec); //запуск игры А
  if (gameState.timerStart === GAME_CONFIG.STATES.GAME_B || gameState.timerStart === GAME_CONFIG.STATES.STOPPED)
    gameB(sec); //запуск игры Б

  if(DOM.ochki) DOM.ochki.innerText = (gameState.recordVal[gameState.numGame].ball || 0).toString();
}

function addGame() : void {
  //получаем значение 1rem в пикселях (px) для конкретного устройства пользователя
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
  const layer4 = DOM.layer4; 
  const canvas = DOM.canvas;
  if (!layer4 || !canvas) return;

  canvas.width = layer4.offsetWidth;
  canvas.height = layer4.offsetHeight;

  const sizePart = {
    gamePartW: canvas.width,
    gamePartH: canvas.height,
    remValue: rem 
  };
  add_canvas(sizePart);
}
//-----------------------------------
//******управление кнопками */
//-----------------------------------
function control1(event : MouseEvent | TouchEvent) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();
  if(gameState.timerStart ===  GAME_CONFIG.STATES.GAME_B)
    globalClearAllTimers();
  visibleManager.addVisible(DOM.ochki);
  visibleManager.addVisible(DOM.gameA);
  if(DOM.control4) DOM.control4.style.background = 'red';
  if(DOM.control8) DOM.control8.style.background = 'black';

  gameState.timerStart =  GAME_CONFIG.STATES.GAME_A;
  gameState.controlSec = GAME_CONFIG.START_TIMER.gameA; //3;

  gameState.recordVal[gameState.numGame].penalties = 0;
  gameState.recordVal[gameState.numGame].ball = 0;

  gameState.recordVal[gameState.numGame].timeStart = timeInGame.getFormattedTime();

  controls.leftTop(event);
}
function control2(event : MouseEvent | TouchEvent) {
  const eo = event || window.event; 
    if (eo && typeof eo.preventDefault === 'function') {
        eo.preventDefault();
    }
  control_event();

  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A)
    globalClearAllTimers();
  visibleManager.addVisible(DOM.gameB);
  visibleManager.addVisible(DOM.ochki);
  
  if(DOM.control4) DOM.control4.style.background = 'black';
  if(DOM.control8) DOM.control8.style.background = 'red';
  
  gameState.timerStart =  GAME_CONFIG.STATES.GAME_B;
  gameState.controlSec = GAME_CONFIG.START_TIMER.gameB; // 2;
 
  gameState.recordVal[gameState.numGame].penalties = 0;
  gameState.recordVal[gameState.numGame].ball = 0;
  gameState.recordVal[gameState.numGame].timeStart = timeInGame.getFormattedTime();

  controls.leftTop(event);
}
function control_event(){

  if(DOM.imgsGame)
  for(let i=0; i<DOM.imgsGame.length; i++)
    visibleManager.removeVisible(DOM.imgsGame[i]);
  
  if(DOM.imgsChiken)
  for(let i=0; i<DOM.imgsChiken.length; i++)
    visibleManager.addVisible(DOM.imgsChiken[i])
  
}

function but_press(event : KeyboardEvent){
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
  if(DOM.curTime)
    DOM.curTime.style.opacity = '1';
  gameState.timerStart = GAME_CONFIG.STATES.SHOW_TIME;  
  controls.hiddenVolk(); 
  globalClearAllTimers(); 
  control3();   
}

function control3() : number {

timeInGame.update(); 
if (DOM.curTime) {
  DOM.curTime.innerText = timeInGame.getFormattedTime();
  DOM.curTime.style.opacity = '1';
}  
return timeInGame.getGameSecond();

}
//-----------------------------------
//**********описание процесса игры */
//-----------------------------------

function rabbit_move(sec : number) {//timerStart, sec){
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A || gameState.timerStart === GAME_CONFIG.STATES.GAME_B) //если игра запущена
  {
  const rand: number = randomizer.getIndexFromTwo(); //разные руки зайца 
  if(sec % 24 === 0 && DOM.rabbit && DOM.hends && DOM.hends[rand])
    {
      const currentHand = DOM.hends[rand] as HTMLElement;
        controlPromises.createTimerPromiseRabbit(DOM.rabbit, currentHand, GAME_CONFIG.TIMER_PROMISE_RABBIT_VISIBLE, GAME_CONFIG.TIMER_PROMISE_RABBIT_VISIBLE_TIME, 2)
      .then( result => {
        if(DOM.rabbit)
          return controlPromises.createTimerPromiseRabbit(DOM.rabbit, currentHand, GAME_CONFIG.TIMER_PROMISE_RABBIT_INVISIBLE, GAME_CONFIG.TIMER_PROMISE_RABBIT_INVISIBLE_TIME, 3);
        })  
      .catch( error => {
        console.log("случилась ошибка: " + error);
      });
   }
 }   
}
function gameA( sec : number) : void{//timerStart,
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_A  && sec % gameState.controlSec === 0 && DOM.hend)//на стартке: 1 в 3 сек
  {
    //игра А. В зависимости от кол-ва штрафных очков - используются разные склоны
    if(gameState.recordVal[gameState.numGame].penalties < 3.5)
    {
      const curNumGame = gameState.recordVal[gameState.numGame].penalties as numSklonKeysA;
      const randomIndex = randomizer.getNextIndex('A') as numLotokKeysA;         
      const num = GAME_CONFIG.NUM_SKLON_GAME_A[curNumGame][randomIndex] as TypeNumEg;
      move_ags(GAME_CONFIG.EGG[num]);
    } 
    else 
    gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
function gameB(sec : number) : void{ //timerStart, 
  if(gameState.timerStart === GAME_CONFIG.STATES.GAME_B && sec % gameState.controlSec === 0 && DOM.hend)
  {
    //игра B. Используются все лотки произвольно
   const curNumGame: numSklonKeysB = 0;
   const randomIndex = randomizer.getNextIndex('B') as numLotokKeysB;         
   const num = GAME_CONFIG.NUM_SCLON_GAME_B[curNumGame][randomIndex] as TypeNumEg;

    if(gameState.recordVal[gameState.numGame].penalties < GAME_CONFIG.MAX_PENALTY_LIMIT)
      move_ags(GAME_CONFIG.EGG[num]);
    else 
     gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
  }
}
async function move_ags(newEg : EgLineData) : Promise<void>{
   if (!newEg.eg || newEg.eg.length < 4) {
        return; // Защитный код (Guard Clause)
    }
 //const firstEgg = newEg.eg?.[0] ?? null; 
  visibleManager.addVisible((newEg.eg)[0]);
  //gполучаем 1,2,3 в зависимости от количества набранных баллов
  //а в таймере 1000/time, где time - это egTimer
  const egSpeed = controlTimerGame(gameState.recordVal[gameState.numGame].ball);//, gameState.controlSec);
  console.log('egSpeed ', egSpeed);

  try {
    await  controlPromises.createTimerPromise((newEg.eg)[0] as HTMLElement, (newEg.eg)[1] as HTMLElement , egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE);
  }
  catch(err){console.log('Случилась ошибка при запуске нового яйца', err);}
  try{
      for (let i = 1; i < (newEg.eg).length - 1; i++) {
        await controlMove((newEg.eg)[i] as HTMLElement , (newEg.eg)[i+1] as HTMLElement , egSpeed, GAME_CONFIG.TIMER_PROMISE_RESOLVE, GAME_CONFIG.TIMER_PROMISE_REJECT);
       }
  }
 catch(err){console.log('Случилась ошибка при скатывании яйца', err);}

 if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
      await controlPromises.createTimerPromise2((newEg.eg)[4] as HTMLElement , 2)
 
 try{
 // const result = await controlPromises.createTimerPromise2(gameState.timerStart, 0);
  if(gameState.timerStart != GAME_CONFIG.STATES.STOPPED)
  {
    if((newEg.hend as HTMLElement).style.opacity === "1") 
      {
      gameState.recordVal[gameState.numGame].ball = gameState.recordVal[gameState.numGame].ball + 1;
      if(gameState.recordVal[gameState.numGame].ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_200 || gameState.recordVal[gameState.numGame].ball === GAME_CONFIG.EGG_SCORES.TRIGGER_PENALTY_AT_500)  //обнуление штрафов при достижении некоторого кол-ва баллов
          gameState.recordVal[gameState.numGame].penalties = 0;
      await controlPromises.createTimerPromise2((newEg.eg)[4] as HTMLElement , 2)
      }
    else if((newEg.hend as HTMLElement).style.opacity === "0") 
    {
      visibleManager.addVisible(newEg.bd as HTMLElement);      
      soundClickEg(GAME_CONFIG.SOUND_BDJ);
      await move_bdyj(newEg);
    }
  }}
  catch(err){console.log('Случилась ошибка после ската яйца',err);}
 }

 function controlTimerGame(ball : number){//, controlSec : number){
        //скорость увеличивается и падает в зависимости от кол-ва баллов
       let ball_flag = 0, speedBonus = 0;

      const baseSpeed = gameState.timerStart === GAME_CONFIG.STATES.GAME_A 
          ? GAME_CONFIG.START_TIMER.gameA * 250 // Например, 3 * 250 = 750мс на шаг
          : GAME_CONFIG.START_TIMER.gameB * 250;

       if(ball > GAME_CONFIG.SCORE_POINTS.POINT_100)
          ball_flag = Math.floor(ball / 100) * 100;

      // Рассчитываем фиксированное ускорение для текущего диапазона очков
      if (ball >= GAME_CONFIG.SCORE_POINTS.POINT_75) {
          // Суммируем все три ускорения, если прошли порог 75
          speedBonus = GAME_CONFIG.EGG_SPEED_UP_25 + GAME_CONFIG.EGG_SPEED_UP_50 + GAME_CONFIG.EGG_SPEED_UP_75;
      } else if (ball >= GAME_CONFIG.SCORE_POINTS.POINT_50 ) {
          speedBonus = GAME_CONFIG.EGG_SPEED_UP_25 + GAME_CONFIG.EGG_SPEED_UP_50;
      } else if (ball >= GAME_CONFIG.SCORE_POINTS.POINT_25) {
          speedBonus = GAME_CONFIG.EGG_SPEED_UP_25;
      }

      // Каждая единица speedBonus будет уменьшать задержку, например, на 50мс
      const finalDelay = baseSpeed - (speedBonus * 60);

      // Защита: скорость не может быть быстрее, чем 200мс на шаг яйца
      return Math.max(finalDelay, 200);     
 }

 async function move_bdyj(newEg: EgLineData) : Promise<void>{

  try {
    await controlPromises.createTimerPromise2(newEg.bd as HTMLElement, 2);
  }
  catch(err) {console.log("случилась ошибка: " + err); };
 
  try{
    if(gameState.flagRabbit === '1')
      {
        gameState.recordVal[gameState.numGame].penalties = gameState.recordVal[gameState.numGame].penalties + GAME_CONFIG.FULL_PENALTY_LIMIT;    
        move_cyp(newEg);
        gameState.flagRabbit ='0';          
      }  
      else if(gameState.flagRabbit === '0')
        {
        gameState.recordVal[gameState.numGame].penalties = gameState.recordVal[gameState.numGame].penalties + GAME_CONFIG.FULL_PENALTY_LIMIT;
        window.navigator.vibrate(200);  
        }

  console.log("Штрафные:", gameState.recordVal[gameState.numGame].penalties);            
  if(gameState.recordVal[gameState.numGame].penalties > GAME_CONFIG.MAX_PENALTY && DOM.bant)
    {
      visibleManager.addVisible(DOM.bant[2]);
      gameState.timerStart = GAME_CONFIG.STATES.STOPPED;   
      controls.hiddenVolk();
      visibleManager.addVisible(DOM.gameOver)
      //записываем рекорды
      gameState.recordVal[gameState.numGame].timeEnd = timeInGame.getFormattedTime();
      records.saveRecord();
      //очищаем таймеры
      globalClearAllTimers();        
      return ;
    }  
    if(gameState.recordVal[gameState.numGame].penalties ===  GAME_CONFIG.MAX_PENALTY && DOM.bant)
          visibleManager.addVisible(DOM.bant[2]);
      else if(gameState.recordVal[gameState.numGame].penalties >=  GAME_CONFIG.MEDIUM_PENALTY && DOM.bant)
            visibleManager.addVisible(DOM.bant[1]);   
        else if(gameState.recordVal[gameState.numGame].penalties >=  GAME_CONFIG.MIN_PENALTY && DOM.bant)
            visibleManager.addVisible(DOM.bant[0]);      
    }
    catch( error) {
      console.log("случилась ошибка: " + error);
    };
     
 } 
async function move_cyp(newEg: EgLineData) : Promise<void>{
 // const cypElements = newEg.cyp; // Массив шагов цыпленка
//  const bdjElements = newEg.bd;
  let i: number = 0;
  if(!newEg.cyp || !newEg.bd || newEg.cyp === null || newEg.bd === null)
    return;

  let elementArr : HTMLElement[] | null = [];
  elementArr.push(newEg.bd);
  for(i=0; i < newEg.cyp.length; i++)
    elementArr.push(newEg.cyp[i] as HTMLElement);


  const cypSpeed = gameState.controlSec; 
 
  try {
    // Двигаем цыпленка
    for (i = 0; i < elementArr.length - 1; i++) {
      await controlPromises.createTimerPromise(elementArr[i] as HTMLElement, elementArr[i + 1] as HTMLElement, cypSpeed, 2);
    }
    // Скрываем цыпленка на последнем шаге
    await controlPromises.createTimerPromise2(elementArr[elementArr.length - 1] as HTMLElement, 2);
  } catch (error) {
    console.error("Ошибка при анимации цыпленка:", error);
  }
}
