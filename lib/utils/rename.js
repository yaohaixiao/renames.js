import fs from 'node:fs';

import getBasename from './get-basename.js';
import getExtension from './get-extension.js';
import isFileExists from './is-file-exists.js';
import isFunction from './is-function.js';
import showSuccessLog from './show-success-log.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 重命名文件
 *
 * @function rename
 * @param {string} oldFilePath - 原来的文件名
 * @param {string} newFilePath - 新的文件名
 * @param {boolean | Function} [force=false] - 可选，是否强制重命名. Default is `false`
 * @param {Function} [callback=null] - 可选，读取完毕后的处理函数. Default is `null`
 * @returns {boolean} - 数据不对或者文件不存在，返回 false，重命名成功，返回 true
 */
const rename = (oldFilePath, newFilePath, force = false, callback = null) => {
  // 检测文件是否存在
  if (!isFileExists(oldFilePath)) {
    showWarningLog('警告', oldFilePath, '文件不存在或已被删除。');
    return false;
  }

  const oldFilename = getBasename(oldFilePath);
  const oldExtname = getExtension(oldFilePath);

  const newFilename = getBasename(newFilePath);
  const newExtname = getExtension(newFilePath);

  let afterRename = callback;
  let isForce;

  if (isFunction(force)) {
    afterRename = force;
  } else {
    isForce = force;
  }

  // 避免重复命名（如果新文件名已存在并且未设置强制重命名，则跳过重命名）
  if (
    !isForce &&
    ((oldFilename === newFilename && oldExtname === newExtname) ||
      isFileExists(newFilePath))
  ) {
    showWarningLog(
      '警告',
      `${oldFilename}${oldExtname} 文件名已存在`,
      '无需修改。',
    );
    return false;
  }

  // 执行重命名
  fs.renameSync(oldFilePath, newFilePath);

  showSuccessLog(
    '成功',
    `${oldFilename}${oldExtname}  →`,
    `${newFilename}${newExtname}`,
  );

  if (isFunction(afterRename)) {
    afterRename();
  }

  return true;
};

export default rename;
