import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import urlJoin from 'url-join';

import Splash from '../components/Splash';
import Summary from '../components/Summary';

import {
  loadCourses,
  loadStep,
  setCurrentCourse,
} from '../actions';
import { NOOP } from '../constants';

import componentFactory from '../services/componentFactory';

const mapStateToProps = ({
  courses,
  currentStepMD,
  currentCourse,
  currentStepIndex,
}) => ({
  courses,
  currentStepMD,
  currentStepIndex,
  course: currentCourse,
});

const mapDispatchToProps = {
  loadCourses,
  loadStep,
  setCurrentCourse,
};

export class Course extends React.Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape()),
    currentStepMD: PropTypes.string,
    currentStepIndex: PropTypes.number,

    course: PropTypes.shape(),
    loadCourses: PropTypes.func,
    loadStep: PropTypes.func,
    setCurrentCourse: PropTypes.func,
  };

  static defaultProps = {
    courses: null,
    currentStepMD: '',
    currentStepIndex: null,

    course: null,
    loadCourses: PropTypes.func,
    loadStep: PropTypes.func,
    setCurrentCourse: PropTypes.func,
  };

  state = {
    steps: [],
    currentStep: 0,
  }

  constructor(props) {
    super(props);

    this.loadInternalStep = this.loadInternalStep.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.go = this.go.bind(this);
    this.gotoStep = this.gotoStep.bind(this);
  }

  componentDidMount() {
    this.props.loadCourses();
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { lang, permalink },
      },
    } = this.props;

    const { course, courses, currentStepMD, currentStepIndex } = nextProps;
    const { steps = {}, currentStep } = this.state;

    // Set the course in redux's store.
    if (!this.props.courses && courses) {
      this.props.setCurrentCourse(`/${lang}/${permalink}/`);
    }

    // Set the course in the state and load the first step.
    if (!this.props.course && course) {
      this.setState({ course }, () => {
        this.loadInternalStep(0);
      });
    }

    // When a step is loaded, we build the body using componentFactory.
    if (currentStepMD) {
      const key = currentStep === 0 ? 'index' : `step${currentStep}`;

      this.setState({
        steps: {
          ...steps,
          [key]: componentFactory(currentStepMD),
        },
      });
    }
  }

  async loadInternalStep(stepIndex) {
    const { course } = this.state;
    await this.props.loadStep(course, stepIndex);
  }

  next() {
    this.go(1);
  }

  previous() {
    this.go(-1);
  }

  go(direction) {
    const nextStep = this.state.currentStep + direction;

    this.setState({ currentStep: nextStep }, () => {
      this.loadInternalStep(nextStep);
    });
  }

  gotoStep(step) {
    this.setState({ currentStep: step }, () => {
      this.loadInternalStep(this.state.currentStep);
    });
  }

  render() {
    const {
      course = {},
      course: { stepTitles = [] } = {},
      currentStep,
    } = this.state;

    const {
      steps: {
        [currentStep === 0 ? 'index' : `step${currentStep}`]: step = [],
      } = {},
    } = this.state;

    return (
      <div className="codelabs-course home">
        <Summary
          stepTitles={stepTitles}
          currentStep={currentStep}
          gotoStep={this.gotoStep}
        />

        <div className="post-content container">
          <div>
            <button
              onClick={this.previous}
              disabled={currentStep === 0}
            >previous</button>

            <button
              onClick={this.next}
              disabled={currentStep === stepTitles.length - 1}
              style={{ float: 'right' }}
            >next</button>
          </div>
          <p>{course.time} minutes</p>
          {step.map((renderer, key) => renderer({ key }))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
