import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

const renderStep = ({ title, isCurrentStep }) => {
  const props = isCurrentStep ? { className: 'hljs' } : {};

  return (
    <li key={title} {...props}>{title}</li>
  );
};

const Steps = ({ stepTitles = [], currentStep }) => {
  return (
    <div>
      <h3>Steps</h3>
      <ul>
        {stepTitles.map((title, index) => (
          renderStep({
            title,
            isCurrentStep: currentStep === index,
          })
        ))}
      </ul>
    </div>
  );
};

Steps.PropTypes = {
  stepTitles: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.number,
};

Steps.defaultProps = {
  stepTitles: {},
  currentStep: 0,
};

export default Steps;
