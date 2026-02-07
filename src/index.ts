const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/gi, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

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
