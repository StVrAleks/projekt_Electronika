import { visibleManager } from './visibleManager.js';
//const visibleManager2 = new VisibleStyle();

export class GameControls {
    // Внутренний вспомогательный метод для получения элементов
    getElements() {
        return {
            volk: document.getElementsByClassName('volk'), 
            hend: document.getElementsByClassName('hend')
        };
    }

    // Внутренний метод для сброса прозрачности всех рук и управления волком
    setDirection(volkShowIndex, volkHideIndex, activeHendIndex) {
        const { volk, hend } = this.getElements();

        // Проверяем, что элементы вообще есть на странице (защита от ошибок)
        if (volk[volkShowIndex] && volk[volkHideIndex]) {
           // visibleManager.addVisible(volk[volkShowIndex])
           //visibleManager.removeVisible(volk[volkHideIndex])
           volk[volkShowIndex].style.opacity = '1';
            volk[volkHideIndex].style.opacity = '0';
        }

        // Сбрасываем все руки в 0
        for (let i = 0; i < hend.length; i++) {
            hend[i].style.opacity = '0';
            //visibleManager.removeVisible(hend[i])
        }

        // Включаем нужную руку
        if (hend[activeHendIndex]) {
           // visibleManager.addVisible(hend[activeHendIndex])   
            hend[activeHendIndex].style.opacity = '1';        
        }
    }

    // Вспомогательный метод для отмены стандартного поведения события
    prevent(event) {
        // Используем переданный event или глобальный window.event для старых браузеров
        const e = event || window.event;
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
    }

    // --- Публичные методы (ваши 4 функции) ---

    leftTop(event) {
        this.prevent(event);
        // Волк: показать 1, скрыть 0. Рука: показать 0
        this.setDirection(1, 0, 0);
    }

    leftBot(event) {
        this.prevent(event);
        // Волк: показать 1, скрыть 0. Рука: показать 3
        this.setDirection(1, 0, 3);
    }

    rightTop(event){
        this.prevent(event);
        // Волк: показать 0, скрыть 1. Рука: показать 2
        this.setDirection(0, 1, 1);
    }

    rightBot(event) {
        this.prevent(event);
        // Волк: показать 0, скрыть 1. Рука: показать 1
        this.setDirection(0, 1, 2);
    }
    hiddenVolk(){
        //this.prevent(event);
        // Волк: показать 0, скрыть 1. Рука: 5 - отсутствует, поэтому не зайдет в ветку по проверке
        this.setDirection(1, 1, 5);
    }
}

