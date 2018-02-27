import React from 'react';
import PropTypes from 'prop-types';

import SummaryItem from './SummaryItem';

const Summary = ({ stepTitles = [], currentStep, gotoStep }) => (
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
        />
      ))}
    </ul>
  </nav>
);

Summary.propTypes = {
  stepTitles: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.number,
  gotoStep: PropTypes.func.isRequired,
};

Summary.defaultProps = {
  stepTitles: [],
  currentStep: 0,
};

export default Summary;
