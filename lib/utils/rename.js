import fs from 'node:fs';

import chalk from 'chalk';

import getBasename from './get-basename.js';
import getExtension from './get-extension.js';
import isFileExists from './is-file-exists.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 重命名文件
 *
 * @function rename
 * @param {string} oldFilePath - 原来的文件名
 * @param {string} newFilePath - 新的文件名
 * @param {boolean} [force=false] - 可选，是否强制重命名. Default is `false`
 * @returns {boolean} - 如果数据不对或者文件不存在，返回 false
 */
const rename = (oldFilePath, newFilePath, force = false) => {
  // 检测文件是否存在
  if (!isFileExists(oldFilePath)) {
    showWarningLog('跳过', oldFilePath, '文件不存在或已被删除。');
    return false;
  }

  const oldFilename = getBasename(oldFilePath);
  const oldExtname = getExtension(oldFilePath);

  const newFilename = getBasename(newFilePath);
  const newExtname = getExtension(newFilePath);

  // 避免重复命名（如果新文件名已存在并且未设置强制重命名，则跳过重命名）
  if (
    !force &&
    ((oldFilename === newFilename && oldExtname === newExtname) ||
      isFileExists(newFilePath))
  ) {
    showWarningLog(
      '跳过',
      `${oldFilename}${oldExtname}`,
      '文件名已存在无需修改。',
    );
    return false;
  }

  // 执行重命名
  fs.renameSync(oldFilePath, newFilePath);

  console.log(
    chalk.greenBright(`成功：`),
    chalk.blue(`${oldFilename}${oldExtname}`),
    chalk.blueBright(` → `),
    chalk.green(`${newFilename}${newExtname}`),
  );
};

export default rename;
