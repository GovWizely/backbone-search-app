import assign from 'object-assign';
import { forEach, isUndefined, snakeCase, startCase } from 'lodash';
import DisplayMode from '../enums/DisplayMode';

function verbatim(value) {
  return value;
}

function createAnyTypeChecker() {
  return () => true;
}

function createEnumTypeChecker(enums) {
  return (key, attrName, value) => {
    if (enums[value]) return;

    throw new Error(
      `Invalid value \`${value}\` for \`${attrName}\` ` +
      `specified in API \`${key}\`.`
    );
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
  string: createTypeChecker('string'),
  displayMode: createEnumTypeChecker(DisplayMode)
};

const ATTRIBUTES = {
  aggregations: {
    type: AttributeTypes.object
  },
  deckable: {
    defaultValue: true,
    type: AttributeTypes.bool
  },
  displayMode: {
    defaultValue: DisplayMode.NONE,
    type: AttributeTypes.displayMode
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
