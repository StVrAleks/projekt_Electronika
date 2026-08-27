import { gameState } from '../core/gameState.js';

export function globalClearAllTimers() : void {

  const highestTimeoutId : number = window.setTimeout(() => {}, 0);
  let i : number=0;
  for (i = 0; i <= highestTimeoutId; i++) {
    if (i != gameState.gameIntervalId)
        clearTimeout(i);
  } 

  let gameImages = document.querySelectorAll<HTMLElement>('.bant');//imgsGame, .cyplenok_left, .cyplenok_right');
  //let gameImagesNoNeed = document.querySelectorAll<HTMLElement>('.hend, .cyplenok_left, .cyplenok_right');
  gameImages.forEach(img => {
    img.style.opacity = '0';
  });
  let gameImagesChiken = document.querySelectorAll<HTMLElement>('.chiken');
  gameImagesChiken.forEach(chikenImg => {
    chikenImg.style.opacity = '1';
  });
 
  const bdyjElements : string[] = ['bdyj_left1', 'bdyj_left2', 'bdyj_right1', 'bdyj_right2'];
  bdyjElements.forEach(id => {
    const el = document.getElementById(id) as HTMLElement;
    if (el) el.style.opacity = '0';
  });
  
  console.log(`Глобально очищено таймеров: ${highestTimeoutId}. Экран полностью очищен.`)

}