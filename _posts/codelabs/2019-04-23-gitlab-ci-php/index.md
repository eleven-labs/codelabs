Dans ce tutoriel nous allons voir comment mettre en place une CI/CD pour un API Symfony avec gitlab-ci et Google Gloud Plateform.

Si vous voulez en savoir plus sur gitlab CI/CD j'ai aussi écrit un article sur le blog Eleven Labs [CI/CD avec Gitlab-ci](https://blog.eleven-labs.com/fr/introduction-gitlab-ci/).

Vous pouvez retrouver toute la documentation sur le site officiel de gitlab :

- [GitLab Continuous Integration (GitLab CI/CD)](https://docs.gitlab.com/ee/ci/README.html)
- [Getting started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/README.html)
- [Configuration of your jobs with .gitlab-ci.yml](https://docs.gitlab.com/ee/ci/README.html)
- [GitLab Runner](https://docs.gitlab.com/ee/ci/README.html)

##Le programme du tutoriel

Alors dans ce tuto nous allons mettre en place une CI/CD pour une API Symfony 4.x avec GitLab-ci.

Voici les étapes du tuto :

- [Installation de l'environnement]()
- [Initialisation de la CI/CD]()
- [Mise en place d'un système de versionning d'image Docker]()
- [Mise en place des tests et du code style]()
- [Déploiement de l'API sur GCP]()
- [Developpement de notre API]()
- [Conclusion]()

## Pré-requis

Pour pouvoir faire ce tutoriel il faut :
- être, de préférence, sur une distribution Linux
- avoir [docker](https://docs.docker.com/install/) et [docker-compose](https://docs.docker.com/compose/install/) d'installer
- avoir [un compte Goolge Cloud Plateform](https://accounts.google.com/signup/v2/webcreateaccount?service=cloudconsole&continue=https%3A%2F%2Fconsole.cloud.google.com%2F&flowName=GlifWebSignIn&flowEntry=SignUp&nogm=true)
- avoir un [compte Gitlab](https://gitlab.com/users/sign_in#register-pane)


Ready ? Go !
