type UnknownObject = Record<string, unknown>;

type Primitive = string | number | boolean | null | undefined;

export type QueryParamValue = Primitive | Array<string | number | boolean>;

const isArray = (item: unknown): item is unknown[] => Array.isArray(item);

const isObject = (item: unknown): item is UnknownObject =>
  item !== null && typeof item === 'object' && !isArray(item);

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/gi, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

const camelToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const kebabToCamel = (str: string) =>
  str.replace(/-([a-z])/gi, (_, char: string) => char.toUpperCase());

const toTitleCase = (str: string) =>
  str
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ');

const toSlug = (str: string) =>
  str
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

const convertObjectKeys = (
  item: unknown,
  keyConverter: (key: string) => string
): unknown => {
  if (isArray(item)) {
    return item.map((value) => convertObjectKeys(value, keyConverter));
  }

  if (isObject(item)) {
    return Object.keys(item).reduce((result, key) => {
      result[keyConverter(key)] = convertObjectKeys(item[key], keyConverter);
      return result;
    }, {} as UnknownObject);
  }

  return item;
};

const convertArrayToObjectImpl = <T>(
  list: T[],
  keySelector: keyof T | ((item: T, index: number) => string | number)
): Record<string, T> =>
  list.reduce((result, item, index) => {
    const key =
      typeof keySelector === 'function'
        ? keySelector(item, index)
        : (item[keySelector] as unknown as string | number);

    result[String(key)] = item;
    return result;
  }, {} as Record<string, T>);

const convertObjectToArrayImpl = <T>(
  object: Record<string, T>
): Array<{ key: string; value: T }> =>
  Object.keys(object).map((key) => ({ key, value: object[key] }));

const convertObjectToQueryStringImpl = (
  object: Record<string, QueryParamValue>
): string => {
  const searchParams = new URLSearchParams();

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (value === null || value === undefined) {
      return;
    }

    if (isArray(value)) {
      value.forEach((arrayValue) => searchParams.append(key, String(arrayValue)));
      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams.toString();
};

const convertQueryStringToObjectImpl = (
  queryString: string
): Record<string, string | string[]> => {
  const normalizedQueryString = queryString.startsWith('?')
    ? queryString.slice(1)
    : queryString;

  const searchParams = new URLSearchParams(normalizedQueryString);

  return Array.from(searchParams.entries()).reduce((result, [key, value]) => {
    if (result[key]) {
      const currentValue = result[key];
      result[key] = isArray(currentValue)
        ? [...currentValue, value]
        : [currentValue, value];
      return result;
    }

    result[key] = value;
    return result;
  }, {} as Record<string, string | string[]>);
};

const pick = <T extends UnknownObject, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> =>
  keys.reduce((result, key) => {
    if (key in object) {
      (result as UnknownObject)[String(key)] = object[key] as unknown;
    }
    return result;
  }, {} as Pick<T, K>);

const omit = <T extends UnknownObject, K extends keyof T>(
  object: T,
  keys: K[]
): Omit<T, K> =>
  (Object.keys(object) as Array<keyof T>).reduce((result, key) => {
    if (!keys.includes(key as K)) {
      (result as UnknownObject)[String(key)] = object[key] as unknown;
    }

    return result;
  }, {} as Omit<T, K>);

export const tipy = {
  string: {
    convertSnakeToCamel: snakeToCamel,
    convertCamelToSnake: camelToSnake,
    convertCamelToKebab: camelToKebab,
    convertKebabToCamel: kebabToCamel,
    convertToTitleCase: toTitleCase,
    convertToSlug: toSlug,
    convertToNumber: (value: string): number => Number(value),
    convertToBoolean: (value: string): boolean =>
      ['true', '1', 'yes', 'y', 'on'].includes(value.trim().toLowerCase()),
  },
  number: {
    convertToString: (value: number, radix = 10): string => value.toString(radix),
    convertToBoolean: (value: number): boolean => value !== 0,
    convertClamp: (value: number, min: number, max: number): number =>
      Math.min(Math.max(value, min), max),
    convertToInt: (value: number): number => Math.trunc(value),
  },
  boolean: {
    convertToNumber: (value: boolean): number => (value ? 1 : 0),
    convertToString: (value: boolean): string => String(value),
    convertToggle: (value: boolean): boolean => !value,
  },
  array: {
    convertToObject: convertArrayToObjectImpl,
    convertUnique: <T>(list: T[]): T[] => Array.from(new Set(list)),
    convertChunk: <T>(list: T[], size: number): T[][] => {
      if (size <= 0) {
        return [list];
      }

      return list.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(item);
        return chunks;
      }, [] as T[][]);
    },
    convertCompact: <T>(list: Array<T | null | undefined>): T[] =>
      list.filter((item): item is T => item !== null && item !== undefined),
  },
  object: {
    convertSnakeToCamel: <T>(value: T): T =>
      convertObjectKeys(value, snakeToCamel) as T,
    convertCamelToSnake: <T>(value: T): T =>
      convertObjectKeys(value, camelToSnake) as T,
    convertCamelToKebab: <T>(value: T): T =>
      convertObjectKeys(value, camelToKebab) as T,
    convertKebabToCamel: <T>(value: T): T =>
      convertObjectKeys(value, kebabToCamel) as T,
    convertToArray: convertObjectToArrayImpl,
    convertToQueryString: convertObjectToQueryStringImpl,
    convertFromQueryString: convertQueryStringToObjectImpl,
    convertPick: pick,
    convertOmit: omit,
  },
  date: {
    convertToTimestamp: (value: Date | string | number): number =>
      new Date(value).getTime(),
    convertToIsoString: (value: Date | string | number): string =>
      new Date(value).toISOString(),
    convertFromTimestamp: (value: number): Date => new Date(value),
  },
};

// Backward-compatible named exports
export const convertSnakeToCamel = tipy.object.convertSnakeToCamel;
export const convertCamelToSnake = tipy.object.convertCamelToSnake;
export const convertCamelToKebab = tipy.object.convertCamelToKebab;
export const convertKebabToCamel = tipy.object.convertKebabToCamel;
export const convertArrayToObject = tipy.array.convertToObject;
export const convertObjectToArray = tipy.object.convertToArray;
export const convertObjectToQueryString = tipy.object.convertToQueryString;
export const convertQueryStringToObject = tipy.object.convertFromQueryString;
