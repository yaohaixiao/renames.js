import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeFile from '../../lib/utils/write-file.js';

/**
 * # 清理所有或者指定目录下的缓存信息
 *
 * @function clearCacheRecords
 * @param {string} [groupId='all'] - 缓存记录 id（dirPath 路径，或者 group-uuid）. Default
 *   is `'all'`
 * @returns {boolean} - 操作成功，则返回 true，否则返回 false
 */
const clearCacheRecords = (groupId = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;
  const { parse, stringify } = JSON;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  const renames = parse(readFile(CACHE_FILE_PATH));

  if (groupId === 'all') {
    writeFile(CACHE_FILE_PATH, '{}');
    console.log(
      chalk.greenBright('成功:'),
      chalk.blueBright('所有缓存记录'),
      '已清除',
    );
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
    console.log(
      chalk.greenBright('成功:'),
      chalk.blueBright(groupId),
      '的缓存记录已清除',
    );
  }

  return true;
};

export default clearCacheRecords;
