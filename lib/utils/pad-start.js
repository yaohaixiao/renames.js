/**
 * # 自定义 padStart 方法，在字符串开头填充字符至目标长度
 *
 * @function padStart
 * @param {string | number} val - 原始字符串（需处理的字符串）
 * @param {number | string} [length=2] - 可选，最终目标字符串长度. Default is `2`
 * @param {string} [padString=' '] - 可选：填充字符. Default is `' '`
 * @returns {string} - 返回填充后的字符串
 */
const padStart = (val, length = 2, padString = ' ') => {
  // 类型转换：确保 val 是字符串（原生 padStart 会隐式转换）
  const originalStr = String(val);
  // 处理填充字符：默认空格，若为非字符串则转为字符串，空字符串则返回原串（无填充）
  let [finalLength, padChar] = [length, padString];

  // length 参数为字符串类型，则当作 padString 使用，此时默认 length = 2
  if (typeof finalLength === 'string') {
    padChar = length;
    finalLength = 2;
  }

  if (padChar === '' || finalLength <= originalStr.length) {
    // 处理目标长度：若目标长度 ≤ 原字符串长度，或者没有设置 pad 填充字符，直接返回原串
    return originalStr;
  }

  // node 环境下已支持 String.prototype.padStart 原生方法
  return originalStr.padStart(finalLength, padChar);
};

export default padStart;
