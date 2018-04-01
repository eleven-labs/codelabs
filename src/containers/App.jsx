import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import ConnectedHeader from './Header/Header';

export default class App extends React.Component {
  static propTypes = {
    route: PropTypes.shape(),
  };

  static defaultProps = {
    route: undefined,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { route } = this.props;

    return (
      <div>
        <ConnectedHeader />
        {route && renderRoutes(route.routes)}
      </div>
    );
  }
}
