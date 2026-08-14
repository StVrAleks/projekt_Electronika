export const GAME_CONFIG = {
  TICK_RATE: 1000 / 4,         // Частота обновления get_size
  MAX_PENALTY: 2.5,            // Максимальный штраф (3 бантика)
  MIN_PENALTY: 0.5,            // Максимальный штраф (2 бантика) 
  MEDIUM_PENALTY: 1.5,         // Максимальный штраф (1 бантика)
  HALF_PENALTY_LIMIT: 0.5,     // Штраф, если заяц разбилось с зайцем
  FULL_PENALTY_LIMIT: 1,       // Штраф, если яйцо разбилось без зайца
  EGG_SPEED_UP_25: 1,          // Увеличение скорости от 25 баллов
  EGG_SPEED_UP_50: 2,           // Увеличение скорости от 50 баллов
  EGG_SPEED_UP_75: 3,           // Увеличение скорости от 75 баллов
  TIMER_PROMISE_RESOLVE: 2,     // Промис зерезолвится со значением 2 и движение яиц далее продолжится
  TIMER_PROMISE_REJECT: 10,      // Промис зереджектится со значением 10 - игра окончена
  TIMER_PROMISE_RABBIT_VISIBLE: 1, // Заяц с колокольчиком появился в домике
  TIMER_PROMISE_RABBIT_INVISIBLE: 0, // Заяц с колокольчиком исчез
  TIMER_PROMISE_RABBIT_VISIBLE_TIME: 4, // Заяц с колокольчиком появляется в домике каждые 4000 мсек
  TIMER_PROMISE_RABBIT_INVISIBLE_TIME: 2, // Заяц с колокольчиком исчезает каждые 2000 мсек  

  
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

};