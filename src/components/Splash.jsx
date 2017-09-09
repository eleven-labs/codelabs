import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fg from '../assets/images/fg-header.png';

class Splash extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="splash call-out">
        <img src={fg} />
        <div className="title">CodeLabs</div>
      </div>
    );
  }
}

export default Splash;
