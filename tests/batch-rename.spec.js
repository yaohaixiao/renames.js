import path from 'node:path';

import batchRename from '@/lib/batch-rename.js';
import isFileExists from '@/lib/utils/is-file-exists.js';
import removeFile from '@/lib/utils/remove-file.js';
import writeFile from '@/lib/utils/write-file.js';

const { resolve } = path;
const { stringify } = JSON;

const DEFAULT_CONFIG = {
  namesList: '',
  prefix: '',
  suffix: '',
  connector: '',
  autoIndex: false,
  startIndex: 0,
  indexPadZero: true,
  indexPrefix: '第',
  indexSuffix: '集',
  delimiter: '：',
  ignoreQuantityDiscrepancies: false,
  force: false,
  extname: '',
  sortBy: 'name',
};

const CONTENTS = [
  '神秘的龙珠出现！悟空变成了小孩',
  '我才是主角！小芳踏上宇宙飞行的旅程',
  '超级抢钱！商人的行星伊美加',
  '悟空成了通缉犯',
  '快看那个强者！保镖莱德奇',
  '好痛啊！当牙医的悟空',
];

const NOT_EXISTS_PATH = './not-exists.json';
const CURRENT_PATH = process.cwd();
const RELATIVE_PATH = './tests/template';
const ABSOLUTE_PATH = resolve(CURRENT_PATH, RELATIVE_PATH);

describe('batchRename() 方法：', () => {
  beforeEach(() => {
    for (const content of CONTENTS) {
      writeFile(
        resolve(CURRENT_PATH, `${RELATIVE_PATH}/${content}.txt`),
        content,
      );
    }
  });

  afterEach(() => {
    // 删除临时文件，确保单测代码干净
    removeFile(resolve(CURRENT_PATH, RELATIVE_PATH));
  });

  it(`batchRename('${NOT_EXISTS_PATH}'), 返回：false`, () => {
    expect(batchRename(NOT_EXISTS_PATH)).toBe(false);
  });

  it(`batchRename('${ABSOLUTE_PATH}', ${stringify(DEFAULT_CONFIG)}), 返回：true，检测文件'${RELATIVE_PATH}/${CONTENTS[0]}.txt是否存在，返回：true'`, () => {
    const result = batchRename(ABSOLUTE_PATH, DEFAULT_CONFIG);
    expect(result).toBe(true);

    const TEMP_FILE = `${RELATIVE_PATH}/${CONTENTS[0]}.txt`;
    expect(isFileExists(resolve(CURRENT_PATH, TEMP_FILE))).toBe(true);
  });

  const AUTO_CONFIG = {
    ...DEFAULT_CONFIG,
    autoIndex: true,
    namesList: [
      '龙珠-神秘的龙珠出现！悟空变成了小孩',
      '龙珠-我才是主角！小芳踏上宇宙飞行的旅程',
      '龙珠-超级抢钱！商人的行星伊美加',
      '龙珠-悟空成了通缉犯',
      '龙珠-快看那个强者！保镖莱德奇',
      '龙珠-好痛啊！当牙医的悟空',
    ],
  };

  it(`batchRename('${ABSOLUTE_PATH}', ${stringify(AUTO_CONFIG)}), 返回：true，并检测重命名后的"第1集：龙珠-神秘的龙珠出现！悟空变成了小孩.txt"是否存在，返回：true`, () => {
    const result = batchRename(ABSOLUTE_PATH, AUTO_CONFIG);
    expect(result).toBe(true);

    const TEMP_FILE = `${RELATIVE_PATH}/第1集：龙珠-神秘的龙珠出现！悟空变成了小孩.txt`;
    expect(isFileExists(resolve(CURRENT_PATH, TEMP_FILE))).toBe(true);
  });

  const AUTO_DIFF_NAMES_CONFIG = {
    ...DEFAULT_CONFIG,
    autoIndex: true,
    namesList: [
      '龙珠-我才是主角！小芳踏上宇宙飞行的旅程',
      '龙珠-超级抢钱！商人的行星伊美加',
      '龙珠-悟空成了通缉犯',
      '龙珠-快看那个强者！保镖莱德奇',
      '龙珠-好痛啊！当牙医的悟空',
    ],
  };

  it(`batchRename('${ABSOLUTE_PATH}', ${stringify(AUTO_DIFF_NAMES_CONFIG)}), 返回：true，并检测重命名后的"第6集：超级抢钱！商人的行星伊美加.txt"是否存在，返回：true`, () => {
    const result = batchRename(ABSOLUTE_PATH, AUTO_DIFF_NAMES_CONFIG);
    expect(result).toBe(true);

    const TEMP_FILE = `${RELATIVE_PATH}/第6集：超级抢钱！商人的行星伊美加.txt`;
    expect(isFileExists(resolve(CURRENT_PATH, TEMP_FILE))).toBe(true);
  });

  const AUTO_NAMES_CONFIG = {
    ...DEFAULT_CONFIG,
    autoIndex: true,
  };

  it(`batchRename('${ABSOLUTE_PATH}', ${stringify(AUTO_NAMES_CONFIG)}), 返回：true，并检测重命名后的"第1集：好痛啊！当牙医的悟空.txt"是否存在，返回：true`, () => {
    const result = batchRename(ABSOLUTE_PATH, AUTO_NAMES_CONFIG);
    expect(result).toBe(true);

    const TEMP_FILE = `${RELATIVE_PATH}/第1集：好痛啊！当牙医的悟空.txt`;
    expect(isFileExists(resolve(CURRENT_PATH, TEMP_FILE))).toBe(true);
  });
});
