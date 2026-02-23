import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearCacheRecords from './clear-cache-records.js';
import displayCacheRecords from './display-cache-records.js';
import listDirCache from './list-dir-cache.js';

/**
 * # 处理指定目录的缓存操作（显示/清理）
 *
 * @function clearOrDisplayDirCache
 * @param {string} dirPath - 目标目录路径
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayDirCache = async (dirPath, options) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const { parse, stringify } = JSON;
  const cacheJSON = readFile(CACHE_FILE_PATH);
  const renames = parse(cacheJSON);

  if (options.clear || options.delete) {
    return clearCacheRecords(dirPath);
  }

  const records = renames[dirPath];

  if (!records || records.length === 0) {
    showWarningLog('警告', dirPath, '的缓存记录不存在或已被清除');
    return false;
  }

  if (options.list) {
    return listDirCache(dirPath);
  }

  await displayCacheRecords(stringify(records));

  return true;
};

export default clearOrDisplayDirCache;
