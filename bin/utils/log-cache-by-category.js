import logCacheRecordsByCategory from './log-cache-records-by-category.js';
import listCacheGroupsByCategory from './list-cache-groups-by-category.js';
import listCacheRecordsByCategory from './list-cache-records-by-category.js';

/**
 * # 显示指定类别的缓存信息
 *
 * @function logCacheByCategory
 * @param {object} options - 配置选项对象
 * @param {string} [category='all'] - 指定的类别. Default is `'all'`
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const logCacheByCategory = async (options, category = 'all') => {
  // 列表显示
  if (options?.list) {
    return options?.all
      ? listCacheGroupsByCategory(category)
      : listCacheRecordsByCategory(category);
  }

  return logCacheRecordsByCategory(category);
};

export default logCacheByCategory;
