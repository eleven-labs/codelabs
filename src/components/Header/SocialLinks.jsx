/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import rocket from '../../assets/images/icons/icon_rocket.svg';

const LINKS = [
  {
    title: 'Suivez-nous sur GitHub',
    href: 'https://github.com/eleven-labs',
    icon: 'github',
  },
  {
    title: 'Suivez-nous sur Twitter',
    href: 'https://twitter.com/eleven_labs',
    icon: 'twitter',
  },
  {
    title: 'Suivez-nous sur Facebook',
    href: 'https://www.facebook.com/11Labs',
    icon: 'facebook',
  },
  {
    title: 'Suivez-nous sur LinkedIn',
    href: 'https://fr.linkedin.com/company/eleven-labs',
    icon: 'linkedin',
  },
  {
    title: 'Découvrez Eleven Labs',
    href: 'https://eleven-labs.com',
    icon: (
      <img
        className="corporate-logo"
        src={rocket}
        alt="Découvrez Eleven Labs"
        height="19"
      />
    ),
  },
];

class Link extends Component {
  static propTypes = {
    link: PropTypes.shape(),
  }

  static defaultProps = {
    link: {},
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { link } = this.props;
    let icon = link.icon;

    if (typeof link.icon === 'string') {
      icon = <i className={`fa fa-fw fa-${link.icon}`}></i>;
    }

    return (
      <li className="links__item">
        <a
          className="no-link-style tracked-link"
          href={link.href}
          title={link.title}
          rel="nofollow noreferrer"
        >
          {icon}
        </a>
      </li>
    );
  }
}

export default class SocialLinks extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="links">
        <ul className="links__list -social">
          {LINKS.map(link => <Link link={link} key={link.href} />)}
        </ul>
      </div>
    );
  }
}
