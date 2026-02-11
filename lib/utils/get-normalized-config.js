import isFunction from './is-function.js';

import CONSTANTS from '../constants.js';

const {
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_CONNECTOR,
  DEFAULT_AUTO_INDEX,
  DEFAULT_START_INDEX,
  DEFAULT_INDEX_PAD_ZERO,
  DEFAULT_INDEX_LENGTH,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_EXTNAME,
  DEFAULT_FORCE,
  DEFAULT_FILTER,
  DEFAULT_SORT_BY,
  DEFAULT_ORDER,
  DEFAULT_SENSITIVITY,
  DEFAULT_FORMAT,
} = CONSTANTS;

/**
 * # 辅助函数：解析各个功能函数需要的配置参数信息
 *
 * @function getNormalizedOptions
 * @param {string} action - 函数名称
 * @param {object} options - 传入的配置参数数据
 * @returns {object} - 解析后的配置参数对象
 */
const getNormalizedOptions = (action = 'create-config', options = {}) => {
  const BASE_OPTIONS = {
    prefix: DEFAULT_PREFIX,
    suffix: DEFAULT_SUFFIX,
    connector: DEFAULT_CONNECTOR,
    autoIndex: DEFAULT_AUTO_INDEX,
    startIndex: DEFAULT_START_INDEX,
    indexPadZero: DEFAULT_INDEX_PAD_ZERO,
    indexLength: DEFAULT_INDEX_LENGTH,
    indexPrefix: DEFAULT_INDEX_PREFIX,
    indexSuffix: DEFAULT_INDEX_SUFFIX,
    delimiter: DEFAULT_DELIMITER,
    extname: DEFAULT_EXTNAME,
    format: DEFAULT_FORMAT,
  };
  const EXTRA_OPTIONS = {
    force: DEFAULT_FORCE,
    filter: DEFAULT_FILTER,
    sortBy: DEFAULT_SORT_BY,
    order: DEFAULT_ORDER,
    sensitivity: DEFAULT_SENSITIVITY,
  };
  let finalOptions;

  switch (action) {
    case 'batch-name': {
      finalOptions = {
        namesList: [],
        ...BASE_OPTIONS,
        ...EXTRA_OPTIONS,
        ...options,
      };

      const { filter, format } = finalOptions;

      // 处理过滤函数（确保为有效函数或 null）
      finalOptions.filter = isFunction(filter) ? filter : null;
      // 处理格式化函数（确保为有效函数或 null）
      finalOptions.format = isFunction(format) ? format : null;

      break;
    }
    case 'create-config': {
      finalOptions = {
        dirPath: '',
        namesList: '',
        ...BASE_OPTIONS,
        ...EXTRA_OPTIONS,
        ...options,
      };
      break;
    }
    case 'generate-filename': {
      finalOptions = {
        names: [],
        ...BASE_OPTIONS,
        ...options,
      };
      break;
    }
    default: {
      finalOptions = null;
      break;
    }
  }

  return finalOptions;
};

export default getNormalizedOptions;
