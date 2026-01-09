/**
 * 自定义 padStart 方法，在字符串开头填充字符至目标长度
 * ===================================================================
 * @method padStart
 * @param {string} val - 原始字符串（需处理的字符串）
 * @param {number} length - 最终目标字符串长度
 * @param {string} [padString=' '] - 可选：填充字符（默认值：' '）
 * @returns {string} 填充后的字符串
 */
const padStart = (val, length, padString = ' ') => {
  // 1. 类型转换：确保 val 是字符串（原生 padStart 会隐式转换）
  const originalStr = String(val);

  // 2. 处理目标长度：若目标长度 ≤ 原字符串长度，直接返回原串
  if (length <= originalStr.length) {
    return originalStr;
  }

  // 3. 处理填充字符：默认空格，若为非字符串则转为字符串，空字符串则返回原串（无填充）
  const pad = String(padString);

  if (pad === '') {
    return originalStr;
  }

  // 4. 计算需要填充的总长度
  const padLength = length - originalStr.length;

  // 5. 构建填充字符串（避免重复拼接，提高效率）
  // 思路：用 pad 重复足够多次，再截取前 padLength 个字符（处理 pad 长度不足的情况）
  const padStr = pad.repeat(Math.ceil(padLength / pad.length)).slice(0, padLength);

  // 6. 拼接填充字符串和原字符串，返回结果
  return padStr + originalStr;
}

module.exports = padStart
