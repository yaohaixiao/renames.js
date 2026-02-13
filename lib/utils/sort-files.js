import isFunction from './is-function.js';
import sortByBirthtime from './sort-by-birthtime.js';
import sortByExtension from './sort-by-extension.js';
import sortByModifyTime from './sort-by-modify-time.js';
import sortByName from './sort-by-name.js';
import sortBySize from './sort-by-size.js';

import CONSTANTS from '../constants.js';

const { DEFAULT_SORT_BY, DEFAULT_ORDER, DEFAULT_SENSITIVITY } = CONSTANTS;

/**
 * # 获取排序后的文件组数数据
 *
 * @function sortFiles
 * @param {Array} files - 需要排序的文件组数数据
 * @param {object | null} [options={}] - 可选，文件排序的配置信息. Default is `{}`
 * @param {Function | string} [options.sortBy='name'] - 可选，用来排序的回调函数. Default is
 *   `'name'`
 * @param {string} [options.order='asc'] - 可选，排序方式，desc - 倒序，asc - 升序. Default
 *   is `'asc'`
 * @param {string} [options.sensitivity='base'] - 可选，文本敏感类型（可选值：'base',
 *   'accent', 'case', 'variant'）. Default is `'base'`
 * @param {string} [options.dirPath=''] - 可选，排序文件所属的文件夹路径. Default is `''`
 * @returns {Array} - 返回排序后的数组数据
 */
const sortFiles = (files, options = {}) => {
  const normalizedOptions =
    typeof options === 'object' && options !== null ? { ...options } : {};
  const defaultConfig = {
    // 内置默认排序类型
    sortBy: DEFAULT_SORT_BY,
    // 默认降序
    order: DEFAULT_ORDER,
    // 可选值：'base', 'accent', 'case', 'variant'
    sensitivity: DEFAULT_SENSITIVITY,
    // 默认空文件夹路径
    dirPath: '',
  };
  const finalConfig = {
    ...defaultConfig,
    ...normalizedOptions,
  };
  const { sortBy, order, sensitivity, dirPath } = finalConfig;

  // 自定义排序
  if (isFunction(sortBy)) {
    return sortBy(files);
  }

  // 内置排序
  switch (sortBy) {
    case 'birthtime': {
      return sortByBirthtime(files, order, dirPath);
    }
    case 'modify-time': {
      return sortByModifyTime(files, order, dirPath);
    }
    case 'name': {
      return sortByName(files, order, sensitivity);
    }
    case 'size': {
      return sortBySize(files, order, dirPath);
    }
    case 'type':
    case 'extension': {
      return sortByExtension(files, order, sensitivity);
    }
    default: {
      return files;
    }
  }
};

export default sortFiles;
