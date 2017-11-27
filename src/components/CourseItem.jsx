import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

import Author from './Author';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const authorRenderer = (author, index) => (
  <Author author={author} key={index} />
);

const CourseItem = ({ course }) => {
  const date = new Date(course.date);

  return (
    <div className="posts-teaser slice">
      <div className="container">
        <h2 className="posts-title">
          <a className="no-link-style" href={urlJoin('/course/', course.permalink)}>
            {course.title}
          </a>
        </h2>

        <time className="posts-date meta">
          <span className="meta-content">
            {date.toLocaleString('fr-FR', dateOptions)}
            {' par '}
            {course.authors.map(authorRenderer)}
          </span>
        </time>

        <p>{course.description}</p>

        <a className="button" href={urlJoin('/course/', course.permalink)}>Lire le tutoriel</a>
      </div>
    </div>
  );
}

CourseItem.PropTypes = {
  course: PropTypes.shape(),
};

export default CourseItem;
