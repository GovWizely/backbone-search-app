# ResultList

An item list control.

  Properties  |  Type  | Description
--------------|--------|------------
displayedItems| number | Optional. Number of items to be displayed.
items         | array  | Required. An array of items to be listed.
options       | object | Optional. Other properties that is required in template.
template      | func   | Required. Item template.


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
    { description: "item #1", title: "Item One" },
    { description: "item #2", title: "Item One" },
    { description: "item #3", title: "Item One" }
];

<ResultList
   displayedItems={ 5 }
   items={ items }
   options={ options }
   template={ template } />
```
