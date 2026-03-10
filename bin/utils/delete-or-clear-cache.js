import { v5 } from 'uuid';

import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import uuidToArray from '../../lib/utils/uuid-to-array.js';

import clearCacheRecordsByCategory from './clear-cache-records-by-category.js';
import clearCacheRecordsById from './clear-cache-records-by-id.js';
import deleteCacheFile from './delete-cache-file.js';

/**
 * # 删除缓存文件或者清理某个组别的缓存记录
 *
 * @async
 * @function deleteOrClearCache
 * @param {object} [options={}] - 可选，配置信息对象. Default is `{}`
 * @returns {Promise<boolean>} - 操作成功，返回 true，否则返回 false
 */
const deleteOrClearCache = async (options = {}) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_NAME, NAMESPACE_OID } = CONSTANTS;

  // 清理 source 为 dir 类型的缓存记录
  if (options?.dirs) {
    return clearCacheRecordsByCategory('dirs');
  }

  // 清理 source 为 group 类型的缓存记录
  if (options?.groups) {
    return clearCacheRecordsByCategory('groups');
  }

  // 删除缓存文件
  if (options?.all) {
    return deleteCacheFile();
  }

  if (!isFileExists(CONFIG_FILE_PATH)) {
    showWarningLog('警告', CONFIG_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  // 清理用 renames.config.js 中 dirPath 配置选项作为缓存记录 ID 的数据
  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog(
      '警告',
      CONFIG_FILE_NAME,
      '配置文件中未设置 dirPath 配置选项，无法获取缓存记录 ID 清理缓存记录',
    );
    return false;
  }

  return clearCacheRecordsById(
    `dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`,
  );
};

export default deleteOrClearCache;
