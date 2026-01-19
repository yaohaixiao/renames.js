import path from 'node:path';

import getExtension from './get-extension.js';

/**
 * # 获取不含扩展名的文件名
 *
 * @function getBasename
 * @param {string} filename - 文件名（路径）字符串
 * @returns {string} - 返回文件名中去掉扩展名部分的字符串
 */
const getBasename = (filename) => {
  const extname = getExtension(filename);

  return path.basename(filename, extname);
};

export default getBasename;
