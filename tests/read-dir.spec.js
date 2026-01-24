import path from 'node:path';

import readDir from '@/lib/utils/read-dir.js';

const { resolve } = path;

const TESTS_DIR = './tests';
const ABSOLUTE_PATH = resolve(process.cwd(), TESTS_DIR);
const FILE_PATH = resolve(process.cwd(), `${TESTS_DIR}/sort-files.spec.js`);

const NOT_EXISTS_PATH = resolve(process.cwd(), './demo/case');

describe(`readDir() 方法：`, () => {
  it(`readDir('${ABSOLUTE_PATH}', 'utf8', (files) => {console.log(files.length)})，返回：true`, () => {
    const result = readDir(ABSOLUTE_PATH, 'utf8', (files) => {
      console.log(files.length);
    });
    expect(result.length > 0).toBe(true);
  });

  it(`readDir('${ABSOLUTE_PATH}', { encoding: 'md' })，返回：true`, () => {
    const result = readDir(ABSOLUTE_PATH, { encoding: 'md' });
    expect(result.length > 0).toBe(true);
  });

  it(`readDir('${ABSOLUTE_PATH}', (files) => {console.log(files.length)})，返回：true`, () => {
    const result = readDir(ABSOLUTE_PATH, (files) => {
      console.log(files.length);
    });
    expect(result.length > 0).toBe(true);
  });

  it(`readDir('${FILE_PATH}')，读取文件，获取的文件列表长度，返回：0`, () => {
    const result = readDir(FILE_PATH);
    expect(result.length).toEqual(0);
  });

  it(`readDir('${NOT_EXISTS_PATH}')，读取不存在的文件加路径，获取的文件列表长度，返回：0`, () => {
    const result = readDir(NOT_EXISTS_PATH);
    expect(result.length).toEqual(0);
  });
});
