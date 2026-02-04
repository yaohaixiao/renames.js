import fs from 'node:fs';
import path from 'node:path';

import isFileExists from './is-file-exists.js';
import isFunction from './is-function.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 同步删除指定文件或目录（支持递归删除目录内容）
 *
 * @function removeFile
 * @param {string} filePath - 要删除的文件/目录路径（相对路径或绝对路径）
 * @param {object | Function} [options={}] - 删除配置选项（可选，继承 fs.rmSync
 *   的配置参数）或者执行完成后的回调函数. Default is `{}`
 * @param {boolean} [options.recursive=true] - 可选，递归删除目录下的所有文件和子目录. Default is
 *   `true`
 * @param {boolean} [options.force=true] - 可选，忽略不存在的路径，避免抛出错误. Default is `true`
 * @param {number} [options.maxRetries=0] - 可选，删除失败时的重试次数. Default is `0`
 * @param {number} [options.retryDelay=100] - 可选，重试间隔时间（毫秒）. Default is `100`
 * @param {Function} [callback=null] - 可选，执行完成后的回调函数. Default is `null`
 * @returns {boolean} - 文件不存在时，返回 false，删除成功，返回 true.
 */
const removeFile = (filePath, options = {}, callback = null) => {
  const { resolve } = path;
  const finalPath = resolve(filePath);
  const defaultOptions = {
    recursive: true,
    force: true,
    maxRetries: 0,
    retryDelay: 100,
  };
  let finalOptions = {};
  let afterRemove = callback;

  if (!isFileExists(finalPath)) {
    showWarningLog('跳过', finalPath, '文件不存在或已被删除。');
    return false;
  }

  // options 类型为函数时，options 作为 afterRemove 回调函数使用，则直接使用默认配置
  if (isFunction(options)) {
    afterRemove = options;
    finalOptions = { ...defaultOptions };
  } else {
    finalOptions = {
      ...defaultOptions,
      ...(typeof options === 'object' && options !== null ? options : {}),
    };
  }

  fs.rmSync(finalPath, finalOptions);

  if (isFunction(afterRemove)) {
    afterRemove(filePath);
  }

  return true;
};

export default removeFile;
