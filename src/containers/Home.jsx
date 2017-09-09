import React from 'react';
import { connect } from 'react-redux';

import Splash from '../components/Splash';
import List from '../components/List';

import { loadCourses } from '../actions';

const mapStateToProps = ({ courses }) => ({ courses });
const mapDispatchToProps = { loadCourses };

export class Home extends React.Component {
  componentDidMount() {
    this.props.loadCourses();
  }

  render() {
    const { courses } = this.props;

    return (
      <div className="home">
        <Splash />
        <List courses={courses} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
