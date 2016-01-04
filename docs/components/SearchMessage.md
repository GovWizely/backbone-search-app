# SearchMessage

A control to display search message:

```
    # With keyword provided.
    <em>10</em> results were found for the search for <em>Test</em>.

    # Without keyword provided.
    <em>10</em> results were found.
```

Properties |  Type  | Description
-----------|--------|------------
keyword    | string | Optional. Keyword used in search.
total      | number | Required. Total result count from search.

## Using SearchMessage

```js
import SearchMessage from 'src/js/components/search-message';

const keyword = 'Test';
const total = 10;

<SearchMessage keyword={ keyword } total={ total } />
```
