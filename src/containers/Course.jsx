import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Splash from '../components/Splash';

import { loadCourses } from '../actions';
import { NOOP } from '../constants';

const mapStateToProps = ({ courses }) => ({ courses });
const mapDispatchToProps = { loadCourses };

export class Course extends React.Component {
  static propTypes = {
    course: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    course: {},
  };

  componentDidMount() {
  }

  render() {
    const { courses } = this.props;

    return (
      <div className="home">
        TEST
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
