import { gameState } from '../core/gameState.js';
import { typeNumGame } from '../core/gameState.js';
import { AddSVG } from '../utils/add_svg.js'; // Если нужно перерисовывать при закрытии
import { GAME_CONFIG } from '../core/gameConfig.js';
import { IDOM } from '../core/gameInit.js';

const addSVG1 = new AddSVG();

export class RecordsManager {
        table : HTMLElement;
        tbody : HTMLElement | null;
        container : HTMLElement;
        storageKey : string;
        elDOM : IDOM;

    constructor(tableId : string, containerId : string, storageKey : string = 'GAME_INFO', DOM:IDOM) {
        this.table = document.getElementById(tableId) as HTMLElement;
        this.tbody = this.table ? this.table.querySelector('tbody') : null;
        this.container = document.getElementById(containerId) as HTMLElement;
        this.storageKey = storageKey;
        this.elDOM = DOM as IDOM;
    }

    // --- ЛОГИКА ХРАНИЛИЩА ---

    saveRecord() {
        const currentRecords = JSON.parse(localStorage.getItem(this.storageKey) || '[]') as typeNumGame[];
        const currentGame = gameState.recordVal[gameState.numGame];

        if (!currentGame) {
            console.error("Нет данных для сохранения текущей игры");
            return;
        }
        const newRecord : typeNumGame = {
            ball: currentGame.ball,
            penalties: currentGame.penalties,
            timeStart: currentGame.timeStart,
            timeEnd: currentGame.timeEnd
        };
        
        currentRecords.push(newRecord);
        localStorage.setItem(this.storageKey, JSON.stringify(currentRecords));
        
     //   alert('Рекорд успешно сохранен!');
        this.refreshTable();
    }

    getRecords() {
        const rawData : string | null = localStorage.getItem(this.storageKey);
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
        this._toggleGameVisibility('0');
        
        // Обновляем таблицу при открытии
        this.refreshTable();
    }

    closeRecords() {
        if (this.container) {
            this.container.style.opacity = "0";
            this.container.style.height = "0px";
            this.container.style.zIndex = "1";
        }
        
        this._toggleGameVisibility('1');
        
        // Принудительный ресайз логотипа через вашу функцию
        addSVG1.update_svg_positions(this.elDOM);
    }

    refreshTable() {
        if (!this.tbody) return;

        // Очистка всех строк кроме заголовка
        const rows: NodeListOf<HTMLTableRowElement> = this.tbody.querySelectorAll('tr');
        for (let i = rows.length - 1; i > 0; i--) {
            rows[i]?.remove();
        }

        const savedRecords = this.getRecords();
        savedRecords.forEach((record, index) => {
            this._renderRow(record, index + 1);
        });
    }

    _renderRow(record : typeNumGame, index : number) {
        const nextTr = document.createElement("tr") as HTMLTableRowElement;
        
        const data = [
            index,
            record.ball || 0,
            record.penalties || 0,
            record.timeStart || '-',
            record.timeEnd || '-'
        ];

        data.forEach(text => {
            const td = document.createElement("td") as HTMLTableCellElement;
            td.textContent = text !== undefined ? String(text) : '-';
            nextTr.appendChild(td);
        });

        this.tbody?.appendChild(nextTr);
    }

    _toggleGameVisibility(opacity : string) {
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