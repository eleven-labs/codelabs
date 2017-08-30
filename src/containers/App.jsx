import React from 'react';
import { connect } from 'react-redux';

import { addTopic } from '../actions';

const mapStateToProps = ({ courses, topics }) => ({ courses, topics });
const mapDispatchToProps = { addTopic };

export class App extends React.Component {
  render() {
    const { courses = [], topics = [] } = this.props;

    return (
      <div>
        <div className="header">Eleven&apos;s CodeLabs</div>
        <div className="topics">
          {topics.map((topic, key) => (
            <button {...{ key }}>{topic}</button>
          ))}
        </div>
        <div className="courses">
          {courses.map((course, key) => (
            <div {...{ key }}>{course.title}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
