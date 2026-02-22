import path from 'node:path';

import showWarningLog from '../../lib/utils/show-warning-log.js';

import revokeRename from './revoke-rename.js';

/**
 * # 撤销缓存记录中的 dirPath 路径中的文件重命名，经文件名恢复到重命名前的名字
 *
 * @function revokeDirRecords
 * @param {object} renames - 缓存的 renames 记录
 * @param {string} dirPath - 目录路径
 * @returns {boolean} - 撤销操作成功，返回 true，否则返回 false
 */
const revokeDirRecords = (renames, dirPath) => {
  const { resolve } = path;
  const records = [];
  const cacheRecords = renames[resolve(dirPath)];

  if (!cacheRecords || cacheRecords.length === 0) {
    showWarningLog('警告', dirPath, '的缓存数据不存在或已被清除');
    return false;
  }

  // 还原 revokePath 中的数据
  for (const record of cacheRecords) {
    const { oldFilePath, newFilePath } = record;

    revokeRename(record);

    records.push({
      oldFilePath: newFilePath,
      newFilePath: oldFilePath,
    });
  }

  // 缓存撤销后的数据
  renames[dirPath] = records;

  return true;
};

export default revokeDirRecords;
