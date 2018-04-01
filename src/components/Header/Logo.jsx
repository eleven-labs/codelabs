import React, { Component } from 'react';

import codelabsLogo from '../../assets/images/logo_eleven_codelabs.png';
import blogLogo from '../../assets/images/logo_eleven_blog.svg';

export default class Logo extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="branding">
        <a href="/" className="branding__content">
          <img className="branding__image" alt="Eleven Codelabs" src={codelabsLogo} />
        </a>
        <a className="branding-blog no-link-style" href="https://blog.eleven-labs.com/" >
          <img alt="Le Blog" src={blogLogo} />
          <span className="brand-title">Le Blog</span>
        </a>
      </div>
    );
  }
}
