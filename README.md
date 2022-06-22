# Convert
[![GitHub version](https://badge.fury.io/gh/tipy%2Fconvert.svg)](https://badge.fury.io/gh/tipy%2Fconvert)

Convert has a set of convertion utils functions, check the api to see what it is available.

## Install

```bash
yarn add @tipy/convert
```

## How to use

```javascript
import { convertSnakeToCamel } from '@tipy/convert';

convertSnakeToCamel({ first_name: 'Gus' });
```

## API

| Function name | Parameters | Description |
|-----|-----|-----|
| `convertSnakeToCamel` | item: object | it convert the attributes of an object from snake_case to camelCase, you can also pass an array. string, number and other primitives will be return as they are. |