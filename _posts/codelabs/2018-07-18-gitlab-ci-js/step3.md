# Mise en place des phase de code style et de test

<!-- TODO: read -->

## Installation des dépendances

<!-- TODO: read -->

```bash
make yarn "add -D stylelint stylelint-processor-html stylelint-config-standard"

```

## Configuration de stylelint

<!-- TODO: read -->

```json
{
  "processors": ["stylelint-processor-html"],
  "extends": "stylelint-config-standard"
}
```

## Création des commandes 

<!-- TODO: read -->

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "yarn lint:js && yarn lint:scss",
    "lint:js": "vue-cli-service lint --no-fix",
    "lint:scss": "stylelint '**/*.vue' --syntax scss",
    "test": "yarn test:unit && yarn test:e2e",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e"
  },
```

## Application à la CI/CD

<!-- TODO: read -->

```yaml
stages:
  - build
  - lint
  - test
# ...

.template_lint_and_test: &template_lint_and_test
  cache:
    paths:
      - node_modules
    policy: pull
  when: on_success

lint:js:
  <<: *template_lint_and_test
  stage: lint
  script:
    - yarn lint:js

lint:scss:
  <<: *template_lint_and_test
  stage: lint
  script:
    - yarn lint:scss

test:unit:
  <<: *template_lint_and_test
  stage: test
  script:
    - yarn test:unit

test:e2e:
  <<: *template_lint_and_test
  image: cypress/base:8
  stage: test
  script:
    - yarn install
    - $(yarn bin)/cypress install
    - yarn run test:e2e --headless

# ...
```
<!-- TODO: screenshot -->
