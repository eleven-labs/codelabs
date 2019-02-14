### Créer un dataLayer SQL

```bash
.
├── src
│   ├── dataLayers
│   └── sql
│       ├── helpers
│       ├── migrations
│       ├── seeds
│       ├── wrappers
│       ├── index.js
│       ├── knexfile.js
│       ├── model.js
│       ├── modelFactory.js
│       └── seeder.js
```

`src/dataLayers/sql/knexfile.js`:

```js
const config = {
  test: {
    client: "pg",
    connection:
      process.env.DB_URL ||
      "postgres://elevenlabs:elevenlabs@db:5432/elevenlabs",
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  },
  development: {
    client: "pg",
    connection:
      process.env.DB_URL ||
      "postgres://elevenlabs:elevenlabs@db:5432/elevenlabs",
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  },
  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  }
};

module.exports = config;
```

`src/dataLayers/sql/helpers/knexCamelCaseMappers.js`:
```js
const { camelCase, snakeCase } = require("lodash");
const Client = require("knex/lib/dialects/postgres");

const convertToCamel = result =>
  Object.keys(result).reduce((acc, key) => {
    const value = result[key];
    acc[camelCase(key)] = value;
    return acc;
  }, {});



const knexCamelCaseMappers = () => ({
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map(row => convertToCamel(row));
    } else if (typeof result === "object") {
      return convertToCamel(result);
    }

    return result;
  },
  wrapIdentifier: (value, origImpl, queryContext) => {
    if (value === "*") return value;
    const matched = value.match(/(.*?)(\[[0-9]\])/);
    if (matched) {
      return (
        Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2]
      );
    }
    return origImpl(snakeCase(value));
  }
});

module.exports = knexCamelCaseMappers;
```

`src/dataLayers/sql/model.js`:
```js
class Model {
  constructor(Database, tableName, idColumn = "id") {
    this.Database = Database;
    this.tableName = tableName;
    this.idColumn = idColumn;
  }

  get database() {
    return this.Database(this.tableName);
  }

  all() {
    return this.database.select();
  }

  paginate({ page, perPage }) {
    return this.database.paginate({ page, perPage });
  }

  findOne(where) {
    return this.database.where(where).first();
  }

  create(payload) {
    return this.database.insert(payload)
      .returning("*")
      .then(rows => rows[0]);
  }

  update(payload) {
    return this.database.update(payload)
      .where({ [this.idColumn]: payload[this.idColumn] })
      .returning("*")
      .then(rows => rows[0]);
  }

  save(payload) {
    return typeof payload[this.idColumn] === "undefined"
      ? this.create(payload)
      : this.update(payload);
  }

  delete(id) {
    return this.database.delete()
      .where({ [this.idColumn]: id })
      .then(numberOfDelete => numberOfDelete === 1);
  }
}

module.exports = Model;
```

`src/dataLayers/sql/modelFactory.js`:
```js
class Model {
  constructor(Database, tableName, idColumn = "id") {
    this.Database = Database;
    this.tableName = tableName;
    this.idColumn = idColumn;
  }

  get database() {
    return this.Database(this.tableName);
  }

  all() {
    return this.database.select();
  }

  paginate({ page, perPage }) {
    return this.database.paginate({ page, perPage });
  }

  findOne(where) {
    return this.database.where(where).first();
  }

  create(payload) {
    return this.database.insert(payload)
      .returning("*")
      .then(rows => rows[0]);
  }

  update(payload) {
    return this.database.update(payload)
      .where({ [this.idColumn]: payload[this.idColumn] })
      .returning("*")
      .then(rows => rows[0]);
  }

  save(payload) {
    return typeof payload[this.idColumn] === "undefined"
      ? this.create(payload)
      : this.update(payload);
  }

  delete(id) {
    return this.database.delete()
      .where({ [this.idColumn]: id })
      .then(numberOfDelete => numberOfDelete === 1);
  }
}

module.exports = Model;
```

La démo [CodeSandbox](https://codesandbox.io/s/github/eleven-labs/article-starter-kit-graphql/tree/step/dataSources).