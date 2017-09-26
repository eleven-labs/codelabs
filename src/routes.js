import App from './containers/App';
import Homepage from './containers/Home';
import Console from './components/Console';
import CoursePage from './containers/Course';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Homepage,
    },
    {
      path: '/console',
      exact: true,
      component: Console,
    },
    {
      path: '/course/:id',
      component: CoursePage,
    },
  ],
}];
