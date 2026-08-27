import { IDOM, masXYKeys } from '../core/gameInit.js';

export class AddSVG{
  SVG_NS = "http://www.w3.org/2000/svg";

  init_svg_structure(DOM: IDOM) {
  // Инициализация SVG 1
  if (DOM.logo &&  !DOM.svg1) {
    const svg = document.createElementNS(this.SVG_NS, "svg") as SVGSVGElement;
    
    svg.id = 'svg1';
    svg.style.position = 'absolute';
    svg.style.zIndex = '9999';
    svg.style.pointerEvents = 'none';

    for (let i = 0; i < 9; i++) {
      const partLine = document.createElementNS(this.SVG_NS, 'line') as SVGLineElement;
      partLine.setAttribute('stroke', 'black');
      partLine.setAttribute('stroke-width', '3');
      svg.appendChild(partLine);
    }
    document.body.appendChild(svg);
    DOM.svg1 = svg; 
  }

  // Инициализация SVG 2
  if (DOM.control6 && !DOM.svg2) {
    const svgM = document.createElementNS(this.SVG_NS, "svg") as SVGSVGElement; 
    svgM.id = 'svg2';
    svgM.style.position = 'absolute';
    svgM.style.zIndex = '25';
    svgM.style.pointerEvents = 'none';
    

    for (let j = 0; j < 11; j++) {
      if (j < 3 || j > 7) {
        const circleItem = document.createElementNS(this.SVG_NS, 'circle') as SVGCircleElement;
        circleItem.setAttribute('r', '1.5');
        circleItem.setAttribute("fill", "black");
        svgM.appendChild(circleItem);
      }
    }
    document.body.appendChild(svgM);
    DOM.svg2 = svgM; 
  }
}


  update_svg_positions(DOM: IDOM) {
  // 1. Обновление первого SVG (Логотип)

  if (DOM.logo && DOM.svg1 && DOM.masXY) {
    const elem_logo :DOMRect = DOM.logo.getBoundingClientRect();  
    const logoW : number = DOM.logo.offsetWidth;
    const logoH : number = DOM.logo.offsetHeight;
    const svgX : number = elem_logo.left + window.scrollX;
    const svgY : number = elem_logo.top + window.scrollY;

    DOM.svg1.setAttribute('width', logoW.toString());
    DOM.svg1.setAttribute('height', logoH.toString());
    DOM.svg1.style.top = svgY + 'px';
    DOM.svg1.style.left = svgX + 'px';

    const lines : NodeListOf<SVGLineElement> = DOM.svg1.querySelectorAll('line');
    lines.forEach((line, i) => {
      let key = i as  masXYKeys;
       if (DOM.masXY[key]) {
          line.setAttribute('x1', `${logoW * DOM.masXY[key][11]}`);
          line.setAttribute('y1', `${logoH * DOM.masXY[key][12]}`);
          line.setAttribute('x2', `${logoW * DOM.masXY[key][21]}`);
          line.setAttribute('y2', `${logoH * DOM.masXY[key][22]}`);
       }
    });
  }
   
    if (DOM.control6 && DOM.svg2) {
      const control: DOMRect = DOM.control6.getBoundingClientRect();
      const controlW: number = 2.5 * DOM.control6.offsetWidth;
      const controlH: number = 2.5 * DOM.control6.offsetHeight;
      const svg2X: number = control.left + window.scrollX - 3;
      const svg2Y: number = control.top + window.scrollY - 4;

      DOM.svg2.setAttribute('width', `${controlW}`);
      DOM.svg2.setAttribute('height', `${controlH}`);
      DOM.svg2.style.top = svg2Y + 'px';
      DOM.svg2.style.left = svg2X + 'px';

      const circles = DOM.svg2.querySelectorAll('circle');
      let circleIndex = 0;

      for (let j = 0; j < 11; j++) {
        if (j < 3 || j > 7) {
          const circleItem = circles[circleIndex];
          if (circleItem) {
            const circleItemX = controlW * 0.6 + controlW * 0.5 * Math.sin(360 / 12 / 180 * Math.PI * (j + 1));
            const circleItemY = controlW * 0.6 - controlW * 0.5 * Math.cos(360 / 12 / 180 * Math.PI * (j + 1));
            
            circleItem.setAttribute('cx', `${circleItemX * 0.7}`);
            circleItem.setAttribute('cy', `${circleItemY}`);
          }
          circleIndex++;
        }
      }
    }
}
}
