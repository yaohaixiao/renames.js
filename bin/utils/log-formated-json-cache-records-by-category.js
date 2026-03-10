import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import displayFormatedJsonCacheRecords from './display-formated-json-cache-records.js';
import filterGroupsByCategory from './filter-groups-by-category.js';

/**
 * # 显示指定 source 类型的缓存（JSON 格式的）记录
 *
 * @async
 * @function logFormatedJsonCacheRecordsByCategory
 * @param {string} [category='all'] - 可选，缓存记录 source 属性的名称. Default is `'all'`
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const logFormatedJsonCacheRecordsByCategory = async (category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const { parse, stringify } = JSON;

  const renames = parse(readFile(CACHE_FILE_PATH));
  const records = {};
  const groups = filterGroupsByCategory(Object.keys(renames), category);
  const keywords =
    category === 'all'
      ? `所有缓存记录已被清空`
      : `缓存文件中 source 类型为 ${category.replace(/s$/, '')} 的记录已被清空`;

  if (!groups || groups.length === 0) {
    showWarningLog('警告', keywords, '暂无相关数据');
    return false;
  }

  for (const key of groups) {
    records[key] = renames[key];
  }

  // JSON 格式显示
  await displayFormatedJsonCacheRecords(stringify(records));

  return true;
};

export default logFormatedJsonCacheRecordsByCategory;
