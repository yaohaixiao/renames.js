const path = require('path')

/**
 * 获取扩展名（含.）
 * ===================================================================
 * @method getExtension
 * @param {string} oldFileName - 文件名（路径）字符串
 * @returns {*|string}
 */
const getExtension = (oldFileName) => {
  const extname = path.extname(oldFileName)

  if (!extname) {
    return oldFileName
  }

  return extname
}

module.exports = getExtension
