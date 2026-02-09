import parseCommanderOption from './parse-commander-option.js';

import CONSTANTS from '../../lib/constants.js';

const {
  DEMO_FILE_NAME,
  DEMO_LIST_PATH,
  DEMO_LIST_DATA,
  DEMO_FULL_FILE_NAME,
  DEMO_PREFIX,
  DEMO_SUFFIX,
  DEMO_CONNECTOR,
  DEFAULT_START_INDEX,
  DEFAULT_INDEX_PAD_ZERO,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_FORCE,
  DEFAULT_ORDER,
  DEFAULT_SENSITIVITY,
} = CONSTANTS;

/**
 * # 辅助函数：获取通用的 CLI 选项配置
 *
 * @function getCommanderOptions
 * @returns {Array} 选项配置数组
 */
const getCommanderOptions = () => [
  {
    flags: '--names, --namesList <namesList>',
    description: `可选，文件名列表数组数据，例如："${DEMO_LIST_DATA}"。或者文件名列表文件的路径，例如："${DEMO_LIST_PATH}"。`,
  },
  {
    flags: '--prefix <prefix>',
    description: `可选，文件名的前缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"${DEMO_PREFIX}"`,
  },
  {
    flags: '--suffix <suffix>',
    description: `可选，文件名的后缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"${DEMO_SUFFIX}"`,
  },
  {
    flags: '--connector <connector>',
    description: `可选，文件名的前/后缀字符串间的连接字符串，例如："${DEMO_FULL_FILE_NAME}"中的"${DEMO_CONNECTOR}"`,
  },
  {
    flags: '--autoIndex [enable]',
    description: '可选，是否自动生成索引编号（default：false）',
    parser: (enable) => parseCommanderOption(enable, false),
  },
  {
    flags: '--startIndex <startIndex>',
    description: `可选，索引编号起始值（default：${DEFAULT_START_INDEX}）`,
    parser: (index) =>
      parseCommanderOption(index, DEFAULT_START_INDEX, '--startIndex'),
  },
  {
    flags: '--indexPadZero [enable]',
    description: '可选，是否自动用"0"填充索引编号（default: false）',
    parser: (enable) => parseCommanderOption(enable, DEFAULT_INDEX_PAD_ZERO),
  },
  {
    flags: '--indexPrefix <indexPrefix>',
    description: `可选，索引编号的前缀字符串，例如："${DEMO_FILE_NAME}"中的"第"`,
    defaultValue: DEFAULT_INDEX_PREFIX,
  },
  {
    flags: '--indexSuffix <indexSuffix>',
    description: `可选，索引编号的后缀字符串，例如："${DEMO_FILE_NAME}"中的"话"`,
    defaultValue: DEFAULT_INDEX_SUFFIX,
  },
  {
    flags: '--delimiter <delimiter>',
    description: `可选，索引编号和的前/后缀字符串间的连接符，例如："${DEMO_FILE_NAME}"中的"："`,
    defaultValue: DEFAULT_DELIMITER,
  },
  {
    flags: '-f, --force [enable]',
    description: '可选，是否强制重命名（default: false）',
    parser: (enable) => parseCommanderOption(enable, DEFAULT_FORCE),
  },
  {
    flags: '--ext, --extname <extname>',
    description: '可选，重命名后的扩展名，例如：".txt"',
  },
  {
    flags: '--sort, --sortBy <sortBy>',
    description:
      '可选，排序类型，可选项：name、type、size、birthtime 和 modify-time（default：name）',
  },
  {
    flags: '--order <order>',
    description: '可选，排序方式，可选项：desc 和 asc',
    defaultValue: DEFAULT_ORDER,
  },
  {
    flags: '--sensitivity <sensitivity>',
    description:
      '可选，排序方式为 name 时，大小写/重音处理的方式，可选项：base、accent、case 和 variant',
    defaultValue: DEFAULT_SENSITIVITY,
  },
];

export default getCommanderOptions;
