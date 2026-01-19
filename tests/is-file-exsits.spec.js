import isFileExists from '@/lib/utils/is-file-exists.js';

const DEFAULT_CONFIG_PATH = './config/default.config.json';

describe('isFileExists() 方法：', () => {
  it(`isFileExists('${DEFAULT_CONFIG_PATH}'), 返回：true`, () => {
    expect(isFileExists(DEFAULT_CONFIG_PATH)).toBe(true);
  });

  it(`isFileExists('${DEFAULT_CONFIG_PATH},${process.cwd()}'), 返回：true`, () => {
    expect(isFileExists(DEFAULT_CONFIG_PATH, process.cwd())).toBe(true);
  });

  it(`isFileExists(), 返回：false`, () => {
    expect(isFileExists()).toBe(false);
  });
});
