import fs from 'node:fs';
import path from 'node:path';

import isFileExists from './is-file-exists.js';
import isFunction from './is-function.js';
import showWarningLog from './show-warning-log.js';

/**
 * # （同步）读取文本文件数据
 *
 * @function readFile
 * @param {string} filePath - 读取文件的路径
 * @param {object | string | Function} [options='utf8'] -
 *   可选，读取文件的配置信息或者文件读取完成后的处理函数. Default is `'utf8'`
 * @param {Function} [callback=null] - 可选，文件读取完成后的处理函数. Default is `null`
 * @returns {Buffer | string} - 返回读取文件的文本字符串或者Buffer数据
 */
const readFile = (filePath, options = 'utf8', callback = null) => {
  const { resolve } = path;
  const absolutePath = resolve(filePath);
  const defaultOptions = {
    encoding: 'utf8',
    flag: 'r',
  };
  let finalOptions = {};
  let content = '';
  let afterRead = callback;

  if (!isFileExists(absolutePath)) {
    showWarningLog('跳过', absolutePath, '不存在或已被删除。');
    return content;
  }

  if (isFunction(options)) {
    afterRead = options;
    finalOptions = { ...defaultOptions };
  } else {
    finalOptions =
      typeof options === 'string'
        ? {
            ...defaultOptions,
            encoding: options,
          }
        : { ...defaultOptions, ...options };
  }

  content = fs.readFileSync(absolutePath, finalOptions);

  if (isFunction(afterRead)) {
    afterRead();
  }

  return content;
};

export default readFile;
