import fs from 'node:fs';
import path from 'node:path';

import isFunction from './is-function.js';
import getBasename from './get-basename.js';
import getExtension from './get-extension.js';

import CONSTANTS from '../constants.js';

const { DEFAULT_SORT_BY, DEFAULT_ORDER, DEFAULT_SENSITIVITY } = CONSTANTS;

// 辅助函数：自定义的拼接完整路径
const resolve = (filename, basePath) =>
  basePath ? path.resolve(basePath, filename) : filename;

const { lstatSync } = fs;

const sortByBirthtime = (files, order = DEFAULT_ORDER, dirPath = '') =>
  files.toSorted((prev, next) => {
    const prevStats = lstatSync(resolve(prev, dirPath));
    const nextStats = lstatSync(resolve(next, dirPath));

    const prevTime = prevStats.birthtime.getTime();
    const nextTime = nextStats.birthtime.getTime();

    const isDesc = order === 'desc';

    return isDesc ? nextTime - prevTime : prevTime - nextTime;
  });

const sortByModifyTime = (files, order = DEFAULT_ORDER, dirPath = '') =>
  files.toSorted((prev, next) => {
    const prevStats = lstatSync(resolve(prev, dirPath));
    const nextStats = lstatSync(resolve(next, dirPath));

    // 转换为时间戳（毫秒数）方便比较
    const prevTime = prevStats.mtime.getTime();
    const nextTime = nextStats.mtime.getTime();

    const isDesc = order === 'desc';

    return isDesc ? nextTime - prevTime : prevTime - nextTime;
  });

const sortByName = (
  files,
  order = DEFAULT_ORDER,
  sensitivity = DEFAULT_SENSITIVITY,
) =>
  files.toSorted((prev, next) => {
    // 获取基础名中
    const prevBasename = getBasename(prev);
    const nextBasename = getBasename(next);

    // 获取基础名中的数值（纯数字的文件名）
    const prevIndex = Number(prevBasename);
    const nextIndex = Number(nextBasename);

    const isAsc = order === DEFAULT_ORDER;

    // 纯数字的文件名，按从小到大的值正序排序
    if (!Number.isNaN(prevIndex) && !Number.isNaN(nextIndex)) {
      return isAsc ? prevIndex - nextIndex : nextIndex - prevIndex;
    }

    const result = prevBasename.localeCompare(
      nextBasename.toLowerCase(),
      undefined,
      {
        sensitivity,
      },
    );

    return isAsc ? result : -result;
  });

const sortBySize = (files, order = DEFAULT_ORDER, dirPath = '') =>
  files.toSorted((prev, next) => {
    const prevStats = lstatSync(resolve(prev, dirPath));
    const nextStats = lstatSync(resolve(next, dirPath));

    const prevSize = prevStats.size;
    const nextSize = nextStats.size;

    return order === 'desc' ? nextSize - prevSize : prevSize - nextSize;
  });

const sortByType = (
  files,
  order = DEFAULT_ORDER,
  sensitivity = DEFAULT_SENSITIVITY,
) =>
  files.toSorted((prev, next) => {
    // 获取扩展名
    const prevExtname = getExtension(prev).replace('.', '');
    const nextExtname = getExtension(next).replace('.', '');

    const result = prevExtname
      .toLowerCase()
      .localeCompare(nextExtname.toLowerCase(), undefined, {
        sensitivity,
      });

    return order === DEFAULT_ORDER ? result : -result;
  });

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
    case 'type': {
      return sortByType(files, order, sensitivity);
    }
    default: {
      return files;
    }
  }
};

export default sortFiles;
