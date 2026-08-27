import { gameState } from '../core/gameState.js';
import { visibleManager } from './visibleManager.js';
import { soundClickEg } from './soundManager.js';
import { GAME_CONFIG } from '../core/gameConfig.js';

//const visibleManager = new VisibleStyle();

export class PromiseGame{


 createTimerPromiseRabbit(obj, obj_next, val, time, result) {

  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        if(!obj || !obj_next)
          reject("ошибка!!!");         
        gameState.flagRabbit = val;
        obj.style.opacity = val;
        obj_next.style.opacity = val;
        resolve(result);
      }, 1000*time);
  });

}

 createTimerPromise(obj, obj_next, time, result) {
  return new Promise( (resolve,reject) => {
      setTimeout( () => {
        if(result === GAME_CONFIG.TIMER_PROMISE_REJECT)
          reject("игра окончена!!!");         
        visibleManager.removeVisible(obj);
        visibleManager.addVisible(obj_next);
        soundClickEg(GAME_CONFIG.SOUND_EGG)
        resolve(result);
      }, 1000/time);
  });
}

 createTimerPromise2(obj_next, result) {
  return new Promise( (resolve,reject) => {
     setTimeout( () => {
       if(!obj_next)
         reject("игра окончена!!!");       
      if(obj_next)
      {
        visibleManager.removeVisible(obj_next)
        resolve(result);
      }
     }, 1000/2);
 });
}
}