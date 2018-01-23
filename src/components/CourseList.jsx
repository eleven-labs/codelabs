import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

import CourseItem from './CourseItem';

import play from '../assets/images/icons/icon_play.svg';
import clock from '../assets/images/icons/icon_clock.svg';

const courseRenderer = (course, index) => (
  <CourseItem course={course} key={index} />
);

export default class CourseList extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    courses: [],
  };

  render() {
    return (
      <div className="course-list">
        {this.props.courses.map(courseRenderer)}
      </div>
    );
  }
}
