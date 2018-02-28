import React, { Component } from 'react';

import flask from '../assets/images/icons/icon_flask.svg';

class Splash extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="splash">
        <div className="splash__container container">
          <img className="splash__icon" src={flask} alt="Code Labs" />
          <div className="splash__text">
            <h2 className="splash__title">
              Bienvenue sur Eleven Code Labs
            </h2>
            <p className="splash__description">
              Cette plateforme ? C’est votre nouvelle source de tutoriels,
              orientés développement d'applicatifs web et mobile et maîtrise d’outils DevOps !
              Vous pourrez y suivre à votre rythme des exercices complets,
              allant du développement d'applications
              à des cas pratiques vous faisant découvrir un nouvel outil.
              Garez tranquillement votre vaisseau, enfilez votre combinaison,
              et rejoignez-nous dans le laboratoire !
              Votre siège vous attend !
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
