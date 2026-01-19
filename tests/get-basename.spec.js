import getBasename from '@/lib/utils/get-basename.js';

const DEFAULT_CONFIG_PATH = './config/default.config.json';
const GIT_IGNORE_PATH = '.gitignore';
const ESLINT_CONFIG_PATH = './eslint.config.js';

describe('getBasename() 方法：', () => {
  it(`getBasename('${DEFAULT_CONFIG_PATH}'), 返回：'default.config'`, () => {
    expect(getBasename(DEFAULT_CONFIG_PATH)).toEqual('default.config');
  });

  it(`getBasename('${ESLINT_CONFIG_PATH}'), 返回：'eslint.config'`, () => {
    expect(getBasename(ESLINT_CONFIG_PATH)).toEqual('eslint.config');
  });

  it(`getBasename('${GIT_IGNORE_PATH}'), 返回：''`, () => {
    expect(getBasename(GIT_IGNORE_PATH)).toEqual('');
  });

  it(`getBasename('Express in Action'), 返回：''`, () => {
    expect(getBasename('Express in Action')).toEqual('');
  });
});
