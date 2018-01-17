import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fg from '../assets/images/fg-header.png';

class Splash extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="splash call-out">
        <div>
          <i className="fa fa-flask" aria-hidden="true"></i>
          <div>
            <h2>Bienvenu sur Eleven Code Labs</h2>
            <p>
              Cette plateforme est votre nouvelle ressource de tutoriels orient&eacute;s d&eacute;veloppment web et mobile. Suivez à votre rythme des exercices complets, qui couvrent des sujets allant du développment de petites applications, à des cas pratiques vous faisant découvrir un nouvel outil...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
