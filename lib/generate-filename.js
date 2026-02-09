import getBasename from './utils/get-basename.js';
import getExtension from './utils/get-extension.js';
import isFunction from './utils/is-function.js';
import padZero from './utils/pad-zero.js';
import toIndexChapter from './utils/to-index-chapter.js';

import CONSTANTS from './constants.js';

const {
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_CONNECTOR,
  DEFAULT_AUTO_INDEX,
  DEFAULT_START_INDEX,
  DEFAULT_INDEX_PAD_ZERO,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_EXTNAME,
  DEFAULT_FORMAT,
} = CONSTANTS;

// 辅助函数：规整配置项，提供统一默认值
const getNormalizedOptions = (options) => ({
  names: [],
  prefix: DEFAULT_PREFIX,
  suffix: DEFAULT_SUFFIX,
  connector: DEFAULT_CONNECTOR,
  autoIndex: DEFAULT_AUTO_INDEX,
  startIndex: DEFAULT_START_INDEX,
  indexPadZero: DEFAULT_INDEX_PAD_ZERO,
  indexLength: 2,
  indexPrefix: DEFAULT_INDEX_PREFIX,
  indexSuffix: DEFAULT_INDEX_SUFFIX,
  delimiter: DEFAULT_DELIMITER,
  extname: DEFAULT_EXTNAME,
  format: DEFAULT_FORMAT,
  ...options,
});

// 辅助函数：生成索引章节字符串
const generateIndexChapter = (index, options) => {
  const {
    autoIndex,
    indexPadZero,
    indexLength,
    startIndex,
    indexPrefix,
    indexSuffix,
    delimiter,
  } = options;
  if (!autoIndex) return '';

  const onlyIndex = autoIndex === 'only';
  const fileIndex = index + 1 + startIndex;
  const paddedIndex = indexPadZero
    ? padZero(fileIndex, indexLength)
    : `${fileIndex}`;

  return toIndexChapter(paddedIndex, onlyIndex, {
    indexPrefix,
    indexSuffix,
    delimiter,
  });
};

// 辅助函数：从名称列表生成核心文件名
const getFilenameByNames = (
  oldFilename,
  index,
  indexChapter,
  options,
  namesList,
) => {
  const { format, autoIndex } = options;
  const onlyIndex = autoIndex === 'only';
  const matchedName = namesList[index] || getBasename(oldFilename);

  // 优先使用格式化函数，否则直接使用列表中的文件名
  let newFilename = isFunction(format)
    ? format(oldFilename, matchedName, index, namesList)
    : matchedName;

  // 拼接自动编号（仅非 onlyIndex 模式）
  if (autoIndex && !onlyIndex) {
    newFilename = `${indexChapter}${newFilename}`;
  }

  // onlyIndex 模式直接返回索引章节
  return onlyIndex ? indexChapter : newFilename;
};

// 辅助函数：拼接前后缀
const appendPrefixAndSuffix = (filename, options) => {
  const { prefix, suffix, connector } = options;
  let result = filename;

  // 拼接前缀
  if (prefix) {
    result = `${prefix}${connector}${result}`;
  }

  // 拼接后缀
  if (suffix) {
    result = `${result}${connector}${suffix}`;
  }

  return result;
};

/**
 * # 辅助函数：获取格式化后的文件名
 *
 * @function formatBasename
 * @param {string} basename - 文件的基础名称
 * @param {Function} [format=null] - 用来格式化的回调函数. Default is `null`
 * @param {number} [index=-1] - 文件在 dirPath 文件排序后的索引值. Default is `-1`
 * @returns {string} - 返回格式化后的文件名
 */
const formatBasename = (basename, format = null, index = -1) =>
  isFunction(format) ? format(basename, index) : basename;

/**
 * # 获取文件名，通过原文件名，文件在文件夹中所有文件中的索引值和配置参数
 *
 * @function generateFilename
 * @param {string} oldFilename - 原文件名
 * @param {number} index - 文件在文件夹中所有文件中的索引值
 * @param {object} [options={}] - 可选，配置参数对象数据. Default is `{}`
 * @param {Array} [options.names=[]] - 可选，要修改的对应的文件名列表数组. Default is `[]`
 * @param {string} [options.prefix=''] 可选，要添加的前缀. Default is `''`
 * @param {string} [options.suffix=''] - 可选，要添加的后缀，添加在文件名和扩展名之间. Default is `''`
 * @param {string} [options.connector=''] - 可选，Prefix 和 suffix 之间的连接符. Default
 *   is `''`
 * @param {boolean | string} [options.autoIndex=false] - 可选，是否自动编号. Default is
 *   `false`
 * @param {number} [options.startIndex=0] - 可选，自动编号的起始索引值. Default is `0`
 * @param {boolean} [options.indexPadZero=true] - 可选，是否索引编号自动补"0". Default is
 *   `true`
 * @param {number} [options.indexLength=2] - 可选，自动补齐的字符串长度值. Default is `2`
 * @param {string} [options.indexPrefix='第'] - 可选，自动编号后缀. Default is `'第'`
 * @param {string} [options.indexSuffix='集'] - 可选，是否自动编号. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，自动编号和名字间的分隔符. Default is `'：'`
 * @param {Function | null} [options.format=null] - 可选，文件名的格式化方法. Default is
 *   `null`
 * @param {string} [options.extname=''] - 可选，想替换的扩展名. Default is `''`
 * @returns {string} - 返回生成的文件名字符串
 */
const generateFilename = (oldFilename, index, options = {}) => {
  // 拆分文件名和扩展名（如 "photo.jpg" → 文件名"photo"，扩展名".jpg"）
  const basename = getBasename(oldFilename);
  const originExtname = getExtension(oldFilename);

  // 获取配置信息
  const normalizedOptions = getNormalizedOptions(options);
  const { extname, names, format, autoIndex } = normalizedOptions;
  const namesCount = names.length;
  let matchedName = '';

  // 直接使用 namesList 中的匹配的文件名，如果 namesList 和 dirPath 文件夹中的数量不一致，则使用原文件名
  if (namesCount && !autoIndex) {
    matchedName = names?.[index] ?? basename;
    return `${formatBasename(matchedName, format)}${originExtname}`;
  }

  const namesList = Array.isArray(names) && names.length > 0 ? names : [];
  const indexChapter = generateIndexChapter(index, normalizedOptions);
  const onlyIndex = autoIndex === 'only';
  let newFilename;

  // 存在名称列表
  if (namesList.length > 0) {
    newFilename = getFilenameByNames(
      oldFilename,
      index,
      indexChapter,
      normalizedOptions,
      namesList,
    );
  } else if (autoIndex) {
    // 无名称列表，但开启自动编号
    newFilename = onlyIndex
      ? indexChapter
      : `${indexChapter}${formatBasename(basename, format, index)}`;
  } else {
    // 无名称列表，无自动编号（默认场景）
    newFilename = formatBasename(basename, format, index);
  }

  // 拼接前后缀 + 确定扩展名
  newFilename = appendPrefixAndSuffix(newFilename, normalizedOptions);

  const finalExtname = extname || originExtname;

  // 返回最终结果
  return `${newFilename}${finalExtname}`;
};

export default generateFilename;
