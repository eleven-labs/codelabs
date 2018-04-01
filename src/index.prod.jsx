import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import createStore from './store/prod';
import routes from './routes';

const store = createStore();

const CodeLabs = () => (
  <Provider {...{ store }}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<CodeLabs />, document.getElementById('root'));
