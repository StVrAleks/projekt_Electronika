import { GAME_CONFIG } from '../core/gameConfig.js';

export type GameStatus = 
    | typeof GAME_CONFIG.STATES.STOPPED 
    | typeof GAME_CONFIG.STATES.GAME_A 
    | typeof GAME_CONFIG.STATES.GAME_B
    | typeof GAME_CONFIG.STATES.SHOW_TIME;

export interface typeNumGame {
    penalties: number,
    ball: number,
    timeStart: string,
    timeEnd?: string
};

export interface typeGameState {
    timerStart: number,       
    flagRabbit: string,         
    controlSec: number,
    gameIntervalId: number,
    svgGuideTimer: number | null,
    numGame: GameStatus,
    recordVal: Record<GameStatus, typeNumGame>; 

    reset(): void;
};


export const gameState: typeGameState = {
    //глобальные переменные
    timerStart: 0,       // Отслеживание режима игры
    flagRabbit: '0',         // Появление зайца
    controlSec: 0,
    gameIntervalId: 0,
    svgGuideTimer: null,
    numGame: GAME_CONFIG.STATES.STOPPED,

    // Все ваши игровые рекорды и статистика внутри одного объекта
    recordVal: {
        [GAME_CONFIG.STATES.STOPPED]: { penalties: 0, ball: 0, timeStart: '', timeEnd: '' },
        [GAME_CONFIG.STATES.GAME_A]:  { penalties: 0, ball: 0, timeStart: '', timeEnd: '' },
        [GAME_CONFIG.STATES.GAME_B]:  { penalties: 0, ball: 0, timeStart: '', timeEnd: '' },
        [GAME_CONFIG.STATES.SHOW_TIME]: { penalties: 0, ball: 0, timeStart: '', timeEnd: '' }
    },    
  
    // Вспомогательный метод, чтобы быстро сбросить игру к начальным настройкам
    reset() : void{
        const currentGame = this.recordVal[this.numGame];
        this.timerStart = 0;
        this.flagRabbit = '0';
        if (currentGame) {
            currentGame.penalties = 0;
            currentGame.ball = 0;
        }
        this.numGame = GAME_CONFIG.STATES.STOPPED;
    }
};
