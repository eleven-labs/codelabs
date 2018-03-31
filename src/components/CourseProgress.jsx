import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CourseProgress extends Component {
  static propTypes = {
    info: PropTypes.shape(),
  };

  static defaultProps = {
    info: undefined,
  };

  render() {
    const { info } = this.props;

    return (
      <div className="progress">
        <div>
          {info.currentCourse} | {info.slug}
        </div>
        <div>
          {info.currentStepIndex}
        </div>
      </div>
    );
  }
}

export default CourseProgress;
