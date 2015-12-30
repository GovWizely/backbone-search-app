# Form

A container composed of a `Header`, `KeywordInput`, `IndustrySelect`, `CountrySelect` and a submit button. It has 2 modes, `expanded` for full screen view and `condensed` for embedded view. It's built on [redux-form](http://erikras.github.io/redux-form/).

Properties  |  Type  | Description
------------|--------|------------
aggregations| object | Required. An object composed of industries & countries aggregations.
expanded    | boolean| Optional. A function that takes a string as argument.
fields      | string | Ignore. Used by redux-form.
handleSubmit|function| Ignore. Used by redux-form.
onSubmit    |function| Required. A function that takes an object as argument.

## Using Form

```js
import Form from 'src/js/components/form';

const aggregations = {
    countries: ["Country #1", "Country #2", "Country #3"],
    industries: ["Industry #1", "Industry #2", "Industry #3"]
};

const onSubmit = function(form) {
    // form = { q: "query", countries: "Country #1,Country #2", industries: undefined }
    console.log(form);
};

// set value to true for full screen view, false for embedded view.
const expanded = true;

<Form aggregations={ aggregations } onSubmit={ onSubmit } expanded={ expanded } />
```
