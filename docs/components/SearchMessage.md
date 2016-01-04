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
keyword    | string | Optional. Keyword used in search.
total      | number | Required. Total number of results from search.

## Using SearchMessage

```js
import SearchMessage from 'src/js/components/search-message';

const keyword = 'Test';
const total = 10;

<SearchMessage keyword={ keyword } total={ total } />
```
