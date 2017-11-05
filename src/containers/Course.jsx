import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import urlJoin from 'url-join';

import Splash from '../components/Splash';

import { loadCourses } from '../actions';
import { NOOP } from '../constants';

import componentFactory from '../services/componentFactory';

const mapStateToProps = ({ courses }) => ({ courses });
const mapDispatchToProps = { loadCourses };

export class Course extends React.Component {
  static propTypes = {
    course: PropTypes.shape(),
  };

  state = {
    steps: [],
    currentStep: 0,
  }

  constructor(props) {
    super(props);

    this.loadIndex = this.loadIndex.bind(this);
    this.loadStep = this.loadStep.bind(this);
    this.loadMd = this.loadMd.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  async componentDidMount() {
    let {
      course,
      match: {
        params: { lang, permalink },
      },
    } = this.props;

    if (!course) {
      await this.props.loadCourses();

      course = this.props.courses.find(
        post => post.permalink === `/${lang}/${permalink}/`
      );
    }

    this.setState({
      course,
      steps: {
        index: await this.loadIndex(course),
      },
    });
  }

  async loadMd(path) {
    const response = await fetch('https://storage.googleapis.com/tutos/codelabs/2017-09-11-mon-premier-tuto/step1.md');

    return componentFactory(await response.text());
  }

  async loadIndex(course) {
    let { match: { params: { permalink } } } = this.props;
    return this.loadMd(`${course.date}-${permalink}/index.md`);
  }

  async loadStep(stepIndex) {
    const { course } = this.state;
    let { match: { params: { permalink } } } = this.props;
    const step = stepIndex <= 0 ? 'index' : `step${stepIndex}`;

    return this.loadMd(`${course.date}-${permalink}/${step}.md`);
  }

  next() {
    this.go(1);
  }

  previous() {
    this.go(-1);
  }

  async go(direction) {
    const nextStep = this.state.currentStep + direction;

    this.setState({
      currentStep: nextStep,
      steps: {
        ...this.state.steps,
        [`step${nextStep}`]: await this.loadStep(nextStep),
      },
    });
  }

  render() {
    const { course = {}, currentStep } = this.state;
    const {
      steps: {
        [currentStep === 0 ? 'index' : `step${currentStep}`]: step = [],
      } = {},
    } = this.state;

    return (
      <div className="home container">
        <div>
          <button
            onClick={this.previous}
            disabled={currentStep === 0}
          >previous</button>

          <button
            onClick={this.next}
            disabled={currentStep === course.step_count}
            style={{ float: 'right' }}
          >next</button>
        </div>

        <div className="post-content">
          {step.map((renderer, key) => renderer({ key }))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
