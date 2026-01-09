const padStart = require('./padStart')

/**
 * 数字/字符串补零（前置补0，确保指定长度）
 * ===================================================================
 * @method padZero
 * @param {number|string} value - 要补零的数字或字符串（如 27、'27'）
 * @param {number} length - 目标总长度（如 3 → '027'，4 → '0027'）
 * @returns {string} 补零后的字符串
 */
const padZero = (value, length) => {
  // 1. 转换为字符串（处理数字/字符串输入）
  const str = String(value)

  // 2. 验证目标长度（必须大于0，否则返回原字符串）
  if (length <= 0 || str.length >= length) {
    return str
  }

  // 3. 前置补0到目标长度（padStart(目标长度, 补位字符)）
  return str.padStart ? str.padStart(length, '0') : padStart(str, length, '0')
}

module.exports = padZero
