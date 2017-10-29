import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

export default class CourseList extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    courses: [],
  };

  constructor(props) {
    super(props);
    this.courseRenderer = this.courseRenderer.bind(this);
    this.authorsRenderer = this.authorsRenderer.bind(this);
  }

  authorsRenderer(author) {
    return (
      <a
        className="author-link"
        href={urlJoin('http://blog.eleven-labs.com/authors/', author.username)}
        key={author.username}
      >
        {author.name}
      </a>
    );
  }

  courseRenderer(course, index) {
    const date = new Date(course.date);

    return (
      <div className="posts-teaser slice" key={index}>
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
              {course.authors.map(this.authorsRenderer)}
            </span>
          </time>

          <p>{course.description}</p>

          <a className="button" href={course.permalink}>Lire le tutoriel</a>
        </div>
      </div>
    );
  }

  render() {    
    return (
      <div className="posts">
        {this.props.courses.map(this.courseRenderer)}
      </div>
    );
  }
}
