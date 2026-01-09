const getBasename = require('./getBasename')

/**
 * 获取排序后的文件组数数据
 * ===================================================================
 * @method sortFiles
 * @param {array} files - 需要排序的文件组数数据
 * @param {function} [sortFn=null] - 可选，用来排序的回调函数（默认值：空）
 * @returns {array}
 */
const sortFiles = (files, sortFn = null) => {
  let sortedFiles

  // 对文件夹中的文件排序
  if (sortFn) {
    // 自定义排序
    sortedFiles = sortFn(files)
  } else {
    sortedFiles = files.sort((a, b) => {
      const aBase = getBasename(a)
      const bBase = getBasename(b)

      const aNum = Number(aBase)
      const bNum = Number(bBase)

      // 纯数字的文件名，按从小到大的值正序排序
      if (!isNaN(aNum) && !isNaN(Number(bNum))) {
        return aNum - bNum
      } else {
        // toLowerCase() 统一大小写，避免 A 和 a 分开排序
        return a.toLowerCase().localeCompare(b.toLowerCase())
      }
    })
  }

  return sortedFiles
}

module.exports = sortFiles
