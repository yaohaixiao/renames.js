/**
 * # 解析命令传入布尔类型的参数值
 *
 * @function parseBooleanOption
 * @param {string} value - 输入的参数值
 * @param {boolean | string} [defaultValue=false] - 可选，默认值. Default is `false`
 * @returns {boolean | string | number} - 解析后的配置参数值
 */
const parseBooleanOption = (value, defaultValue) => {
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
      return defaultValue;
    }
  }
};

export default parseBooleanOption;
