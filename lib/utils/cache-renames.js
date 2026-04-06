import { v5 } from 'uuid';

import CONSTANTS from '../constants.js';
import isFileExists from './is-file-exists.js';
import readFile from './read-file.js';
import sortByName from './sort-by-name.js';
import uuidToArray from './uuid-to-array.js';
import writeFile from './write-file.js';

/**
 * # 缓存重命名的记录
 *
 * @function cacheRenames
 * @param {string} dirPath - 文件夹路径
 * @param {Array} files - 配置选项 files 的数组数据
 * @param {Array} records - 所有的重命名记录数组
 */
const cacheRenames = (dirPath, files, records) => {
  const { CACHE_FILE_PATH, NAMESPACE_OID } = CONSTANTS;
  const renames = isFileExists(CACHE_FILE_PATH)
    ? JSON.parse(readFile(CACHE_FILE_PATH))
    : {};
  const dirUUID = `dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`;
  let dirRecords = [];
  let groupRecords = [];
  let groupUUID = '';

  if (files.length > 0) {
    groupUUID = `group-${v5(sortByName(files), uuidToArray(NAMESPACE_OID))}`;
  }

  // 场景1：仅设置了 dirPath
  if (dirPath && files.length === 0) {
    renames[dirUUID] = records;
  } else if (!dirPath && files.length > 0) {
    // 场景2：仅设置了 files
    renames[groupUUID] = records;
  } else if (dirPath && files.length > 0) {
    // 场景3：dirPath 和 files 都设置了
    dirRecords = records.filter((record) => record.source === 'dir');
    groupRecords = records.filter((record) => record.source === 'group');

    renames[dirUUID] = dirRecords;
    renames[groupUUID] = groupRecords;
  }

  writeFile(CACHE_FILE_PATH, JSON.stringify(renames, null, 2));
};

export default cacheRenames;
