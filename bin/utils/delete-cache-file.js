import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import removeFile from '../../lib/utils/remove-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 删除 renames.cache.json 缓存文件
 *
 * @function deleteCacheFile
 * @returns {boolean} - 操作成功，则返回 true，否则返回 false
 */
const deleteCacheFile = () => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在或已删除');
    return false;
  }

  removeFile(CACHE_FILE_PATH);

  console.log(chalk.greenBright('成功：'), chalk.blueBright(CACHE_FILE_NAME), '缓存文件已删除');

  return true;
};

export default deleteCacheFile;
