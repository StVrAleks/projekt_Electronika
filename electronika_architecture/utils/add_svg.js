

export  function add_svg() {
   // 1. РћРўР РРЎРћР’РљРђ Р›РћР“РћРўРРџРђ "РРњ" (РЎР»РµРІР° РЅР° РєРѕСЂРїСѓСЃРµ)
  var logo1 = document.getElementById('logo');
  if (logo1) {
    var elem_logo = logo1.getBoundingClientRect();  

    var oldSvg1 = document.getElementById('svg1');
    if (oldSvg1) oldSvg1.remove();

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var logoW = logo1.offsetWidth;
    var logoH = logo1.offsetHeight;
    
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

    var masXY = {
    0: { 11: 0.1, 12: 0.2, 21: 0.3, 22: 0.2 },//Рё
    1: { 11: 0.3, 12: 0.2, 21: 0.1, 22: 0.65 },//Рё
    2: { 11: 0.1, 12: 0.65, 21: 0.55, 22: 0.2 },//Рё
    3: { 11: 0.55, 12: 0.2, 21: 0.35, 22: 0.65 },//Рё
    4: { 11: 0.1, 12: 0.9, 21: 0.25, 22: 0.9 },//m
    5: { 11: 0.25, 12: 0.9, 21: 0.7, 22: 0.45 },//m
    6: { 11: 0.7, 12: 0.45, 21: 0.5, 22: 0.9 },//m
    7: { 11: 0.5, 12: 0.9, 21: 0.9, 22: 0.45 },//m
    8: { 11: 0.9, 12: 0.45, 21: 0.7, 22: 0.9 }//m
    };

    for (var i = 0; i < 9; i++) {
      var partLine = document.createElementNS(svg.namespaceURI, 'line');
      partLine.setAttribute('x1', logoW * masXY[i][11]);
      partLine.setAttribute('y1', logoH * masXY[i][12]);
      partLine.setAttribute('x2', logoW * masXY[i][21]);
      partLine.setAttribute('y2', logoH * masXY[i][22]);
      partLine.setAttribute('stroke', 'black');
      partLine.setAttribute('stroke-width', '3');
      svg.appendChild(partLine);
    }
    document.body.appendChild(svg);
  }


  // 2. РћРўР РРЎРћР’РљРђ РўРћР§Р•Рљ Р‘РЈР”РР›Р¬РќРРљРђ (РЎРїСЂР°РІР° РЅР° РєРѕСЂРїСѓСЃРµ РІРѕРєСЂСѓРі РєРѕР»РѕРєРѕР»СЊС‡РёРєР° L)
  var control_6 = document.getElementById('control_6');
  if (control_6) {
    var control = control_6.getBoundingClientRect();
    
    var oldSvg2 = document.getElementById('svg2');
    if (oldSvg2) oldSvg2.remove();

    var svg2 = document.createElementNS("http://w3.org", "svg");
    var controlW = 2.5 * control_6.offsetWidth;
    var controlH = 2.5 * control_6.offsetHeight;
    
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

