import { numLotokKeysA, numLotokKeysB } from '../core/gameConfig.js';
export class GameRandomizer {
    private bag: (numLotokKeysA | numLotokKeysB)[] = [];  
    constructor() {
        this.bag = [];
    }

    // Метод выдает случайный индекс 0, 1 или 2 без частых повторов
    getNextIndex(gameType: 'A' | 'B'): numLotokKeysA | numLotokKeysB | undefined{
        // Если мешок пуст, наполняем его индексами 0, 1, 2 и перемешиваем
        if (this.bag.length === 0) {
            if (gameType === 'A') {
                this.bag = [0,1,2]; // Для игры А только 3 лотка
            } else {
                this.bag =[0,1,2,3]; // Для игры В — 4 лотка
            }
            // Перемешиваем мешок
            this.bag.sort(() => Math.random() - 0.5);
        }
        // Забираем последний элемент из мешка
        return this.bag.pop();
    }
    getIndexFromTwo(){
        const m = 0, n = 1; //рандомный выбор числа от 0 до 1
        return Math.floor(Math.random()*(m-n+1))+n;
    }
}