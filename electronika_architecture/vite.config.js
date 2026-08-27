import { defineConfig } from 'vite';

export default defineConfig({
  // Настройки сервера для разработки
  server: {
    port: 3000,
    open: true // Автоматически откроет игру в браузере при запуске
  },
  // Настройки сборки бандла
  build: {
    outDir: 'dist', // Папка, куда сложится готовый бандл
   // minify: 'terser', // Максимальное сжатие кода (удаление пробелов, комментариев)
    sourcemap: false // Отключаем карты кода для уменьшения размера финального файла
  }
});
//npx vite preview