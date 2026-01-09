const getBasename = require('./getBasename')

/**
 * 移除文本中所有非数值的文本
 * ===================================================================
 * @method stripNonDigit
 * @param {string} oldFileName - 文件名的文本字符串
 * @returns {string}
 */
const stripNonDigit = (oldFileName) => {
  const basename = getBasename(oldFileName)

  return basename.replace(/[^0-9]/g, '')
}

module.exports = stripNonDigit
