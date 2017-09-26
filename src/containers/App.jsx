import React from 'react';
import { renderRoutes } from 'react-router-config';

import Header from '../components/Header';

export default class App extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { courses, route } = this.props;

    return (
      <div>
        <Header />
        {route && renderRoutes(route.routes, { courses })}
      </div>
    );
  }
}
