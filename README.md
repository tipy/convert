# Convert
[![GitHub version](https://badge.fury.io/gh/tipy%2Fconvert.svg)](https://badge.fury.io/gh/tipy%2Fconvert)
[![npm version](https://badge.fury.io/js/@tipy%2Fconvert.svg)](https://badge.fury.io/js/@tipy%2Fconvert)

Convert is a compact TypeScript utility library with grouped converters by JavaScript type.

## Install

```bash
yarn add @tipy/convert
```

## How to use

```typescript
import { tipy } from '@tipy/convert';

// string
const camel = tipy.string.convertSnakeToCamel('first_name');
const slug = tipy.string.convertToSlug('Hello Convert Library!');

// number / boolean
const clamped = tipy.number.convertClamp(120, 0, 100);
const toggled = tipy.boolean.convertToggle(true);

// array
const indexed = tipy.array.convertToObject(
  [
    { id: 's1', name: 'flexibility' },
    { id: 's2', name: 'communication' },
  ],
  'id'
);

// object
const camelObject = tipy.object.convertSnakeToCamel({ first_name: 'Gus' });
const query = tipy.object.convertToQueryString({ page: 2, tags: ['js', 'ts'] });

// date
const timestamp = tipy.date.convertToTimestamp('2024-01-01T00:00:00.000Z');
```

## Groups

### `tipy.string`
- `convertSnakeToCamel(value: string): string`
- `convertCamelToSnake(value: string): string`
- `convertCamelToKebab(value: string): string`
- `convertKebabToCamel(value: string): string`
- `convertToTitleCase(value: string): string`
- `convertToSlug(value: string): string`
- `convertToNumber(value: string): number`
- `convertToBoolean(value: string): boolean`

### `tipy.number`
- `convertToString(value: number, radix?: number): string`
- `convertToBoolean(value: number): boolean`
- `convertClamp(value: number, min: number, max: number): number`
- `convertToInt(value: number): number`

### `tipy.boolean`
- `convertToNumber(value: boolean): number`
- `convertToString(value: boolean): string`
- `convertToggle(value: boolean): boolean`

### `tipy.array`
- `convertToObject(list, keySelector)`
- `convertUnique(list)`
- `convertChunk(list, size)`
- `convertCompact(list)`

### `tipy.object`
- `convertSnakeToCamel(value)`
- `convertCamelToSnake(value)`
- `convertCamelToKebab(value)`
- `convertKebabToCamel(value)`
- `convertToArray(object)`
- `convertToQueryString(object)`
- `convertFromQueryString(queryString)`
- `convertPick(object, keys)`
- `convertOmit(object, keys)`

### `tipy.date`
- `convertToTimestamp(value)`
- `convertToIsoString(value)`
- `convertFromTimestamp(value)`

## Backward compatibility

The previous named exports are still available:
- `convertSnakeToCamel`
- `convertCamelToSnake`
- `convertCamelToKebab`
- `convertKebabToCamel`
- `convertArrayToObject`
- `convertObjectToArray`
- `convertObjectToQueryString`
- `convertQueryStringToObject`
