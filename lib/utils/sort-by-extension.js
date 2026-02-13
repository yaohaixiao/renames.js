import CONSTANTS from '../constants.js';
import getExtension from './get-extension.js';

const { DEFAULT_ORDER, DEFAULT_SENSITIVITY } = CONSTANTS;

/**
 * # 将文件数组中的数据按扩展名的名称排序，返回排序后的数组
 *
 * @function sortByExtension
 * @param {Array} files - 文件数组
 * @param {string} [order='asc'] - 可选，排序方式. Default is `'asc'`
 * @param {string} [sensitivity=''] - 可选，大小写/重音处理的方式，可选项：base、accent、case 和
 *   variant. Default is `''`
 * @returns {Array} - 返回排序后的数组
 */
const sortByExtension = (
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

    const isAsc = order === DEFAULT_ORDER;

    return isAsc ? result : -result;
  });

export default sortByExtension;
