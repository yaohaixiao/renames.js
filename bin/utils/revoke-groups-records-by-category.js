import filterGroupsByCategory from './filter-groups-by-category.js';
import revokeGroupRecords from './revoke-group-records.js';

/**
 * # 撤销指定类别的缓存记录
 *
 * @function revokeGroupsRecordsByCategory
 * @param {object} renames - 所有缓存的数据
 * @param {string} category - 缓存的类别
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const revokeGroupsRecordsByCategory = (renames, category = 'all') => {
  const keys = Object.keys(renames);
  const groups = filterGroupsByCategory(keys, category);

  if (!groups || groups.length === 0) {
    return false;
  }

  for (const key of groups) {
    revokeGroupRecords(renames, key);
  }

  return true;
};

export default revokeGroupsRecordsByCategory;
