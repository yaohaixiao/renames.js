const fs = require('fs')

const getBasename = require('./getBasename')
const getExtension = require('./getExtension')

/**
 * 重命名文件
 * ===================================================================
 * @method rename
 * @param {string} oldFilePath - 原来的文件名
 * @param {string} newFilePath - 新的文件名
 * @param {boolean} [force=false] - 可选，是否强制重命名（默认值：false）
 * @returns {boolean}
 */
const rename = (oldFilePath, newFilePath, force) => {
  const existsSync = fs.existsSync

  // 1. 检测文件是否存在
  if(!existsSync(oldFilePath)){
    console.log(`跳过：${oldFilePath}（文件不存在或以被删除）`)
    return false
  }

  const oldFileName = getBasename(oldFilePath)
  const newFileName = getBasename(newFilePath)
  const extname = getExtension(oldFilePath)

  // 2. 避免重复命名（如果新文件名已存在并且未设置强制重命名，则跳过重命名）
  if (!force && (oldFileName === newFileName || existsSync(newFilePath))) {
    console.log(`跳过：${oldFileName}${extname}（新文件名已存在或无需修改）`)
    return false
  }

  // 3. 执行重命名
  fs.renameSync(oldFilePath, newFilePath)
  console.log(`成功：${oldFileName}${extname} → ${newFileName}${extname}`)
}

module.exports = rename
