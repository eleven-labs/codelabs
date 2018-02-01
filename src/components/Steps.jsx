import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';
import cx from 'classnames';
import { NOOP } from '../constants';

const SummaryItem = ({ title, onClick, isCurrentStep, index }) => (
  <li
    className={cx('summary-step', { current: isCurrentStep })}
    onClick={onClick}
  >{index + 1} - {title}</li>
);

SummaryItem.PropTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isCurrentStep: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

SummaryItem.defaultProps = {
  onClick: NOOP,
};

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
