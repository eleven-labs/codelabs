import App from './containers/App';
import Homepage from './containers/Home';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Homepage,
    },
  ],
}];
