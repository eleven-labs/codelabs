import React from 'react';
import PropTypes from 'prop-types';

import { NOOP } from '../constants';
import SummaryItem from './SummaryItem';

const Summary = ({ stepTitles = [], currentStep, gotoStep }) => {
  return (
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
