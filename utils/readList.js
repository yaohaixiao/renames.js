const fs = require('fs')
const path = require('path')

/**
 * （同步）读取文件名列表文件中的文件名数据，返回文件名数组
 * ===================================================================
 * @method readList
 * @param {string} filePath - 文件名列表文件路径
 * @returns {array}
 */
const readList = (filePath) => {
  try {
    // 1. 解析绝对路径（避免相对路径混乱）
    const absolutePath = path.resolve(filePath)

    // 2. 同步读取文件（utf8 编码直接返回字符串，不加编码返回 Buffer）
    const content = fs.readFileSync(path.resolve(absolutePath), 'utf8')

    // 3. 按行分割（兼容 Windows \r\n 和 Linux \n 换行符）
    // split(/\r?\n/) 匹配两种换行符，filter(Boolean) 过滤空行（可选）
    const pattern = /\r?\n/

    return content.split(pattern).filter(Boolean)

  } catch (err) {
    // 捕获读取错误（如文件不存在、权限不足）
    console.error('读取文件失败：', err.message)
  }
}

module.exports = readList
