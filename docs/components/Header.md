# Header

A simple header element.

Properties |  Type  | Description
-----------|--------|------------
cssClass   |  array | To be implemented.
onClick    |function| Optional. A function that takes an event as argument. Will be triggered when header is clicked.

## Using Header

```js
import Header from 'src/js/components/header';

const handleClick = function(e) {
    e.preventDefault();
    console.log(e);
};

<Header onClick={ handleClick } />
```
