import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearCacheRecords from './clear-cache-records.js';
import displayCacheByCategory from './display-cache-by-category.js';
import listGroupCache from './list-group-cache.js';

/**
 * # 处理指定 groupId 的缓存操作（显示/清理）
 *
 * @function clearOrDisplayGroupCache
 * @param {string} groupId - 缓存记录 id（dirPath 路径，或者 group-uuid）
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayGroupCache = async (groupId, options) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const { parse } = JSON;
  const cacheJSON = readFile(CACHE_FILE_PATH);
  const renames = parse(cacheJSON);

  if (options.clear || options.delete) {
    return clearCacheRecords(groupId);
  }

  const records = renames[groupId];

  if (!records || records.length === 0) {
    showWarningLog('警告', groupId, '的缓存记录不存在或已被清除');
    return false;
  }

  if (options.list) {
    return listGroupCache(groupId);
  }

  await displayCacheByCategory(options, 'dirs');

  return true;
};

export default clearOrDisplayGroupCache;
