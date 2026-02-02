import path from 'node:path';

import writeFile from '@/lib/utils/write-file.js';
import removeFile from '@/lib/utils/remove-file.js';
import isFileExists from '@/lib/utils/is-file-exists.js';
import rename from '@/lib/utils/rename.js';

const { resolve } = path;

const TEMPLATE_DIR = './tests/rename';
const OLD_PATH = resolve(`${TEMPLATE_DIR}/readme.txt`);
const NEW_PATH = resolve(`${TEMPLATE_DIR}/new-readme.txt`);
const MD_PATH = resolve(`${TEMPLATE_DIR}/readme.md`);
const NOT_EXISTS_PATH = resolve('./music.mp3');

describe('rename() 方法：', () => {
  beforeEach(() => {
    writeFile(OLD_PATH, '# readme 标题');
  });

  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(resolve(TEMPLATE_DIR));
  });

  it(`rename('${OLD_PATH}', '${NEW_PATH}')，检测文件${NEW_PATH}是否存在，返回：true`, () => {
    rename(OLD_PATH, NEW_PATH);
    expect(isFileExists(NEW_PATH)).toBe(true);
  });

  it(`rename('${OLD_PATH}', '${MD_PATH}')，检测文件${MD_PATH}是否存在，返回：true`, () => {
    rename(OLD_PATH, MD_PATH);
    expect(isFileExists(MD_PATH)).toBe(true);
  });

  it(`rename('${OLD_PATH}', '${MD_PATH}', () => {console.log('重命名完成')})，检测文件${MD_PATH}是否存在，返回：true`, () => {
    rename(OLD_PATH, MD_PATH, () => {
      console.log('重命名完成');
    });
    expect(isFileExists(MD_PATH)).toBe(true);
  });

  it(`rename('${NOT_EXISTS_PATH}', '${NEW_PATH}')，检测文件${NEW_PATH}是否存在，返回：false`, () => {
    expect(rename(NOT_EXISTS_PATH, NEW_PATH)).toBe(false);
  });

  it(`rename('${OLD_PATH}', '${OLD_PATH}')，检测文件名不变${NEW_PATH}，返回：false`, () => {
    expect(rename(OLD_PATH, OLD_PATH)).toBe(false);
  });
});
