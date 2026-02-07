import {
  convertArrayToObject,
  convertCamelToSnake,
  convertSnakeToCamel,
} from './index';

describe('convertSnakeToCamel function tests', () => {
  it('convert a snake_case object into camelCase object', () => {
    const object = {
      first_name: 'test',
      soft_skills: [{ skill_name: 'flexibility' }, { skill_name: 'communication' }],
    };

    expect(convertSnakeToCamel(object)).toMatchSnapshot();
  });

  it('convert a snake_case array into camelCase array', () => {
    const object = [{ skill_name: 'flexibility' }, { skill_name: 'communication' }];
    expect(convertSnakeToCamel(object)).toMatchSnapshot();
  });

  it('returns the same argument passed if it is not object or array', () => {
    const arg = 'test';
    expect(convertSnakeToCamel(arg)).toMatchSnapshot();
  });
});

describe('convertCamelToSnake function tests', () => {
  it('convert a camelCase object into snake_case object', () => {
    const object = {
      firstName: 'test',
      softSkills: [{ skillName: 'flexibility' }, { skillName: 'communication' }],
    };

    expect(convertCamelToSnake(object)).toMatchSnapshot();
  });
});

describe('convertArrayToObject function tests', () => {
  it('convert an array into object using a property as key selector', () => {
    const list = [
      { id: 's1', name: 'flexibility' },
      { id: 's2', name: 'communication' },
    ];

    expect(convertArrayToObject(list, 'id')).toMatchSnapshot();
  });

  it('convert an array into object using callback as key selector', () => {
    const list = [{ name: 'flexibility' }, { name: 'communication' }];

    expect(convertArrayToObject(list, (_, index) => index)).toMatchSnapshot();
  });
});
