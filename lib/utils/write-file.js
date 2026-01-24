import fs from 'node:fs';
import path from 'node:path';

import isFileExists from './is-file-exists.js';
import isFunction from './is-function.js';

/**
 * # 向文件中（同步）写入数据
 *
 * @function writeFile
 * @param {string} filePath - 文件路径
 * @param {string} content - 文本内容
 * @param {Function} [afterWrite=null] - 可选，写入数据完成后的回调函数. Default is `null`
 * @returns {void}
 */
const writeFile = (filePath, content, afterWrite = null) => {
  const { resolve, dirname } = path;
  // 提取文件的上级目录路径
  const dirPath = dirname(filePath);

  // 递归创建上级目录（不存在则创建，存在则不报错）
  if (!isFileExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(resolve(filePath), content, {
    encoding: 'utf8',
  });

  if (isFunction(afterWrite)) {
    afterWrite(content);
  }
};

export default writeFile;
