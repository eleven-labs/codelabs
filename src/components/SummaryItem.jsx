/* eslint jsx-a11y/no-noninteractive-element-interactions: off */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NOOP } from '../constants';

const SummaryItem = ({ title, onClick, isCurrentStep, index }) => (
  <li
    className={cx('summary__step', { '-current': isCurrentStep })}
    onClick={onClick}
  >
    <span className="summary__step-number">{index + 1}</span>
    <span className="summary__step-title">{title}</span>
  </li>
);

SummaryItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isCurrentStep: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

SummaryItem.defaultProps = {
  onClick: NOOP,
};

export default SummaryItem;
