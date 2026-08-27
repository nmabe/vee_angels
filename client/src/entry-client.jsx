import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// Notice the subpath: /client
import { createHead, UnheadProvider } from '@unhead/react/client'

import { createExtraStore } from './store/store'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__

const store = createExtraStore(preloadedState)
const head = createHead()

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Provider store={store}>
      <UnheadProvider head={head}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UnheadProvider>
    </Provider>
  </React.StrictMode>
)