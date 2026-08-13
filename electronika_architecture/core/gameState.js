export const gameState = {
    //глобальные переменные
    timerStart: 0,       // Отслеживание режима игры
    flagZaya: 0,         // Появление зайца
    controlSec: 0,
    gameIntervalId: 0,
    eg = {
      1:{"eg": DOM.eg1, "bd":DOM.bd1, "cyp":DOM.cypL, "hend": DOM.hend[0]},
      2:{"eg": DOM.eg2,"bd":DOM.bd2, "cyp":DOM.cypL, "hend": DOM.hend[3]},
      3:{"eg": DOM.eg3,"bd":DOM.bd3, "cyp":DOM.cypR, "hend": DOM.hend[1]},
      4:{"eg": DOM.eg4,"bd":DOM.bd4, "cyp":DOM.cypR, "hend": DOM.hend[2]}
    },

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
