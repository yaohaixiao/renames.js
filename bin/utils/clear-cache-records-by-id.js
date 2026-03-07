import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showSuccessLog from '../../lib/utils/show-success-log.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeFile from '../../lib/utils/write-file.js';

/**
 * # 清理所有或者指定目录下的缓存信息
 *
 * @function clearCacheRecordsById
 * @param {string} [groupId='all'] - 缓存记录 id（dirPath 路径，或者 group-uuid）. Default
 *   is `'all'`
 * @returns {boolean} - 操作成功，则返回 true，否则返回 false
 */
const clearCacheRecordsById = (groupId = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;
  const { parse, stringify } = JSON;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  const renames = parse(readFile(CACHE_FILE_PATH));

  if (groupId === 'all') {
    writeFile(CACHE_FILE_PATH, '{}');
    showSuccessLog('成功', '所有缓存记录', '已被清理');
  } else {
    const records = renames[groupId];

    if (!records) {
      showWarningLog(
        '警告',
        `缓存文件中记录 ID 为 ${groupId} 的数据`,
        '不存在或已被清理',
      );
      return false;
    }

    delete renames[groupId];

    writeFile(CACHE_FILE_PATH, stringify(renames, null, 2));
    showSuccessLog('成功', `缓存记录 ID 为 ${groupId} 的数据`, '已被清理');
  }

  return true;
};

export default clearCacheRecordsById;
