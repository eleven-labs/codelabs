import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

const renderStep = (course, step, currentStep) => {
  return (
    <li className={currentStep === step ? 'hljs' : ''}>
      { course[`step_${step}_title`] }
    </li>
  );
};

const Steps = ({ course, currentStep }) => (
  <div>
    <h3>Step</h3>
    <ul>
      {
        Array.from({length: course.step_count + 1}, (v, k) => k).map((step) => renderStep(course, step, currentStep))
      }
    </ul>
  </div>
);

export default Steps;
