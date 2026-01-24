import padStart from './pad-start.js';

/**
 * # 数字/字符串补零（前置补0，确保指定长度）
 *
 * @function padZero
 * @param {number | string} val - 要补零的数字或字符串（如 27、'27'）
 * @param {number} [length=2] - 可选，目标总长度（如 3 → '027'，4 → '0027'）. Default is `2`
 * @returns {string} - 返回补零后的字符串
 */
const padZero = (val, length = 2) => {
  // 转换为字符串（处理数字/字符串输入）
  const str = String(val);

  // 验证目标长度（必须大于0，否则返回原字符串）
  if (length <= 0 || str.length >= length) {
    return str;
  }

  // 前置补0到目标长度（padStart(目标长度, 补位字符)）
  return padStart(str, length, '0');
};

export default padZero;
