import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 辅助函数：解析命令传入数值类型的参数值
 *
 * @function parseNumberOption
 * @param {string} value - 输入的参数值
 * @param {boolean | string} [defaultValue=false] - 默认值. Default is `false`
 * @param {string} optionName - 参数名称
 * @returns {boolean | string | number} - 解析后的配置参数值
 */
const parseNumberOption = (value, defaultValue, optionName) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    showWarningLog(
      '警告',
      `${value} 为无效数字`,
      `${optionName} 必须传入合法数值，将使用默认值"${defaultValue}"。`,
    );

    return defaultValue;
  }

  return number;
};

export default parseNumberOption;
