import path from 'node:path';

import writeFile from '@/lib/utils/write-file.js';
import readFile from '@/lib/utils/read-file.js';
import removeFile from '@/lib/utils/remove-file.js';

const { resolve, dirname } = path;

const FILE_NAME = 'default.config.json';
const ABSOLUTE_PATH = resolve(process.cwd(), `./tests/json/${FILE_NAME}`);
const CONTENT_FOLDER = '{"folderPath": "./tests"}';
const OPTIONS = { encoding: 'utf8' };

const afterRead = () => {
  console.log('已经读取数据完成！');
};

describe(`readFile() 方法：`, () => {
  beforeEach(() => {
    writeFile(ABSOLUTE_PATH, CONTENT_FOLDER, () => {
      console.log('已写入完成！');
    });
  });

  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(dirname(ABSOLUTE_PATH));
  });

  it(`readFile('${ABSOLUTE_PATH}','utf8')，返回："${CONTENT_FOLDER}"`, () => {
    const config = readFile(ABSOLUTE_PATH, 'utf8');
    expect(config).toEqual(CONTENT_FOLDER);
  });

  it(`readFile('${ABSOLUTE_PATH}','${OPTIONS}')，返回："${CONTENT_FOLDER}"`, () => {
    const config = readFile(ABSOLUTE_PATH, OPTIONS, () => {
      console.log('读取完成！');
    });
    expect(config).toEqual(CONTENT_FOLDER);
  });

  it(`readFile('${ABSOLUTE_PATH}',${afterRead})，返回："${CONTENT_FOLDER}"`, () => {
    const config = readFile(ABSOLUTE_PATH, afterRead);
    expect(config).toEqual(CONTENT_FOLDER);
  });

  it(`readFile('../help.json','utf8')，返回：""`, () => {
    const config = readFile('../help.json', 'utf8');
    expect(config).toEqual('');
  });
});
