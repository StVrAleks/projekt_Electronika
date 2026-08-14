export function ininit(DOM){
  

DOM.instruction = document.getElementById('modal_win');
DOM.layer4 = document.getElementById('for_game_layer4');
DOM.canvas = document.getElementById('game_canvas');
DOM.gameA = document.getElementById('gameA');
DOM.gameB = document.getElementById('gameB');
DOM.ochki = document.getElementById('ochki');
DOM.control4 = document.getElementById('control_4');
DOM.control8 = document.getElementById('control_8');
DOM.control6 = document.getElementById('control_6');
DOM.but1 = document.getElementById('but1');
DOM.but2 = document.getElementById('but2');
DOM.but3 = document.getElementById('but3');
DOM.but4 = document.getElementById('but4');
DOM.imgsGame = document.getElementsByClassName('imgsGame');
DOM.imgsChiken = document.getElementsByClassName('chiken');
DOM.eg1 = document.getElementsByClassName('eg_left_top');
DOM.eg2 = document.getElementsByClassName('eg_left_bot');
DOM.eg3 = document.getElementsByClassName('eg_right_top');
DOM.eg4 = document.getElementsByClassName('eg_right_bot');
DOM.bd1 = document.getElementById('bdyj_left1');
DOM.bd2 = document.getElementById('bdyj_left2');    
DOM.bd3 = document.getElementById('bdyj_right1');
DOM.bd4 = document.getElementById('bdyj_right2');
DOM.cypL = document.getElementsByClassName('cyplenok_left');
DOM.cypR = document.getElementsByClassName('cyplenok_right');
DOM.hend = document.getElementsByClassName('hend');
DOM.bant = document.getElementsByClassName('bant');
DOM.gameOver = document.getElementById('game_over');
DOM.rabbit = document.getElementById('rabbit');
DOM.hends = document.getElementsByClassName('hend_z'); 
DOM.curTime = document.getElementById('curTime');
DOM.logo = document.getElementById('logo');
DOM.svg1 = document.getElementById('svg1');
DOM.svg2 = document.getElementById('svg2');

DOM.masXY = {
    0: { 11: 0.1, 12: 0.2, 21: 0.3, 22: 0.2 },//И
    1: { 11: 0.3, 12: 0.2, 21: 0.1, 22: 0.65 },//И
    2: { 11: 0.1, 12: 0.65, 21: 0.55, 22: 0.2 },//И
    3: { 11: 0.55, 12: 0.2, 21: 0.35, 22: 0.65 },//И
    4: { 11: 0.1, 12: 0.9, 21: 0.25, 22: 0.9 },//m
    5: { 11: 0.25, 12: 0.9, 21: 0.7, 22: 0.45 },//m
    6: { 11: 0.7, 12: 0.45, 21: 0.5, 22: 0.9 },//m
    7: { 11: 0.5, 12: 0.9, 21: 0.9, 22: 0.45 },//m
    8: { 11: 0.9, 12: 0.45, 21: 0.7, 22: 0.9 }//m
    };
}