export const gameState = {
    //глобальные переменные
    timerStart: 0,       // Отслеживание режима игры
    flagRabbit: 0,         // Появление зайца
    controlSec: 0,
    gameIntervalId: 0,
    svgGuideTimer: null,


    // Все ваши игровые рекорды и статистика внутри одного объекта
    recordVal: {
        numGame: {
            penalties: 0,   
            ball: 0,
            timeStart: '',
            timeEnd: ''
        }
    },
    
    // Вспомогательный метод, чтобы быстро сбросить игру к начальным настройкам
    reset() {
        this.timerStart = 0;
        this.flagRabbit = 0;
        this.recordVal.numGame.penalties = 0;
        this.recordVal.numGame.ball = 0;
    }
};