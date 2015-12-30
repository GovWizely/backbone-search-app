# CheckboxTree

A checkbox list control that renders multi-level checkboxes.

Properties  |  Type  | Description
------------|------------
checkedItems|  array | To be implemented.
id          | string | Required. Used to identify the checkbox tree when onChange function is shared among multiple controls.
itemCssClass| string | Optional. CSS class for checkboxes styling.
itemLimit   | number | Optional. Number of item displayed by default.
items       | object | Required. An object of key-value pairs. Key must be of type string.
label       | string | Optional. Labelling for checkbox tree.
listCssClass| string | Optional. CSS class for checkbox list styling.
nested      | boolean| Optional. Generate checkboxes recursively. (Default: `false`)
onChange    |function| Required. A function that takes an object as argument.)

## Using CheckboxTree

```js
import CheckboxTree from 'src/js/components/checkbox-tree';

const id = "demo-tree";

const items = {
    "Item #1": {},
    "Item #2": {
        "Item #3": {}
    },
    "Item #4": {
        "Item #5": {
            "Item #6": {}
        },
        "Item #7": {
            "Item #8": {},
            "Item #9": {}
        }
    },
};

const handleChange = function(checkedItems) {
    /*
        checkItems = {
            id: 'demo-tree',
            items: ['Item #1', 'Item #2', 'Item #3']
        };
    */
    console.log("Element ID: "    + checkItems.id);
    console.log("Checked Items: " + checkItems.items);
};

<CheckboxTree id={ id } items={ items } onChange={ handleChange } />
```
