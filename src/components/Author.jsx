import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

const Author = ({ author }) => (
  <a
    className="author-link"
    href={urlJoin('https://blog.eleven-labs.com/authors/', author.username)}
    key={author.username}
  >
    {author.name}
  </a>
);

Author.PropTypes = {
  author: PropTypes.shape(),
};

export default Author;
