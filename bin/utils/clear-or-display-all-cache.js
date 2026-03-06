import clearCacheRecords from './clear-cache-records.js';
import deleteCacheFile from './delete-cache-file.js';
import displayCacheByCategory from './display-cache-by-category.js';
import listCacheGroups from './list-cache-groups.js';
import listGroupCache from './list-group-cache.js';

/**
 * #处理全量缓存操作（显示/清理）
 *
 * @function clearOrDisplayAllCache
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayAllCache = async (options) => {
  // 删除缓存文件
  if (options?.delete) {
    return deleteCacheFile();
  }

  // 清理记录
  if (options?.clear) {
    return clearCacheRecords('all');
  }

  // JSON 格式显示缓存记录
  if (options?.dirs) {
    return displayCacheByCategory(options, 'dirs');
  }

  if (options?.groups) {
    return displayCacheByCategory(options, 'groups');
  }

  // 列表格式显示缓存记录
  if (options?.list) {
    // 显示 dirPath 列表
    if (options?.dirs) {
      listCacheGroups('dirs');
    } else if (options.groups) {
      // 显示 group 列表
      listCacheGroups('groups');
    } else {
      // 列表显示所有缓存记录
      listGroupCache('all');
    }
  } else {
    // JSON 格式显示所有缓存记录
    await displayCacheByCategory(options, 'all');
  }

  return true;
};

export default clearOrDisplayAllCache;
