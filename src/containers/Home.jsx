import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Hits } from 'react-instantsearch/dom';

import Splash from '../components/Splash';
import CourseList from '../components/CourseList';

import { loadCourses } from '../actions';
import { NOOP } from '../constants';

const mapStateToProps = ({ courses }) => ({ courses });
const mapDispatchToProps = { loadCourses };

const HitEntry = (hit) => <div>{hit.name}</div>;

export class Home extends React.Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loadCourses: PropTypes.func.isRequired,
  };

  static defaultProps = {
    courses: [],
    loadCourses: NOOP,
  };

  componentDidMount() {
    this.props.loadCourses();
  }

  render() {
    const { courses } = this.props;

    return (
      <div className="home">
        <Splash />
        <CourseList courses={courses} />
        <Hits hitComponent={HitEntry} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
