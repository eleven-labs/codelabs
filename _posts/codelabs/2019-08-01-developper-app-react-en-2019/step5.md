## Routing

Après avoir créé une page complète, nous allons en créer une 2ème qui permettra d'ajouter un astronaute à une planète. Mais pour y accéder, il faut mettre en place un système de routing avec la librairie `react-router-dom` ainsi qu'un menu simple.
Il existe d'autres alternatives mais celle-ci est la plus populaire.

### Mise en place du routing

Le routing est relativement simple et rapide. Comme d'habitude, il faut installer la librairie:

```
yarn add react-router-dom
```

puis initialiser dans `App.js`

```js
import React from 'react';
// on importe BrowserRouter
import { BrowserRouter } from 'react-router-dom';
  // ...
const App = () => {
  // ...
  return (
    <BrowserRouter>
      <BodyLayout>
        <TitlePage uppercase>Bienvenue sur le système planétaire d'Eleven labs</TitlePage>
        {planets.map((planet, index) => <Planet key={planet.id} position={index + 1} planet={planet} />)}
      </BodyLayout>
    </BrowserRouter>
  )
};
```

`BrowserRouter` va utiliser l'historique de votre navigateur pour synchroniser votre interface avec l'url ! Il faut maintenant créer nos routes via le composant <Route>, il faut lui injecter 2 props importantes:
- `path`: l'url pour accéder au composant
- `component`: le composant a afficher si le path est égale à l'url du navigateur

Comme le composant Route permet d'afficher ou non un élément, il faut donc créer un composant qui sera la totalité de notre page.

## Création de la première route

Pour notre première page, on va créer un dossier `containers` et avec à l'intérieur un fichier `Home.jsx`.
L'idée est de déplacer tout ce qui concernait la page (le titre + l'affichage des planètes) dans un composant dédié à cela.

```js
// containers/HomePage
import React from 'react';
// import des composants

const HomePage = () => {
  const planets = [
    {
      id: 1,
      img: DuckImg,
      points: 1100,
      name: 'Duck Invaders',
      citation: 'DUCK! DUCK! DUCK!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra, velit ut luctus imperdiet, orci arcu vulputate urna, ac accumsan ex ligula sit amet lacus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra, velit ut luctus imperdiet, orci arcu vulputate urna, ac accumsan ex ligula sit amet lacus.',
      totalAstronauts: 17,
    },
    {
      id: 2,
      img: RaccoonImg,
      points: 500,
      name: 'Raccoon of Asgard',
      citation: 'Nous sommes les raccoons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra, velit ut luctus imperdiet, orci arcu vulputate urna, ac accumsan ex ligula sit amet lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra, velit ut luctus imperdiet, orci arcu vulputate urna, ac accumsan ex ligula sit amet lacus.',
      totalAstronauts: 16,
    }
  ];

  return (
    <BodyLayout>
      <TitlePage uppercase>Bienvenue sur le système planétaire d'Eleven labs</TitlePage>
      {planets.map((planet, index) => <Planet key={planet.id} position={index + 1} planet={planet} />)}
    </BodyLayout>
  )
};

export default HomePage;
```

Puis dans App.jsx

```js
// App.jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={HomePage} />
    </BrowserRouter>
  )
};
```

Et voila, vous ne devriez pas avoir de changement sur votre navigateur, si ce n'est que vous avez mis en place votre première route !
Ptite subtilité néanmois, le composant <Route> suffit d'afficher le composant si l'url match avec le path mais si je rajoute une 2eme route?
```js
const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={HomePage} />
      <Route path="/" component={HomePage} />
    </BrowserRouter>
  )
};
```

Regardez votre navigateur... et oui, le composant <HomePage /> s'affiche 2 fois. Dans notre cas, c'est embêtant puisqu'on ne peut accéder qu'à une seule page à la fois. Il faut donc rajouter le composant <Switch /> de react-router-dom.

```js
// App.jsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
};
```

Le composant `<Switch />` va s'occuper de rendre une seule route, le 1er qui match ! J'aurais pu vous le montrer de suite, mais je voulais vous faire comprendre que les composants `<Route />` peuvent s'utiliser sans `<Switch />` :)

### Menu

Nous allons afficher un menu rapide, afin de pouvoir naviguer entre les différentes pages de l'application.

Dans le dossier `components`, créons le fichier `NavBar.jsx`:

```js
import React from 'react';
import { NavLink } from 'react-router-dom';

import Navlayout from './NavLayout';
import Logo from '../assets/images/eleven_labs.svg';
import LogoImage from './LogoImage';
import MenuLayout from './MenuList';
import NavButton from './NavButton';

const NavBar = () => (
  <Navlayout>
    <LogoImage src={Logo} alt="logo eleven labs" />
    <MenuLayout>
      <li>
        <NavLink to="/" exact >Palmarès</NavLink>
      </li>
      <li>
        <NavLink to="/astronauts">Astronautes</NavLink>
      </li>
      <li>
        <NavLink to="/rules">Règles du jeu</NavLink>
      </li>
      <li>
        <NavButton>
          <NavLink to="/join">Rejoindre une planète</NavLink>
        </NavButton>
      </li>
    </MenuLayout>
  </Navlayout>
);

export default NavBar;
```

Je vous laisse créer les composants stylisés. Si vous remarquez bien, nous n'allons pas utiliser les balises `<a>` sinon cela va déclencher une rechargement de la page.
Pour créer un lien, nous pouvons utiliser soit le composant `<NavLink />`, soit `<Link />`.

Pour les liens de navigation, il vaut mieux utiliser `<NavLink />` car il ajoute une classe dans le cas où l'url de navigateur matche avec le Link, cela permet de le styliser.

Par défaut, il ajoute `active` en tant que classe mais on peut le modifier grâce à la props `activeClassName`.

Petite subtilité, comment styliser le composant <NavLink />? Nous avons créé uniquement des composants liés au DOM avec **Styled-components**.
Ne vous inquiétez pas, il existe une solution !

Créons un fichier `MenuLink.js`:

```js
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MenuLink = styled(NavLink)`
  text-decoration: inherit;
  color: inherit;
  text-transform: uppercase;
  font-weight: bold;

  &.active {
    color: red;
  }
`;

export default MenuLink;
```

Au lieu de d'utiliser un élément du DOM, nous allons utiliser la fonction `styled()` et lui donner un composant React (soit le `<NavLink />` de **react-router-dom**) pour le surcharger.

Nous pouvons désormais modifier notre composant `<NavBar />`et remplacer tous les `<NavLink />` par des `<MenuLink />` !

Il nous reste plus qu'à ajouter notre NavBar au dessus de notre routing dans `App.jsx`.

```js
// App.jsx
// ...
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
};
```

Regardez votre navigateur, tout devrait fonctionner ! Bien sur, les liens ne fonctionnent pas puisque notre routing ne comporte que la **HomePage**.

Je vous laisse ajouter la nouvelle route `/join` qui pointe sur le container `<JoinPage />`.

> Pour la route `/` qui pointe sur la HomePage, il faut ajouter la props `exact` aux composants `<Route />` et `<MenuLink />`. Par défaut, le routeur ne fait pas de comparaison strict. Si vous avez une route nommé `/`, une route `/join`, et que l'url ne votre navigateur pointe sur `localhost:3000/join` alors les 2 routes vont matcher. La props `exact` ou `strict` permet d'éviter cela si vous avez des url avec les mêmes préfixes.

Nous en avons terminé avecle système de routing, pour plus d'informations, je vous laisse aller lire la documentation de [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start).

Avant de passer au formulaire, nous allons devoir apprendre la notion de **state** ainsi que de **hook** !

---
Retrouvez le code de l'étape 5 sur mon [Github](https://github.com/KizeRemi/Tutoriel-react/tree/step-5).

---


