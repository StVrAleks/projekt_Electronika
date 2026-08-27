  export type masXYKeys = 0| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  type masXYKeysX = 11 | 12 | 21 | 22;
  type type_koordinat = Record <masXYKeysX, number>;

  export interface IDOM {
    instruction : HTMLDialogElement | null;
    layer4: HTMLElement | null;
    canvas: HTMLCanvasElement | null;
    gameA : HTMLElement | null;
    gameB: HTMLElement | null;
    ochki: HTMLElement | null;
    control4: HTMLElement | null;
    control8: HTMLElement | null;
    control6: HTMLElement | null;
    but1: HTMLElement | null;
    but2: HTMLElement | null;
    but3: HTMLElement | null;
    but4: HTMLElement | null;
    imgsGame: HTMLCollectionOf<Element> | null;
    imgsChiken: HTMLCollectionOf<Element> | null;
    eg1: HTMLCollectionOf<Element> | null;
    eg2: HTMLCollectionOf<Element> | null;
    eg3: HTMLCollectionOf<Element> | null;
    eg4: HTMLCollectionOf<Element> | null;
    bd1: HTMLElement | null;
    bd2: HTMLElement | null;   
    bd3: HTMLElement | null;
    bd4: HTMLElement | null;
    cypL: HTMLCollectionOf<Element> | null;
    cypR: HTMLCollectionOf<Element> | null;
    hend: HTMLCollectionOf<Element> | null;
    bant: HTMLCollectionOf<Element> | null;
    gameOver: HTMLElement | null;
    rabbit: HTMLElement | null;
    hends: HTMLCollectionOf<Element> | null; 
    curTime: HTMLElement | null;
    logo: HTMLElement | null;
    svg1: SVGElement | null;
    svg2: SVGElement | null;

    masXY: Record<masXYKeys, type_koordinat>;
  };


export function ininit(DOM : IDOM){
 
DOM.instruction = document.getElementById('modal_win') as HTMLDialogElement;
DOM.layer4 = document.getElementById('for_game_layer4') as HTMLBodyElement;
DOM.canvas = document.getElementById('game_canvas') as HTMLCanvasElement;
DOM.gameA = document.getElementById('gameA') as HTMLBodyElement;
DOM.gameB = document.getElementById('gameB') as HTMLBodyElement;
DOM.ochki = document.getElementById('ochki') as HTMLBodyElement;
DOM.control4 = document.getElementById('control_4') as HTMLBodyElement;
DOM.control8 = document.getElementById('control_8') as HTMLBodyElement;
DOM.control6 = document.getElementById('control_6') as HTMLBodyElement;
DOM.but1 = document.getElementById('but1') as HTMLBodyElement;
DOM.but2 = document.getElementById('but2') as HTMLBodyElement;
DOM.but3 = document.getElementById('but3') as HTMLBodyElement;
DOM.but4 = document.getElementById('but4') as HTMLBodyElement;
DOM.imgsGame = document.getElementsByClassName('imgsGame') as HTMLCollectionOf<Element>;
DOM.imgsChiken = document.getElementsByClassName('chiken') as HTMLCollectionOf<Element>;
DOM.eg1 = document.getElementsByClassName('eg_left_top') as HTMLCollectionOf<Element>;
DOM.eg2 = document.getElementsByClassName('eg_left_bot') as HTMLCollectionOf<Element>;
DOM.eg3 = document.getElementsByClassName('eg_right_top') as HTMLCollectionOf<Element>;
DOM.eg4 = document.getElementsByClassName('eg_right_bot') as HTMLCollectionOf<Element>;
DOM.bd1 = document.getElementById('bdyj_left1') as HTMLBodyElement;
DOM.bd2 = document.getElementById('bdyj_left2') as HTMLBodyElement;    
DOM.bd3 = document.getElementById('bdyj_right1') as HTMLBodyElement;
DOM.bd4 = document.getElementById('bdyj_right2') as HTMLBodyElement;
DOM.cypL = document.getElementsByClassName('cyplenok_left') as HTMLCollectionOf<Element>;
DOM.cypR = document.getElementsByClassName('cyplenok_right') as HTMLCollectionOf<Element>;
DOM.hend = document.getElementsByClassName('hend') as HTMLCollectionOf<Element>;
DOM.bant = document.getElementsByClassName('bant') as HTMLCollectionOf<Element>;
DOM.gameOver = document.getElementById('game_over') as HTMLBodyElement;
DOM.rabbit = document.getElementById('rabbit') as HTMLBodyElement;
DOM.hends = document.getElementsByClassName('hend_z') as HTMLCollectionOf<Element>; 
DOM.curTime = document.getElementById('curTime') as HTMLBodyElement;
DOM.logo = document.getElementById('logo') as HTMLBodyElement;
DOM.svg1 = document.getElementById('svg1') as unknown as SVGElement;
DOM.svg2 = document.getElementById('svg2') as unknown as SVGElement;

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