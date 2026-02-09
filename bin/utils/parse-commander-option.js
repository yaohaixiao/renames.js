import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 辅助函数：解析命令传入的参数值
 *
 * @function parseCommanderOption
 * @param {string} value - 输入的参数值
 * @param {boolean | number} [defaultValue=false] - 默认值. Default is `false`
 * @param {string} [optionName=''] - 参数名称. Default is `''`
 * @returns {boolean | string | number} - 解析后的配置参数值
 */
const parseCommanderOption = (value, defaultValue = false, optionName = '') => {
  const index = Number(value);

  // 解析 startIndex 的数值
  if (optionName === '--startIndex') {
    if (Number.isNaN(index)) {
      showWarningLog(
        '警告',
        `${value} 为无效数字`,
        `${optionName} 必须传入合法数值，将使用默认值"${defaultValue}"。`,
      );

      return defaultValue;
    } else {
      return index;
    }
  }

  // 解析 autoIndex、indexPadZero、force
  switch (value) {
    case '1':
    case 'true': {
      return true;
    }
    case '0':
    case 'false': {
      return false;
    }
    // autoIndex 可以接受 only 字符串
    case 'only': {
      return 'only';
    }
    default: {
      console.log('parseCommanderOption', 'defaultValue');
      return defaultValue;
    }
  }
};

export default parseCommanderOption;
