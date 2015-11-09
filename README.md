# Market Intelligence Search App

This is a React+Flux front-end JS app which provides a search UI to export.gov's Market Intelligence API.

## setting up

Ensure you have node/npm, bower and gulp installed globally on your system, then do:

```sh
  > npm install
  > bower install
  > gulp setup
  > gulp watch
```

## Deploying

To deploy to Github pages, do:

```
  $ gulp deploy
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
