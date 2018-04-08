import React, { Component } from 'react';
import { connectHits } from 'react-instantsearch/connectors';
import PropTypes from 'prop-types';

import ConnectedCourseProgress from '../containers/CourseProgress';
import CourseItem from './CourseItem';

const courseRenderer = (course, index) => (
  <CourseItem course={course} key={index} />
);

class CourseList extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    hits: [],
  };

  render() {
    return (
      <div className="course-list">
        <div className="course-list__container container">
          <ConnectedCourseProgress />
          {this.props.hits.map(courseRenderer)}
        </div>
      </div>
    );
  }
}

export default connectHits(CourseList);
