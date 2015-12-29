# AggregationSelect

AggregationSelect takes an array of items, an onChange handler and generates a multi-select box.

Properties | Description
-----------|------------
items      | Required. An array of aggregation object. Use the same format as Elasticsearch aggregation buckets.
onChange   | Required. A function that takes a string as argument. (i.e. `"value1,value2"`)
placeholder| Optional. Placeholder. Displayed when no value is selected.
value      | Optional. Selected values. A string consists of comma separated values. (i.e. `"value1,value2"`)

## Using AggregationSelect
```js
import AggregationSelect from 'src/js/components/aggregations-select';

const items = [
    { key: 'Item #1', doc_count: 1 },
    { key: 'Item #2', doc_count: 2 },
    { key: 'Item #3', doc_count: 3 }
];

const handleChange = function(val) {
    console.log("Values changed: " + val");
};

const values = 'Item #1,Item #2';

<Aggregation items={ items } onChange={ handleChange } placeholder="Select Items" value={ values } />
```
