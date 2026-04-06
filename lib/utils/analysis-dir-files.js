import path from 'node:path';

import isFileExists from './is-file-exists.js';
import readDir from './read-dir.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 通过 dirFiles 和 options 配置信息分析出最终的文件夹路径和文件数据
 *
 * @function analysisDirFiles
 * @param {string | Array} dirFiles - 目标文件夹（绝对或相对）路径，或者需要修改文件名的文件数组数据
 * @param {object} options - 配置信息对象
 * @returns {{ files: string[]; finalFiles: string[]; finalDirPath: string }} -
 *   分析出来的数据
 */
const analysisDirFiles = (dirFiles, options) => {
  const { resolve } = path;
  const { files = [] } = options;
  let finalFiles = [];
  // 解析绝对路径（避免相对路径混乱）
  let finalDirPath = '';

  // 仅设置了 files
  if (Array.isArray(dirFiles)) {
    finalFiles = dirFiles;
  } else {
    finalDirPath = resolve(dirFiles);

    // 检测文件路径是否存在
    if (!isFileExists(finalDirPath) && options?.files?.length === 0) {
      showWarningLog('警告', finalDirPath, '文件夹不存在或已被删除。');
      return {
        files,
        finalFiles,
        finalDirPath,
      };
    }

    // 读取文件夹文件
    if (finalDirPath) {
      finalFiles = readDir(finalDirPath);
    }

    // 读取 files
    if (files.length > 0) {
      finalFiles = finalFiles.concat(files);
    }
  }

  return {
    files,
    finalFiles,
    finalDirPath,
  };
};

export default analysisDirFiles;
