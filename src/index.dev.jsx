import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import createStore from './store/dev';
import routes from './routes';
import { getPersistedProgress } from './services/course-progress';
import { LOCAL_STORAGE_KEY } from './constants';

(async () => {
  const store = createStore({
    courseProgress: await getPersistedProgress(LOCAL_STORAGE_KEY),
  });

  const CodeLabs = () => (
    <Provider {...{ store }}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );

  ReactDOM.render(<CodeLabs />, document.getElementById('root'));
})();
