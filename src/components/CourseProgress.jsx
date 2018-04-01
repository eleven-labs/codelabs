import React, { Component } from 'react';
import PropTypes from 'prop-types';

const courseRenderer = course => (
  <div key={course.title}>
    {course.title}
  </div>
);

class CourseProgress extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    courses: [],
  };

  render() {
    const { courses } = this.props;

    return (
      <div className="progress">
        {courses.map(courseRenderer)}
      </div>
    );
  }
}

export default CourseProgress;
