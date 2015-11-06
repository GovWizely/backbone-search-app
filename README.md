# Market Intelligence Search App

This is a React+Flux front-end JS app which provides a search UI to export.gov's Market Intelligence API.

## Getting Started

1. Install `node`. (Follow this [guide](https://nodejs.org/en/download/package-manager/).)

2. Install `bower` & `gulp`:
```sh
    > npm install --global bower gulp
```

3. Prepare the project:
```sh
    > npm install
    > bower install
    > gulp setup
    > gulp watch
```

## Deploying

To deploy to Github pages, do:
```sh
    > gulp deploy
```

## Running tests

To run the test suite:

```
  $ gulp test
```

To auto-run tests on file changes:

```
  $ gulp test:watch
```

If you'd like to run only one test file, adjust the `files` attribute in karma.conf.js.
