import React from 'react';

import Session from './Session';
import Search from './Search';

export default class Header extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <nav className="site-header">
        <div className="branding-container">
          <a href="/" className="branding" />
        </div>

        <Search />
      </nav>
    );
  }
}
