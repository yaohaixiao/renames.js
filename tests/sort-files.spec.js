import path from 'node:path';

import sortFiles from '@/lib/utils/sort-files.js';
import readDir from '@/lib/utils/read-dir.js';
import getBasename from '@/lib/utils/get-basename.js';

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

const { resolve } = path;
const { stringify } = JSON;
const sortBy = (files) => files.toSorted();
const TESTS_DIR_PATH = resolve(process.cwd(), './lib/utils');
const JS_FILES = readDir(TESTS_DIR_PATH);

describe('sortFiles() 方法：', () => {
  const customizeSortByOptions = {
    sortBy,
  };

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

  const sortBySizeDescOptions = {
    sortBy: 'size',
    order: 'desc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortBySizeDescOptions)}'), 按文件大小（desc排序）， 排序后的第1个文件名称，返回：'sort-files'`, () => {
    const sorted = sortFiles(JS_FILES, sortBySizeDescOptions);

    expect(getBasename(sorted[0])).toEqual('sort-files');
  });

  const sortBySizeAscOptions = {
    sortBy: 'size',
    order: 'asc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortBySizeAscOptions)}'), 按文件大小（asc排序）， 排序后的第1个文件名称，返回：'strip-non-digit'`, () => {
    const sorted = sortFiles(JS_FILES, sortBySizeAscOptions);

    expect(getBasename(sorted[0])).toEqual('strip-non-digit');
  });

  const sortByTypeDescOptions = {
    sortBy: 'type',
    order: 'desc',
  };

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(sortByTypeDescOptions)}), 按文件类型（desc排序）， 排序后的第1个文件名称，返回：'凡人修仙传.txt'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, sortByTypeDescOptions);

    expect(sorted[0]).toEqual('凡人修仙传.txt');
  });

  const sortByTypeAscOptions = {
    sortBy: 'type',
    order: 'asc',
  };

  it(`sortFiles('${ORIGIN_BOOKS}', ${stringify(sortByTypeAscOptions)}), 按文件类型（desc排序）， 排序后的第1个文件名称，返回：'菊与刀.docx'`, () => {
    const sorted = sortFiles(ORIGIN_BOOKS, sortByTypeAscOptions);

    expect(sorted[0]).toEqual('菊与刀.docx');
  });

  const sortByModifyTimeAscOptions = {
    sortBy: 'modify-time',
    order: 'asc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortByModifyTimeAscOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'get-basename'`, () => {
    const sorted = sortFiles(JS_FILES, sortByModifyTimeAscOptions);

    expect(getBasename(sorted[0])).toEqual('get-basename');
  });

  const sortByModifyTimeDescOptions = {
    sortBy: 'modify-time',
    order: 'desc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortByModifyTimeDescOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'sort-files'`, () => {
    const sorted = sortFiles(JS_FILES, sortByModifyTimeDescOptions);

    expect(getBasename(sorted[0])).toEqual('sort-files');
  });

  const sortByBirthtimeAscOptions = {
    sortBy: 'birthtime',
    order: 'asc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortByBirthtimeAscOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'get-basename'`, () => {
    const sorted = sortFiles(JS_FILES, sortByBirthtimeAscOptions);

    expect(getBasename(sorted[0])).toEqual('get-basename');
  });

  const sortByBirthtimeDescOptions = {
    sortBy: 'birthtime',
    order: 'desc',
    folderPath: TESTS_DIR_PATH,
  };

  it(`sortFiles('${JS_FILES}', '${stringify(sortByBirthtimeDescOptions)}'), 按文件修改时间（asc排序）， 排序后的第1个文件名称，返回：'write-file'`, () => {
    const sorted = sortFiles(JS_FILES, sortByBirthtimeDescOptions);

    expect(getBasename(sorted[0])).toEqual('write-file');
  });
});
