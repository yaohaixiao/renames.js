import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';

import clearCacheRecords from './clear-cache-records.js';
import displayCacheRecords from './display-cache-records.js';

/**
 * #处理全量缓存操作（显示/清理）
 *
 * @function clearOrDisplayAllCache
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayAllCache = async (options) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const cacheJSON = readFile(CACHE_FILE_PATH);

  if (options.clear) {
    return clearCacheRecords('all');
  }

  await displayCacheRecords(cacheJSON);

  return true;
};

export default clearOrDisplayAllCache;
