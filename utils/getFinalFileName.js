const padZero = require('./padZero')
const getExtension = require('./getExtension')
const getBasename = require('./getBasename')
const toIndexChapter = require('./toIndexChapter')


/**
 * 获取文件名，通过原文件名，文件在文件夹中所有文件中的索引值和配置参数
 * ===================================================================
 * @param {string} oldFileName - 原文件名
 * @param {number} index - 文件在文件夹中所有文件中的索引值
 * @param {{prefix?: string, suffix?: string, connector?: string, autoIndex?: (boolean|string), indexPadZero?: boolean,
 *   indexLength?: number, indexPrefix?: string, indexSuffix?: string, indexDelimiter?: string, names?: Array, sort?:
 *   Function, format?: Function}} options - 配置参数对象数据（可选，默认空）
 * @param {string} [options.prefix] 要添加的前缀（可选，默认空）
 * @param {string} [options.suffix] - 要添加的后缀（可选，默认空，添加在文件名和扩展名之间）
 * @param {string} [options.connector] - prefix 和 suffix 之间的连接符（可选，默认空）
 * @param {boolean|string} [options.autoIndex] - 自动编号前缀（可选，默认：false）
 * @param {number} [options.startIndex] - 自动编号的起始索引值（可选，默认：0）
 * @param {number} [options.indexLength] - 可选，索引编号是否自动填充‘0’的长度（默认值：0）
 * @param {string} [options.indexPrefix] - 自动编号后缀（可选，默认：'第'）
 * @param {string} [options.indexSuffix] - 是否自动编号（可选，默认：'集'）
 * @param {string} [options.delimiter] - 自动编号和名字间的分隔符（可选，默认：'：'）
 * @param {string} [options.names] - 要修改的对应的文件名列表数据（可选，默认：空数组）
 * @param {function} [options.format] - 读取文件名的格式化方法（可选，默认对比行的索引值）
 * @param {string} [options.extname] - 可选，想替换的扩展名（默认值：''）
 * @returns {string}
 */
const getFinalFileName = (oldFileName, index, options) => {
  // 1. 拆分文件名和扩展名（如 "photo.jpg" → 文件名"photo"，扩展名".jpg"）
  const basename = getBasename(oldFileName)

  // options 配置信息的默认值
  let extension = ''

  let autoIndex = false
  let onlyIndex = false
  let indexLength = 2
  let indexPrefix = '第'
  let indexSuffix = '集'
  let indexChapter = ''

  let delimiter = '：'

  let prefix = ''
  let suffix = ''
  let connector = ''

  let names = []
  let namesList = []
  let format = null
  let startIndex = 0

  // options 为可选参数，读取 options 有配置时的各个参数的数据
  if (options) {
    extension = options.extname || ''

    autoIndex = options.autoIndex || false
    onlyIndex = autoIndex === 'only'
    startIndex = options.startIndex || 0

    indexLength = options.indexLength || 2
    indexPrefix = options.indexPrefix || '第'
    indexSuffix = options.indexSuffix || '集'

    delimiter = options.delimiter || '：'

    prefix = options.prefix || ''
    suffix = options.suffix || ''
    connector = options.connector || ''

    names = options.names || []
    namesList = Array.isArray(names) && names.length ? names : []

    format = options.format || null
  }

  let fileIndex = index + 1
  let newFileName

  if (autoIndex) {
    fileIndex += startIndex
    indexChapter = toIndexChapter(indexLength ? padZero(fileIndex, indexLength) : `${fileIndex}`, onlyIndex, indexPrefix, indexSuffix, delimiter)
  }

  // 2. 生成文件名
  if (namesList.length) {
    // 从给出的文件列表数据中生成文件名
    newFileName = format ? format(oldFileName, index, namesList) : namesList[index]

    // 在文件名中添加自动编号的信息
    if (autoIndex) {
      newFileName = onlyIndex ? indexChapter : `${indexChapter}${newFileName}`
    }
  } else {
    // 直接修改文件的文件名
    if (autoIndex) {
      // 生成自动编号文件名
      newFileName = `${indexChapter}`

      if (format && !onlyIndex) {
        newFileName += `${format(oldFileName, index)}`
      }
    } else {
      // 有格式化方法则使用格式化方法生成文件名，无任何匹配规则，则文件名不变
      newFileName = format ? format(oldFileName, index) : basename
    }
  }

  // 3. 构造新文件名（前缀 + 连接符号 + 文件名 + 连接符号 + 后缀）
  if (prefix) {
    newFileName = prefix + connector + newFileName
  }

  if (suffix) {
    newFileName += connector + suffix
  }

  // 返回最终的文件名（文件名 + 扩展名）
  return `${newFileName}${extension ? extension : getExtension(oldFileName)}`
}

module.exports = getFinalFileName
