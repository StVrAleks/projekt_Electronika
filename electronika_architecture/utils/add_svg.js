import { ininit } from '../core/gameInit.js';

export class addSVG{
  SVG_NS = "http://www.w3.org/2000/svg";

  init_svg_structure(DOM) {
  // Инициализация SVG 1
  if (DOM.logo &&  !DOM.svg1) {
    const svg = document.createElementNS(this.SVG_NS, "svg");
    
    svg.id = 'svg1';
    svg.style.position = 'absolute';
    svg.style.zIndex = '9999';
    svg.style.pointerEvents = 'none';

    for (let i = 0; i < 9; i++) {
      const partLine = document.createElementNS(this.SVG_NS, 'line');
      partLine.setAttribute('stroke', 'black');
      partLine.setAttribute('stroke-width', '3');
      svg.appendChild(partLine);
    }
    document.body.appendChild(svg);
    DOM.svg1 = svg; 
  }

  // Инициализация SVG 2
  //const control_6 = document.getElementById('control_6');
  if (DOM.control6 && !DOM.svg2) {
    const svgM = document.createElementNS(this.SVG_NS, "svg"); 
    svgM.id = 'svg2';
    svgM.style.position = 'absolute';
    svgM.style.zIndex = '25';
    svgM.style.pointerEvents = 'none';
    

    for (let j = 0; j < 11; j++) {
      if (j < 3 || j > 7) {
        const circleItem = document.createElementNS(this.SVG_NS, 'circle');
        circleItem.setAttribute('r', '1.5');
        circleItem.setAttribute("fill", "black");
        svgM.appendChild(circleItem);
      }
    }
    document.body.appendChild(svgM);
    DOM.svg2 = svgM; 
  }
}


  update_svg_positions(DOM) {
  // 1. Обновление первого SVG (Логотип)

  if (DOM.logo && DOM.svg1 && DOM.masXY) {
      console.log(' update_svg_positions in if');
    const elem_logo = DOM.logo.getBoundingClientRect();  
    const logoW = DOM.logo.offsetWidth;
    const logoH = DOM.logo.offsetHeight;
    const svgX = elem_logo.left + window.scrollX;
    const svgY = elem_logo.top + window.scrollY;

    svg1.setAttribute('width', logoW);
    svg1.setAttribute('height', logoH);
    svg1.style.top = svgY + 'px';
    svg1.style.left = svgX + 'px';

    const lines = svg1.querySelectorAll('line');
    lines.forEach((line, i) => {
       if (DOM.masXY[i]) {
          line.setAttribute('x1', logoW * DOM.masXY[i][11]);
          line.setAttribute('y1', logoH * DOM.masXY[i][12]);
          line.setAttribute('x2', logoW * DOM.masXY[i][21]);
          line.setAttribute('y2', logoH * DOM.masXY[i][22]);
       }
    });
  }
   
    if (DOM.control6 && DOM.svg2) {
      const control = DOM.control6.getBoundingClientRect();
      const controlW = 2.5 * DOM.control6.offsetWidth;
      const controlH = 2.5 * DOM.control6.offsetHeight;
      const svg2X = control.left + window.scrollX - 3;
      const svg2Y = control.top + window.scrollY - 4;

      svg2.setAttribute('width', controlW);
      svg2.setAttribute('height', controlH);
      svg2.style.top = svg2Y + 'px';
      svg2.style.left = svg2X + 'px';

      const circles = svg2.querySelectorAll('circle');
      let circleIndex = 0;

      for (let j = 0; j < 11; j++) {
        if (j < 3 || j > 7) {
          const curcleItem = circles[circleIndex];
          if (curcleItem) {
            const curcleItemX = controlW * 0.6 + controlW * 0.5 * Math.sin(360 / 12 / 180 * Math.PI * (j + 1));
            const curcleItemY = controlW * 0.6 - controlW * 0.5 * Math.cos(360 / 12 / 180 * Math.PI * (j + 1));
            
            curcleItem.setAttribute('cx', curcleItemX * 0.7);
            curcleItem.setAttribute('cy', curcleItemY);
          }
          circleIndex++;
        }
      }
    }
}
}
