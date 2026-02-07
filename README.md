# Convert
[![GitHub version](https://badge.fury.io/gh/tipy%2Fconvert.svg)](https://badge.fury.io/gh/tipy%2Fconvert)
[![npm version](https://badge.fury.io/js/@tipy%2Fconvert.svg)](https://badge.fury.io/js/@tipy%2Fconvert)

Convert has a set of conversion utility functions focused on compact TypeScript-friendly helpers.

## Install

```bash
yarn add @tipy/convert
```

## How to use

```typescript
import {
  convertArrayToObject,
  convertCamelToKebab,
  convertCamelToSnake,
  convertKebabToCamel,
  convertObjectToArray,
  convertObjectToQueryString,
  convertQueryStringToObject,
  convertSnakeToCamel,
} from '@tipy/convert';

convertSnakeToCamel({ first_name: 'Gus' });
// { firstName: 'Gus' }

convertCamelToSnake({ firstName: 'Gus' });
// { first_name: 'Gus' }

convertCamelToKebab({ firstName: 'Gus' });
// { 'first-name': 'Gus' }

convertKebabToCamel({ 'first-name': 'Gus' });
// { firstName: 'Gus' }

convertArrayToObject(
  [
    { id: 's1', name: 'flexibility' },
    { id: 's2', name: 'communication' },
  ],
  'id'
);
// { s1: { id: 's1', ... }, s2: { id: 's2', ... } }

convertObjectToArray({ s1: { id: 's1' }, s2: { id: 's2' } });
// [ { key: 's1', value: { id: 's1' } }, { key: 's2', value: { id: 's2' } } ]

convertObjectToQueryString({ page: 2, q: 'convert utils', tags: ['js', 'ts'] });
// page=2&q=convert+utils&tags=js&tags=ts

convertQueryStringToObject('?q=convert+utils&tags=js&tags=ts');
// { q: 'convert utils', tags: ['js', 'ts'] }
```

## API

| Function name | Parameters | Description |
|-----|-----|-----|
| `convertSnakeToCamel` | `item: object \| array \| primitive` | Converts object keys recursively from `snake_case` to `camelCase`. Arrays are handled recursively and primitives are returned as is. |
| `convertCamelToSnake` | `item: object \| array \| primitive` | Converts object keys recursively from `camelCase` to `snake_case`. Arrays are handled recursively and primitives are returned as is. |
| `convertCamelToKebab` | `item: object \| array \| primitive` | Converts object keys recursively from `camelCase` to `kebab-case`. |
| `convertKebabToCamel` | `item: object \| array \| primitive` | Converts object keys recursively from `kebab-case` to `camelCase`. |
| `convertArrayToObject` | `list: T[]`, `keySelector: keyof T \| ((item: T, index: number) => string \| number)` | Converts an array into an object indexed by a property name or callback result. |
| `convertObjectToArray` | `object: Record<string, T>` | Converts an object into an array of `{ key, value }` pairs. |
| `convertObjectToQueryString` | `object: Record<string, QueryParamValue>` | Converts an object into a query string. Skips `null` and `undefined`, appends repeated keys for arrays. |
| `convertQueryStringToObject` | `queryString: string` | Converts a query string into an object. Repeated keys become arrays. |
