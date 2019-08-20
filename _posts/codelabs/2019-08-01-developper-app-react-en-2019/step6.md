## Gestion du state

Depuis le début de ce tutoriel, nos avons vu créé des composants, envoyé des props et créé des composants purement stylisés.
Il est grand temps de vous parler du State, qui est extrèmement important dans React et qui va revenir très très souvent.

Cette étape est vraiment importante, ne la négligez surtout pas.

### Affichage des astronautes

Dans un premier temps, nous allons associer une liste d'astronautes à chaque planète.

Il faut donc modifier la liste des planètes dans `HomePage.jsx`:

```js
  const planets = [
    {
      id: 1,
      // ...
      astronauts: [
        {
          firstName: 'Jonathan',
          lastName: 'Jalouzot',
          userName: 'CaptainJojo',
          age: 31,
          points: 1200,
        },
        {
          firstName: 'Kamal',
          lastName: 'Farsaoui',
          userName: 'Kamalou',
          age: 35,
          points: 850,
        },
        // ...
      ],
    },
    {
      id: 2,
      // ...
      astronauts: [
        {
          firstName: 'Nicolas',
          lastName: 'Grévin',
          userName: 'GNicolas',
          age: 30,
          points: 150,
        },
        // ...
      ],
    }
  ];
```

On a ajouté une propriété *astronauts*, qui contient une liste d'astronautes avec leurs noms, ages et points.
Il faut également supprimer les propriétés **points** et **totalAstronauts** à la racine de notre planet.

Petit exercice: Sachant que nous avons supprimé les 2 propriétés précédentes, nous devons calculer dynamiquement le nom de total d'astronautes ainsi que le nombre de points pour la planète.

Essayez de le faire vous-même, vous avez juste à modifier le composant `<Planet />` !

```js
const Planet = ({ planet, position }) => {
  const { astronauts = [] } = planet;

  return (
    <Container row>
      <Container centered>
        <PlanetImage alt="duck planet" src={planet.img} />
        <Number>{astronauts.reduce((points, astronaut) => points += astronaut.points, 0)}<Unit>points</Unit></Number>
      </Container>
      <div>
        <PlanetName><Number compact>{position}</Number>{planet.name}</PlanetName>
        <Quote>{planet.citation}</Quote>
        <Description>{planet.description}</Description>
        <AstronautsTotal>{`Cette planète est habité par ${astronauts.length} astronautes`}</AstronautsTotal>
      </div>
    </Container>
  )
};

Planet.propTypes = {
  planet: shape({
    img: string.isRequired,
    name: string.isRequired,
    citation: string.isRequired,
    description: string.isRequired,
    astronauts: arrayOf(shape(
      {
        firstName: string,
        lastName: string,
        userName: string,
        age: number,
        points: number.isRequired,
      }
    )).isRequired,
  }),
  position: number.isRequired,
}
```

Nous avons utilisé la destructuration (merci l'ES6) afin de récupérer la liste des astronautes. Pour le total d'astronaute, c'est facile, nous avons juste utilisé `astronauts.length`. Pour le total de points, on a utilisé la méthode [reduce()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce) !
Et on oublie surtout pas de mettre à jour les **propTypes** !

Nous allons pouvoir afficher les astronautes dans un tableau, sous la planète.
Nous n'allons pas créer le tableau nous-même, on va utiliser une librairie:

```
yarn add react-data-table-component
```

Il existe beaucoup de librairies qui proposent des composants React tout prêt, profitons-en !

```js
/// Planet.jsx
import DataTable from 'react-data-table-component';
/// ...

const Planet = ({ planet, position }) => {
  const { astronauts = [] } = planet;

  return (
    <Container row bordered>
      {/* ... */}
      <AstronautsTotal>{`Cette planète est habité par ${astronauts.length} astronautes`}</AstronautsTotal>
      <DataTable
        noHeader
        columns={[{ name: 'Pseudo', selector: 'userName' }, { name: 'Points', selector: 'points' }]}
        data={astronauts}
      />
    </Container>
  )
};
```

La librairie propose un composant `<DataTable />`, il suffit de lui injecter nos astronautes et le nom des colonnes avec leur selecteur.

Plutot simple, on va pouvoir créer un bouton *toggle* afin d'afficher ou non le tableau.

### Utilisation du state

Comme nous disions au début, le state est extrèment important dans React. Le **state** définit l'_état_ actuel de votre composant, et si son state change alors **un nouveau rendu est effectué automatiquement** !

Il existe 2 moyens de générer un nouveau rendu pour votre composant. Soit en **recevant une props**, soit en **modifiant son state**.

Lorsqu'un composant reçoit une props, il peut être tentant de la modifier. **Cela ne doit jamais arriver**. Un composant ne modifie jamais directement une props, il faut le mettre dans son state avant.

Il existe 2 moyens pour gérer le state de votre composant. Dans un projet pro, vous allez sans doute être emmené à voir les 2 versions car la 2ème est très récente.

Nous allons donc voir la différence entre les 2.

#### Gestion du state avec les classes

Avant la version 16.8 de React, tout composant ayant besoin d'un *state* devait être une classe !

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div>Mon Composant</div>
  }
}
```

Rien de particulier pour créer votre composant en classe, bien penser à **extends Component** depuis React afin d'avoir accès aux méthodes de base.

Le fait de créer un composant en classe change pas mal de chose mais nous allons parler du plus important: le state.


```js
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    this.state = { click: false };
  }

  // Vous pouvez rajouter vos méthodes dans la classe

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ click: true })}>Click !</button>
        {this.state.click && <div>Tu as cliqué!</div>}
      </div>
    )
  }
}
```

C'est relativement simple, le fait de créer une classe rend le code un peu plus verbeux.

Ici, nous avons initialisé notre state dans le `constructor()` avec une propriété click a false. La méthode `render()` doit retourner notre vue.
Lorsque l'on clique sur le bouton, on fait appelle à la méthode `this.setState()` qui prend en argument un objet avec les différentes propriétés du state que l'on souhaite modifier.

Ici, nous mettons la propriété click à `true`. Etant donné que le **state** du composant a changé, un nouveau rendu est effectué (la méthode `render()` est relancé). Nous avons mis une condition dnas le rendu, si le state est a true, la phrase _Tu as cliqué_ apparait !

Les classes permettent également l'accès au *cycle de vie* d'un composant. En fait, un composant React lorsqu'il s'affiche sur le navigateur passe par plusieurs phases.

- `componentDidMount()`: Lorsque le composant a été inséré dans le DOM
- `componentWillUnmount()`: Lorsque le composant va être retiré du DOM
- `componentDidUpdate()`: Lorsqu'une props ou un state a été modifiée.

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    this.state = { click: false };
  }

  componentDidUpdate(prevProps, prevState)  {
    //si vous avez besoin d'effectuer une action en cas de changement de props ou de state
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ click: true })}>Click !</button>
        {this.state.click && <div>Tu as cliqué!</div>}
      </div>
    )
  }
}
```

D'autres méthodes sont disponibles, je vous invite à lire [la doc](https://fr.reactjs.org/docs/react-component.html#constructor) sur le sujet !

#### Gestion avec les hooks

Depuis React 16.8, celui-ci implémente le système de hooks, vous pouvez d'ailleurs retrouver [un article complet sur le blog](https://blog.eleven-labs.com/fr/introductionauxhooks/) !

Avec les hooks, vous n'avez pas besoin de classe et vous pouvez réutiliser votre state dans différentes composants.

```js
import React, { useState } from 'react';

const MyComponent = () => {
  const [click, setClick] = useState(false)
  return (
    <div>
      <button onClick={() => setClick(true)}>Click !</button>
      {click && <div>Tu as cliqué!</div>}
    </div>
  )
};
```


