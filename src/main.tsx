import { Provider as ScopeProvider } from 'effector-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@drag/app';

import { scope } from './scope';

// eslint-disable-next-line unicorn/prefer-query-selector
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ScopeProvider value={scope}>
      <App />
    </ScopeProvider>
  </React.StrictMode>,
);
