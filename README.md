[![npm package](https://badge.fury.io/js/pm-exec.svg)](https://www.npmjs.com/package/pm-exec)
[![License](https://img.shields.io/github/license/slune-org/pm-exec.svg)](https://github.com/slune-org/pm-exec/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/slune-org/pm-exec.svg?branch=master)](https://travis-ci.org/slune-org/pm-exec)
[![Issues](https://img.shields.io/github/issues/slune-org/pm-exec.svg)](https://github.com/slune-org/pm-exec/issues)

# pm-exec - Execute whichever package manager is currently running

It is not easy to create agnostic Node.js packages, able to run with whichever package manager the developer wants. Indeed, you often need to call the package manager name inside the `package.json` scripts in order to, for example, run sub-scripts.

The purpose of **pm-exec** is to detect which package manager is currently running and call it again with provided arguments.

# Language/langue

Because Slune is French firm, you will find all documents and messages in French. Other translations are welcome.

Anyway, because English is the language of programming, the code, including variable names and comments, are in English.

:fr: Une version française de ce document se trouve [ici](doc/fr/README.md).

# Installation

Installation is done using `npm install` command:

```bash
$ npm install --save-dev pm-exec
```

If you prefer using `yarn`:

```bash
$ yarn add -D pm-exec
```

# Usage

Let's say you have a `package.json` containing those scripts:

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

Then, another developer wants to work on it, but he prefers using `pnpm`. He will run `pnpm test` to execute the tests. Unfortunately, this command will execute `npm` to run `test:lint`, `test:dep` and `test:unit`, which, if it is a little bit annoying, does not really matter. But it will also use `npm` to run `test:integration` which is installing dependencies of a test project. This is more problematic as it will loose all the advantages of `pnpm` and duplicate the cached dependencies.

If **pm-exec** is installed, you can change your `package.json` to the following:

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

Now, if you want to run `yarn test`, then `yarn` will also be used to execute `test:lint`, `test:dep`, `test:unit` and `test:integration`. And it will also be used in `test:integration` to execute `install` and `test`.

# Issues, questions, contributions

Even though we cannot guarantee a response time, please feel free to file an issue if you have any question or problem using the package. _Pull Requests_ are also welcome.
