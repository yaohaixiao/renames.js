import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import displayCacheRecordsJSON from './display-cache-records-json.js';
import filterGroupsByCategory from './filter-groups-by-category.js';
import listCacheGroups from './list-cache-groups.js';

/**
 * # 显示指定类别的缓存信息
 *
 * @function displayCacheByCategory
 * @param {object} options - 配置选项对象
 * @param {string} category - 指定的类别
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const displayCacheByCategory = async (options, category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const { parse, stringify } = JSON;

  // 列表显示
  if (options?.list) {
    return listCacheGroups(category);
  }

  const renames = parse(readFile(CACHE_FILE_PATH));
  const keys = Object.keys(renames);
  const records = {};
  const groups = filterGroupsByCategory(keys, category);
  const keywords =
    category === 'all'
      ? `所有缓存记录已被清空`
      : `缓存文件中 source 类型为 ${category.replace(/s$/, '')} 的记录已被清空`;

  if (!groups || groups.length === 0) {
    showWarningLog('警告', keywords, '暂无数据显示');
    return false;
  }

  for (const key of groups) {
    records[key] = renames[key];
  }

  // JSON 格式显示
  await displayCacheRecordsJSON(stringify(records));

  return true;
};

export default displayCacheByCategory;
