export function soundClickEg(soundFoder : string) : void {
  const audio = new Audio(); // Создаём новый элемент Audio
        audio.src = soundFoder; // Указываем путь к звуку "клика"
        audio.autoplay = true; // Автоматически запускаем
}