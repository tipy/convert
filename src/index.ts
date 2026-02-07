const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/gi, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

const camelToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const kebabToCamel = (str: string) =>
  str.replace(/-([a-z])/gi, (_, char: string) => char.toUpperCase());

const isArray = (item: unknown): item is unknown[] => Array.isArray(item);

const isObject = (item: unknown): item is Record<string, unknown> =>
  item !== null && typeof item === 'object' && !isArray(item);

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
    }, {} as Record<string, unknown>);
  }

  return item;
};

export const convertSnakeToCamel = <T>(item: T): T =>
  convertObjectKeys(item, snakeToCamel) as T;

export const convertCamelToSnake = <T>(item: T): T =>
  convertObjectKeys(item, camelToSnake) as T;

export const convertCamelToKebab = <T>(item: T): T =>
  convertObjectKeys(item, camelToKebab) as T;

export const convertKebabToCamel = <T>(item: T): T =>
  convertObjectKeys(item, kebabToCamel) as T;

export const convertArrayToObject = <T>(
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

export const convertObjectToArray = <T>(
  object: Record<string, T>
): Array<{ key: string; value: T }> =>
  Object.keys(object).map((key) => ({ key, value: object[key] }));

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export const convertObjectToQueryString = (
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

export const convertQueryStringToObject = (
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
