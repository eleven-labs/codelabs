import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

const Author = ({ author }) => (
  <a
    className="author-link"
    href={urlJoin('https://blog.eleven-labs.com/authors/', author.username)}
  >
    {author.name}
  </a>
);

Author.propTypes = {
  author: PropTypes.shape().isRequired,
};

export default Author;
