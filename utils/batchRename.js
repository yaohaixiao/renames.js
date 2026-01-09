const fs = require('fs')
const path = require('path')

const isFunction = require('./isFunction')
const readList = require('./readList')
const sortFiles = require('./sortFiles')
const getFileName = require('./getFileName')
const rename = require('./rename')

/**
 * 批量给文件添加前缀/后缀
 * ===================================================================
 * @param {string} folderPath - 目标文件夹路径（绝对路径或相对路径）
 * @param {object} [options] - 可选，配置参数对象数据 （默认值：null）
 * @param {array|string} [options.namesList=[]] - 可选，要修改的对应的文件名列表数组或者文件名列表的数据（默认值：[]）
 * @param {string} [options.prefix=''] - 可选，要添加的前缀（默认值：''）
 * @param {string} [options.suffix=''] - 可选，要添加的后缀，添加在文件名和扩展名之间（默认值：''）
 * @param {string} [options.connector=''] - 可选，prefix 和 suffix 之间的连接符（默认值：''）
 * @param {boolean|string} [options.autoIndex=false] - 可选，是否自动编号（默认值：false）
 * @param {number} [options.startIndex=0] - 可选，自动编号的起始索引值（默认值：0）
 * @param {boolean} [options.indexPadZero=false] - 可选，是否索引编号自动补‘0’（默认值：true）
 * @param {string} [options.indexPrefix='第'] - 可选，自动编号后缀（默认值：'第'）
 * @param {string} [options.indexSuffix='集'] - 可选，是否自动编号（默认值：'集'）
 * @param {string} [options.delimiter='：'] - 可选，自动编号和名字间的分隔符（默认值：'：'）
 * @param {boolean} [options.ignoreQuantityDiscrepancies=false] - 可选，是否忽略数据数量不一致（默认值：false）
 * @param {boolean} [options.force=false] - 可选，是否强制重命名（默认值：false）
 * @param {function} [options.filter=null] - 可选，对给文件夹中的文件进行过滤的函数方法，返回过滤后的文件列表数据（默认值：null）
 * @param {function} [options.sort=null] - 可选，给文件夹中的文件进行排序的函数方法，返回排序后的文件列表数据（默认值：null）
 * @param {function} [options.format=null] - 可选，文件名的格式化方法（默认值：null）
 * @param {string} [options.extname=''] - 可选，重命名后的扩展名，例如: '.mp4'（默认值：''）
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

    // 5. 判断文件夹中的文件数量是否与文件列表配置中的文件名数量一致
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

    // 6. 文件过滤，使用 options.filter 方法过滤出符合要求的文件
    const targets = filter ? filter(files) : files

    // 7. 文件排序，使用默认的排序或者 options.sortFn 方法对文件进行排序
    sortFiles(targets, sortFn).forEach(function (oldFileName, index) {
      const oldFilePath = path.join(absoluteFolderPath, oldFileName)
      const stats = fs.statSync(oldFilePath)

      // 过滤隐藏文件（如 .DS_Store、.gitignore）和文件夹（仅处理文件）
      if (stats.isDirectory() || oldFileName.startsWith('.')) {
        return false
      }

      // 配置了文件列表 options.namesList 参数，且不是制动排序，则之间使用 namesList 中的文件名重命名
      const name = namesCount && !config.autoIndex ? names[index] : index

      // 获取最终的文件名
      const newFileName = getFileName(oldFileName, name, config)
      const newFilePath = path.join(absoluteFolderPath, newFileName)
      const force = config && config.force

      // 重命名文件名
      rename(oldFilePath, newFilePath, force)
    })

    console.log('批量重命名完成！')
  } catch (error) {
    console.error('重命名失败：', error.message)
  }
}

module.exports = batchRename
