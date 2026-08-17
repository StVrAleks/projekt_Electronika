export class Slider{

    startSvgGuide() {
      // Если таймер уже крутится — сначала гарантированно очищаем его
      if (gameState.svgGuideTimer) clearInterval(gameState.svgGuideTimer);
      
      let currentSvgStep = 1;
      renderGuideStep(currentSvgStep);
    
      // Записываем интервал СТРОГО в gameState, чтобы его можно было остановить снаружи
      gameState.svgGuideTimer = setInterval(() => {
        currentSvgStep = currentSvgStep >= 4 ? 1 : currentSvgStep + 1;
        renderGuideStep(currentSvgStep);
      }, 4500);
    }
    
    stopSvgGuide() {
      if (gameState.svgGuideTimer) {
        clearInterval(gameState.svgGuideTimer); // Исправлена опечатка (было vgGuideTimer)
        gameState.svgGuideTimer = null;
      }
      resetSvgElements();
    }
    
    // Сброс всех классов анимации внутри SVG
    resetSvgElements() {
        const activeButtons = document.querySelectorAll('.svg-active-btn');
        activeButtons.forEach(el => el.classList.remove('svg-active-btn'));
    
        const activeLcd = document.querySelectorAll('.svg-active-lcd');
        activeLcd.forEach(el => el.classList.remove('svg-active-lcd'));
    }
    
    // Логика работы автоматического SVG-гида
    renderGuideStep(step) {
        resetSvgElements();
        const textBlock = document.getElementById('svg_instruction_text');
    
        switch(step) {
            case 1:
                textBlock.innerHTML = "<strong>КЛАВИШИ СТАРТА:</strong> Для начала игры используйте кнопки выбора режимов в правой верхней части прибора. Нажмите <strong>«ИГРА А»</strong> для стандартной сессии или <strong>«ИГРА Б»</strong> для игры на повышенной скорости.";
                // Подсвечиваем кнопки Игра А и Б на SVG
                document.getElementById('svg_ctrl1')?.classList.add('svg-active-btn');
                document.getElementById('svg_ctrl5')?.classList.add('svg-active-btn');
                break;
                
            case 2:
                textBlock.innerHTML = "<strong>ЛЕВЫЕ НАПРАВЛЕНИЯ:</strong> При качении яиц по левым верхним или нижним лоткам, нажимайте соответствующие <strong>ЛЕВЫЕ КНОПКИ</strong> или клавиши клавиатуры <strong>Shift или Ctrl</strong>. Волк мгновенно повернется влево и подставит корзину в нужный ярус. Чем больше яиц спасли, тем становится выше скорость";
                // Анимируем левые кнопки, левое яйцо и левого Волка на SVG
                document.getElementById('svg_but1')?.classList.add('svg-active-btn');
                document.getElementById('svg_but2')?.classList.add('svg-active-btn');
                document.getElementById('svg_egg_l')?.classList.add('svg-active-lcd');
                document.getElementById('svg_volk_l')?.classList.add('svg-active-lcd');
                break;
                
            case 3:
                textBlock.innerHTML = "<strong>ПРАВЫЕ НАПРАВЛЕНИЯ:</strong> Если яйцо катится с правой стороны экрана, используйте <strong>ПРАВЫЕ КНОПКИ</strong> управления или нажмите клавиши клавиатуры  <strong>Стрелка вверх (▲) или Стрелка вниз (▼)</strong>. Контролируйте положение корзины, чтобы успевать забирать яйца с верхнего и нижнего лотков.";
                // Анимируем правые кнопки, правое яйцо и правого Волка на SVG
                document.getElementById('svg_but3')?.classList.add('svg-active-btn');
                document.getElementById('svg_but4')?.classList.add('svg-active-btn');
                document.getElementById('svg_egg_r')?.classList.add('svg-active-lcd');
                document.getElementById('svg_volk_r')?.classList.add('svg-active-lcd');
                break;
                
            case 4:
                textBlock.innerHTML = "<strong>ШТРАФНЫЕ ОЧКИ:</strong> Каждое пропущенное яйцо разбивается. Если в это время в домике появляется заяц, то на экране загорается символ цыпленка и зачисляется только 0,5 штрафа. Помните: получение <strong>3-х штрафных очков (бантов сверху)</strong> ведет к полной остановке игры.";
                // Зажигаем цыпленка штрафа на SVG экране
                document.getElementById('svg_chiken')?.classList.add('svg-active-lcd');
                break;
        }
    }
}