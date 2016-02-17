# ResultList

An item list control. It generates a list of `ResultListItem`.

  Properties  |  Type  | Description
--------------|--------|------------
displayedItems| number | Optional. Number of items to be displayed.
items         | array  | Required. Items to be listed.
options       | object | Optional. Other properties that is required in template.
template      | func   | Required. Item Template.


## Using ResultList

```js
import ResultList from 'src/js/components/result-list';

const template = ({ title, description }, options) => {
  return (
    <article>
      <header>{ title }</header>
      <p>{ description }</p>
      <footer>{ options.text }</footer>
    </article>
  );
};

const options = {
  text: 'Lorem Ipsum'
};

const items = [
    { id: "item-1", snippet: "item #1", source: "item", title: "Item One", url: "http://www.example.com" },
    { id: "item-2", snippet: "item #1", source: "item", title: "Item One", url: "http://www.example.com" },
    { id: "item-3", description: "item #1", source: "item", title: "Item One", link: "http://www.example.com" }
];

<ResultList displayedItems={ 5 } items={ items } options={ options } template={ template } />
```
