/**
 * # 辅助函数：解析布尔型 CLI 参数
 *
 * @function parseBooleanOption
 * @param {string} enable - 输入的参数值
 * @param {boolean} defaultValue - 默认值
 * @returns {boolean} 解析后的布尔值
 */
const parseBooleanOption = (enable, defaultValue = false) => {
  switch (enable) {
    case '1':
    case 'true': {
      return true;
    }
    case '0':
    case 'false': {
      return false;
    }
    default: {
      return defaultValue;
    }
  }
};

export default parseBooleanOption;
