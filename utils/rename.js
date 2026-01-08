const fs = require('fs')
const path = require('path')

const getFinalFileName = require('./getFinalFileName')
const getExtension = require('./getExtension')

/**
 * 重命名文件
 * ===================================================================
 * @param {string} folderPath - 需要修改文件名的目标文件夹路径
 * @param {string} oldFileName - 原来的文件名
 * @param {number|string} index - oldFileName 文件在 folderPath 目录下的文件列表中的索引值或者要修改的文件名
 * @param {object} [options] - 可选，用于重命名的配置数据
 * @param {string} [options.prefix] 要添加的前缀（可选，默认空）
 * @param {string} [options.suffix] - 要添加的后缀（可选，默认空，添加在文件名和扩展名之间）
 * @param {string} [options.connector] - prefix 和 suffix 之间的连接符（可选，默认空）
 * @param {boolean|string} [options.autoIndex] - 是否自动编号（可选，默认：false）
 * @param {boolean} [options.indexPadZero] - 可选，是否索引编号自动补‘0’（默认值：true）
 * @param {number} [options.indexLength] - 可选，自动补齐的字符串长度值（默认值：2）
 * @param {string} [options.indexPrefix] - 自动编号后缀（可选，默认：'第'）
 * @param {string} [options.indexSuffix] - 是否自动编号（可选，默认：'集'）
 * @param {string} [options.delimiter] - 自动编号和名字间的分隔符（可选，默认：'：'）
 * @param {array} [options.names] - 要修改的对应的文件名列表数组（可选，默认：空数组）
 * @param {function} [options.sort] - 给文件夹中的文件进行排序的函数方法，返回排序后的文件列表数据（可选，默认空）
 * @param {function} [options.format] - 文件名的格式化方法（可选，默认对比行的索引值）
 * @param {string} [options.extname] - 可选，想替换的扩展名（默认值：''）
 * @param {boolean} [options.force] - 可选，是否强制重命名（默认值：false）
 * @returns {boolean}
 */
const rename = (folderPath, oldFileName, index, options) => {
  const oldFilePath = path.join(folderPath, oldFileName)
  const stats = fs.statSync(oldFilePath)
  const extname = options && options.extname ? options.extname : getExtension(oldFileName)
  const force = options && options.force

  // 1. 过滤隐藏文件（如 .DS_Store、.gitignore）和文件夹（仅处理文件）
  if (stats.isDirectory() || oldFileName.startsWith('.')) {
    return false
  }

  // 2. 获取最终的文件名
  const name = typeof index === 'string' ? `${index}${extname}` : ''
  const newFileName = name || getFinalFileName(oldFileName, index, options)
  const newFilePath = path.join(folderPath, newFileName)

  // 3. 避免重复命名（如果新文件名已存在，跳过）
  if (!force && (oldFileName === newFileName || fs.existsSync(newFilePath))) {
    console.log(`跳过：${oldFileName}（新文件名已存在或无需修改）`)
    return false
  }

  // 4. 执行重命名
  fs.renameSync(oldFilePath, newFilePath)
  console.log(`成功：${oldFileName} → ${newFileName}`)
}

module.exports = rename
