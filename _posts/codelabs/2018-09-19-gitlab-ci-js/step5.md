# Test et conclusion

Voila nous arrivons au terme de ce tutoriel.

je vous ai présenté comment mettre en place une CI/CD avec Gitlab et Google Cloud Platform.

Avant de conclure ce tutoriel je vais vous montrer quelque résultat de test que j'ai éffectué et je finirai par quelques mot de conclusion.

## Test

Lors de mes phase de test j'ai arrêté quelques déploiements en `demo` suite à un push de la pipeline de deploiement en `production`.
Vous pouvez voir sur la capture d'écran ci-desous les différences de version.

![Workflow gitlab-ci app js](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-version-app-demo-vs-prod.png)

Je ne vous ai pas montré le résultat d'une pipeline suite à un `tag` donc voici ce que ça donne :

![résultat CI/CD déploiement production](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-deploy-production.png)

Et voici une vue d'ensemble d'un déploiement sur `demo` et `production` :

![résultat CI/CD déploiement demo et production](https://storage.googleapis.com/tutos/assets/2018-09-19-gitlab-ci-js/screenshot-cis-demo-production.png)

Nous pouvons très clairement voir que suit à un merge (ici ce fut un push de correction) la pipeline de deploiement en `demo` est éxécuté.
Puis j'ai créé un nouveau tag "v0.0.28" ce qui a déclancher la pipeline de depliement en `production`.
Suite a se tag les branch ce sont mise à jours et la pipeline de depliement en `demo` c'est déclanché avec comme nom de commit `NEW VERSION - v0.0.28`

## Conclusion

Les étapes de build, de lint et de test reste très simple a mettre en place mais ça se complique lors du déploiement car il y a plus de chose a prendre en compte.
De plus dans ce tutoriel j'ai n'ai pas eu envie de faire les choses simplement avec des mise a jour de branche dans le pipeline.

Je vous ai montrez un exemple mais il existe des milliers de possibilité de configuration cela ne dépend que de vous et de votre projet.

Peut-être que vous l'avez remarqué mais gitlab peut-être quelque fois lent ou même avoir des bugs. Pour des petits projets ce n'est pas forcement dérangement.

J'espere que ce tutoriel vous a étais utile et vous a donner envie de mettre une CI/CD dans vous projet pour les rendre plus Agile avec le mouvement DevOps.
