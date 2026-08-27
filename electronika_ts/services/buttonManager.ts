export class GameControls {
    // Внутренний вспомогательный метод для получения элементов
    getElements() : { volk: HTMLCollectionOf<HTMLElement>; hend: HTMLCollectionOf<HTMLElement> } {
        return {
            volk: document.getElementsByClassName('volk') as HTMLCollectionOf<HTMLElement>,
            hend: document.getElementsByClassName('hend') as HTMLCollectionOf<HTMLElement>,
        };
    }

    // Внутренний метод для сброса прозрачности всех рук и управления волком
    setDirection(volkShowIndex : number, volkHideIndex : number, activeHendIndex : number) {
        const { volk, hend } = this.getElements();

        // Проверяем, что элементы вообще есть на странице (защита от ошибок)
        if (volk[volkShowIndex] && volk[volkHideIndex]) {
           // visibleManager.addVisible(volk[volkShowIndex])
           //visibleManager.removeVisible(volk[volkHideIndex])
           (volk[volkShowIndex] as HTMLElement).style.opacity = '1';
           (volk[volkHideIndex] as HTMLElement).style.opacity = '0';
        }

        // Сбрасываем все руки в 0
        for (let i = 0; i < hend.length; i++) {
            (hend[i] as HTMLElement).style.opacity = '0';
        }

        // Включаем нужную руку
        if ((hend[activeHendIndex] as HTMLElement)) {
            (hend[activeHendIndex] as HTMLElement).style.opacity = '1';        
        }
    }

    // Вспомогательный метод для отмены стандартного поведения события
    prevent(event: Event ) {
        // Используем переданный event или глобальный window.event для старых браузеров
        const e = event || window.event;
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
    }

    // --- Публичные методы (ваши 4 функции) ---

    leftTop(event: Event) {
        this.prevent(event);
        // Волк: показать 1, скрыть 0. Рука: показать 0
        this.setDirection(1, 0, 0);
    }

    leftBot(event: Event) {
        this.prevent(event);
        // Волк: показать 1, скрыть 0. Рука: показать 3
        this.setDirection(1, 0, 3);
    }

    rightTop(event: Event){
        this.prevent(event);
        // Волк: показать 0, скрыть 1. Рука: показать 2
        this.setDirection(0, 1, 1);
    }

    rightBot(event: Event) {
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

