import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import padZero from '../../lib/utils/pad-zero.js';
import parseRenamesToList from '../../bin/utils/parse-renames-to-list.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 列表显示指定缓存记录 ID 的缓存数据
 *
 * @function listCacheRecordsByCategory
 * @param {string} [category='all'] - 可选，缓存记录 source 属性的名称. Default is `'all'`
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const listCacheRecordsByCategory = (category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const { parse } = JSON;
  const renames = parse(readFile(CACHE_FILE_PATH));
  const records = parseRenamesToList(renames, category);
  const keywords =
    category === 'all'
      ? `所有缓存记录已被清空`
      : `缓存文件中 source 类型为 ${category.replace(/s$/, '')} 的记录已被清空`;

  if (!records || records.length === 0) {
    showWarningLog('警告', keywords, '暂无相关数据');
    return false;
  }

  const { length } = records.length.toString();

  for (const [index, record] of records.entries()) {
    const { oldFilePath, newFilePath } = record;
    console.log(
      chalk.greenBright(padZero(index + 1, length)),
      chalk.blueBright(oldFilePath),
      chalk.blueBright(` → `),
      chalk.greenBright(newFilePath),
    );
  }

  return true;
};

export default listCacheRecordsByCategory;
