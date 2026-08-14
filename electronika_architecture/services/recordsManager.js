import { gameState } from '../core/gameState.js';
import { addSVG } from '../utils/add_svg.js'; // Если нужно перерисовывать при закрытии
import { GAME_CONFIG } from '../core/gameConfig.js';

export class RecordsManager {
    constructor(tableId, containerId, storageKey = 'GAME_INFO') {
        this.table = document.getElementById(tableId);
        this.tbody = this.table ? this.table.querySelector('tbody') : null;
        this.container = document.getElementById(containerId);
        this.storageKey = storageKey;
    }

    // --- ЛОГИКА ХРАНИЛИЩА ---

    saveRecord() {
        const currentRecords = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        
        const newRecord = {
            ball: gameState.recordVal.numGame.ball,
            penalties: gameState.recordVal.numGame.penalties,
            timeStart: gameState.recordVal.numGame.timeStart,
            timeEnd: gameState.recordVal.numGame.timeEnd
        };
        
        currentRecords.push(newRecord);
        localStorage.setItem(this.storageKey, JSON.stringify(currentRecords));
        
     //   alert('Рекорд успешно сохранен!');
        this.refreshTable();
    }

getRecords() {
    const rawData = localStorage.getItem(this.storageKey);
    if (!rawData) return [];

    try {
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Ошибка парсинга рекордов из LocalStorage:', error);
        return []; 
    }
}

    // --- ЛОГИКА ИНТЕРФЕЙСА ---

    showRecords() {
        gameState.timerStart = GAME_CONFIG.STATES.STOPPED;
        if (this.container) {
            this.container.style.transition = "0.8s ease";
            this.container.style.zIndex = "100";
            this.container.style.opacity = "1";
            this.container.style.height = "100%";
        }
        
        // Скрываем игровые слои
        this._toggleGameVisibility(0);
        
        // Обновляем таблицу при открытии
        this.refreshTable();
    }

    closeRecords() {
        if (this.container) {
            this.container.style.opacity = "0";
            this.container.style.height = "0px";
            this.container.style.zIndex = "1";
        }
        
        this._toggleGameVisibility(1);
        
        // Принудительный ресайз логотипа через вашу функцию
        add_svg();
    }

    refreshTable() {
        if (!this.tbody) return;

        // Очистка всех строк кроме заголовка
        const rows = this.tbody.querySelectorAll('tr');
        for (let i = rows.length - 1; i > 0; i--) {
            this.tbody.rows[i].remove();;
        }

        const savedRecords = this.getRecords();
        savedRecords.forEach((record, index) => {
            this._renderRow(record, index + 1);
        });
    }

    _renderRow(record, index) {
        const nextTr = document.createElement("tr");
        
        const data = [
            index,
            record.ball || 0,
            record.penalties || 0,
            record.timeStart || '-',
            record.timeEnd || '-'
        ];

        data.forEach(text => {
            const td = document.createElement("td");
            td.textContent = text;
            nextTr.appendChild(td);
        });

        this.tbody.appendChild(nextTr);
    }

    _toggleGameVisibility(opacity) {
        const ids = ['place_game_in', 'game_canvas'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.opacity = opacity;
                el.style.transition = "0.8s ease";
            }
        });

        const svgs = document.getElementsByTagName('svg');
        for (let i = 0; i < svgs.length - 1; i++) {
            svgs[i].style.opacity = opacity;
        }
    }
}