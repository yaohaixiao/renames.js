const isFunction = require('./isFunction')
const padZero = require('./padZero')
const getBasename = require('./getBasename')
const toIndexChapter = require('./toIndexChapter')

/**
 * 替换文件名中的章节信息
 * ===================================================================
 * @method replaceIndexChapter
 * @param {string} oldFileName
 * @param {object|function} chapter - 必选，过滤文件名中的索引编号的处理函数
 * @param {string} chapter.name - 文件名中的整个索引编号的字符出，例如：第04章
 * @param {string} chapter.index - 件名中的索引编号的字符，例如：04
 * @param {number} chapter.number - 件名中的索引编号的数值，例如：4
 * @param {number|boolean} [length=2] - 可选，自动填充索引编号的长度（默认值：2）
 * @param {object} [options=null] - 可选，其他的格式化配置参数（默认值：null）
 * @param {string} [options.prefix='第'] - 可选，索引部分的前缀（默认值：'第'）
 * @param {string} [options.suffix='集'] - 可选，索引部分的后缀（默认值：'集'）
 * @param {string} [options.delimiter='：'] - 可选，用来拆分索引部分和正式名的分割符号（默认值：'：'）
 * @returns {string}
 */
const replaceIndexChapter = (
  oldFileName,
  chapter,
  length = 2,
  options
) => {
  const basename = getBasename(oldFileName)

  let prefix = '第'
  let suffix = '集'
  let delimiter= '：'
  let padZeroIndex = true

  // 关闭了自动填充索引编号
  if(length === false) {
    padZeroIndex = false
  } else {
    // 开启自动填充索引编号
    if (options) {
      prefix = options.prefix
      suffix = options.suffix
      delimiter = options.delimiter
    }
  }

  const oldChapter = isFunction(chapter) ? chapter(basename) : chapter

  if(!oldChapter) {
    return basename
  }

  const index = oldChapter.index
  const number = oldChapter.number
  const indexChapter = toIndexChapter(padZeroIndex ? padZero(number, length) : index, false, prefix, suffix, delimiter)

  return basename.replace(oldChapter.name, indexChapter)
}

module.exports = replaceIndexChapter
