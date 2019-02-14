### Ajouter les resolvers

Ajoutons notre premier `resolver` pour les personnages dans le fichier `src/resolvers/character.js`:

```js
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    characters: (
      parent,
      args,
      { dataSources: { CharacterSQLDataSource } },
      info
    ) => CharacterSQLDataSource.characters,
    character: (
      parent,
      { key },
      { dataSources: { CharacterSQLDataSource } },
      info
    ) => CharacterSQLDataSource.findCharacterByKey(key).then(character => character ? character : new ApolloError("Character not found.", "RESOURCE_NOT_FOUND")),
  },
  Character: {
    father: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.fatherKey ? CharacterSQLDataSource.findCharacterByKey(parent.fatherKey) : null,
    mother: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.motherKey ? CharacterSQLDataSource.findCharacterByKey(parent.motherKey) : null,
    spouse: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.spouseKey || parent.queenKey ? CharacterSQLDataSource.findCharacterByKey(parent.spouseKey || parent.queenKey) : null,
    childrens: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.childrensKey ? CharacterSQLDataSource.filterCharactersByKeys(parent.childrensKey) : null,
    house: (parent, args, { dataSources: { HouseSQLDataSource } }) => parent.royalHouseKey ? HouseSQLDataSource.findHouseByKey(parent.royalHouseKey) : null,
  }
};

module.exports = resolvers;
```

Ajoutons notre deuxième resolveur pour les maisons dans le fichier `src/resolvers/house.js`:

```js
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    houses: (
      parent,
      args,
      { dataSources: { HouseSQLDataSource } },
      info
    ) => HouseSQLDataSource.houses,
    house: (
      parent,
      { key },
      { dataSources: { HouseSQLDataSource } },
      info
    ) => HouseSQLDataSource.findHouseByKey(key).then(house => house ? house : new ApolloError("House not found.", "RESOURCE_NOT_FOUND")),
  },
  House: {
    lord: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.lordKey ? CharacterSQLDataSource.findCharacterByKey(parent.lordKey) : null,
    heirs: (parent, args, { dataSources: { CharacterSQLDataSource } }) => parent.heirsKey ? CharacterSQLDataSource.filterCharactersByKeys(parent.heirsKey) : null,
    characters: (parent, args, { dataSources: { CharacterSQLDataSource } }) => CharacterSQLDataSource.filterCharactersByHouseKey(parent.key),
  }
};

module.exports = resolvers;
```

Une fois vos resolvers terminés vous pouvez les tester dans l'interface `playground` qui est fournit directement dans Apollo. Il s'agit d'un IDE permettant de lancer des Query et Mutation sur votre API. Vous pouvez aussi voir la documentation qui est autogénérée grâce aux typages fort de votre API GraphQL.

```graphql
query CHARACTERS(
  $withMother: Boolean = false
  $withFather: Boolean = false
  $withSpouse: Boolean = false
  $withChildrens: Boolean = false
  $withHouse: Boolean = false
) {
  characters {
    ...FullCharacter
  }
}

query HOUSES(
  $withLord: Boolean = false
  $witHeirs: Boolean = false
  $witCharacters: Boolean = false
) {
  houses {
    ...FullHouse
  }
}

fragment FullCharacter on Character {
  ...Character
  mother @include(if: $withMother) {
    ...Character
  }
  father @include(if: $withFather) {
    ...Character
  }
  spouse @include(if: $withSpouse) {
    ...Character
  }
  childrens @include(if: $withChildrens) {
    ...Character
  }
  house @include(if: $withHouse) {
    ...House
  }
}

fragment FullHouse on House {
  key
  name
  imageUrl
  lord @include(if: $withLord) {
    ...Character
  }
  heirs @include(if: $witHeirs) {
    ...Character
  }
  characters @include(if: $witCharacters) {
    ...Character
  }
}

fragment Character on Character {
  key
  name
  imageUrl
}

fragment House on House {
  key
  name
  imageUrl
}
```

La démo [CodeSandbox](https://codesandbox.io/s/github/eleven-labs/article-starter-kit-graphql/tree/step/dataSources).