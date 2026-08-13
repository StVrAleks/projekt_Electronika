export const gameState = {
    //глобальные переменные
    timerStart: 0,       // Отслеживание режима игры
    flagZaya: 0,         // Появление зайца
    controlSec: 0,
    gameIntervalId: 0,

    // Все ваши игровые рекорды и статистика внутри одного объекта
    recordVal: {
        numGame: {
            shtraf: 0,   // Инициализируем числами, а не пустой строкой
            ball: 0,
            timeStart: '',
            timeEnd: ''
        }
    },
    
    // Вспомогательный метод, чтобы быстро сбросить игру к начальным настройкам
    reset() {
        this.timerStart = 0;
        this.flagZaya = 0;
        this.recordVal.numGame.shtraf = 0;
        this.recordVal.numGame.ball = 0;
    }
};
