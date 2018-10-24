import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { InstantSearch } from 'react-instantsearch/dom';

import ConnectedHeader from './Header';
import {
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY,
  LOCAL_STORAGE_KEY,
} from '../constants';

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
      <InstantSearch
        appId={ALGOLIA_APP_ID}
        apiKey={ALGOLIA_API_KEY}
        indexName={LOCAL_STORAGE_KEY}
      >
        <ConnectedHeader />
        {route && renderRoutes(route.routes)}
      </InstantSearch>
    );
  }
}
