import path from 'node:path';

/**
 * # 获取扩展名（含.）
 *
 * @function getExtension
 * @param {string} filename - 文件名（路径）字符串
 * @returns {string} - 返回文件名中扩展名部分的字符串，例如：'.jpg'
 */
const getExtension = (filename) => {
  const extname = path.extname(filename);

  if (!extname) {
    return filename;
  }

  return extname;
};

export default getExtension;
