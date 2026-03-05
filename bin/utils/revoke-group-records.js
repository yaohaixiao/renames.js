import CONSTANTS from '../../lib/constants.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import toLocaleTime from '../../lib/utils/to-locale-time.js';
import writeFile from '../../lib/utils/write-file.js';

import revokeRename from './revoke-rename.js';

/**
 * # 撤销缓存记录中指定 groupId 的文件重命名
 *
 * @function revokeGroupRecords
 * @param {object} renames - 缓存的 renames 记录
 * @param {string} groupId - 记录 Id
 * @returns {boolean} - 撤销操作成功，返回 true，否则返回 false
 */
const revokeGroupRecords = (renames, groupId) => {
  const { CACHE_FILE_PATH } = CONSTANTS;
  const { stringify } = JSON;
  const records = [];
  const cacheRecords = renames[groupId];

  if (!cacheRecords || cacheRecords.length === 0) {
    showWarningLog('警告', groupId, '的缓存数据不存在或已被清除');
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
