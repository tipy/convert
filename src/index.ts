const snakeToCamel = (str: string) =>
  str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

const isArray = (item: any) => Array.isArray(item);

const isObject = (item: any) =>
  item === Object(item) && !isArray(item) && typeof item !== 'function';

export const convertSnakeToCamel = (item: any) => {
  try {
    if (isObject(item)) {
      const n = {};

      Object.keys(item).forEach((k) => {
        n[snakeToCamel(k)] = convertSnakeToCamel(item[k]);
      });

      return n;
    }

    if (isArray(item)) {
      return item.map((i: any) => convertSnakeToCamel(i));
    }

    return item;
  } catch (e) {
    console.error(e);
    return {};
  }
};
