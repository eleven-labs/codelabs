import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import App from './containers/App';
import createStore from './store/dev';
import routes from './routes';

const store = createStore();

const Router = () => (
  <Provider {...{ store }}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Router />, document.getElementById('root'));
