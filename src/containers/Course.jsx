import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import urlJoin from 'url-join';

import arrow from '../assets/images/icons/icon_arrow.svg';
import Summary from '../components/Summary';

import {
  loadCourses,
  loadStep,
  setCurrentCourse,
} from '../actions';
import { NOOP, SITE_ROOT } from '../constants';

import componentFactory from '../services/componentFactory';
import { getKeywords, getAuthorsNames } from '../helpers/course';

const mapStateToProps = ({
  courses,
  currentStepMD,
  currentCourse,
}) => ({
  courses,
  currentStepMD,
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

    course: PropTypes.shape(),
    loadCourses: PropTypes.func,
    loadStep: PropTypes.func,
    setCurrentCourse: PropTypes.func,

    match: PropTypes.shape(),
  };

  static defaultProps = {
    courses: null,
    currentStepMD: '',

    course: null,
    loadCourses: NOOP,
    loadStep: NOOP,
    setCurrentCourse: NOOP,
    match: { params: {} },
  };

  constructor(props) {
    super(props);

    this.loadInternalStep = this.loadInternalStep.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.go = this.go.bind(this);
    this.gotoStep = this.gotoStep.bind(this);
  }

  state = {
    steps: {},
    currentStep: 0,
  };

  componentDidMount() {
    this.props.loadCourses();
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { lang, permalink },
      },
    } = this.props;

    const { course, courses, currentStepMD } = nextProps;
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
    document.documentElement.scrollTop = 0;
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
      <div className="course container">
        {stepTitles.length > 0 && (
          <Helmet>
            <title>Eleven&apos;s Codelabs: {stepTitles[currentStep]}</title>
            <link rel="canonical" href={urlJoin(SITE_ROOT, 'course', course.permalink)} />
            <meta name="description" content={course.exerpt} />
            <meta name="keywords" content={getKeywords(course).join()} />
            <meta name="author" content={getAuthorsNames(course).join()} />
          </Helmet>
        )}

        <Summary
          stepTitles={stepTitles}
          currentStep={currentStep}
          gotoStep={this.gotoStep}
        />

        <article className="course__content">
          {stepTitles.length > 0 && (
            <h2 className="course__chapter">{currentStep + 1} - {stepTitles[currentStep]}</h2>
          )}
          <div className="course__text">{step.map((renderer, key) => renderer({ key }))}</div>
          <div className="course__navigation">
            <button
              type="button"
              className="course__button -previous"
              onClick={this.previous}
              disabled={currentStep === 0}
            ><img alt="Précédent" src={arrow}></img></button>

            <button
              type="button"
              className="course__button -next"
              onClick={this.next}
              disabled={currentStep === stepTitles.length - 1}
            ><img alt="Suivant" src={arrow}></img></button>
          </div>
        </article>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
