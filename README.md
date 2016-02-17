# Market Intelligence Search App

This is a React+Flux front-end JS app which provides a search UI to export.gov's Market Intelligence API.

## Getting Started

1. Install `node`. (Follow this [guide](https://nodejs.org/en/download/package-manager/).)

2. Install `bower`, `gulp` and `eslint`:

```sh
  $ npm install --global bower gulp eslint
```

3. Prepare the project:

```sh
  $ npm install
  $ bower install
```

4. Launching the development server:

```sh
  $ gulp start
```

## Deploying

To deploy to Github pages, do:

```sh
  $ gulp deploy
```

## Running lint

To run eslint:

```sh
  $ gulp lint
```

Note that gulp lint merely displays errors, it doesn't fix them (that's on you).

## Running tests

To run the test suite:

```sh
  $ npm test
```

To auto-run tests on file changes:

```sh
  $ npm test --watch
```

To run tests on specific files:

```sh
  $ npm test test/example2.js
```
