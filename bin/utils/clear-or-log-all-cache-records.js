import clearCacheRecordsById from './clear-cache-records-by-id.js';
import deleteCacheFile from './delete-cache-file.js';
import logCacheRecordsByCategory from './log-cache-records-by-category.js';
import listCacheGroupsByCategory from './list-cache-groups-by-category.js';
import listCacheRecordsById from './list-cache-records-by-id.js';

/**
 * #处理全量缓存操作（显示/清理）
 *
 * @async
 * @function clearOrLogAllCacheRecords
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrLogAllCacheRecords = async (options) => {
  // 删除缓存文件
  if (options?.delete) {
    return deleteCacheFile();
  }

  // 清理记录
  if (options?.clear) {
    return clearCacheRecordsById('all');
  }

  // JSON 格式显示缓存记录
  if (options?.dirs) {
    return logCacheRecordsByCategory(options, 'dirs');
  }

  if (options?.groups) {
    return logCacheRecordsByCategory(options, 'groups');
  }

  // 列表格式显示缓存记录
  if (options?.list) {
    // 显示 dirPath 列表
    if (options?.dirs) {
      return listCacheGroupsByCategory('dirs');
    }
    if (options.groups) {
      // 显示 group 列表
      return listCacheGroupsByCategory('groups');
    }
    // 列表显示所有缓存记录
    return listCacheRecordsById('all');
  }

  // JSON 格式显示所有缓存记录
  return logCacheRecordsByCategory(options, 'all');
};

export default clearOrLogAllCacheRecords;
