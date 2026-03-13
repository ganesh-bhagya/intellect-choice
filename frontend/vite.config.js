import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import path from 'node:path'
import fs from 'node:fs'

/** Collects LCP image asset paths from the build output and injects preload links into index.html */
function preloadLcpPlugin() {
  let heroAssetPaths = []
  return {
    name: 'preload-lcp',
    apply: 'build',
    generateBundle(_, bundle) {
      heroAssetPaths = []
      for (const output of Object.values(bundle)) {
        if (output.type === 'asset' && typeof output.fileName === 'string') {
          const name = output.fileName
          if (
            name.includes('Frame 255') ||
            name.includes('Frame-255') ||
            name.includes('homebackmobile') ||
            name.includes('dc7c99720fcef1cc3529dfe84d195e75384d9ec6')
          ) {
            heroAssetPaths.push('/' + name)
          }
        }
      }
    },
    writeBundle(options) {
      if (heroAssetPaths.length === 0) return
      const distDir = options.dir || path.join(process.cwd(), 'dist')
      const htmlPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(htmlPath)) return
      let html = fs.readFileSync(htmlPath, 'utf-8')
      const preloads = heroAssetPaths
        .map((href) => `<link rel="preload" as="image" href="${href}">`)
        .join('\n    ')
      if (html.includes('</head>')) {
        html = html.replace('</head>', `    ${preloads}\n  </head>`)
        fs.writeFileSync(htmlPath, html)
      }
    },
  }
}

export default defineConfig({
  plugins: [imagetools(), react(), tailwindcss(), preloadLcpPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
})
