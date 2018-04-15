import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';
import { connect } from 'react-redux';

import courseProgressIcon from '../assets/images/icons/icon_courseProgress.svg';
import playIcon from '../assets/images/icons/icon_play.svg';
import { NOOP } from '../constants';

const mapStateToProps = ({ courseProgress }) => ({
  courseProgress,
});

export class CourseProgress extends Component {
  static propTypes = {
    courseProgress: PropTypes.shape(),
  };

  static defaultProps = {
    courseProgress: {},
    loadCourseProgress: NOOP,
  };

  render() {
    const { courseProgress } = this.props;
    const entries = Object.entries(courseProgress);

    return (entries.length > 0) ? (
      <article className="course-item progress">
        <div className="course-item__heading">
          <img
            className="course-item__icon"
            src={courseProgressIcon}
            alt="Tutotiels récement consultés"
          />
          Tutotiels r&eacute;cement consult&eacute;s
        </div>

        <div className="course-item__container">
          {entries.map(([key, value]) => (
            <h3 key={key}>
              <img
                className="course-item__icon"
                src={playIcon}
                alt={value.title}
              />
              <a href={urlJoin('/course/', value.permalink)}>
                {value.title}
              </a>
            </h3>
          ))}
        </div>
      </article>
    ) : null;
  }
}

export default connect(mapStateToProps, {})(CourseProgress);
