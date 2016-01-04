# SearchMessage

A control to display search message in the below format:

- With `keyword` property:  <strong color="red">10</strong> results were found for the search for <em>Test</em>.
- Without `keyword` property: <strong color="red">10</strong> results were found.


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
