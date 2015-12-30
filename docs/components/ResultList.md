# ResultList

An item list control. It generates a list of `ResultListItem`.

Properties |  Type  | Description
-----------|--------|------------
fields     | object | Required. Fields to be displayed from item.
items      |  array | Required. Items to be listed.

## Using ResultList

```js
import ResultList from 'src/js/components/result-list;

const fields = {
    key: ['id'],
    snippet: ['snippet', 'description'], // if snippet is not found in item, look for description.
    source: ['source'],
    title: ['title'],
    url: ['url', 'link'] // if url is not found in item, look for link.
};

const items = [
    { id: "item-1", snippet: "item #1", source: "item", title: "Item One", url: "http://www.example.com" },
    { id: "item-2", snippet: "item #1", source: "item", title: "Item One", url: "http://www.example.com" },
    { id: "item-3", description: "item #1", source: "item", title: "Item One", link: "http://www.example.com" }
];

<ResultList items={ items } fields={ fields } />
```
