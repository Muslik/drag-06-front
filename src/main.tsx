import { allSettled, createEvent, sample } from 'effector';
import { Provider as ScopeProvider } from 'effector-react/ssr';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@drag/app';

import { requestSession } from './entities/session';
import { scope } from './scope';

const ready = createEvent();

sample({
  clock: ready,
  target: requestSession,
});

allSettled(ready, { scope }).then(() =>
  // eslint-disable-next-line unicorn/prefer-query-selector
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ScopeProvider value={scope}>
        <App />
      </ScopeProvider>
    </React.StrictMode>,
  ),
);
