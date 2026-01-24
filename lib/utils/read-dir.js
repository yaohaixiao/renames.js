import fs from 'node:fs';
import path from 'node:path';

import isFileExists from './is-file-exists.js';
import isFunction from './is-function.js';
import showWarningLog from './show-warning-log.js';

/**
 * # （同步）读取文件夹中的文件
 *
 * @function readDir
 * @param {string} dirPath - 文件夹的路径
 * @param {string | object | Function} [options='utf8'] - 可选，读取文件夹的配置参数. Default
 *   is `'utf8'`
 * @param {Function} [callback=null] - 可选，读取完数据后的处理函数. Default is `null`
 * @returns {string[]} - 返回读取文件夹中的文件数组信息
 */
const readDir = (dirPath, options = 'utf8', callback = null) => {
  const { readdirSync, lstatSync } = fs;
  const { resolve } = path;
  const absolutePath = resolve(dirPath);
  let files = [];
  let afterRead = callback;

  if (!isFileExists(absolutePath)) {
    showWarningLog('跳过', absolutePath, '文件夹不存在或已被删除。');
    return files;
  }

  const stats = lstatSync(absolutePath);

  if (!stats.isDirectory()) {
    showWarningLog('跳过', absolutePath, '不是有效的文件夹。');
    return files;
  }

  const defaultOptions = {
    // 显式指定 UTF-8 编码（默认值，可省略）
    encoding: 'utf8',
    withFileTypes: false,
  };
  let mergedOptions = {};

  // options 作为 callback 函数
  if (isFunction(options)) {
    afterRead = options;
    mergedOptions = {
      ...defaultOptions,
    };
  } else {
    mergedOptions = {
      ...defaultOptions,
      ...(typeof options === 'object' && options !== null ? options : {}),
    };
  }

  const encodings = ['utf8', 'ascii', 'buffer', null];

  // 若传入的 encoding 非法，回退到默认的 utf8
  if (!encodings.includes(mergedOptions.encoding)) {
    mergedOptions.encoding = defaultOptions.encoding;
  }

  files = readdirSync(absolutePath, mergedOptions);

  if (isFunction(afterRead)) {
    afterRead(files);
  }

  return files;
};

export default readDir;
