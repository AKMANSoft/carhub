import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import macros from 'babel-plugin-macros'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macros()],
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    }
  }
})
