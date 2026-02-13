import path from 'node:path';

import sortFiles from '@/lib/utils/sort-files.js';
import readDir from '@/lib/utils/read-dir.js';
import getBasename from '@/lib/utils/get-basename.js';
import writeFile from '@/lib/utils/write-file.js';
import removeFile from '@/lib/utils/remove-file.js';

const ORIGIN_FILES = [
  '1.jpg',
  '8.jpg',
  '9.jpg',
  '2.jpg',
  '5.jpg',
  '6.jpg',
  '3.jpg',
  '4.jpg',
  '7.jpg',
  '10.jpg',
];

const ASC_FILES = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
];

const DESC_FILES = [
  '10.jpg',
  '9.jpg',
  '8.jpg',
  '7.jpg',
  '6.jpg',
  '5.jpg',
  '4.jpg',
  '3.jpg',
  '2.jpg',
  '1.jpg',
];

const ORIGIN_BOOKS = [
  'JavaScript Data Structures and Algorithms.pdf',
  'Express in Action.epub',
  '凡人修仙传.txt',
  '仙逆.md',
  '菊与刀.docx',
];

const SORT_BY_BOOKS = [
  'Express in Action.epub',
  'JavaScript Data Structures and Algorithms.pdf',
  '仙逆.md',
  '凡人修仙传.txt',
  '菊与刀.docx',
];

const ASC_BOOKS = [
  '凡人修仙传.txt',
  '菊与刀.docx',
  '仙逆.md',
  'Express in Action.epub',
  'JavaScript Data Structures and Algorithms.pdf',
];

const DESC_BOOKS = [
  'JavaScript Data Structures and Algorithms.pdf',
  'Express in Action.epub',
  '仙逆.md',
  '菊与刀.docx',
  '凡人修仙传.txt',
];

const TXT_FILES = [
  'JavaScript Data Structures and Algorithms.txt',
  'Express in Action.txt',
  '仙逆.txt',
  '菊与刀.txt',
  '凡人修仙传.txt',
];

const { resolve } = path;
const { stringify } = JSON;
const sortBy = (files) => files.toSorted();
const customizeSortByOptions = {
  sortBy,
};

const TEMP_DIR_PATH = resolve(process.cwd(), './tests/tmp');
let TEMP_FILES;

describe('sortFiles() 方法：', () => {
  beforeEach(() => {
    for (let index = 0; index < TXT_FILES.length; index++) {
      const content = TXT_FILES[index];

      writeFile(resolve(`${TEMP_DIR_PATH}/${content}`), `${index}. ${content}`);
    }

    TEMP_FILES = readDir(TEMP_DIR_PATH);
  });

  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(TEMP_DIR_PATH);
  });

  it(`sortFiles('${ORIGIN_BOOKS}', null), 返回：'${ASC_BOOKS}'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, null);
    expect(sorted).toEqual(ASC_BOOKS);
  });

  it(`sortFiles('${ORIGIN_BOOKS}'), 返回：'${ASC_BOOKS}'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS);
    expect(sorted).toEqual(ASC_BOOKS);
  });

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(customizeSortByOptions)}), 自定义排序，返回：'${SORT_BY_BOOKS}'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, customizeSortByOptions);
    expect(sorted).toEqual(SORT_BY_BOOKS);
  });

  const sortByNameDescOptions = {
    sortBy: 'name',
    order: 'desc',
  };

  it(`sortFiles('${ORIGIN_FILES}', ${stringify(sortByNameDescOptions)}), 按文件名（desc排序），返回：'${stringify(DESC_FILES)}'`, () => {
    const sorted = sortFiles(ORIGIN_FILES, sortByNameDescOptions);
    expect(sorted).toEqual(DESC_FILES);
  });

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(sortByNameDescOptions)}), 按文件名（desc排序），返回：'${stringify(DESC_BOOKS)}'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, sortByNameDescOptions);
    expect(sorted).toEqual(DESC_BOOKS);
  });

  const sortByNameAscOptions = {
    order: 'asc',
  };

  it(`sortFiles('${ORIGIN_FILES}', ${stringify(sortByNameAscOptions)}), 按文件名（asc排序），返回：'${stringify(ASC_FILES)}'`, () => {
    const sorted = sortFiles(ORIGIN_FILES, sortByNameAscOptions);
    expect(sorted).toEqual(ASC_FILES);
  });

  const sortByExtensionDescOptions = {
    sortBy: 'extension',
    order: 'desc',
  };

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(sortByExtensionDescOptions)}), 按文件类型（desc排序）， 排序后的第1个文件名称，返回：'凡人修仙传.txt'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, sortByExtensionDescOptions);

    expect(sorted[0]).toEqual('凡人修仙传.txt');
  });

  const sortByExtensionAscOptions = {
    sortBy: 'extension',
    order: 'asc',
  };

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(sortByExtensionAscOptions)}), 按文件类型（desc排序）， 排序后的第1个文件名称，返回：'菊与刀.docx'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, sortByExtensionAscOptions);

    expect(sorted[0]).toEqual('菊与刀.docx');
  });

  const sortBySizeDescOptions = {
    sortBy: 'size',
    order: 'desc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(DESC_BOOKS)}', '${stringify(sortBySizeDescOptions)}'), 按文件大小（desc排序）， 排序后的第1个文件名称，返回：'Express in Action'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortBySizeDescOptions);

    expect(getBasename(sorted[0])).toEqual('Express in Action');
  });

  const sortBySizeAscOptions = {
    sortBy: 'size',
    order: 'asc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(DESC_BOOKS)}', '${stringify(sortBySizeAscOptions)}'), 按文件大小（asc排序）， 排序后的第1个文件名称，返回：'Express in Action'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortBySizeAscOptions);

    expect(getBasename(sorted[0])).toEqual('Express in Action');
  });

  const sortByModifyTimeAscOptions = {
    sortBy: 'modify-time',
    order: 'asc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(TXT_FILES)}', '${stringify(sortByModifyTimeAscOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'Express in Action'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortByModifyTimeAscOptions);

    expect(getBasename(sorted[0])).toEqual('Express in Action');
  });

  const sortByModifyTimeDescOptions = {
    sortBy: 'modify-time',
    order: 'desc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(TXT_FILES)}', '${stringify(sortByModifyTimeDescOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'Express in Action'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortByModifyTimeDescOptions);

    expect(getBasename(sorted[0])).toEqual('Express in Action');
  });

  const sortByBirthtimeAscOptions = {
    sortBy: 'birthtime',
    order: 'asc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(TXT_FILES)}', '${stringify(sortByBirthtimeAscOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'JavaScript Data Structures and Algorithms'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortByBirthtimeAscOptions);

    expect(getBasename(sorted[0])).toEqual('JavaScript Data Structures and Algorithms');
  });

  const sortByBirthtimeDescOptions = {
    sortBy: 'birthtime',
    order: 'desc',
    dirPath: TEMP_DIR_PATH,
  };

  it(`sortFiles('${stringify(TXT_FILES)}', '${stringify(sortByBirthtimeDescOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'凡人修仙传'`, () => {
    const sorted = sortFiles(TEMP_FILES, sortByBirthtimeDescOptions);

    expect(getBasename(sorted[0])).toEqual('凡人修仙传');
  });

  it(`sortFiles('${stringify(DESC_BOOKS)}', { sortBy: 'custom' }), 未知的排序方式，直接返回原始数据`, () => {
    const sorted = sortFiles(DESC_BOOKS, { sortBy: 'custom' });

    expect(sorted).toEqual(DESC_BOOKS);
  });
});
