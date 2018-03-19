import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import { InstantSearch } from 'react-instantsearch/dom';

import createStore from './store/dev';
import routes from './routes';

const store = createStore();

const APP_ID = '5IGTHBX5JS';
const API_KEY = '7f7511d659569fcede7653d568b3206c'; // Search-Only API Key

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
