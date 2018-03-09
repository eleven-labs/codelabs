import React, { Component } from 'react';

import flask from '../assets/images/icons/icon_flask.png';

class Splash extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="splash">
        <div className="splash__container container">
          <img className="splash__icon" src={flask} alt="" />
          <div className="splash__text">
            <h2 className="splash__title">
              Bienvenue sur Eleven Codelabs
            </h2>
            <p className="splash__description">
              Cette plateforme ? C&rsquo;est votre nouvelle source de tutoriels,
              orient&eacute;s d&eacute;veloppement d&rsquo;applicatifs web et mobile
              et ma&icirc;trise d&rsquo;outils DevOps !
              Vous pourrez y suivre &agrave; votre rythme des exercices complets,
              allant du d&eacute;veloppement d&rsquo;applications
              &agrave; des cas pratiques vous faisant d&eacute;couvrir un nouvel outil.
              Garez tranquillement votre vaisseau, enfilez votre combinaison,
              et rejoignez-nous dans le laboratoire !
              Votre si&egrave;ge vous attend !
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
