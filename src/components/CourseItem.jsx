import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

import Author from './Author';

import play from '../assets/images/icons/icon_play.svg';
import clock from '../assets/images/icons/icon_clock.svg';

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
    <article className="course-item">
      <div className="course-item__heading">
        <img className="course-item__icon" src={play} alt="" />
        <div className="course-item__heading-right">
          <img className="course-item__icon" src={clock} alt="" />
          <p className="course-item__duration">{course.time} mins</p>
        </div>
      </div>

      <div className="course-item__container">
        <h2 className="course-item__title">
          <a className="no-link-style" href={urlJoin('/course/', course.permalink)}>
            {course.title}
          </a>
        </h2>

        <p className="course-item__details">
          <time datetime={date.toISOString()}>{date.toLocaleString('fr-FR', dateOptions)}</time>
          {' par '}
          {course.authors.map(authorRenderer)}
        </p>

        <p className="course-item__description">{course.description}</p>
      </div>
    </article>
  );
}

CourseItem.PropTypes = {
  course: PropTypes.shape(),
};

export default CourseItem;
