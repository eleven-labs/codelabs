import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { SearchBox } from 'react-instantsearch/dom';

import clock from '../../assets/images/icons/icon_clock.svg';
import rocket from '../../assets/images/icons/icon_rocket.svg';
import codelabsLogo from '../../assets/images/logo_eleven_codelabs.png';
import blogLogo from '../../assets/images/logo_eleven_blog.svg';

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

    const headerClasses = cx('site-header', {
      '-yellow': currentCourse.title,
    });

    return (
      <header className={headerClasses}>
        <div className="container site-header__content">
          <div className="branding">
            <a href="/" className="branding__content">
              <img className="branding__image" alt="Eleven Codelabs" src={codelabsLogo} />
            </a>
            <a className="branding-blog no-link-style" href="https://blog.eleven-labs.com/" >
              <img alt="Le Blog" src={blogLogo} />
              <span className="brand-title">Le Blog</span>
            </a>
          </div>

          <div className="course-header">
            {currentCourse.title && <h2 className="course-header__title">{currentCourse.title}</h2>}
            {currentCourse.duration && <p className="course-header__duration" data-icon={clock}>{currentCourse.duration.total} minutes</p>}
          </div>

          {
            !currentCourse.title
            &&
            <SearchBox
              translations={{
                placeholder: 'Rechercher',
              }}
            />
          }

          <div className="links">
            <ul className="links__list -social">
              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://blog.eleven-labs.com/feed.xml" title="Ajoutez-nous à votre veille" rel="nofollow noreferrer"><i className="fa fa-fw fa-rss"></i></a>
              </li>

              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://github.com/eleven-labs" title="Suivez-nous sur GitHub" rel="nofollow noreferrer"><i className="fa fa-fw fa-github"></i></a>
              </li>

              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://twitter.com/eleven_labs" title="Suivez-nous sur Twitter" rel="nofollow noreferrer"><i className="fa fa-fw fa-twitter"></i></a>
              </li>

              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://www.facebook.com/11Labs" title="Suivez-nous sur Facebook" rel="nofollow noreferrer"><i className="fa fa-fw fa-facebook"></i></a>
              </li>

              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://fr.linkedin.com/company/eleven-labs" title="Suivez-nous sur LinkedIn" rel="nofollow noreferrer"><i className="fa fa-fw fa-linkedin"></i></a>
              </li>

              <li className="links__item">
                <a className="no-link-style tracked-link" href="https://eleven-labs.com" title="Découvrez Eleven Labs" rel="nofollow">
                  <img className="corporate-logo" src={rocket} alt="Découvrez Eleven Labs" height="19"></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, {})(Header);
