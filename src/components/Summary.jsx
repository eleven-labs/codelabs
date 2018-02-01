import React from 'react';
import PropTypes from 'prop-types';

import { NOOP } from '../constants';
import SummaryItem from './SummaryItem';

const Summary = ({ stepTitles = [], currentStep, gotoStep }) => {
  return (
    <div className="codelabs-summary">
      <h3>Étapes</h3>
      <ul>
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
    </div>
  );
};

Summary.PropTypes = {
  stepTitles: PropTypes.arrayOf(PropTypes.string),
  currentStep: PropTypes.number,
};

Summary.defaultProps = {
  stepTitles: {},
  currentStep: 0,
};

export default Summary;
