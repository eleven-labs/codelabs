import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import clock from '../assets/images/icons/icon_clock.svg';

const mapStateToProps = ({
  currentCourse,
}) => ({
  currentCourse,
});

export class Header extends React.Component {
  static propTypes = {
    currentCourse: PropTypes.shape(),
  };

  static defaultProps = {
    currentCourse: {},
  };

  render() {
    const {
      currentCourse,
    } = this.props;

    const headerClasses = cx('site-header container', {
      '-yellow': currentCourse.title,
    });

    return (
      <nav className={headerClasses}>
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
