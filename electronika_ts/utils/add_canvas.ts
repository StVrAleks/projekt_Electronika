
export function add_canvas(sizeP: Record <string, number>) : void {
  const canvas = document.getElementById('game_canvas')  as HTMLCanvasElement | null;
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  const rem : number = sizeP.remValue;
  const cW : number = sizeP.gamePartW; 
  const cH : number = sizeP.gamePartH; 

  // ==========================================
  // 1. РћРўР РРЎРћР’РљРђ 4-РҐ РќРђРљР›РћРќРќР«РҐ РќРђР¦Р•РЎРўРћР’ (Р›РћРўРљРћР’)
  // ==========================================
  type posXkeyIN = 0 | 1 | 2 | 3 | 4;
  type posXvalIN = Record<posXkeyIN, number>;
  type posXkey = 0 | 1 | 2 | 3;
  type typePosX = Record<posXkey, posXvalIN>;
  const posY : number[] = [0, 0.215, 0, 0.215];
  const posX : typePosX = {
    0: { 0: 0, 1: 0.11, 2: 0.2, 3: 0.165, 4: 0.165 },
    1: { 0: 0, 1: 0.11, 2: 0.2, 3: 0.165, 4: 0.165 },
    2: { 0: 1, 1: 0.89, 2: 0.8, 3: 0.835, 4: 0.835 },
    3: { 0: 1, 1: 0.89, 2: 0.8, 3: 0.835, 4: 0.835 }
  };
  if(ctx){
    ctx?.clearRect(0, 0, cW, cH);
    ctx.beginPath();
    ctx.lineWidth = 0.3 * rem; 
    ctx.strokeStyle = "#6B4C21";

    for (let i = 0; i < 4; i++) {
        const key = i as posXkey;
        ctx.moveTo(cW * posX[key][0], cH * (0.27 + posY[i]));
        ctx.lineTo(cW * posX[key][1], cH * (0.27 + posY[i]));
        ctx.lineTo(cW * posX[key][2], cH * (0.385 + posY[i]));

        // РџРѕРґРїРѕСЂРєР° Р»РѕС‚РєР°
        ctx.moveTo(cW * posX[key][3], cH * (0.35 + posY[i]));
        ctx.lineTo(cW * posX[key][4], cH * (0.45 + posY[i]));
        ctx.stroke();
      }
  
  // ==========================================
  // 2. РћРўР РРЎРћР’РљРђ Р”РћРњРРљРђ Р—РђР™Р¦Рђ (РЎР»РµРІР° РІРІРµСЂС…Сѓ)
  // ==========================================
    ctx.beginPath();
    ctx.lineWidth = 0.8 * rem; // РўРѕР»СЃС‚С‹Р№ РІРЅРµС€РЅРёР№ РєРѕРЅС‚СѓСЂ (Р·Р°РјРµРЅР° lineWidth = 8)
    ctx.fillStyle = "#941121";
    ctx.strokeStyle = 'grey';

    for (let i = 0; i < 2; i++) {
      ctx.moveTo(cW * 0.01, cH * 0.13);
      ctx.lineTo(cW * 0.075, cH * 0.01);
      ctx.lineTo(cW * 0.18, cH * 0.23);
      ctx.stroke();
      
      if (i === 0) {
        ctx.beginPath();
        ctx.lineWidth = 0.3 * rem; // РўРѕРЅРєРёР№ РІРЅСѓС‚СЂРµРЅРЅРёР№ РєРѕРЅС‚СѓСЂ (Р·Р°РјРµРЅР° lineWidth = 3)
        ctx.fillStyle = "#851E1F";
        ctx.strokeStyle = '#851E1F';
      }
  }
  //ctx.fill();

  // РћРєРЅРѕ Р—Р°Р№С†Р°
  ctx.beginPath();
  ctx.lineWidth = 0.2 * rem; // РђРґР°РїС‚РёРІРЅС‹Р№ Р°РЅР°Р»РѕРі С‚РѕР»С‰РёРЅС‹ 2
  ctx.fillStyle = "#941121"; // Р’РѕР·РІСЂР°С‰Р°РµРј С†РІРµС‚ Р·Р°Р»РёРІРєРё С‚СЂСѓР±С‹
  ctx.strokeStyle = "#ff0000";
  ctx.moveTo(cW * 0.11, cH * 0.07);
  ctx.lineTo(cW * 0.15, cH * 0.07);
  ctx.lineTo(cW * 0.15, cH * 0.15);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  
  // Р’С‹С…РѕРґ (С„Р°СЃР°РґРЅР°СЏ СЃС‚РµРЅР°) Рё РћРєРЅРѕ Р—Р°Р№С†Р°
  ctx.beginPath();
  ctx.lineWidth = 0.2 * rem; // РђРґР°РїС‚РёРІРЅС‹Р№ Р°РЅР°Р»РѕРі С‚РѕР»С‰РёРЅС‹ 2
  ctx.strokeStyle = "#5A5F60";
  ctx.moveTo(cW * 0.15, cH * 0.15);
  ctx.lineTo(cW * 0.15, cH * 0.09);
  ctx.lineTo(cW * 0.17, cH * 0.09);
  ctx.lineTo(cW * 0.17, cH * 0.16);
  ctx.lineTo(cW * 0.21, cH * 0.2);
  ctx.lineTo(cW * 0.21, cH * 0.03);
  ctx.lineTo(cW * 0.17, cH * 0.09);
  
  // РљРѕРЅС‚СѓСЂС‹ РѕРєРѕРЅРЅРѕР№ СЂР°РјС‹
  ctx.moveTo(cW * 0.17, cH * 0.16); // РСЃРїСЂР°РІР»РµРЅР° РѕРїРµС‡Р°С‚РєР° РёСЃС…РѕРґРЅРѕРіРѕ РєРѕРґР° СЃ 1.6 РЅР° cH * 0.16, С‡С‚РѕР±С‹ РѕРєРЅРѕ РЅРµ СѓР»РµС‚Р°Р»Рѕ Р·Р° СЌРєСЂР°РЅ
  ctx.lineTo(cW * 0.21, cH * 0.18); // РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ СЃ РїСЂРѕРїРѕСЂС†РёРµР№ РѕСЂРёРіРёРЅР°Р»СЊРЅРѕРіРѕ СЃРєРѕСЃР°
  ctx.stroke();
  // ==========================================
  // 3. РћРўР РРЎРћР’РљРђ Р—РђР‘РћР РћР’ (РџРћ Р‘РћРљРђРњ)
  // ==========================================
  ctx.beginPath();
  ctx.lineWidth = 0.7 * rem; // РђРґР°РїС‚РёРІРЅС‹Р№ Р°РЅР°Р»РѕРі С‚РІРѕРµР№ С‚РѕР»С‰РёРЅС‹ С€С‚Р°РєРµС‚РЅРёРєР° 7
  ctx.strokeStyle = "#6B4C21";

  // --- Р›Р•Р’Р«Р™ Р—РђР‘РћР  (Р’РѕР·РІСЂР°С‰Р°РµРј С‚РІРѕРё РѕСЂРёРіРёРЅР°Р»СЊРЅС‹Рµ РєРѕРѕСЂРґРёРЅР°С‚С‹) ---
  ctx.moveTo(cW * 0.01, cH * 0.495);   ctx.lineTo(cW * 0.01, cH * 0.62);
  ctx.moveTo(cW * 0.043, cH * 0.495);  ctx.lineTo(cW * 0.043, cH * 0.62);
  ctx.moveTo(cW * 0.083, cH * 0.495);  ctx.lineTo(cW * 0.083, cH * 0.62);
  ctx.moveTo(cW * 0.120, cH * 0.52);   ctx.lineTo(cW * 0.120, cH * 0.645);
  ctx.moveTo(cW * 0.152, cH * 0.55);   ctx.lineTo(cW * 0.152, cH * 0.675);

  // --- РџР РђР’Р«Р™ Р—РђР‘РћР  (Р’РѕР·РІСЂР°С‰Р°РµРј С‚РІРѕРё РѕСЂРёРіРёРЅР°Р»СЊРЅС‹Рµ РєРѕРѕСЂРґРёРЅР°С‚С‹) ---
  ctx.moveTo(cW * 0.99, cH * 0.495);   ctx.lineTo(cW * 0.99, cH * 0.62);
  ctx.moveTo(cW * 0.957, cH * 0.495);  ctx.lineTo(cW * 0.957, cH * 0.62);
  ctx.moveTo(cW * 0.917, cH * 0.495);  ctx.lineTo(cW * 0.917, cH * 0.62);
  ctx.moveTo(cW * 0.88, cH * 0.52);    ctx.lineTo(cW * 0.88, cH * 0.645);
  ctx.moveTo(cW * 0.848, cH * 0.55);   ctx.lineTo(cW * 0.848, cH * 0.675);

  ctx.fillStyle = "#6B4C21";
  ctx.stroke();

  // ==========================================
  // 4. РћРўР РРЎРћР’РљРђ РљРЈРЎРўРћР’ Р РўР РђР’Р«
  // ==========================================
  const setRad : number[] = [20, 8, 8, 20, 8]; 
  let flagBush : number = 1;
  let setX : number[] = [1, 2.95, 16.7, 18.8, 18.8], setY : number[] = [1, 1.04, 1.04, 1, 0.1]; 
  
  ctx.beginPath();
  ctx.lineWidth = 0.1 * rem; 
  for (let i = 0; i < 5; i++) {
    let currentRad = (setRad[i] / 10) * rem; 
    
    ctx.moveTo(cW * 0.05 * setX[i] + currentRad, cH * 0.7 * setY[i]);
    ctx.arc(cW * 0.05 * setX[i], cH * 0.7 * setY[i], currentRad, 0, Math.PI * 2, true);
    
    for (let j = 0; j < 12; j++) {
      let degX : number = cW * 0.05 * setX[i] - currentRad * Math.sin(360 / 12 / 180 * Math.PI * (j + 1));
      let degY : number = cH * 0.7 * setY[i] - currentRad * Math.cos(360 / 12 / 180 * Math.PI * (j + 1));
      ctx.moveTo(degX, degY);
      
      let leafSize : number = ((5 + flagBush) / 10) * rem;
      ctx.arc(degX, degY, leafSize, 0, Math.PI * 2, true);
      
      flagBush = flagBush + 1;
      if (flagBush == 3) flagBush = flagBush + 3;
      if (flagBush == 7) flagBush = 2;
    }
    flagBush = 1;
    ctx.fillStyle = "#2C390B";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = 0.3 * rem; 
  ctx.strokeStyle = "#2C390B";
  var flagGrass = 0;
  var xOffset = 0;
  
  for (let i = 0; i < 2; i++) {
    xOffset = 0;
    if (i == 1) flagGrass = 0.8;
    ctx.moveTo(cW * flagGrass, cH * 0.85);
    
    for (var j = 1; j < 4; j++) {
      ctx.lineTo(cW * (0.01 + xOffset + flagGrass), cH * 0.88);
      ctx.lineTo(cW * (0.02 + xOffset + flagGrass), cH * 0.86);
      ctx.lineTo(cW * (0.05 + xOffset + flagGrass), cH * 0.88);
      ctx.lineTo(cW * (0.09 + xOffset + flagGrass), cH * 0.86);
      ctx.lineTo(cW * (0.11 + xOffset + flagGrass), cH * 0.89);
      ctx.lineTo(cW * (0.15 + xOffset + flagGrass), cH * 0.86);
      ctx.lineTo(cW * (0.16 + xOffset + flagGrass), cH * 0.89);
      xOffset = j * 0.015;
    }
    ctx.lineTo(cW * (0.01 + flagGrass), cH * 0.89);
    ctx.fill();
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.lineWidth = 0.3 * rem; 
  ctx.strokeStyle = "#2C390B";
  let flagCenter : number = 1;
  let xCenter : number;
  let sdvigX : number[] = [0.1, 0.25, 0.4, 0.3];
  let sdvigY : number[] = [0, 0.053, 0, 0.09];
  
  for (let i = 0; i < 4; i++) {
    xCenter = 0;
    if (i == 3) flagCenter = 0.8;
    ctx.moveTo(cW * (0.186 + sdvigX[i]), cH * (0.89 * flagCenter + sdvigY[i]));
    
    for (let j = 0; j < 2; j++) {
      ctx.lineTo(cW * (0.186 + xCenter + sdvigX[i]), cH * (0.91 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.195 + xCenter + sdvigX[i]), cH * (0.89 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.201 + xCenter + sdvigX[i]), cH * (0.91 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.211 + xCenter + sdvigX[i]), cH * (0.89 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.224 + xCenter + sdvigX[i]), cH * (0.91 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.235 + xCenter + sdvigX[i]), cH * (0.89 * flagCenter + sdvigY[i]));
      ctx.lineTo(cW * (0.241 + xCenter + sdvigX[i]), cH * (0.91 * flagCenter + sdvigY[i]));
      xCenter = xCenter + 0.055;
    }
    ctx.lineTo(cW * (0.186 + sdvigX[i]), cH * (0.91 * flagCenter + sdvigY[i]));
    ctx.fill();
    ctx.stroke();
  }
}
}

