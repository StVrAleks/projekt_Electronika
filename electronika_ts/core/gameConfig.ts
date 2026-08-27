
//***********Union type */
//GAME A
  export type numSklonKeysA = 0| 0.5 | 1 | 1.5 | 2 | 2.5;
  export type numLotokKeysA = 0 | 1 | 2;
  export type TYPE_SKLON_GAME_A = Record <numLotokKeysA, number>;
//GAME B
 export type numSklonKeysB = 0;
 export type numLotokKeysB = 0 | 1 | 2 | 3;
 type TYPE_SKLON_GAME_B = Record <numLotokKeysB, number>;
 export type TypeNumEg = 1 | 2 | 3 | 4;
  interface TYPE_STATES{
    STOPPED: number,
    GAME_A: number,
    GAME_B: number,
    SHOW_TIME: number
  };

   interface TYPE_EGG_SCORES {
    TRIGGER_PENALTY_AT_200: number, // Обнуление штрафов на 200 очках
    TRIGGER_PENALTY_AT_500: number  // Обнуление штрафов на 500 очках
  };

  interface TYPE_SCORE_POINTS {
    POINT_25: number,   //Увеличение скорости на интервале от 25 очков
    POINT_50: number,   //Увеличение скорости на интервале от 50 очков
    POINT_75: number,    //Увеличение скорости на интервале от 75 очков
    POINT_100: number
  };

  interface TYPE_START_TIMER {
    gameA: number,
    gameB: number
  };

  export interface EgLineData {
    eg: HTMLCollectionOf<Element> | null,
    bd: HTMLElement | null,
    cyp: HTMLCollectionOf<Element> | null,
    hend: HTMLElement | null,
  };

//******* объект*/
interface TYPE_GAME_CONFIG {
  TICK_RATE : number,         // Частота обновления get_size
  MAX_PENALTY: number,            // Максимальный штраф (3 бантика или 2,5 штрафных очка)
  MIN_PENALTY: number,            // Максимальный штраф (2 бантика) 
  MEDIUM_PENALTY: number,         // Максимальный штраф (1 бантика)
  HALF_PENALTY_LIMIT: number,     // Штраф, если заяц разбилось с зайцем
  FULL_PENALTY_LIMIT: number,       // Штраф, если яйцо разбилось без зайца
  MAX_PENALTY_LIMIT: number,       // Максимальный штраф (3 бантика или 3,5 штрафных очка)
  EGG_SPEED_UP_25: number,          // Увеличение скорости от 25 баллов
  EGG_SPEED_UP_50: number,           // Увеличение скорости от 50 баллов
  EGG_SPEED_UP_75: number,           // Увеличение скорости от 75 баллов
  TIMER_PROMISE_RESOLVE: number,     // Промис зерезолвится со значением 2 и движение яиц далее продолжится
  TIMER_PROMISE_REJECT: number,      // Промис зереджектится со значением 10 - игра окончена
  TIMER_PROMISE_RABBIT_VISIBLE: string, // Заяц с колокольчиком появился в домике
  TIMER_PROMISE_RABBIT_INVISIBLE: string, // Заяц с колокольчиком исчез
  TIMER_PROMISE_RABBIT_VISIBLE_TIME: number, // Заяц с колокольчиком появляется в домике
  TIMER_PROMISE_RABBIT_INVISIBLE_TIME: number, // Заяц с колокольчиком исчезает каждые 2000 мсек  
  SOUND_EGG: string,
  SOUND_BDJ: string,

  
  STATES: TYPE_STATES,
  
  EGG_SCORES: TYPE_EGG_SCORES,

  SCORE_POINTS: TYPE_SCORE_POINTS,

  NUM_SKLON_GAME_A: Record<numSklonKeysA, TYPE_SKLON_GAME_A>,

  NUM_SCLON_GAME_B: Record<numSklonKeysB, TYPE_SKLON_GAME_B>,

  START_TIMER: TYPE_START_TIMER,

  EGG: Record<TypeNumEg, EgLineData>
};
//******инициализация */
export const GAME_CONFIG : TYPE_GAME_CONFIG = {
  TICK_RATE : 1000 / 4,         // Частота обновления get_size
  MAX_PENALTY: 2.5,            // Максимальный штраф (3 бантика или 2,5 штрафных очка)
  MIN_PENALTY: 0.5,            // Максимальный штраф (2 бантика) 
  MEDIUM_PENALTY: 1.5,         // Максимальный штраф (1 бантика)
  HALF_PENALTY_LIMIT: 0.5,     // Штраф, если заяц разбилось с зайцем
  FULL_PENALTY_LIMIT: 1,       // Штраф, если яйцо разбилось без зайца
  MAX_PENALTY_LIMIT: 3.5,       // Максимальный штраф (3 бантика или 3,5 штрафных очка)
  EGG_SPEED_UP_25: 1,          // Увеличение скорости от 25 баллов
  EGG_SPEED_UP_50: 2,           // Увеличение скорости от 50 баллов
  EGG_SPEED_UP_75: 3,           // Увеличение скорости от 75 баллов
  TIMER_PROMISE_RESOLVE: 2,     // Промис зерезолвится со значением 2 и движение яиц далее продолжится
  TIMER_PROMISE_REJECT: 10,      // Промис зереджектится со значением 10 - игра окончена
  TIMER_PROMISE_RABBIT_VISIBLE: '1', // Заяц с колокольчиком появился в домике
  TIMER_PROMISE_RABBIT_INVISIBLE: '0', // Заяц с колокольчиком исчез
  TIMER_PROMISE_RABBIT_VISIBLE_TIME: 4, // Заяц с колокольчиком появляется в домике
  TIMER_PROMISE_RABBIT_INVISIBLE_TIME: 2, // Заяц с колокольчиком исчезает каждые 2000 мсек  
  SOUND_EGG: '../audio/eg.mp3',
  SOUND_BDJ: '../audio/bdyj.mp3',

  
  STATES: {
    STOPPED: 0,
    GAME_A: 1,
    GAME_B: 2,
    SHOW_TIME: 4
  },
  
  EGG_SCORES: {
    TRIGGER_PENALTY_AT_200: 200, // Обнуление штрафов на 200 очках
    TRIGGER_PENALTY_AT_500: 500  // Обнуление штрафов на 500 очках
  },

  SCORE_POINTS: {
    POINT_25: 25,   //Увеличение скорости на интервале от 25 очков
    POINT_50: 50,   //Увеличение скорости на интервале от 50 очков
    POINT_75: 75,    //Увеличение скорости на интервале от 75 очков
    POINT_100: 100
  },

   NUM_SKLON_GAME_A: {
      0:{0:1, 1:2, 2:4},
      0.5:{0:1, 1:2, 2:4},
      1:{0:1, 1:2, 2:3},
      1.5:{0:1, 1:2, 2:3},
      2:{0:2, 1:3, 2:4},
      2.5:{0:2, 1:3, 2:4},
    },

  NUM_SCLON_GAME_B: {
     0:{0:1, 1:2, 2:3, 3:4}
  },

  START_TIMER: {
    gameA: 3,
    gameB: 2
  },
 
  EGG: {
      1:{"eg": null, "bd":null, "cyp":null, "hend": null},
      2:{"eg": null,"bd":null, "cyp":null, "hend": null},
      3:{"eg": null,"bd":null, "cyp":null, "hend": null},
      4:{"eg": null,"bd":null, "cyp":null, "hend": null}
  }
};





