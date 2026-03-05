/**
 * # 通过类别过滤组别数据
 *
 * @function filterGroupsByCategory
 * @param {Array} keys - 所有类别的数组数据
 * @param {string} [category='all'] - 类别字符串. Default is `'all'`
 * @returns {Array} - 返回过滤后的组别数据
 */
const filterGroupsByCategory = (keys, category = 'all') => {
  let groups = [];

  switch (category) {
    case 'dirs': {
      groups = keys.filter((key) => !key.startsWith('group-'));
      break;
    }
    case 'groups': {
      groups = keys.filter((key) => key.startsWith('group-'));
      break;
    }
    default: {
      groups = keys;
      break;
    }
  }

  return groups;
};

export default filterGroupsByCategory;
