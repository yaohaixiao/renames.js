import path from 'node:path';

import writeFile from '@/lib/utils/write-file.js';
import readFile from '@/lib/utils/read-file.js';
import removeFile from '@/lib/utils/remove-file.js';

const { resolve, dirname } = path;

const FILE_NAME = 'default.config.json';
const TEMPLATE_DIR = './tests/write';
const ABSOLUTE_PATH = resolve(process.cwd(), `${TEMPLATE_DIR}/${FILE_NAME}`);
const CONTENT_FOLDER = '{"folderPath": "./tests"}';
const CONTENT_PAD_START = '{"indexPadZero": true}';

describe(`writeFile() 方法：`, () => {
  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(dirname(ABSOLUTE_PATH));
  });

  it(`writeFile('${ABSOLUTE_PATH}','${CONTENT_FOLDER}')，返回："${CONTENT_FOLDER}"`, () => {
    writeFile(ABSOLUTE_PATH, CONTENT_FOLDER);
    const config = readFile(ABSOLUTE_PATH, 'utf8');
    expect(config).toEqual(CONTENT_FOLDER);
  });

  it(`writeFile('${ABSOLUTE_PATH}','${CONTENT_PAD_START}')，返回："${CONTENT_PAD_START}"`, () => {
    writeFile(ABSOLUTE_PATH, CONTENT_PAD_START);
    const config = readFile(ABSOLUTE_PATH, { encoding: 'utf8' }, () => {
      console.log(`已成功读取"${ABSOLUTE_PATH}"的数据`);
    });
    expect(config).toEqual(CONTENT_PAD_START);
  });
});
