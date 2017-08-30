import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/">home</Link>
    {' '}
    <Link to="/list">list</Link>
  </nav>
);

export default Header;
