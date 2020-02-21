# pm-exec - Exécute le gestionnaire de paquet en cours d'exécution, quel qu'il soit

Il n'est pas facile de créer un paquet Node.js agnostique, capable de s'exécuter avec n'importe quel gestionnaire de paquet voulu par le développeur. En effet, il est souvent nécessaire d'appeler le nom du gestionnaire de paquet dans les scripts de `package.json` afin de, par exemple, exécuter des sous-scripts.

L'objectif de **pm-exec** est de détecter quel est le gestionnaire de paquet en train de s'exécuter et l'appeler à nouveau avec les paramètres fournis.

# Langue

Slune étant une entreprise française, vous trouverez tous les documents et messages en français. Les autres traductions sont bienvenues.

Cependant, l'anglais étant la langue de la programmation, le code, y compris les noms de variable et commentaires, sont en anglais.

# Installation

L'installation se fait avec la commande `npm install` :

```bash
$ npm install --save-dev pm-exec
```

Si vous préférez utiliser `yarn` :

```bash
$ yarn add -D pm-exec
```

# Utilisation

Supposons que vous avez un `package.json` qui contient ces scripts :

```json
{
  "scripts": {
    "test": "npm run test:lint && npm run test:dep && npm run test:unit && npm run test:integration",
    "test:lint": "eslint 'src/**/*.ts'",
    "test:dep": "depcheck",
    "test:unit": "nyc mocha 'src/**/*.spec.ts'",
    "test:integration": "cd __test__ && npm install && npm test"
  }
}
```

Un autre développeur souhaite travailler dessus, mais il préfère utiliser `pnpm`. Il utilisera la commande `pnpm test` pour exécuter les tests. Malheureusement, cette commande va lancer `npm` pour exécuter `test:lint`, `test:dep` et `test:unit` ce qui n'a pas grande importance, même si c'est un peu ennuyant. Mais cela va également utiliser `npm` pour exécuter `test:integration` qui installe les dépendances d'un projet de test. Cela est plus problématique car on va perdre tous les avantages de `pnpm` et cela va dupliquer les dépendances en cache.

Si **pm-exec** est installé, vous pouvez modifier votre `package.json` ainsi :

```json
{
  "scripts": {
    "test": "pm-exec run test:lint && pm-exec run test:dep && pm-exec run test:unit && pm-exec run test:integration",
    "test:lint": "eslint 'src/**/*.ts'",
    "test:dep": "depcheck",
    "test:unit": "nyc mocha 'src/**/*.spec.ts'",
    "test:integration": "cd __test__ && pm-exec install && pm-exec test"
  }
}
```

Maintenant, si vous voulez exécuter `yarn test`, alors `yarn` sera aussi utilisé pour exécuter `test:lint`, `test:dep`, `test:unit` et `test:integration`. Et il sera aussi utilisé dans `test:integration` pour exécuter `install` et `test`.

# Incidents, questions, contributions

Bien que nous ne puissions pas garantir un temps de réponse, n'hésitez pas à ouvrir un incident si vous avez une question ou un problème pour utiliser ce paquet. Les _Pull Requests_ sont également bienvenues.
