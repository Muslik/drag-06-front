import ReactDOM from 'react-dom/client';

import { App } from '@drag/app';

import { appStarted } from './shared/config/init';

appStarted();
ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(<App />);
