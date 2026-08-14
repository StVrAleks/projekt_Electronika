import { ininit } from '../core/gameInit.js';

export class addSVG{
  SVG_NS = "http://www.w3.org/2000/svg";

  init_svg_structure(SVG_NS, DOM) {
  // Инициализация SVG 1
 // const logo1 = document.getElementById('logo');
  if (DOM.logo1 && !DOM.svg1) {
    const svg = document.createElementNS(SVG_NS, "svg");
    
    svg.id = 'svg1';
    svg.style.position = 'absolute';
    svg.style.zIndex = '9999';
    svg.style.pointerEvents = 'none';

    for (let i = 0; i < 9; i++) {
      const partLine = document.createElementNS(SVG_NS, 'line');
      partLine.setAttribute('stroke', 'black');
      partLine.setAttribute('stroke-width', '3');
      svg.appendChild(partLine);
    }
    document.body.appendChild(svg);
  }

  // Инициализация SVG 2
  //const control_6 = document.getElementById('control_6');
  if (DOM.control6 && !DOM.svg2) {
    const svg2 = document.createElementNS(SVG_NS, "svg"); // Исправлен namespace
    svg2.id = 'svg2';
    svg2.style.position = 'absolute';
    svg2.style.zIndex = '25';
    svg2.style.pointerEvents = 'none';

    for (let j = 0; j < 11; j++) {
      if (j < 3 || j > 7) {
        const circleItem = document.createElementNS(SVG_NS, 'circle');
        circleItem.setAttribute('r', '1.5');
        circleItem.setAttribute("fill", "black");
        svg2.appendChild(circleItem);
      }
    }
    document.body.appendChild(svg2);
  }
}


  update_svg_positions(SVG_NS, DOM) {
  // 1. Обновление первого SVG (Логотип)
  const logo1 = document.getElementById('logo');
  const svg1 = document.getElementById('svg1');
  
  if (logo1 && svg1) {
    const elem_logo = logo1.getBoundingClientRect();  
    const logoW = logo1.offsetWidth;
    const logoH = logo1.offsetHeight;
    const svgX = elem_logo.left + window.scrollX;
    const svgY = elem_logo.top + window.scrollY;

    svg1.setAttribute('width', logoW);
    svg1.setAttribute('height', logoH);
    svg1.style.top = svgY + 'px';
    svg1.style.left = svgX + 'px';

    const lines = svg1.querySelectorAll('line');
    lines.forEach((line, i) => {
      line.setAttribute('x1', logoW * DOM.masXY[i][11]);
      line.setAttribute('y1', logoH * DOM.masXY[i][12]);
      line.setAttribute('x2', logoW * DOM.masXY[i][21]);
      line.setAttribute('y2', logoH * DOM.masXY[i][22]);
    });
  }

}
}
/*
export  function add_svg(DOM) {
   // 1. РћРўР РРЎРћР’РљРђ Р›РћР“РћРўРРџРђ "РРњ" (РЎР»РµРІР° РЅР° РєРѕСЂРїСѓСЃРµ)
  //var logo1 = document.getElementById('logo');
  if (DOM.logo) {
    var elem_logo = DOM.logo.getBoundingClientRect();  

   // var oldSvg1 = document.getElementById('svg1');
    if (DOM.svg1) DOM.svg1.remove();

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var logoW = DOM.logo.offsetWidth;
    var logoH = DOM.logo.offsetHeight;
    
    var svgX = elem_logo.left + (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
    var svgY = elem_logo.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

    svg.setAttribute('width', logoW);
    svg.setAttribute('height', logoH);
    svg.setAttribute('style', 'position: absolute !important;');    
    svg.id = 'svg1';


  svg.style.top = svgY + 'px';
  svg.style.left = svgX + 'px';
  svg.style.zIndex = "9999 !important";
  svg.style.pointerEvents = 'none'; 

  /*  var masXY = {
    0: { 11: 0.1, 12: 0.2, 21: 0.3, 22: 0.2 },//Рё
    1: { 11: 0.3, 12: 0.2, 21: 0.1, 22: 0.65 },//Рё
    2: { 11: 0.1, 12: 0.65, 21: 0.55, 22: 0.2 },//Рё
    3: { 11: 0.55, 12: 0.2, 21: 0.35, 22: 0.65 },//Рё
    4: { 11: 0.1, 12: 0.9, 21: 0.25, 22: 0.9 },//m
    5: { 11: 0.25, 12: 0.9, 21: 0.7, 22: 0.45 },//m
    6: { 11: 0.7, 12: 0.45, 21: 0.5, 22: 0.9 },//m
    7: { 11: 0.5, 12: 0.9, 21: 0.9, 22: 0.45 },//m
    8: { 11: 0.9, 12: 0.45, 21: 0.7, 22: 0.9 }//m
    };*/

   /* for (var i = 0; i < 9; i++) {
      var partLine = document.createElementNS(svg.namespaceURI, 'line');
      partLine.setAttribute('x1', logoW * DOM.masXY[i][11]);
      partLine.setAttribute('y1', logoH * DOM.masXY[i][12]);
      partLine.setAttribute('x2', logoW * DOM.masXY[i][21]);
      partLine.setAttribute('y2', logoH * DOM.masXY[i][22]);
      partLine.setAttribute('stroke', 'black');
      partLine.setAttribute('stroke-width', '3');
      svg.appendChild(partLine);
    }
    document.body.appendChild(svg);
  }


  // 2. РћРўР РРЎРћР’РљРђ РўРћР§Р•Рљ Р‘РЈР”РР›Р¬РќРРљРђ (РЎРїСЂР°РІР° РЅР° РєРѕСЂРїСѓСЃРµ РІРѕРєСЂСѓРі РєРѕР»РѕРєРѕР»СЊС‡РёРєР° L)
  //var control_6 = document.getElementById('control_6');
  if (DOM.control6) {
    var control = DOM.control6.getBoundingClientRect();
    
   // var oldSvg2 = document.getElementById('svg2');
    if (DOM.svg2) DOM.svg2.remove();

    var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var controlW = 2.5 * DOM.control6.offsetWidth;
    var controlH = 2.5 * DOM.control6.offsetHeight;
    
    var svg2X = control.left + window.scrollX - 3;
    var svg2Y = control.top + window.scrollY - 4;

    svg2.setAttribute('width', controlW);
    svg2.setAttribute('height', controlH);
    svg2.id = 'svg2';

    svg2.setAttribute('style', 'position: absolute !important; top: ' + svg2Y + 'px !important; left: ' + svg2X + 'px !important; z-index: 25 !important;');

    for (var j = 0; j < 11; j++) {
      if (j < 3 || j > 7) {
        var curcleItem = document.createElementNS(svg2.namespaceURI, 'circle');
        var curcleItemX = controlW * 0.6 + controlW * 0.5 * Math.sin(360 / 12 / 180 * Math.PI * (j + 1));
        var curcleItemY = controlW * 0.6 - controlW * 0.5 * Math.cos(360 / 12 / 180 * Math.PI * (j + 1));
        curcleItem.setAttribute('cx', curcleItemX * 0.7);
        curcleItem.setAttribute('cy', curcleItemY);
        curcleItem.setAttribute('r', 1.5);
        curcleItem.setAttribute("fill", "black");
        svg2.appendChild(curcleItem);
      }
    }
    document.body.appendChild(svg2); 
  }

}
*/
