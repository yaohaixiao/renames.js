import filterGroupsByCategory from './filter-groups-by-category.js';

/**
 * # 将 renames 缓存记录转化成数组
 *
 * @function parseRenamesToList
 * @param {object} renames - 缓存的所有记录对象
 * @param {string} [category='all'] 可选，缓存记录 source 属性的名称. Default is `'all'`
 * @returns {string[]} - 返回转化后的数组数据
 */
const parseRenamesToList = (renames, category = 'all') => {
  const groups = filterGroupsByCategory(Object.keys(renames), category);
  const records = [];

  for (const group of groups) {
    records.push(...renames[group]);
  }

  return records;
};

export default parseRenamesToList;
