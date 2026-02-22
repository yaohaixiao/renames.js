import CONSTANTS from '../../lib/constants.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeFile from '../../lib/utils/write-file.js';
import chalk from 'chalk';

/**
 * # 清理所有或者指定目录下的缓存信息
 *
 * @function clearCacheRecords
 * @param {string} [revokeDir='all'] - 要清除的缓存的目录路径. Default is `'all'`
 * @returns {boolean} - 操作成功，则返回 true，否则返回 false
 */
const clearCacheRecords = (revokeDir = 'all') => {
  const { parse, stringify } = JSON;
  const { CACHE_FILE_PATH } = CONSTANTS;

  const renames = parse(readFile(CACHE_FILE_PATH));

  if (revokeDir === 'all') {
    writeFile(CACHE_FILE_PATH, '{}');
    console.log(
      chalk.greenBright('成功:'),
      chalk.blueBright('所有缓存记录'),
      '已清除',
    );
  } else {
    const records = renames[revokeDir];

    if (!records) {
      showWarningLog('警告', revokeDir, '的缓存记录不存在或已被清除');
      return false;
    }

    delete renames[revokeDir];

    writeFile(CACHE_FILE_PATH, stringify(renames, null, 2));
    console.log(
      chalk.greenBright('成功：'),
      chalk.blueBright(revokeDir),
      '的缓存记录已清除',
    );
  }

  return true;
};

export default clearCacheRecords;
