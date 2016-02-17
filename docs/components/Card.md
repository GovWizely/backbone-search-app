# Card

A card element.

Properties    |  Type  | Description
--------------|--------|------------
displayedItems| number | Optional. Number of items to be displayed.
isFetching    | boolean| Optional. Display a loading indicator if true.
items         | array  | Required. An array of items to be listed.
label         | string | Optional. Label for card.
template      |function| Required. Item template.
url           | string | Required. Url to detail view.

## Using Card

```js
import Card from 'src/js/components/card;


const template = ({ title, description }, options) => {
  return (
    <article>
      <header>{ title }</header>
      <p>{ description }</p>
      <footer>{ options.text }</footer>
    </article>
  );
};

const items = [
    { description: "item #1", title: "Item One" },
    { description: "item #2", title: "Item One" },
    { description: "item #3", title: "Item One" }
];

<Card
   displayedItems={ 5 }
   isFetching={ false }
   items={ items }
   label="Items"
   template={ template }
   url={ http://www.example.com } />
```
