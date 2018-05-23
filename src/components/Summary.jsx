/* eslint-disable no-bitwise */
import React from 'react';
import PropTypes from 'prop-types';

import SummaryItem from './SummaryItem';

const Summary = ({ stepTitles = [], currentStep, gotoStep, completeSteps }) => (
  <nav className="summary">
    <h3 className="visually-hidden">Étapes</h3>
    <ul className="summary__steps">
      {stepTitles.map((title, index) => (
        <SummaryItem
          key={title}
          title={title}
          index={index}
          isCurrentStep={currentStep === index}
          onClick={() => gotoStep(index)}
          complete={completeSteps.indexOf(index) >= 0}
        />
      ))}
    </ul>
  </nav>
);

Summary.propTypes = {
  stepTitles: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.number,
  gotoStep: PropTypes.func.isRequired,
  completeSteps: PropTypes.arrayOf(PropTypes.number),
};

Summary.defaultProps = {
  stepTitles: [],
  currentStep: 0,
  completeSteps: [],
};

export default Summary;
