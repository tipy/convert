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
  convertCamelToSnake,
  convertSnakeToCamel,
} from '@tipy/convert';

convertSnakeToCamel({ first_name: 'Gus' });
// { firstName: 'Gus' }

convertCamelToSnake({ firstName: 'Gus' });
// { first_name: 'Gus' }

convertArrayToObject(
  [
    { id: 's1', name: 'flexibility' },
    { id: 's2', name: 'communication' },
  ],
  'id'
);
// { s1: { id: 's1', ... }, s2: { id: 's2', ... } }
```

## API

| Function name | Parameters | Description |
|-----|-----|-----|
| `convertSnakeToCamel` | `item: object \| array \| primitive` | Converts object keys recursively from `snake_case` to `camelCase`. Arrays are handled recursively and primitives are returned as is. |
| `convertCamelToSnake` | `item: object \| array \| primitive` | Converts object keys recursively from `camelCase` to `snake_case`. Arrays are handled recursively and primitives are returned as is. |
| `convertArrayToObject` | `list: T[]`, `keySelector: keyof T \| ((item: T, index: number) => string \| number)` | Converts an array into an object indexed by a property name or callback result. |
