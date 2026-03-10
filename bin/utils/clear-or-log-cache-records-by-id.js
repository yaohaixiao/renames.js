import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearCacheRecordsById from './clear-cache-records-by-id.js';
import displayFormatedJsonCacheRecords from './display-formated-json-cache-records.js';
import listCacheRecordsById from './list-cache-records-by-id.js';

/**
 * # 处理指定 groupId 的缓存操作（显示/清理）
 *
 * @async
 * @function clearOrLogCacheRecordsById
 * @param {string} groupId - 缓存记录 ID
 * @param {object} [options={}] - 可选，配置参数对象. Default is `{}`
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrLogCacheRecordsById = async (groupId, options = {}) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const { parse, stringify } = JSON;
  const cacheJSON = readFile(CACHE_FILE_PATH);
  const renames = parse(cacheJSON);

  // 清理指定 groupId 的缓存记录
  if (options?.clear || options?.delete) {
    return clearCacheRecordsById(groupId);
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
    return listCacheRecordsById(groupId);
  }

  // JSON 格式显示缓存记录
  await displayFormatedJsonCacheRecords(stringify(records));

  return true;
};

export default clearOrLogCacheRecordsById;
