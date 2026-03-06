import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import filterGroupsByCategory from './filter-groups-by-category.js';
import revokeGroupRecords from './revoke-group-records.js';

/**
 * # 撤销指定类别的缓存记录
 *
 * @function revokeGroupsRecordsByCategory
 * @param {string} category - 缓存的类别
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const revokeGroupsRecordsByCategory = (category = 'all') => {
  const { CACHE_FILE_PATH } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog(
      '警告',
      CACHE_FILE_PATH,
      '文件不存在或已删除，无任何数据可恢复',
    );
    return false;
  }

  const renames = JSON.parse(readFile(CACHE_FILE_PATH));
  const keys = Object.keys(renames);
  const groups = filterGroupsByCategory(keys, category);

  if (!groups || groups.length === 0) {
    showWarningLog('警告', category, '类型的缓存记录为空，无任何数据可恢复');
    return false;
  }

  for (const group of groups) {
    revokeGroupRecords(group);
  }

  return true;
};

export default revokeGroupsRecordsByCategory;
