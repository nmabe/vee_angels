import { Toaster } from '@/components/ui/sonner'
import { createRoot } from 'react-dom/client'
import './assets/style/embla/base.css'
import './assets/style/embla/embla.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { UnheadProvider, createHead } from '@unhead/react/client'

const head = createHead()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UnheadProvider value={head}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <Toaster richColors />
      </BrowserRouter>
    </UnheadProvider>
  </React.StrictMode>
)
