import logFormatedJsonCacheRecordsByCategory from './log-formated-json-cache-records-by-category.js';
import listCacheGroupsByCategory from './list-cache-groups-by-category.js';
import listCacheRecordsByCategory from './list-cache-records-by-category.js';

/**
 * # 显示指定类别的缓存信息
 *
 * @function logCacheRecordsByCategory
 * @param {object} options - 配置选项对象
 * @param {string} [category='all'] - 可选，缓存记录 source 属性的名称. Default is `'all'`
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const logCacheRecordsByCategory = async (options, category = 'all') => {
  // 列表显示
  if (options?.list) {
    return options?.all
      ? listCacheGroupsByCategory(category)
      : listCacheRecordsByCategory(category);
  }

  return logFormatedJsonCacheRecordsByCategory(category);
};

export default logCacheRecordsByCategory;
