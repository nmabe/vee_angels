import fs from 'fs'
import path from 'path'
import http from 'http'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Safely serialize state to prevent XSS injection
 */
function serializeState(preloadedState) {
  return `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
    preloadedState || {}
  ).replace(/</g, '\\u003c')}</script>`
}

async function startDevServer() {
  const app = express()
  const server = http.createServer(app)

  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() })
  })

  app.use(async (req, res, next) => {
    if (
      req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() === 'websocket'
    ) {
      return next()
    }

    const [pathname] = req.originalUrl.split('?')
    const url = req.originalUrl

    if (path.extname(pathname) && !pathname.endsWith('.html')) {
      return next()
    }

    try {
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
      const { appHtml, headPayload, preloadedState } = await render(url)

      const stateScript = serializeState(preloadedState)

      const finalHtml = template
        .replace('<!--app-html-->', appHtml || '')
        .replace(
          '<!--head-tags-->',
          `${headPayload?.headTags || ''}\n${stateScript}`
        )
        .replace('<!--html-attributes-->', headPayload?.htmlAttrs || '')
        .replace('<!--body-attributes-->', headPayload?.bodyAttrs || '')
        .replace('<!--body-tags-->', headPayload?.bodyTags || '')

      return res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error('SSR Critical Failure:', e)
      return res.status(500).end(e.stack)
    }
  })

  server.on('upgrade', (request, socket, head) => {
    if (vite && vite.ws) {
      vite.ws.server.emit('connection', socket, request, head)
    }
  })

  server.listen(5173, () => {
    console.log('🚀 MERN SEO Pipeline running at http://localhost:5173')
  })
}

async function startProductionServer() {
  const app = express()
  const distDir = path.resolve(__dirname, 'dist/client')
  const ssrEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js')

  // 2. Fallback check before importing to throw a clear error message
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(
      `SSR bundle missing at ${ssrEntryPath}. Did you forget to run 'npm run build' before starting the production server?`
    )
  }

  // 3. Convert absolute file path to a valid file:// URL for ESM dynamic import
  const { render } = await import(pathToFileURL(ssrEntryPath).href)
  // Serve static assets from dist/client without handling index.html automatically
  app.use(express.static(distDir, { index: false }))

  app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() })
  })

  app.use(async (req, res, next) => {
    if (
      req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() === 'websocket'
    ) {
      return next()
    }

    if (path.extname(req.path)) {
      return next()
    }

    try {
      const templatePath = path.join(distDir, 'index.html')
      let template = fs.readFileSync(templatePath, 'utf-8')

      const { appHtml, headPayload, preloadedState } = await render(
        req.originalUrl
      )

      const stateScript = serializeState(preloadedState)

      const finalHtml = template
        .replace('<!--app-html-->', appHtml || '')
        .replace(
          '<!--head-tags-->',
          `${headPayload?.headTags || ''}\n${stateScript}`
        )
        .replace('<!--html-attributes-->', headPayload?.htmlAttrs || '')
        .replace('<!--body-attributes-->', headPayload?.bodyAttrs || '')
        .replace('<!--body-tags-->', headPayload?.bodyTags || '')

      return res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      console.error('SSR Production Failure:', e)
      return res.status(500).end(e.stack)
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`🚀 Production SSR server running at http://localhost:${port}`)
  })
}

if (process.env.NODE_ENV === 'production') {
  startProductionServer()
} else {
  startDevServer()
}