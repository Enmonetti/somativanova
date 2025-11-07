import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // <- Import necessário para os aliases

export default defineConfig({
  plugins: [vue()], // <- Ativa o suporte a arquivos .vue
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    port: 5173, // opcional: define a porta local do servidor
  },
})
