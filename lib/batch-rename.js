import path from 'node:path';

import chalk from 'chalk';

import isFileExists from './utils/is-file-exists.js';
import readDir from './utils/read-dir.js';
import readFile from './utils/read-file.js';
import showWarningLog from './utils/show-warning-log.js';
import sortFiles from './utils/sort-files.js';
import writeFile from './utils/write-file.js';

import analysisNamesList from './utils/analysis-names-list.js';
import getNormalizedOptions from './utils/get-normalized-config.js';
import recordRename from './utils/record-rename.js';

import CONSTANTS from './constants.js';

const { CACHE_FILE_PATH } = CONSTANTS;

/**
 * # 批量重命名指定文件夹中文件的文件名
 *
 * @param {string} dirPath - 必须，目标文件夹（绝对或相对）路径
 * @param {object} [options={}] - 可选，配置参数对象数据. Default is `{}`
 * @param {Array | string} [options.namesList=[]] - 可选，要修改的对应的文件名列表数组或者文件名列表的数据.
 *   Default is `[]`
 * @param {string} [options.prefix=''] - 可选，要添加的前缀. Default is `''`
 * @param {string} [options.suffix=''] - 可选，要添加的后缀，添加在文件名和扩展名之间. Default is `''`
 * @param {string} [options.connector=''] - 可选，prefix 和 suffix 之间的连接符. Default
 *   is `''`
 * @param {boolean | string} [options.autoIndex=false] - 可选，是否自动编号. Default is
 *   `false`
 * @param {number} [options.startIndex=0] - 可选，自动编号的起始索引值. Default is `0`
 * @param {boolean} [options.indexPadZero=true] - 可选，是否索引编号自动补"0". Default is
 *   `true`
 * @param {number | string} [options.indexLength=2] - 可选，自动编号自动补"0"的字符长度.
 *   Default is `2`
 * @param {string} [options.indexPrefix='第'] - 可选，自动编号后缀. Default is `'第'`
 * @param {string} [options.indexSuffix='集'] - 可选，是否自动编号. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，自动编号和名字间的分隔符. Default is `'：'`
 * @param {boolean} [options.force=false] - 可选，是否强制重命名. Default is `false`
 * @param {string} [options.extname=''] - 可选，重命名后的扩展名，例如: '.mp4'. Default is
 *   `''`
 * @param {Function} [options.filter=null] - 可选，对给文件夹中的文件进行过滤的函数方法，返回过滤后的文件列表数据.
 *   Default is `null`
 * @param {string | Function} [options.sortBy='name'] -
 *   可选，排序方式，可选项：name、type、size、birthtime 和 modify-time)，或者排序的功能函数. Default is
 *   `'name'`
 * @param {string} [options.order='asc'] - 可选，文件名的排序方式（可选项：desc 和 asc）. Default
 *   is `'asc'`
 * @param {string} [options.sensitivity='base'] - 可选，name
 *   排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant. Default is `'base'`
 * @param {Function} [options.format=null] - 可选，文件名的格式化方法. Default is `null`
 * @param {boolean} [options.cache=false] - 可选，是否缓存重命名结果. Default is `false`
 * @returns {boolean} - 数据异常时返回 false，数据处理完成，返回 true.
 */
const batchRename = (dirPath, options = {}) => {
  const { resolve } = path;
  // 解析绝对路径（避免相对路径混乱）
  const finalDirPath = resolve(dirPath);

  // 检测文件路径是否存在
  if (!isFileExists(finalDirPath)) {
    showWarningLog('警告', finalDirPath, '文件夹不存在或已被删除。');
    return false;
  }

  // 读取文件夹文件
  const files = readDir(finalDirPath);

  // 校验是否为空
  if (files.length === 0) {
    showWarningLog('警告', finalDirPath, '文件夹中没有任何文件。');
    return false;
  }

  const {length} = files.length.toString();

  // indexLength 配置 'auto' 或者 indexLength 小于文件夹中文件数量长度，按文件数量长度计算
  if (length > options.indexLength || options.indexLength === 'auto') {
    options.indexLength = length;
  }

  // 规整配置并过滤目标文件
  const normalizedOptions = getNormalizedOptions('batch-name', options);
  const { filter, sortBy, order, sensitivity, cache } = normalizedOptions;
  const results = filter ? filter(files) : files;

  if (results.length === 0) {
    showWarningLog('警告', finalDirPath, '文件夹中没有符合过滤条件的文件。');
    return false;
  }

  // 加载并校验文件名列表
  analysisNamesList(normalizedOptions, results.length);

  // 对目标文件进行排序
  const sortedFiles = sortFiles(results, {
    sortBy,
    order,
    sensitivity,
    finalDirPath,
  });

  // 执行批量重命名
  console.log(
    chalk.greenBright('\n开始：'),
    chalk.green('批量重命名进行中...\n'),
  );

  const records = [];
  let renames;

  for (const [index, oldFilename] of sortedFiles.entries()) {
    // 获取缓存的当前文件重重命名数据
    const record = recordRename(
      finalDirPath,
      oldFilename,
      index,
      normalizedOptions,
    );

    // 缓存数据
    if (cache && record) {
      records.push(record);
    }
  }

  // 开启缓存，还未创建缓存文件，则创建文件
  if (cache) {
    renames = isFileExists(CACHE_FILE_PATH)
      ? JSON.parse(readFile(CACHE_FILE_PATH))
      : {};
    renames[finalDirPath] = records;
    writeFile(CACHE_FILE_PATH, JSON.stringify(renames, null, 2));
  }

  console.log(chalk.greenBright('\n结束：'), chalk.green('批量重命名完成！'));

  // 正常执行完成返回 true
  return true;
};

export default batchRename;
