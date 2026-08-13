import { gameState } from '../core/gameState.js';

export function globalClearAllTimers() {

  const highestTimeoutId = setTimeout(() => {}, 0);
  
  for (let i = 0; i <= highestTimeoutId; i++) {
    if (i != gameState.gameIntervalId)
        clearTimeout(i);
  } 

  const gameImages = document.querySelectorAll('.imgsGame, .cyplenok_left, .cyplenok_right');
  gameImages.forEach(img => {
    img.style.opacity = 0;
  });

 
  const bdyjElements = ['bdyj_left1', 'bdyj_left2', 'bdyj_right1', 'bdyj_right2', 'game_over'];
  bdyjElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = 0;
  });
  
  console.log(`Глобально очищено таймеров: ${highestTimeoutId}. Экран полностью очищен.`)

}