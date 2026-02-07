import {
  convertArrayToObject,
  convertCamelToKebab,
  convertCamelToSnake,
  convertKebabToCamel,
  convertObjectToArray,
  convertObjectToQueryString,
  convertQueryStringToObject,
  convertSnakeToCamel,
} from './index';

describe('case converter function tests', () => {
  it('convert a snake_case object into camelCase object', () => {
    const object = {
      first_name: 'test',
      soft_skills: [{ skill_name: 'flexibility' }, { skill_name: 'communication' }],
    };

    expect(convertSnakeToCamel(object)).toEqual({
      firstName: 'test',
      softSkills: [{ skillName: 'flexibility' }, { skillName: 'communication' }],
    });
  });

  it('convert a camelCase object into snake_case object', () => {
    const object = {
      firstName: 'test',
      softSkills: [{ skillName: 'flexibility' }, { skillName: 'communication' }],
    };

    expect(convertCamelToSnake(object)).toEqual({
      first_name: 'test',
      soft_skills: [{ skill_name: 'flexibility' }, { skill_name: 'communication' }],
    });
  });

  it('convert a camelCase object into kebab-case object', () => {
    const object = {
      firstName: 'test',
      softSkills: [{ skillName: 'flexibility' }, { skillName: 'communication' }],
    };

    expect(convertCamelToKebab(object)).toEqual({
      'first-name': 'test',
      'soft-skills': [{ 'skill-name': 'flexibility' }, { 'skill-name': 'communication' }],
    });
  });

  it('convert a kebab-case object into camelCase object', () => {
    const object = {
      'first-name': 'test',
      'soft-skills': [{ 'skill-name': 'flexibility' }, { 'skill-name': 'communication' }],
    };

    expect(convertKebabToCamel(object)).toEqual({
      firstName: 'test',
      softSkills: [{ skillName: 'flexibility' }, { skillName: 'communication' }],
    });
  });

  it('returns the same argument passed if it is not object or array', () => {
    const arg = 'test';
    expect(convertSnakeToCamel(arg)).toBe('test');
  });
});

describe('array/object converter function tests', () => {
  it('convert an array into object using a property as key selector', () => {
    const list = [
      { id: 's1', name: 'flexibility' },
      { id: 's2', name: 'communication' },
    ];

    expect(convertArrayToObject(list, 'id')).toEqual({
      s1: { id: 's1', name: 'flexibility' },
      s2: { id: 's2', name: 'communication' },
    });
  });

  it('convert an array into object using callback as key selector', () => {
    const list = [{ name: 'flexibility' }, { name: 'communication' }];

    expect(convertArrayToObject(list, (_, index) => index)).toEqual({
      0: { name: 'flexibility' },
      1: { name: 'communication' },
    });
  });

  it('convert an object into a key/value array', () => {
    expect(
      convertObjectToArray({
        s1: { name: 'flexibility' },
        s2: { name: 'communication' },
      })
    ).toEqual([
      { key: 's1', value: { name: 'flexibility' } },
      { key: 's2', value: { name: 'communication' } },
    ]);
  });
});

describe('query string converter function tests', () => {
  it('convert an object into a query string', () => {
    const queryString = convertObjectToQueryString({
      page: 2,
      q: 'convert utils',
      enabled: true,
      tags: ['js', 'ts'],
      skip: null,
      none: undefined,
    });

    expect(queryString).toBe('page=2&q=convert+utils&enabled=true&tags=js&tags=ts');
  });

  it('convert a query string into object with repeated key handling', () => {
    expect(convertQueryStringToObject('?q=convert+utils&tags=js&tags=ts')).toEqual({
      q: 'convert utils',
      tags: ['js', 'ts'],
    });
  });
});
