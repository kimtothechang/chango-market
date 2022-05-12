import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App className="app" />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
