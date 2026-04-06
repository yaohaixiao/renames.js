import fs from 'node:fs';
import path from 'node:path';
import { v5 } from 'uuid';

import CONSTANTS from '../constants.js';
import generateFilename from './generate-filename.js';
import isFileExists from './is-file-exists.js';
import rename from './rename.js';
import showWarningLog from './show-warning-log.js';
import toLocaleTime from './to-locale-time.js';
import uuidToArray from './uuid-to-array.js';

/**
 * 处理单个文件的重命名逻辑，返回修改前后的文件名用于缓存
 *
 * @function recordRename
 * @param {string} dirPath - 重命名的目录路径
 * @param {string} oldFilename - 原始文件名
 * @param {number} index - 索引值
 * @param {object} config - 配置参数对象
 * @returns {object | null} - 如果开启缓存，返回修改前后的文件名数据，否则返回 null
 */
const recordRename = (dirPath, oldFilename, index, config) => {
  const { NAMESPACE_OID } = CONSTANTS;
  const { cache, force, files = [] } = config;
  const isOldFileInFiles = files.length > 0 && files.includes(oldFilename);
  const { join, dirname } = path;
  const oldFilePath = isOldFileInFiles
    ? oldFilename
    : join(dirPath, oldFilename);

  if (!isFileExists(oldFilePath)) {
    showWarningLog('警告', oldFilePath, '文件不存在或已被删除');
    return false;
  }

  const stats = fs.statSync(oldFilePath);

  // 过滤隐藏文件和文件夹（直接返回，不执行重命名）
  if (stats.isDirectory() || oldFilename.startsWith('.')) {
    return null;
  }

  // 生成新文件名并执行重命名
  const newFilename = generateFilename(oldFilename, index, config);
  const newFilePath = join(
    isOldFileInFiles ? dirname(oldFilename) : dirPath,
    newFilename,
  );

  rename(oldFilePath, newFilePath, force || false);

  const record = null;
  const updated = toLocaleTime();
  const recordUUID = v5(
    `${oldFilePath}/${newFilename}`,
    uuidToArray(NAMESPACE_OID),
  );
  const source = isOldFileInFiles ? 'group' : 'dir';

  if (cache) {
    return {
      id: recordUUID,
      oldFilePath,
      newFilePath,
      source,
      updated,
    };
  }

  return record;
};

export default recordRename;
