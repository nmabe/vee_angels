import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createHead, UnheadProvider } from '@unhead/react/client'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister() // 👈 Destroys background workers cleanly
    }
  })
}

// 1. Target the exact container where the server injected the HTML template
const container = document.getElementById('root')

const head = createHead() // Create a head manager instance for the client

// 2. Hydrate the pre-existing server markup smoothly
hydrateRoot(
  container,
  <React.StrictMode>
    <Provider store={store}>
      <UnheadProvider head={head}>
        <BrowserRouter>
           <App />
          <Toaster richColors />
        </BrowserRouter>
      </UnheadProvider>
    </Provider>
  </React.StrictMode>
)
