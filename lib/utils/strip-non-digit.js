/**
 * # 移除文本中所有非数值的文本
 *
 * @function stripNonDigit
 * @param {string} str - 文件名的文本字符串
 * @returns {string} - 返回移除非数值的字符串
 */
const stripNonDigit = (str) => {
  if (typeof str !== 'string') {
    return '';
  }

  return str.replace(/\D/g, '');
};

export default stripNonDigit;
