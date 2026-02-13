import fs from 'node:fs';
import path from 'node:path';

import CONSTANTS from '../constants.js';

const { resolve } = path;
const { lstatSync } = fs;

const { DEFAULT_ORDER } = CONSTANTS;

/**
 * # 将文件数组中的数据按文件大小排序，返回排序后的数组
 *
 * @function sortBySize
 * @param {Array} files - 文件数组
 * @param {string} [order='asc'] - 可选，排序方式. Default is `'asc'`
 * @param {string} [dirPath=''] - 可选，基准文件夹路径. Default is `''`
 * @returns {Array} - 返回排序后的数组
 */
const sortBySize = (files, order = DEFAULT_ORDER, dirPath = '') =>
  files.toSorted((prev, next) => {
    const prevStats = lstatSync(resolve(prev, dirPath));
    const nextStats = lstatSync(resolve(next, dirPath));

    const prevSize = prevStats.size;
    const nextSize = nextStats.size;

    const isAsc = order === DEFAULT_ORDER;

    return isAsc ? prevSize - nextSize : nextSize - prevSize;
  });

export default sortBySize;
