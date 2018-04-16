import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';
import { connect } from 'react-redux';

import courseProgressIcon from '../assets/images/icons/icon_courseProgress.svg';
import playIcon from '../assets/images/icons/icon_play.svg';
import { NOOP } from '../constants';
import {
  loadCourses,
} from '../actions';

const onCourseMouseDown = event => {
  event.preventDefault();
};

const CourseRenderer = course => (
  <h3 key={course.slug}>
    <img
      className="course-progress__icon"
      src={playIcon}
      alt={course.title}
    />
    <a
      href={urlJoin('/course/', course.permalink)}
      onMouseDown={onCourseMouseDown}
    >
      {course.title}
    </a>
  </h3>
);

// eslint-disable-next-line react/prop-types
const CourseContainer = ({ courses = [] }) => (
  <div className="course-progress__container">
    {courses.map(CourseRenderer)}
  </div>
);

CourseContainer.PropTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape()),
};

CourseContainer.defaultProps = {
  courses: [],
};

const mapStateToProps = ({ courses, courseProgress }) => ({
  courses,
  courseProgress,
});

const mapDispatchToProps = {
  loadCourses,
};

export class CourseProgress extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()),
    courseProgress: PropTypes.shape(),
    loadCourses: PropTypes.func,
  };

  static defaultProps = {
    courses: [],
    courseProgress: {},
    loadCourses: NOOP,
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.loadCourses();
  }

  setButtonRef(element) {
    this.triggerButton = element;
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { courseProgress } = this.props;

    const courses = this.props.courses.filter(({ slug }) => courseProgress[slug]);

    const wipCourses = courses.filter(({ slug, stepTitles }) => (
      courseProgress[slug].steps.length < stepTitles.length
    ));

    const doneCourses = courses.filter(({ slug, stepTitles }) => (
      courseProgress[slug].steps.length === stepTitles.length
    ));

    const style = this.triggerButton ? {
      left: (this.triggerButton.offsetLeft + (this.triggerButton.offsetWidth / 2)) - 150,
    } : {};

    return (courses.length > 0) ? (
      <div className="course-progress">
        <button
          className="course-progress__trigger"
          onFocus={this.open}
          onBlur={this.close}
          ref={this.setButtonRef}
          title="Tutotiels récement consultés"
        >
          <img
            className="course-progress__icon"
            src={courseProgressIcon}
            alt="Tutotiels récement consultés"
          />
        </button>

        {open && (
          <article style={style}>
            <div className="course-progress__heading">
              <img
                className="course-progress__icon"
                src={courseProgressIcon}
                alt="Tutotiels récement consultés"
              />
              Tutotiels r&eacute;cement consult&eacute;s
            </div>

            <CourseContainer courses={wipCourses} />

            <div className="course-progress__heading">
              Tutotiels compl&eacute;t&eacute;s
            </div>

            <CourseContainer courses={doneCourses} />
          </article>
        )}
      </div>
    ) : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseProgress);
