# ResultListItem

A list item for `ResultList`.

Properties |  Type  | Description
-----------|--------|------------
fields     | object | Required. Fields to be displayed from item.
item       | object | Required. Item to be displayed.

## Using ResultListItem

```js
import ResultListItem from 'src/js/components/result-list-item;

const fields = {
    key: ['id'],
    snippet: ['snippet', 'description'], // if snippet is not found in item, look for description.
    source: ['source'],
    title: ['title'],
    url: ['url', 'link'] // if url is not found in item, look for link.
};

const item = {
    id: "item-1",
    snippet: "item #1",
    source: "item",
    title: "Item One",
    url: "http://www.example.com"
};

# key is required when element is generated in a loop, so that react to correctly identify the element.
<ResultListItem key={ item.id } item={ item } fields={ fields } />
```
