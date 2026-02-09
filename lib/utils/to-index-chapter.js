import CONSTANTS from '../constants.js';

const { DEFAULT_INDEX_PREFIX, DEFAULT_INDEX_SUFFIX, DEFAULT_DELIMITER } =
  CONSTANTS;

/**
 * # 生成索引章节名，返回格式：‘第01集：’
 *
 * @function toIndexChapter
 * @param {string | number} index - 索引值字符串
 * @param {boolean} [onlyIndex=false] - 可选，是否仅显示索引. Default is `false`
 * @param {object} [options={}] - 可选，配置信息. Default is `{}`
 * @param {string} [options.prefix='第'] - 可选，前缀文本. Default is `'第'`
 * @param {string} [options.suffix='集'] - 可选，后缀文本. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，分隔符. Default is `'：'`
 * @returns {string} - 返回索引章节名的字符串
 */
const toIndexChapter = (index, onlyIndex = false, options = {}) => {
  const {
    prefix = DEFAULT_INDEX_PREFIX,
    suffix = DEFAULT_INDEX_SUFFIX,
    delimiter = DEFAULT_DELIMITER,
  } = options;

  return onlyIndex ? `${index}` : `${prefix}${index}${suffix}${delimiter}`;
};

export default toIndexChapter;
