import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import { basePath } from 'config/appConfig';

import 'bootstrap/dist/css/bootstrap.min.css';

let basename = undefined;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  basename = basePath;
}

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
