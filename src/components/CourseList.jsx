import React, { Component } from 'react';
import PropTypes from 'prop-types';

const dateOptions = {
  year: 'numeric',
  month: 'short',
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
  }

  courseRenderer(course) {
    const date = new Date(course.date);

    return (
      <div className="posts-teaser slice" key={course.uuid}>
        <div className="container">
          <h2 className="posts-title">
            <a className="no-link-style" href={`/course/${course.permalink}`}>
              {course.title}
            </a>
          </h2>

          <time className="posts-date meta">
            <span className="meta-content">
              {date.toLocaleString('fr-FR', dateOptions)}
              {' à '}
              {date.toLocaleTimeString('fr-FR', timeOptions)}
              {' par '}
              <a
                className="author-link"
                href={`http://blog.eleven-labs.com/authors/${course.author.username}`}
              >
                {course.author.name}
              </a>
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
