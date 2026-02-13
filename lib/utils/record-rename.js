import fs from 'node:fs';
import path from 'node:path';

import generateFilename from './generate-filename.js';
import rename from './rename.js';

/**
 * 辅助函数：处理单个文件的重命名逻辑，返回修改前后的文件名用于缓存
 *
 * @function recordRename
 * @param {string} dirPath - 重命名的目录路径
 * @param {string} oldFilename - 原始文件名
 * @param {number} index - 索引值
 * @param {object} config - 配置参数对象
 * @returns {object | null} - 如果开启缓存，返回修改前后的文件名数据，否则返回 null
 */
const recordRename = (dirPath, oldFilename, index, config) => {
  const { join } = path;
  const oldFilePath = join(dirPath, oldFilename);
  const stats = fs.statSync(oldFilePath);
  const { cache, force } = config;

  // 过滤隐藏文件和文件夹（直接返回，不执行重命名）
  if (stats.isDirectory() || oldFilename.startsWith('.')) {
    return null;
  }

  // 生成新文件名并执行重命名
  const newFilename = generateFilename(oldFilename, index, config);
  const newFilePath = join(dirPath, newFilename);

  rename(oldFilePath, newFilePath, force || false);

  const record = null;

  if (cache) {
    return {
      oldFilePath: newFilePath,
      newFilePath: oldFilePath,
    };
  }

  return record;
};

export default recordRename;
