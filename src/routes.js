import App from './containers/App';
import Homepage from './containers/Home';
import Course from './containers/Course';

export default [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Homepage,
    },
    {
      path: '/course/:id',
      component: Course,
    }
  ],
}];
