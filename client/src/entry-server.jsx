import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

// Notice the subpath: /server
import { createHead, UnheadProvider } from '@unhead/react/server'
import { renderSSRHead } from 'unhead/server'

import { createExtraStore } from './store/store'
import App from './App'

export async function render(url) {
  const head = createHead()
  const store = createExtraStore({
    auth: { isAuthenticated: false, user: null, isLoading: false },
  })

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <UnheadProvider head={head}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </UnheadProvider>
      </Provider>
    </React.StrictMode>
  )

  const headPayload = await renderSSRHead(head)
  const preloadedState = store.getState()

  return { appHtml, headPayload, preloadedState }
}