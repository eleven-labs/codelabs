import React from 'react';
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

const authorRenderer = (author, index) => (
  <Author author={author} key={index} />
);

const CourseItem = ({ course }) => {
  const date = new Date(course.date);

  return (
    <article className="course-item">
      <div className="course-item__heading">
        <a
          className="course-item__link"
          href={urlJoin('/course/', course.permalink)}
        >
          <img className="course-item__icon" src={play} alt="" />
        </a>
        <div className="course-item__heading-right">
          <img className="course-item__icon" src={clock} alt="" />
          <p className="course-item__duration">{course.duration.total} mins</p>
        </div>
      </div>

      <div className="course-item__container">
        <h2 className="course-item__title">
          <a
            className="no-link-style"
            href={urlJoin('/course/', course.permalink)}
          >
            {course.title}
          </a>
        </h2>

        <p className="course-item__details">
          <time dateTime={date.toISOString()}>
            {date.toLocaleString('fr-FR', dateOptions)}
          </time>
          {' par '}
          {course.authors.map(authorRenderer)}
        </p>

        <p className="course-item__description">{course.excerpt}</p>
      </div>
    </article>
  );
};

CourseItem.propTypes = {
  course: PropTypes.shape().isRequired,
};

export default CourseItem;
