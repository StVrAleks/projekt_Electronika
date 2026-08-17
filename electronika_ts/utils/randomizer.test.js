
import { describe, test, expect, beforeEach } from 'vitest';const { GameRandomizer } = require('./randomizer'); 

describe('GameRandomizer (Логика мешка)', () => {
    let randomizer;

    beforeEach(() => {
        randomizer = new GameRandomizer();
    });

    test('Должен выдавать только индексы 0, 1 или 2', () => {
        for (let i = 0; i < 100; i++) {
            const index = randomizer.getNextIndex();
            expect([0, 1, 2]).toContain(index);
        }
    });

    test('За 3 вызова должен выдать уникальный набор индексов (перемешанный мешок)', () => {
        const results = [
            randomizer.getNextIndex(),
            randomizer.getNextIndex(),
            randomizer.getNextIndex()
        ];
        // Проверяем, что в массиве есть все три числа
        expect(results.sort()).toEqual([0, 1, 2]);
    });
});