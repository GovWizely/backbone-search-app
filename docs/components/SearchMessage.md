# SearchMessage

A control to display search message in the below format:

```
    # with keyword
    10 results were found for the search for Test.

    # without keyword
    10 results were found.
```

Properties |  Type  | Description
-----------|--------|------------
apiName    | string | Required. Name of the API.
keyword    | string | Optional. Keyword used in search.
total      | number | Required. Total number of results from search.

## Using SearchMessage

```js
import SearchMessage from 'src/js/components/search-message';

const apiName = 'Market Intelligence';
const keyword = 'Test';
const total = 10;

<SearchMessage apiName={ apiName } keyword={ keyword } total={ total } />
```
