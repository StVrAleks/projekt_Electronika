export class GameRandomizer {
    constructor() {
        this.bag = [];
    }

    // Метод выдает случайный индекс 0, 1 или 2 без частых повторов
    getNextIndex() {
        // Если мешок пуст, наполняем его индексами 0, 1, 2 и перемешиваем
        if (this.bag.length === 0) {
            this.bag = Array.of(0, 1, 2);;
            // Случайная сортировка (перемешивание)
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