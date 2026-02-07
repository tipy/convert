import {
  convertArrayToObject,
  convertCamelToSnake,
  convertObjectToQueryString,
  convertSnakeToCamel,
  tipy,
} from './index';

describe('tipy.string converters', () => {
  it('converts between common string formats', () => {
    expect(tipy.string.convertSnakeToCamel('hello_world')).toBe('helloWorld');
    expect(tipy.string.convertCamelToSnake('helloWorld')).toBe('hello_world');
    expect(tipy.string.convertCamelToKebab('helloWorld')).toBe('hello-world');
    expect(tipy.string.convertKebabToCamel('hello-world')).toBe('helloWorld');
    expect(tipy.string.convertToTitleCase('hello_world test')).toBe('Hello World Test');
    expect(tipy.string.convertToSlug('Hello World!')).toBe('hello-world');
    expect(tipy.string.convertToNumber('12.5')).toBe(12.5);
    expect(tipy.string.convertToBoolean('yes')).toBe(true);
  });
});

describe('tipy.number converters', () => {
  it('converts numbers to other common formats', () => {
    expect(tipy.number.convertToString(255, 16)).toBe('ff');
    expect(tipy.number.convertToBoolean(0)).toBe(false);
    expect(tipy.number.convertClamp(12, 0, 10)).toBe(10);
    expect(tipy.number.convertToInt(12.9)).toBe(12);
  });
});

describe('tipy.boolean converters', () => {
  it('converts booleans to number/string and toggles', () => {
    expect(tipy.boolean.convertToNumber(true)).toBe(1);
    expect(tipy.boolean.convertToString(false)).toBe('false');
    expect(tipy.boolean.convertToggle(true)).toBe(false);
  });
});

describe('tipy.array converters', () => {
  it('converts arrays with common operations', () => {
    const list = [
      { id: 's1', name: 'flexibility' },
      { id: 's2', name: 'communication' },
    ];

    expect(tipy.array.convertToObject(list, 'id')).toEqual({
      s1: { id: 's1', name: 'flexibility' },
      s2: { id: 's2', name: 'communication' },
    });

    expect(tipy.array.convertUnique(['a', 'a', 'b'])).toEqual(['a', 'b']);
    expect(tipy.array.convertChunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    expect(tipy.array.convertCompact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });
});

describe('tipy.object converters', () => {
  it('converts object keys, query strings and object selection', () => {
    const snake = {
      first_name: 'test',
      soft_skills: [{ skill_name: 'communication' }],
    };

    expect(tipy.object.convertSnakeToCamel(snake)).toEqual({
      firstName: 'test',
      softSkills: [{ skillName: 'communication' }],
    });

    expect(tipy.object.convertPick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({
      a: 1,
      c: 3,
    });

    expect(tipy.object.convertOmit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({
      a: 1,
      c: 3,
    });

    expect(tipy.object.convertToArray({ a: 1, b: 2 })).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
    ]);

    expect(
      tipy.object.convertToQueryString({ page: 2, q: 'convert', tags: ['js', 'ts'] })
    ).toBe('page=2&q=convert&tags=js&tags=ts');

    expect(
      tipy.object.convertFromQueryString('?q=convert&tags=js&tags=ts')
    ).toEqual({
      q: 'convert',
      tags: ['js', 'ts'],
    });
  });
});

describe('tipy.date converters', () => {
  it('converts dates from/to timestamp and iso', () => {
    expect(tipy.date.convertToTimestamp('2024-01-01T00:00:00.000Z')).toBe(
      1704067200000
    );
    expect(tipy.date.convertToIsoString(1704067200000)).toBe(
      '2024-01-01T00:00:00.000Z'
    );
    expect(tipy.date.convertFromTimestamp(1704067200000)).toEqual(
      new Date('2024-01-01T00:00:00.000Z')
    );
  });
});

describe('backward-compatible named exports', () => {
  it('still supports old API function names', () => {
    expect(convertSnakeToCamel({ first_name: 'Gus' })).toEqual({ firstName: 'Gus' });
    expect(convertCamelToSnake({ firstName: 'Gus' })).toEqual({ first_name: 'Gus' });
    expect(convertArrayToObject([{ id: '1' }], 'id')).toEqual({ '1': { id: '1' } });
    expect(convertObjectToQueryString({ q: 'convert' })).toBe('q=convert');
  });
});
