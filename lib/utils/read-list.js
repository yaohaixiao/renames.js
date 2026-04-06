import path from 'node:path';

import getExtension from './get-extension.js';
import isFileExists from './is-file-exists.js';
import readFile from './read-file.js';
import showWarningLog from './show-warning-log.js';

// 过滤文件列表中的空值
const filter = (list) => list.filter((item) => item !== '' && item !== null);

/**
 * # 同步读取文件名列表文件中的文件名数据，返回文件名数组
 *
 * @function readList
 * @param {string} listPath - 文件名列表文件路径
 * @param {string} [prop=''] - 可选，当前读取的 .json 文件是 JSON 对象格式时，指定当局去的对象属性名.
 *   Default is `''`
 * @returns {Array} - 返回读取列表文件的数组数据，文件不存在则返回 false
 */
const readList = (listPath, prop = '') => {
  const { resolve } = path;
  const { parse } = JSON;
  // 解析绝对路径（避免相对路径混乱）
  const finalListPath = resolve(listPath);
  let items = [];

  // 检测文件是否存在
  if (!isFileExists(finalListPath)) {
    showWarningLog('警告', finalListPath, '文件不存在或已被删除');
    return items;
  }

  // 同步读取文件（utf8 编码直接返回字符串，不加编码返回 Buffer）
  const content = readFile(finalListPath);
  const extname = getExtension(finalListPath).toLowerCase();
  // 按行分割（兼容 Windows \r\n 和 Linux \n 换行符） split(/\r?\n/) 匹配两种换行符，filter(Boolean) 过滤空行（可选）
  const pattern = /\r?\n/;
  const { isArray } = Array;

  switch (extname) {
    case '.txt': {
      items = content.split(pattern).filter(Boolean);
      break;
    }
    case '.json': {
      items = parse(content);

      // 读取 JSON 数组数据
      if (isArray(items)) {
        items = filter(items);
      } else if (prop && items[prop]) {
        // 读取 JSON 对象的某个属性值，且该属性值是数组格式
        if (isArray(items[prop])) {
          items = filter(items[prop]);
        } else {
          items = [];
          showWarningLog(
            '警告',
            `${finalListPath} 中 JSON 对象的 ${prop} 属性`,
            '不是数组格式数据',
          );
        }
      } else {
        items = [];
        showWarningLog(
          '警告',
          `${finalListPath} 中的数据`,
          '不是 JSON 数组格式',
        );
      }

      break;
    }
    default: {
      showWarningLog(
        '警告',
        '仅支持读取 .txt 和 .json 格式的文件',
        '分析其中的列表数据',
      );
      break;
    }
  }

  return items;
};

export default readList;
