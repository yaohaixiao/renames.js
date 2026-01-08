const fs = require('fs')
const path = require('path')

const readList = require('./readList')
const sortFiles = require('./sortFiles')
const rename = require('./rename')
const isFunction = require('./isFunction')

/**
 * 批量给文件添加前缀/后缀
 * ===================================================================
 * @param {string} folderPath - 目标文件夹路径（绝对路径或相对路径）
 * @param {object|boolean} [options] - 配置参数对象数据 （可选，默认空）
 * @param {string} [options.prefix] 要添加的前缀（可选，默认空）
 * @param {string} [options.suffix] - 要添加的后缀（可选，默认空，添加在文件名和扩展名之间）
 * @param {string} [options.connector] - prefix 和 suffix 之间的连接符（可选，默认空）
 * @param {boolean|string} [options.autoIndex] - 是否自动编号（可选，默认：false）
 * @param {boolean} [options.indexPadZero] - 可选，是否索引编号自动补‘0’（默认值：true）
 * @param {string} [options.indexPrefix] - 自动编号后缀（可选，默认：'第'）
 * @param {string} [options.indexSuffix] - 是否自动编号（可选，默认：'集'）
 * @param {string} [options.delimiter] - 自动编号和名字间的分隔符（可选，默认：'：'）
 * @param {number} [options.startIndex] - 自动编号的起始索引值（可选，默认：0）
 * @param {array|string} [options.namesList] - 要修改的对应的文件名列表数组或者文件名列表的数据（可选，默认：空数组）
 * @param {boolean} [options.ignoreQuantityDiscrepancies] - 是否忽略数据数量不一致（可选，默认值：false）
 * @param {boolean} [options.force] - 是否强制重命名（可选，默认值：false）
 * @param {function} [options.sort] - 给文件夹中的文件进行排序的函数方法，返回排序后的文件列表数据（可选，默认空）
 * @param {function} [options.format] - 文件名的格式化方法（可选，默认对比行的索引值）
 */
const batchRename = (folderPath, options) => {
  try {
    // 1. 解析绝对路径（避免相对路径混乱）
    const absoluteFolderPath = path.resolve(folderPath)

    // 2. 读取文件夹内所有内容（文件+文件夹）
    const files = fs.readdirSync(absoluteFolderPath)

    const config = options ? {
      ...options
    } : null
    const namesList = config ? config.namesList : []
    const filter = config && isFunction(config.filter) ? config.filter : null
    let names = []

    // 3. 获取文件名列表数据
    if (namesList) {
      // 直接读取数组信息
      if (Array.isArray(namesList) && namesList.length) {
        names = namesList
      } else {
        // 读取文件中的数据
        names = readList(namesList)
      }
    }

    // 4. 计算标题索引信息的数值字符串的自动填充的字段长度
    if (config && config.autoIndex && config.indexPadZero) {
      config.indexLength = files.length.toString().length
    }

    const namesCount = names.length
    const filesCount = files.length

    const sortFn = config && config.sort ? config.sort : null

    // 5. 遍历文件名数据，逐个文件重命名
    if (namesCount) {
      let msg = '文件数量于文件名列表的数据数量不一致'

      if (namesCount !== filesCount) {
        if (options.ignoreQuantityDiscrepancies) {
          console.log(`警告：${msg}`)
        } else {
          console.log(`错误：${msg}`)
          return false
        }
      }

      config.names = names
    }

    const targets = filter ? filter(files) : files

    sortFiles(targets, sortFn).forEach(function (oldFileName, index) {
      const name = namesCount && !config.autoIndex ? names[index] : ''

      rename(absoluteFolderPath, oldFileName, name || index, config)
    })

    console.log('批量重命名完成！')
  } catch (error) {
    console.error('重命名失败：', error.message)
  }
}

module.exports = batchRename
