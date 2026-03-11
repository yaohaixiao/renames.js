import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showSuccessLog from '../../lib/utils/show-success-log.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeFile from '../../lib/utils/write-file.js';

import filterGroupsByCategory from './filter-groups-by-category.js';

/**
 * # 清理指定类别的缓存记录
 *
 * @function clearCacheRecordsByCategory
 * @param {string} [category='all'] - 可选，缓存记录 source 属性的名称. Default is `'all'`
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const clearCacheRecordsByCategory = (category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;
  const { parse, stringify } = JSON;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  const renames = parse(readFile(CACHE_FILE_PATH));
  const groups = filterGroupsByCategory(Object.keys(renames), category);

  const keywords =
    category === 'all'
      ? '缓存记录中无任何数据'
      : `缓存记录中无任何 source 为 ${category.replace(/s$/, '')} 的数据`;

  if (!groups || groups.length === 0) {
    showWarningLog('警告', keywords, '无法进行清理操作');
    return false;
  }

  for (const group of groups) {
    delete renames[group];
  }

  writeFile(CACHE_FILE_PATH, stringify(renames, null, 2));

  showSuccessLog('成功', keywords, '已被清理');

  return true;
};

export default clearCacheRecordsByCategory;
