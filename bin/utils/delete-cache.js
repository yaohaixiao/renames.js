import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearGroupsCache from './clear-groups-cache.js';
import clearCacheRecords from './clear-cache-records.js';
import deleteCacheFile from './delete-cache-file.js';

/**
 * # 删除缓存文件或者清理某个组别的缓存记录
 *
 * @function deleteCache
 * @param {object} [options={}] - 配置信息对象. Default is `{}`
 * @returns {Promise<boolean>} - 操作成功，返回 true，否则返回 false
 */
const deleteCache = async (options = {}) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_NAME } = CONSTANTS;

  // 清理 source 为 dir 类型的缓存记录
  if (options?.dirs) {
    return clearGroupsCache('dirs');
  }

  // 清理 source 为 group 类型的缓存记录
  if (options?.groups) {
    return clearGroupsCache('groups');
  }

  // 删除缓存文件
  if (options?.all) {
    return deleteCacheFile();
  }

  if (!isFileExists(CONFIG_FILE_PATH)) {
    showWarningLog('警告', CONFIG_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog('警告', CONFIG_FILE_NAME, '文件中未设置 dirPath 配置选项');
    return false;
  }

  // 清理 renames.config.js 中 dirPath 的缓存记录
  return clearCacheRecords(dirPath);
};

export default deleteCache;
