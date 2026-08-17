export function soundClickEg(soundFoder) {
  const audio = new Audio(); // Создаём новый элемент Audio
  audio.src = soundFoder; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}