/**
 * 获取索引前缀名，返回格式：‘第01集：’
 * ===================================================================
 * @method toIndexChapter
 * @param {string} index - 索引值字符串
 * @param {boolean} [onlyIndex=false] - 可选，是否仅显示索引（默认值：false）
 * @param {string} [prefix='第'] - 可选，前缀文本（默认值：'第'）
 * @param {string} [suffix='集'] - 可选，后缀文本（默认值：'集'）
 * @param {string} [delimiter='：'] - 可选，分隔符（默认值：'：'）
 * @returns {string}
 */
const toIndexChapter = (index, onlyIndex = false, prefix = '第', suffix = '集', delimiter = '：') => {
  return onlyIndex ? index : `${prefix}${index}${suffix}${delimiter}`
}

module.exports = toIndexChapter
