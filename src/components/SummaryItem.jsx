import React from 'react';
import PropTypes from 'prop-types';
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

export default SummaryItem;
