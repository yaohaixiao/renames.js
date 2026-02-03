import path from 'node:path';
import writeFile from '@/lib/utils/write-file.js';
import removeFile from '@/lib/utils/remove-file.js';

import readList from '@/lib/read-list.js';

const { resolve, dirname } = path;

const TXT_PATH = resolve('./tests/txt/names.txt');
const NOT_EXISTS_PATH = resolve('./not_exists.txt');
const NAMES = '封面-1\n' + '封面-3\n' + '封面-2\n' + '封面-4';

const JSON_PATH = resolve('./tests/json/books.json');
const CHAPTERS = [
  '神秘的龙珠出现！悟空变成了小孩',
  null,
  '我才是主角！小芳踏上宇宙飞行的旅程',
  '超级抢钱！商人的行星伊美加',
  '悟空成了通缉犯',
  '',
  '快看那个强者！保镖莱德奇',
  '好痛啊！当牙医的悟空',
];

const DRAGON_BOLL = {
  name: '龙珠',
  chapters: CHAPTERS,
};

const JS_PATH = resolve('./tests/strip-non-digit.spec.js');

describe('readList() 方法：', () => {
  beforeEach(() => {
    writeFile(TXT_PATH, NAMES);
  });

  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(dirname(TXT_PATH), () => {
      console.log(`${TXT_PATH}已删除！`);
    });
    removeFile(dirname(JSON_PATH), {
      maxRetries: 1,
    });
  });

  it(`readList('${TXT_PATH}')，检测读取.txt格式文件${TXT_PATH}数据，第1条内容，返回：'封面-1'`, () => {
    const names = readList(TXT_PATH);
    expect(names[0]).toEqual('封面-1');
  });

  it(`readList('${JSON_PATH}')，检测读取.json格式文件${JSON_PATH}数据，第3条内容，返回：'悟空成了通缉犯'`, () => {
    writeFile(JSON_PATH, JSON.stringify(CHAPTERS));
    const names = readList(JSON_PATH);

    expect(names.length).toEqual(6);
    expect(names[3]).toEqual('悟空成了通缉犯');
  });

  it(`readList('${JSON_PATH}', 'chapters')，检测读取.json格式文件${JSON_PATH}数据中的 'chapters' 属性的数据，第3条内容，返回：'悟空成了通缉犯'`, () => {
    writeFile(JSON_PATH, JSON.stringify(DRAGON_BOLL));
    const names = readList(JSON_PATH, 'chapters');

    expect(names.length).toEqual(6);
    expect(names[3]).toEqual('悟空成了通缉犯');
  });

  it(`readList('${NOT_EXISTS_PATH}')，检测读取.txt格式文件${NOT_EXISTS_PATH}数据，因为文件不存在，返回：[]`, () => {
    const names = readList(NOT_EXISTS_PATH);
    expect(names.length).toEqual(0);
  });

  it(`readList('${JS_PATH}')，检测读取.js格式文件${NOT_EXISTS_PATH}数据，因为不支持该格式，返回：[]`, () => {
    const names = readList(JS_PATH);
    expect(names.length).toEqual(0);
  });

  it(`readList('${JSON_PATH}')，检测读取.json格式文件${JSON_PATH}数据，因为数据不是JSON数组格式，返回：[]`, () => {
    writeFile(JSON_PATH, JSON.stringify(DRAGON_BOLL));
    const names = readList(JSON_PATH);

    expect(names.length).toEqual(0);
  });

  it(`readList('${JSON_PATH}', 'name')，检测读取.json格式文件${JSON_PATH}数据中的 'name' 属性的数据，因为数据不是数组格式，返回：[]`, () => {
    writeFile(JSON_PATH, JSON.stringify(DRAGON_BOLL));
    const names = readList(JSON_PATH, 'name');

    expect(names.length).toEqual(0);
  });
});
