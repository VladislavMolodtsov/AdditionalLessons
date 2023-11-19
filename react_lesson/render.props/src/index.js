import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from '../src/component/app/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <StrictMode>
      <App/>
  </StrictMode>,
  document.getElementById('root')
);
