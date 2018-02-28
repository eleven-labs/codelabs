import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import clock from '../assets/images/icons/icon_clock.svg';

const mapStateToProps = ({
  currentCourse,
  currentStepIndex,
}) => ({
  currentCourse,
  currentStepIndex,
});

export class Header extends React.Component {
  static propTypes = {
    currentCourse: PropTypes.shape(),
    currentStepIndex: PropTypes.number,
  };

  static defaultProps = {
    currentCourse: {},
    currentStepIndex: null,
  };

  render() {
    const {
      currentCourse,
      currentStepIndex,
    } = this.props;

    const headerClasses = cx('site-header', {
      '-yellow': currentCourse.title,
    });

    return (
      <nav className={headerClasses + ' container'}>
        <div className="branding-container">
          <a href="/" className="branding" />
        </div>

        <div className="course-header">
          {currentCourse && <h2 className="course-header__title">{currentCourse.title}</h2>}
          <p className="course-header__duration" data-icon={clock}>{/*course.time*/} minutes</p>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, {})(Header);
