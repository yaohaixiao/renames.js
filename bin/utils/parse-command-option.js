import parseBooleanOption from './parse-boolean-option.js';
import parseNumberOption from './parse-number-option.js';

/**
 * # 辅助函数：解析命令传入的参数值
 *
 * @function parseCommandOption
 * @param {string} value - 输入的参数值
 * @param {boolean | number | string} [defaultValue=false] - 默认值. Default is
 *   `false`
 * @param {string} [optionName=''] - 参数名称. Default is `''`
 * @returns {boolean | string | number} - 解析后的配置参数值
 */
const parseCommandOption = (value, defaultValue = false, optionName = '') => {
  // 解析 startIndex 的数值
  if (optionName === '--startIndex') {
    return parseNumberOption(value, defaultValue, optionName);
  }

  // 解析 indexLength 的数值
  if (optionName === '--indexLength') {
    return value === 'auto'
      ? 'auto'
      : parseNumberOption(value, defaultValue, optionName);
  }

  // 解析布尔值类型的配置参数
  return parseBooleanOption(value, defaultValue);
};

export default parseCommandOption;
