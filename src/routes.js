import App from './containers/App';
import Home from './containers/Home';
import List from './containers/List';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/list',
      component: List,
    },
  ],
}];
