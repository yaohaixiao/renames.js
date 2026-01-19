import generateFilename from '@/lib/generate-filename.js';
import toIndexChapter from '@/lib/utils/to-index-chapter.js';
import getBasename from '@/lib/utils/get-basename.js';

const OLD_FILE_NAME = '悟空成了通缉犯.mp4';
const NEW_FILE_NAME = '（改）悟空成了通缉犯.mp4';

const NAMES = [
  '神秘的龙珠出现！悟空变成了小孩',
  '我才是主角！小芳踏上宇宙飞行的旅程',
  '超级抢钱！商人的行星伊美加',
  '（改）悟空成了通缉犯',
  '快看那个强者！保镖莱德奇',
  '好痛啊！当牙医的悟空',
];

const DEFAULT_OPTIONS = {
  names: NAMES,
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
};

const CHAPTER_OPTIONS = {
  prefix: '第',
  suffix: '集',
  delimiter: '：',
};

const CHAPTER = toIndexChapter('04', false, CHAPTER_OPTIONS);

describe('generateFilename() 方法：', () => {
  it(`generateFilename('${OLD_FILE_NAME}', '${NEW_FILE_NAME}'), 返回：'${NEW_FILE_NAME}'`, () => {
    const name = generateFilename(OLD_FILE_NAME, NEW_FILE_NAME);

    expect(name).toEqual(NEW_FILE_NAME);
  });

  it(`generateFilename('${OLD_FILE_NAME}', 2), 返回：'${NEW_FILE_NAME}'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 2);

    expect(name).toEqual(OLD_FILE_NAME);
  });

  const AUTO_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: true,
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${AUTO_OPTIONS}), 返回：'${CHAPTER}${NEW_FILE_NAME}'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, AUTO_OPTIONS);

    expect(name).toEqual(`${CHAPTER}${NEW_FILE_NAME}`);
  });

  const ONLY_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: 'only',
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${ONLY_OPTIONS}), 返回：'04.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, ONLY_OPTIONS);

    expect(name).toEqual('04.mp4');
  });

  const PREFIX_OPTIONS = {
    ...DEFAULT_OPTIONS,
    prefix: '七龙珠',
    suffix: '1080p',
    connector: '-',
    autoIndex: true,
    extname: '.mkv',
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${PREFIX_OPTIONS}), 返回：'七龙珠-${CHAPTER}${getBasename(NEW_FILE_NAME)}-1080p.mkv'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, PREFIX_OPTIONS);

    expect(name).toEqual(
      `七龙珠-${CHAPTER}${getBasename(NEW_FILE_NAME)}-1080p.mkv`,
    );
  });

  const CHAPTER_AUTO_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: true,
    names: [],
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${CHAPTER_AUTO_OPTIONS}), 返回：'第04集：悟空成了通缉犯.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, CHAPTER_AUTO_OPTIONS);

    expect(name).toEqual('第04集：悟空成了通缉犯.mp4');
  });

  const CHAPTER_ONLY_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: 'only',
    names: [],
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${CHAPTER_ONLY_OPTIONS}), 返回：'04.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, CHAPTER_ONLY_OPTIONS);

    expect(name).toEqual('04.mp4');
  });

  const AUTO_FORMAT_ORIGIN_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: true,
    names: [],
    format: (filename) => filename.replace('悟空', '乘风巨浪'),
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${AUTO_FORMAT_ORIGIN_OPTIONS}), 返回：'第04集：乘风巨浪成了通缉犯.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, AUTO_FORMAT_ORIGIN_OPTIONS);

    expect(name).toEqual('第04集：乘风巨浪成了通缉犯.mp4');
  });

  const FORMAT_ORIGIN_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: false,
    names: [],
    format: (filename) => filename.replace('悟空', '乘风巨浪'),
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${FORMAT_ORIGIN_OPTIONS}), 返回：'乘风巨浪成了通缉犯.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, FORMAT_ORIGIN_OPTIONS);

    expect(name).toEqual('乘风巨浪成了通缉犯.mp4');
  });

  const AUTO_FORMAT_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: true,
    format: (oldFilename, newFilename) => {
      const finalFilename = newFilename || oldFilename;
      return finalFilename.replace('悟空', '乘风巨浪');
    },
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${AUTO_FORMAT_OPTIONS}), 返回：'第04集：（改）乘风巨浪成了通缉犯.mp4'`, () => {
    const name = generateFilename(OLD_FILE_NAME, 3, AUTO_FORMAT_OPTIONS);

    expect(name).toEqual('第04集：（改）乘风巨浪成了通缉犯.mp4');
  });

  const AUTO_EMPTY_PAD_FORMAT_OPTIONS = {
    ...DEFAULT_OPTIONS,
    autoIndex: true,
    indexLength: 0,
    format: (oldFilename, newFilename) => {
      const finalFilename = newFilename || oldFilename;
      return finalFilename.replace('悟空', '乘风巨浪');
    },
  };

  it(`generateFilename('${OLD_FILE_NAME}', 3, ${AUTO_EMPTY_PAD_FORMAT_OPTIONS}), 返回：'第4集：（改）乘风巨浪成了通缉犯.mp4'`, () => {
    const name = generateFilename(
      OLD_FILE_NAME,
      3,
      AUTO_EMPTY_PAD_FORMAT_OPTIONS,
    );

    expect(name).toEqual('第4集：（改）乘风巨浪成了通缉犯.mp4');
  });
});
