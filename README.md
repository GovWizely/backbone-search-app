# Market Intelligence Search App

This is a React+Flux front-end JS app which provides a search UI to export.gov's Market Intelligence API.

## Getting Started

1. Install `node`. (Follow this [guide](https://nodejs.org/en/download/package-manager/).)

2. Install `bower` & `gulp`:

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
  $ gulp watch
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

Note that gulp lint merely display the errors, not fixing them.

## Running tests

To run the test suite:

```sh
  $ gulp test
```

To auto-run tests on file changes:

```sh
  $ gulp test:watch
```

If you'd like to run only one test file, adjust the `files` attribute in karma.conf.js.
