// src/entry-server.jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createHead, UnheadProvider } from '@unhead/react';
import { renderSSRHead } from '@unhead/ssr';
import { createExtraStore } from './store/store';
import App from './App';

export async function render(url) {
  const head = createHead();
  
  // 1. Create a fresh store instance for this server render
  const store = createExtraStore({
    auth: {
      isAuthenticated: false,
      user: null,
      isLoading: false,
    },
  });

  // 2. Render React app to string
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
  );

  // 3. Extract Unhead tags and Redux state snapshot
  const headPayload = await renderSSRHead(head);
  const preloadedState = store.getState();

  return { appHtml, headPayload, preloadedState };
}