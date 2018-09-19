Dans ce tutoriel nous allons voir comment mettre en place un CI/CD avec Gitlab.

Si vous voulez en savoir plus sur gitlab CI/CD j'ai aussi écrit un article sur le blog Eleven Labs [CI/CD avec Gitlab-ci](https://blog.eleven-labs.com/fr/ci-cd-avec-gitlab-ci)

Vous pouvez retrouver tout la documentation sur le site officiel de gitlab :
gitlab-ci
get started
runner

## Le programme du tutoriel

Alors dans ce tuto nous allons mettre en place une CI/CD pour une application Vue.js avec GitLab-ci.

Voici les étapes du tuto :
 1. Définition des besoins et préparation de notre application
 * Initialisation de la CI/CD et préparation du notre application pour notre CI/CD
 * Mise en place des phases de code style et de test
 * Déploiement de notre application sur Google Cloud PLatform
 * Test et conclusion

## Pré-requis

Pour pouvoir faire ce tuto je vous conseil d'être sur une distribution linux et d'avoir d'insaller node version 8 avec yarn.

- Installation de node 8 :
```bash
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
```

- Installation de yarn
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn

yarn --version
```
