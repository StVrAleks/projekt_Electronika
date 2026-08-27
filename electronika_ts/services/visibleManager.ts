class VisibleStyle {

    addVisible(el : HTMLCollection | NodeListOf<Element> | Element[] | Element | null) {
        if (!el) return;

        // Если это коллекция, массив или NodeList — рекурсивно обрабатываем каждый элемент внутри
        if (el instanceof NodeList || el instanceof HTMLCollection || Array.isArray(el)) {
            Array.from<Element>(el).forEach(item => this.addVisible(item));
            return;
        }

        // Защита: проверяем, что это действительно HTML-элемент со свойством classList
        if (el.classList) {
            if (el.classList.contains('isInvisible')) {
                el.classList.remove('isInvisible');
            }
            el.classList.add('isVisible');
        }
    }

    removeVisible(el : HTMLCollection | NodeListOf<Element> | Element[] | Element | null) {
        if (!el) return;

        // Если прилетел массив или коллекция — гасим все элементы внутри по очереди
        if (el instanceof NodeList || el instanceof HTMLCollection || Array.isArray(el)) {
            Array.from<Element>(el).forEach(item => this.removeVisible(item));
            return;
        }

        if (el.classList) {
            if (el.classList.contains('isVisible')) {
                el.classList.remove('isVisible');
            }
            el.classList.add('isInvisible');        
        }
    }
}
export const visibleManager = new VisibleStyle();