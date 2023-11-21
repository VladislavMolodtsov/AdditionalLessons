import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '../src/component/app/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App/>
  </StrictMode>);