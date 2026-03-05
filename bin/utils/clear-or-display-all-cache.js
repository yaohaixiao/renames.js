import displayCacheByCategory from './display-cache-by-category.js';
import clearCacheRecords from './clear-cache-records.js';

/**
 * #处理全量缓存操作（显示/清理）
 *
 * @function clearOrDisplayAllCache
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const clearOrDisplayAllCache = async (options) => {
  // 清理记录
  if (options.clear) {
    return clearCacheRecords('all');
  }

  await displayCacheByCategory(options, 'all');

  return true;
};

export default clearOrDisplayAllCache;
