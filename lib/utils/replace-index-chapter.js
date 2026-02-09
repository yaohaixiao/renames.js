import getBasename from './get-basename.js';
import isFunction from './is-function.js';
import padZero from './pad-zero.js';
import toIndexChapter from './to-index-chapter.js';

import CONSTANTS from '../constants.js';

const { DEFAULT_INDEX_PREFIX, DEFAULT_INDEX_SUFFIX, DEFAULT_DELIMITER } =
  CONSTANTS;

/**
 * # 替换文件名中的章节信息
 *
 * @function replaceIndexChapter
 * @param {string} filename - 原始的文件名字符串
 * @param {object | Function} [chapter] - 可选，过滤文件名中的索引编号的处理函数
 * @param {string} chapter.name - 文件名中的整个索引编号的字符出，例如：第04章
 * @param {string} chapter.index - 件名中的索引编号的字符，例如：04
 * @param {number} chapter.number - 件名中的索引编号的数值，例如：4
 * @param {number | boolean} [length=2] - 可选，自动填充索引编号的长度. Default is `2`
 * @param {object} [options={}] - 可选，其他的格式化配置参数. Default is `{}`
 * @param {string} [options.prefix='第'] - 可选，索引部分的前缀. Default is `'第'`
 * @param {string} [options.suffix='集'] - 可选，索引部分的后缀. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，用来拆分索引部分和正式名的分割符号. Default is
 *   `'：'`
 * @returns {string} - 返回替换了章节信息的文件名字符串
 */
const replaceIndexChapter = (filename, chapter, length = 2, options = {}) => {
  const basename = getBasename(filename);

  const {
    prefix = DEFAULT_INDEX_PREFIX,
    suffix = DEFAULT_INDEX_SUFFIX,
    delimiter = DEFAULT_DELIMITER,
  } = options;
  let padZeroIndex = true;

  // 关闭了自动填充索引编号
  if (length === false) {
    padZeroIndex = false;
  }

  if (!chapter) {
    return basename;
  }

  const originChapter = isFunction(chapter) ? chapter(basename) : chapter;
  const { index, number, name } = originChapter;
  const indexChapter = toIndexChapter(
    padZeroIndex ? padZero(number, length) : index,
    false,
    {
      prefix,
      suffix,
      delimiter,
    },
  );

  return basename.replace(name, indexChapter);
};

export default replaceIndexChapter;
