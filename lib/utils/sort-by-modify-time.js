import fs from 'node:fs';
import path from 'node:path';

import CONSTANTS from '../constants.js';

const { DEFAULT_ORDER } = CONSTANTS;

/**
 * # 将文件数组中的数据按修改时间排序，返回排序后的数组
 *
 * @function sortByModifyTime
 * @param {Array} files - 文件数组
 * @param {string} [order='asc'] - 可选，排序方式. Default is `'asc'`
 * @param {string} [dirPath=''] - 可选，基准文件夹路径. Default is `''`
 * @returns {Array} - 返回排序后的数组
 */
const sortByModifyTime = (files, order = DEFAULT_ORDER, dirPath = '') => {
  const { resolve } = path;
  const { lstatSync } = fs;

  return files.toSorted((prev, next) => {
    const prevStats = lstatSync(resolve(prev, dirPath));
    const nextStats = lstatSync(resolve(next, dirPath));

    // 转换为时间戳（毫秒数）方便比较
    const prevTime = prevStats.mtime.getTime();
    const nextTime = nextStats.mtime.getTime();

    const isAsc = order === DEFAULT_ORDER;

    return isAsc ? prevTime - nextTime : nextTime - prevTime;
  });
};

export default sortByModifyTime;
