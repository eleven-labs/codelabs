import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { SearchBox } from 'react-instantsearch/dom';

import CourseTitle from '../components/Header/CourseTitle';
import SocialLinks from '../components/Header/SocialLinks';
import Logo from '../components/Header/Logo';

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
    const { currentCourse } = this.props;

    const headerClasses = cx('site-header', {
      '-yellow': currentCourse.title,
    });

    return (
      <header className={headerClasses}>
        <div className="container site-header__content">
          <Logo />
          <CourseTitle course={currentCourse} />

          {!currentCourse.title && (
            <SearchBox
              translations={{
                placeholder: 'Rechercher',
              }}
            />
          )}

          <SocialLinks />
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, {})(Header);
