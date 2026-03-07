import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import padZero from '../../lib/utils/pad-zero.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import parseRenamesToList from './parse-renames-to-list.js';

/**
 * # 列表显示指定 groupId 的缓存记录
 *
 * @function listCacheRecordsById
 * @param {string} groupId - 记录 Id
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const listCacheRecordsById = (groupId) => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const renames = JSON.parse(readFile(CACHE_FILE_PATH));
  const records =
    groupId === 'all' ? parseRenamesToList(renames) : renames[groupId];
  const keywords =
    groupId === 'all'
      ? `所有缓存记录已被清空`
      : `缓存记录 ID 为 ${groupId} 的数据已被清空`;

  if (!records || records.length === 0) {
    showWarningLog('警告', keywords, '暂无相关数据');
    return false;
  }

  const recordsLength = records.length.toString().length;

  for (const [index, record] of records.entries()) {
    const { oldFilePath, newFilePath } = record;
    console.log(
      chalk.greenBright(padZero(index + 1, recordsLength)),
      chalk.blue(oldFilePath),
      chalk.blueBright('→'),
      chalk.green(newFilePath),
    );
  }

  return true;
};

export default listCacheRecordsById;
