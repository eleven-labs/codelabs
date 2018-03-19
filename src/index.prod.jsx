import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { InstantSearch } from 'react-instantsearch/dom';

import createStore from './store/prod';
import routes from './routes';

const store = createStore();

const APP_ID = 'UDC7EDJ4AB';
const API_KEY = 'f749c4469d8f8cfd15584ab18e4deba8'; // Search-Only API Key

const CodeLabs = () => (
  <InstantSearch appId={APP_ID} apiKey={API_KEY} indexName="codelabs">
    <Provider {...{ store }}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  </InstantSearch>
);

ReactDOM.render(<CodeLabs />, document.getElementById('root'));
