import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeFile from '../../lib/utils/write-file.js';

import revokeDirRecords from '../utils/revoke-dir-records.js';

/**
 * # revoke 命令的 action 逻辑
 *
 * @function revokeCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} options - 配置参数对象
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const revokeCommandAction = async (dirPath = '', options = null) => {
  const { parse, stringify } = JSON;
  const { CONFIG_FILE_NAME, CACHE_FILE_NAME, CACHE_FILE_PATH } = CONSTANTS;

  let revokePath = dirPath;
  let renames = {};

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在，无任何数据可恢复');
    return false;
  }

  renames = parse(readFile(CACHE_FILE_PATH));

  // 未传入的 dirPath 值
  if (!revokePath) {
    // 还原所有数据
    if (options.all) {
      for (const key in renames) {
        revokeDirRecords(renames, key);
      }
    } else {
      // 读取配置文件
      const config = await import(`../../${CONFIG_FILE_NAME}`);

      // 使用 renames.config.js 中的 dirPath 参数
      revokePath = config?.default?.dirPath || '';
    }
  }

  // 缓存记录
  revokeDirRecords(renames, revokePath);

  // 将缓存数据写入缓存文件
  writeFile(CACHE_FILE_PATH, stringify(renames, null, 2));

  return true;
};

export default revokeCommandAction;
