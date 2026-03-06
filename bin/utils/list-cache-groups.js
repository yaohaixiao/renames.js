import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import padZero from '../../lib/utils/pad-zero.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import filterGroupsByCategory from './filter-groups-by-category.js';

/**
 * # 列表显示缓存中的所有 groupId
 *
 * @function listCacheGroups
 * @param {string} [category='all'] - 类别字符串. Default is `'all'`
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const listCacheGroups = (category = 'all') => {
  const { CACHE_FILE_PATH } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_PATH, '文件不存在或已被删除');
    return false;
  }

  const renames = JSON.parse(readFile(CACHE_FILE_PATH));
  const keys = Object.keys(renames);
  const groups = filterGroupsByCategory(keys, category);
  const { length } = groups.length.toString();

  for (const [index, key] of groups.entries()) {
    console.log(
      chalk.greenBright(padZero(index + 1, length)),
      chalk.blueBright(key),
    );
  }

  return true;
};

export default listCacheGroups;
