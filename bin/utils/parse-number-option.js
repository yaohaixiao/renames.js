import showWarningLog from '../../lib/utils/show-warning-log.js';

import CONSTANTS from '../../lib/constants.js';

const { DEFAULT_START_INDEX } = CONSTANTS;

/**
 * # 辅助函数：解析数值型 CLI 参数
 *
 * @function parseNumberOption
 * @param {string} value - 输入的参数值
 * @param {number} defaultValue - 默认值
 * @param {string} paramName - 参数名（用于错误提示）
 * @returns {number} 解析后的数值
 */
const parseNumberOption = (
  value,
  defaultValue = DEFAULT_START_INDEX,
  paramName = '--startIndex',
) => {
  const numValue = Number(value);
  if (Number.isNaN(numValue)) {
    showWarningLog(
      '警告',
      `${value} 为无效数字`,
      `${paramName} 必须传入合法数值，将使用默认值"${defaultValue}"。`,
    );
    return defaultValue;
  }
  return numValue;
};

export default parseNumberOption;
