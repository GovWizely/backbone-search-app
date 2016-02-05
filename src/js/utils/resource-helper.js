import assign from 'object-assign';
import { snakeCase, startCase } from 'lodash';

function verbatim(value) {
  return value;
}

function createAnyTypeChecker() {
  return () => true;
}

function createTypeChecker(expectedType) {
  return (key, attrName, value) => {

    let actualType = typeof value;
    if (Array.isArray(value)) actualType = 'array';
    if (actualType === expectedType) return null;

    return new Error(
      `Invalid \`${attrName}\` of type \`${actualType}\` ` +
      `specified in resource \`${key}\`, expected \`${expectedType}\`.`
    );
  };
}

const AttributeTypes = {
  any: createAnyTypeChecker(),
  array: createTypeChecker('array'),
  bool: createTypeChecker('boolean'),
  func: createTypeChecker('function'),
  number: createTypeChecker('number'),
  object: createTypeChecker('object'),
  string: createTypeChecker('string')
};

const ATTRIBUTES = {
  aggregations: {
    type: AttributeTypes.object
  },
  displayName: {
    derive: startCase,
    type: AttributeTypes.string
  },
  endpoint: {
    isRequired: true,
    type: AttributeTypes.string
  },
  fields: {
    isRequired: true,
    type: AttributeTypes.object
  },
  pathname: {
    derive: snakeCase,
    type: AttributeTypes.string
  },
  permittedParams: {
    defaultValue: ['q'],
    type: AttributeTypes.array
  },
  stateKey: {
    derive: verbatim,
    type: AttributeTypes.string
  },
  transformParams: {
    isRequired: false,
    type: AttributeTypes.func
  },
  transformResponse: {
    isRequired: false,
    type: AttributeTypes.func
  }
};

let uniqueKeys = [];
export function setup(key, attributes) {
  if (attributes.disabled) return null;
  if (uniqueKeys.indexOf(key)> 0) {
    throw new Error(
      `Duplicate resource key found: \`${key}\``
    );
  }
  let config = assign({}, attributes);

  for (let attrName in ATTRIBUTES) {
    let attr = ATTRIBUTES[attrName];

    if (attr.isRequired && !config[attrName]) {
      return new Error(
        `Required attribute \`${attrName}\` was not specified for resource \`${key}\`.`
      );
    }

    if (!config[attrName]) {
      if (attr.derive) {
        config[attrName] = attr.derive(key);
      } else if (attr.defaultValue) {
        config[attrName] = attr.defaultValue;
      } else {
        continue;
      }
    }

    let typeMismatched = attr.type(key, attrName, config[attrName]);
    if (typeMismatched) return typeMismatched;
  }

  uniqueKeys.push(key);
  return { [key]: config };
}
