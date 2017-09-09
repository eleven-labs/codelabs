import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import defaultAvatar from '../assets/images/avatar.png';

class Session extends Component {
  render() {
    return (
      <ul className="site-nav">
        {/* TODO: add buttons for some features like notifications, progress,  */}
        <li>
          <Link to="/profile" className="avatar">
            <img src={defaultAvatar} className="avatar-img" />
          </Link>
        </li>
      </ul>
    );
  }
}

export default Session;
