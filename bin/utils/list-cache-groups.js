import chalk from 'chalk';

import padZero from '../../lib/utils/pad-zero.js';

import filterGroupsByCategory from './filter-groups-by-category.js';

/**
 * # 列表显示缓存中的所有 groupId
 *
 * @function listCacheGroups
 * @param {object} renames - 所有的缓存记录
 * @param {string} [category='all'] - 类别字符串. Default is `'all'`
 */
const listCacheGroups = (renames, category = 'all') => {
  const keys = Object.keys(renames);
  const groups = filterGroupsByCategory(keys, category);
  const { length } = groups.length.toString();

  for (const [index, key] of groups.entries()) {
    console.log(
      chalk.greenBright(padZero(index + 1, length)),
      chalk.blueBright(key),
    );
  }
};

export default listCacheGroups;
