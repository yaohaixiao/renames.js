import getExtension from '@/lib/utils/get-extension.js';

const DEFAULT_CONFIG_PATH = './config/default.config.json';
const GIT_IGNORE_PATH = '.gitignore';
const ESLINT_CONFIG_PATH = './eslint.config.js';
const CHAPTER_NAME = '超级抢钱！商人的行星伊美加';

describe('getExtension() 方法：', () => {
  it(`getExtension('${DEFAULT_CONFIG_PATH}'), 返回：'.json'`, () => {
    expect(getExtension(DEFAULT_CONFIG_PATH)).toEqual('.json');
  });

  it(`getExtension('${GIT_IGNORE_PATH}'), 返回：'.gitignore'`, () => {
    expect(getExtension(`${GIT_IGNORE_PATH}`)).toEqual('.gitignore');
  });

  it(`getExtension('${ESLINT_CONFIG_PATH}'), 返回：'.js'`, () => {
    expect(getExtension(ESLINT_CONFIG_PATH)).toEqual('.js');
  });

  it(`getExtension('${CHAPTER_NAME}'), 返回：'${CHAPTER_NAME}'`, () => {
    expect(getExtension(CHAPTER_NAME)).toEqual(`${CHAPTER_NAME}`);
  });
});
