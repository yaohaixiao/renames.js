import fs from 'node:fs';
import path from 'node:path';

import generateFilename from './generate-filename.js';
import rename from './rename.js';

// 辅助函数：处理单个文件的重命名逻辑
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
    return [newFilePath, oldFilePath];
  }

  return record;
};

export default recordRename;
