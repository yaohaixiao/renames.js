import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import padZero from '../../lib/utils/pad-zero.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

const listDirCache = (dirPath = 'all') => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const renames = JSON.parse(readFile(CACHE_FILE_PATH));

  // 显示目录列表
  if (dirPath === 'all') {
    const keys = Object.keys(renames);
    const dirLength = keys.length.toString().length;

    for (const [index, key] of keys.entries()) {
      console.log(
        chalk.greenBright(padZero(index + 1, dirLength)),
        chalk.blueBright(key),
      );
    }
  } else {
    const records = renames[dirPath];

    if (!records || records.length === 0) {
      showWarningLog('警告', dirPath, '的缓存记录不存在或已被清除');
      return false;
    }

    const recordsLength = records.length.toString().length;

    for (const [index, record] of records.entries()) {
      console.log(
        chalk.greenBright(padZero(index + 1, recordsLength)),
        chalk.blue(record.oldFilePath),
        chalk.blueBright('→'),
        chalk.green(record.newFilePath),
      );
    }
  }

  return true;
};

export default listDirCache;
