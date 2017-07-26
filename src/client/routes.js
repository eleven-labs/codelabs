import App from './containers/App';
import Home from './containers/Home';
import List from './containers/List';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        fetchData: async () => {
          await setTimeout(() => {}, 1e3);
          return 'tutu';
        },
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/list',
        component: List,
      },
    ],
  },
];
