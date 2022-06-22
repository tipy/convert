import { convertSnakeToCamel } from './index';

describe('convertSnakeToCamel function tests', () => {
  it('convert a snake_case object into camelCase object', () => {
    const object = {
      first_name: 'test',
      soft_skills: [{ name: 'flexibility' }, { name: 'communication' }],
    };
    expect(convertSnakeToCamel(object)).toMatchSnapshot();
  });

  it('convert a snake_case array into camelCase array', () => {
    const object = [{ name: 'flexibility' }, { name: 'communication' }];
    expect(convertSnakeToCamel(object)).toMatchSnapshot();
  });

  it('returns the same argument passed if it is not object or array', () => {
    const arg = 'test'
    expect(convertSnakeToCamel(arg)).toMatchSnapshot();
  });
});
