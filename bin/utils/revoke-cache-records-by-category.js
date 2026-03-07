import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import filterGroupsByCategory from './filter-groups-by-category.js';
import revokeCacheRecordsById from './revoke-cache-records-by-id.js';

/**
 * # 撤销指定类别的缓存记录
 *
 * @function revokeCacheRecordsByCategory
 * @param {string} category - 缓存的类别
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const revokeCacheRecordsByCategory = (category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const renames = JSON.parse(readFile(CACHE_FILE_PATH));
  const groups = filterGroupsByCategory(Object.keys(renames), category);
  const keywords =
    category === 'all'
      ? `缓存记录已被清空`
      : `缓存文件中 source 类型为 ${category.replace(/s$/, '')} 的记录已被清空`;

  if (!groups || groups.length === 0) {
    showWarningLog('警告', keywords, '无法进行撤销操作');
    return false;
  }

  for (const group of groups) {
    revokeCacheRecordsById(group);
  }

  return true;
};

export default revokeCacheRecordsByCategory;
