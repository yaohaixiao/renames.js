import fs from 'node:fs';
import path from 'node:path';

/**
 * # 同步检测文件是否存在
 *
 * @function isFileExists
 * @param {string} filePath - 检测的文件路径
 * @param {string} [basePath=''] - 可选，基础路径。. Default is `''`
 * @returns {boolean} - 文件存在返回 true，否则返回 false
 */
const isFileExists = (filePath = '', basePath = '') => {
  const { resolve } = path;

  if (!filePath) {
    return false;
  }

  const finalFilePath = basePath
    ? resolve(basePath, filePath)
    : resolve(filePath);

  return fs.existsSync(finalFilePath);
};

export default isFileExists;
