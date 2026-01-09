const path = require('path')
const getExtension = require('./getExtension')

/**
 * 获取不含扩展名的文件名
 * ===================================================================
 * @method getBasename
 * @param {String} oldFileName - 文件名（路径）字符串
 * @returns {string}
 */
const getBasename = (oldFileName) => {
  const extname = getExtension(oldFileName)

  return path.basename(oldFileName, extname)
}

module.exports = getBasename
