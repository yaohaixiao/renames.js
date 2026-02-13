import CONSTANTS from '../constants.js';
import getBasename from './get-basename.js';

const { DEFAULT_ORDER, DEFAULT_SENSITIVITY } = CONSTANTS;

/**
 * # 将文件数组中的数据按名称排序，返回排序后的数组
 *
 * @function sortByName
 * @param {Array} files - 文件数组
 * @param {string} [order='asc'] - 可选，排序方式. Default is `'asc'`
 * @param {string} [sensitivity=''] - 可选，大小写/重音处理的方式，可选项：base、accent、case 和
 *   variant. Default is `''`
 * @returns {Array} - 返回排序后的数组
 */
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

export default sortByName;
