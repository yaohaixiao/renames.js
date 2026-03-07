import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import displayCacheRecordsJSON from './display-cache-records-json.js';
import filterGroupsByCategory from './filter-groups-by-category.js';

const logCacheRecordsByCategory = async (category = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const { parse, stringify } = JSON;

  const renames = parse(readFile(CACHE_FILE_PATH));
  const records = {};
  const groups = filterGroupsByCategory(Object.keys(renames), category);
  const keywords =
    category === 'all'
      ? `所有缓存记录已被清空`
      : `缓存文件中 source 类型为 ${category.replace(/s$/, '')} 的记录已被清空`;

  if (!groups || groups.length === 0) {
    showWarningLog('警告', keywords, '暂无相关数据');
    return false;
  }

  for (const key of groups) {
    records[key] = renames[key];
  }

  // JSON 格式显示
  await displayCacheRecordsJSON(stringify(records));

  return true;
};

export default logCacheRecordsByCategory;
