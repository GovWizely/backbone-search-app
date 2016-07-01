import assign from 'object-assign';
import { forEach, isUndefined, snakeCase, startCase } from 'lodash';
import invariant from 'invariant';

function verbatim(value) {
  return value;
}

function createAnyTypeChecker() {
  return () => true;
}

function createObjectTypeChecker(structure) {
  /*
   const structure = {
     header: createTypeChecker('string'),
     mode: createTypeChecker('string'),
     footer: createTypeChecker('string')
   }
   */
  return (key, attrName, object) => {
    forEach(object, (value, objectKey) => {
      invariant(
        !isUndefined(structure[objectKey]),
        `Unrecognized option \`${objectKey}\` for \`${attrName}\``);
      structure[objectKey](key, `${attrName}.${objectKey}`, value);
    });
  };
}

function createTypeChecker(expectedType) {
  return (key, attrName, value) => {
    let actualType = typeof value;
    if (Array.isArray(value)) actualType = 'array';
    if (actualType === expectedType) return;

    throw new Error(
      `Invalid \`${attrName}\` of type \`${actualType}\` ` +
      `specified in API \`${key}\`, expected \`${expectedType}\`.`
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
  async: {
    defaultValue: false,
    type: AttributeTypes.bool
  },
  bucket: {
    defaultValue: { enable: true },
    type: createObjectTypeChecker({
      enable: AttributeTypes.bool
    })
  },
  card: {
    defaultValue: { enable: true },
    type: createObjectTypeChecker({
      count: AttributeTypes.number,
      enable: AttributeTypes.bool,
      header: AttributeTypes.string,
      footer: AttributeTypes.string,
      mode: AttributeTypes.string
    })
  },
  displayName: {
    derive: startCase,
    type: AttributeTypes.string
  },
  endpoint: {
    isRequired: true,
    type: AttributeTypes.string
  },
  pathname: {
    derive: snakeCase,
    type: AttributeTypes.string
  },
  permittedParams: {
    defaultValue: ['q'],
    type: AttributeTypes.array
  },
  result: {
    defaultValue: { enable: true },
    type: createObjectTypeChecker({
      enable: AttributeTypes.bool
    })
  },
  requiredParams: {
    defaultValue: ['q'],
    type: AttributeTypes.array
  },
  shortName: {
    type: AttributeTypes.string
  },
  transformParams: {
    isRequired: false,
    type: AttributeTypes.func
  },
  transformResponse: {
    isRequired: false,
    type: AttributeTypes.func
  },
  uniqueId: {
    derive: verbatim,
    type: AttributeTypes.string
  }
};

let uniqueIds = {};
export function defineAPI(uniqueId, attributes) {
  if (attributes.disabled) return null;
  if (uniqueIds[uniqueId]) {
    throw new Error(
      `Duplicated API found: \`${uniqueId}\``
    );
  }
  const config = assign({}, attributes);

  forEach(ATTRIBUTES, (attr, attrName) => {
    if (!{}.hasOwnProperty.call(ATTRIBUTES, attrName)) return;

    if (attr.isRequired && !config[attrName]) {
      throw new Error(
        `Required attribute \`${attrName}\` was not specified for API \`${uniqueId}\`.`
      );
    }

    if (isUndefined(config[attrName])) {
      if (attr.derive) {
        config[attrName] = attr.derive(uniqueId);
      } else if (!isUndefined(attr.defaultValue)) {
        config[attrName] = attr.defaultValue;
      } else {
        return;
      }
    }

    attr.type(uniqueId, attrName, config[attrName]);
  });

  uniqueIds[uniqueId] = true;
  return { [uniqueId]: config };
}

export function resetUniqueIds() {
  uniqueIds = {};
}
