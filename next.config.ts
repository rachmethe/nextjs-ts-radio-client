import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Экспорт проекта как статического сайта
  images: {
    unoptimized: true, // Отключение оптимизации изображений
  },
  basePath: '/nextjs-ts-radio-client', // Установите базовый путь
};

export default nextConfig;
