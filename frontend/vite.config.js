import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// En local la app corre en la raíz ("/"). Al publicar en GitHub Pages vive en
// https://<usuario>.github.io/<nombre-del-repo>/, por eso el "base" solo cambia al construir.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/InDaga-Project-JC---2026/' : '/',
  plugins: [react()],
  build: {
    // Dos páginas: la app React (index.html) y la landing pública (landing.html)
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        landing: resolve(import.meta.dirname, 'landing.html'),
      },
    },
  },
}))
