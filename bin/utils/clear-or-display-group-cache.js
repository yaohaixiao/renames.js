import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearCacheRecords from './clear-cache-records.js';
import displayCacheRecordsJSON from './display-cache-records-json.js';
import listGroupCache from './list-group-cache.js';

/**
 * # 处理指定 groupId 的缓存操作（显示/清理）
 *
 * @function clearOrDisplayGroupCache
 * @param {string} groupId - 缓存记录 ID
 * @param {object} [options={}] - 配置参数对象. Default is `{}`
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayGroupCache = async (groupId, options = {}) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const { parse, stringify } = JSON;
  const cacheJSON = readFile(CACHE_FILE_PATH);
  const renames = parse(cacheJSON);

  // 清理指定 groupId 的缓存记录
  if (options?.clear || options?.delete) {
    return clearCacheRecords(groupId);
  }

  const records = renames[groupId];

  if (!records || records.length === 0) {
    showWarningLog(
      '警告',
      `缓存记录 ID 为 ${groupId} 的数据`,
      '不存在或已被清理',
    );
    return false;
  }

  // 列表显示缓存数据
  if (options?.list) {
    return listGroupCache(groupId);
  }

  // JSON 格式显示缓存记录
  await displayCacheRecordsJSON(stringify(records));

  return true;
};

export default clearOrDisplayGroupCache;
