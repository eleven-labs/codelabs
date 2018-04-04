import React, { Component } from 'react';
import PropTypes from 'prop-types';

import clock from '../../assets/images/icons/icon_clock.svg';

export default class CourseTitle extends Component {
  static propTypes = {
    course: PropTypes.shape(),
  };

  static defaultProps = {
    course: {},
  };

  shouldComponentUpdate(nextProps) {
    const { course = {} } = this.props;
    const { course: newCourse = {} } = nextProps;

    return (
      !course.title || !course.duration ||
      !newCourse.title || !newCourse.duration ||
      course.title !== newCourse.title ||
      course.duration.total !== newCourse.duration.total
    );
  }

  render() {
    const { course } = this.props;

    return (
      <div className="course-header">
        {course.title && (
          <h2 className="course-header__title">{course.title}</h2>
        )}
        {course.duration && (
          <p className="course-header__duration" data-icon={clock}>
            {course.duration.total} minutes
          </p>
        )}
      </div>
    );
  }
}
