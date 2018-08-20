### Configuration de l'API  

Pour finaliser l'installation du bundle, il faut configurer les paires de clefs. Il a une paire de clef pour signer, et une autre pour sceller.

```bash
php bin/console sapient:configure
```

Cette commande va générer une configuration qu'il faudra copier dans le fichier `config/packages/sapient.yml`.

```yaml
sapient:
    sign:
        public: 'zosqT7O0yb77yR9un303RqYAd-ss7r-If2k1HaOQ7ek='
        private: 'JrldvyxLV8YQv2bYEE28j8afHiy-QtdlpWR0l-tWy5nOiypPs7TJvvvJH26ffTdGpgB36yzuv4h_aTUdo5Dt6Q=='
        host: ~
    seal:
        public: '16Ft202QjHGUNjBfXxlb6nTRdQy8byYIhBegzaGnBiQ='
        private: 'AJencCObIo108IePTxZyYBd2FO8R_nD9ps9N6-hs1HE='
    sealing_public_keys: ~
    verifying_public_keys: ~
```

Nos clefs ont été généré. 

Maintenant, il faut activer les options. Nous allons activer la signature et le scellement des réponses de l'API.

```yaml
sapient:
    sign:
        response: true
    seal:
        response: true
```

Ensuite, il faut activer les options pour vérifier et déscéller les requêtes en provenance du client.

```yaml
sapient:
    verify_request: true
    unseal_request: true
```

Au final, la configuration doit être comme ceci

```yaml
sapient:
    sign:
        public: 'zosqT7O0yb77yR9un303RqYAd-ss7r-If2k1HaOQ7ek='
        private: 'JrldvyxLV8YQv2bYEE28j8afHiy-QtdlpWR0l-tWy5nOiypPs7TJvvvJH26ffTdGpgB36yzuv4h_aTUdo5Dt6Q=='
        host: ~
        response: true
    seal:
        public: '16Ft202QjHGUNjBfXxlb6nTRdQy8byYIhBegzaGnBiQ='
        private: 'AJencCObIo108IePTxZyYBd2FO8R_nD9ps9N6-hs1HE='
        response: true
    sealing_public_keys: ~
    verifying_public_keys: ~
    verify_request: true
    unseal_request: true
```


L'API est presque prête. Il restera l'échange de clef, mais avant, configurons le client.
