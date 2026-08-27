import { gameState } from '../core/gameState.js';

export function globalClearAllTimers() {

  const highestTimeoutId = setTimeout(() => {}, 0);
  let i=0;
  for (i = 0; i <= highestTimeoutId; i++) {
    if (i != gameState.gameIntervalId)
        clearTimeout(i);
  } 

  let gameImages = document.querySelectorAll('.bant');
  gameImages.forEach(img => {
    img.style.opacity = 0;
  });
  gameImages = document.querySelectorAll('.chiken');
  gameImages.forEach(img => {
    img.style.opacity = 1;
  });
 
  const bdyjElements = ['bdyj_left1', 'bdyj_left2', 'bdyj_right1', 'bdyj_right2'];
  bdyjElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = 0;
  });
  
  console.log(`Глобально очищено таймеров: ${highestTimeoutId}. Экран полностью очищен.`)

}