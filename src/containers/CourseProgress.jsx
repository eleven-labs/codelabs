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

const onCourseMouseDown = event => {
  event.preventDefault();
};

export class CourseProgress extends Component {
  static propTypes = {
    courseProgress: PropTypes.shape(),
  };

  static defaultProps = {
    courseProgress: {},
    loadCourseProgress: NOOP,
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);

    this.position = {
      left: 0,
    };

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    if (this.button) {
      // The width of this component is 300px, so to center it we use the half.
      this.position.left = (this.button.offsetLeft + (this.button.offsetWidth / 2)) - 150;
    }
  }

  setButtonRef(element) {
    this.button = element;
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
    const entries = Object.entries(courseProgress);

    if (entries.length === 0) {
      return null;
    }

    return (
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
          <article style={this.position}>
            <div className="course-progress__heading">
              <img
                className="course-progress__icon"
                src={courseProgressIcon}
                alt="Tutotiels récement consultés"
              />
              Tutotiels r&eacute;cement consult&eacute;s
            </div>

            <div className="course-progress__container">
              {entries.map(([key, value]) => (
                <h3 key={key}>
                  <img
                    className="course-progress__icon"
                    src={playIcon}
                    alt={value.title}
                  />
                  <a
                    href={urlJoin('/course/', value.permalink)}
                    onMouseDown={onCourseMouseDown}
                  >
                    {value.title}
                  </a>
                </h3>
              ))}
            </div>
          </article>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(CourseProgress);
