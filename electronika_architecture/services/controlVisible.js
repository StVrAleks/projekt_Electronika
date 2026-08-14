export class VisibleStyle {

    addVisible(el){
        if (!el) return; 

        if( el && el.classList.contains('isInvisible'))
            el.classList.remove('isInvisible');//.style.opacity = 1;
        el.classList.add('isVisible');//.style.opacity = 1;
    }

    removeVisible(el){
        if (!el) return; 

        if( el && el.classList.contains('isVisible'))
            el.classList.remove('isVisible');//.style.opacity = 1;
        el.classList.add('isInvisible');//.style.opacity = 1;        
    }
}