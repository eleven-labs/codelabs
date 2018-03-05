import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../assets/images/logo_eleven_codelabs.png';

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
      currentCourse: {
        title = '',
        stepTitles = [],
      },
      currentStepIndex,
    } = this.props;

    return (
      <nav className="site-header">
        <div className="branding">
          <a href="/" className="branding__content">
            <img className="branding__image" alt="Eleven Codelabs" src={logo}></img>
          </a>
        </div>

        <div className="site-title">
          <h2>{title}</h2>
          {stepTitles.length > 0 && (
            <h3>{currentStepIndex + 1} - {stepTitles[currentStepIndex]}</h3>
          )}
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, {})(Header);
