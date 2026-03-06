import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import toLocaleTime from '../../lib/utils/to-locale-time.js';
import writeFile from '../../lib/utils/write-file.js';

import revokeRename from './revoke-rename.js';

/**
 * # 撤销缓存记录中指定 groupId 的文件重命名
 *
 * @function revokeGroupRecords
 * @param {string} groupId - 缓存记录 ID
 * @returns {boolean} - 撤销操作成功，返回 true，否则返回 false
 */
const revokeGroupRecords = (groupId) => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '缓存文件不存在或已被删除');
    return false;
  }

  const { parse, stringify } = JSON;
  const renames = parse(readFile(CACHE_FILE_PATH));
  const cacheRecords = renames[groupId];
  const records = [];

  if (!cacheRecords || cacheRecords.length === 0) {
    showWarningLog(
      '警告',
      `缓存记录 ID 为 ${groupId} 的数据`,
      '不存在或已被清理',
    );
    return false;
  }

  // 还原 revokePath 中的数据
  for (const record of cacheRecords) {
    const { id, oldFilePath, newFilePath, source } = record;
    const updated = toLocaleTime();

    revokeRename(record);

    records.push({
      id,
      oldFilePath: newFilePath,
      newFilePath: oldFilePath,
      source,
      updated,
    });
  }

  // 缓存撤销后的数据
  renames[groupId] = records;

  // 将恢复缓存数据写入缓存文件，以便重复操作
  writeFile(CACHE_FILE_PATH, stringify(renames, null, 2));

  return true;
};

export default revokeGroupRecords;
