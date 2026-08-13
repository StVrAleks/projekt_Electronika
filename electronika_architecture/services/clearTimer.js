import { gameState } from '../core/gameState.js';

export function globalClearAllTimers() {

  const highestTimeoutId = setTimeout(() => {}, 0);
  
  for (let i = 0; i <= highestTimeoutId; i++) {
    if (i != gameState.gameIntervalId)
        clearTimeout(i);
  } 
  console.log(`Глобально очищено таймеров: ${highestTimeoutId}`);
  // и перезапустили интервал
  //setInterval(get_size, 1000 / 4);
}