### Configuration du client

Côté client, nous allons le configurer pour signer et sceller les requêtes vers l'API.

De la même façon que l'API, générons la configuration pour le bundle.

```bash
php bin/console sapient:configure
```

Cette commande va générer une configuration qu'il faudra copier dans le fichier `config/packages/sapient.yml`.

```yaml
sapient:
    sign:
        public: 'N8MyKuIjRlc64hRnG5SSuJCMipzNfR1gxE-XmadUaLQ='
        private: 'WQd_ytpK2FAIlb_qL5snVbOeNgdWdc_QkRw9D88mun03wzIq4iNGVzriFGcblJK4kIyKnM19HWDET5eZp1RotA=='
        host: ~
    seal:
        public: 'lVK03s25pjbnpgC72caIUDb9TUHiZwo2WnGscJT25HM='
        private: 'En9j8mIOEfb8PEBXLqqjD5FeBaj4aJH0GUVkXdbK3lc='
    sealing_public_keys: ~
    verifying_public_keys: ~
```

Nos clefs ont été généré pour le client.

Maintenant, il faut activer les options. Nous allons activer la signature et le scellement des requêtes vers l'API.
Nous allons utiliser Guzzle pour faire toutes nos requêtes vers l'API. Le bundle intègre tous les middleware nécessaire. Il suffit de les activer via la configuration

```yaml
sapient:
    guzzle_middleware:
        sign_request: true
        seal_request: true
```

Ensuite, il faut activer les options pour vérifier et déscéller les réponses en provenance de l'API.

```yaml
sapient:
    guzzle_middleware:
        verify: true
        unseal: true
```

Dernière configuration, il faut identifier les requêtes. Pour cela, une en-tête doit être ajouté pour que l'API sache quelle clef doit être utilisée pour désceller la requête.

```yaml
sapient:
    guzzle_middleware:
        requester_host: 'client-name'
```

Au final, la configuration doit être comme ceci

```yaml
sapient:
    sign:
        public: 'N8MyKuIjRlc64hRnG5SSuJCMipzNfR1gxE-XmadUaLQ='
        private: 'WQd_ytpK2FAIlb_qL5snVbOeNgdWdc_QkRw9D88mun03wzIq4iNGVzriFGcblJK4kIyKnM19HWDET5eZp1RotA=='
        host: ~
    seal:
        public: 'lVK03s25pjbnpgC72caIUDb9TUHiZwo2WnGscJT25HM='
        private: 'En9j8mIOEfb8PEBXLqqjD5FeBaj4aJH0GUVkXdbK3lc='
    guzzle_middleware:
        sign_request: true
        seal_request: true
        verify: true
        unseal: true
        requester_host: 'client-name'
    sealing_public_keys: ~
    verifying_public_keys: ~
```

Le client est presque prête. Il reste l'échange de clef que nous allons voir à l'étape suivante.
