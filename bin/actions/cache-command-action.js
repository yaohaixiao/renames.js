import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearOrDisplayAllCache from '../utils/clear-or-display-all-cache.js';
import clearOrDisplayDirCache from '../utils/clear-or-display-dir-cache.js';
import disableCache from '../utils/disable-cache.js';

/**
 * # cache 命令的 action 逻辑
 *
 * @function cacheCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} options - 配置参数对象
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const cacheCommandAction = async (dirPath = '', options = null) => {
  const { CACHE_FILE_NAME, CACHE_FILE_PATH } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在，无任何缓存数据');
    return false;
  }

  let targetDirPath = dirPath;

  // 处理未传入目录路径的情况
  if (!targetDirPath) {
    // 处理全量操作
    if (options.all) {
      return clearOrDisplayAllCache(options);
    }

    // 处理关闭缓存
    if (options.off) {
      return disableCache();
    }

    // 获取默认目录路径
    targetDirPath = await getOptionsFromConfigJs('dirPath');
  }

  // 处理指定目录的缓存操作
  if (targetDirPath) {
    return clearOrDisplayDirCache(targetDirPath, options);
  }

  return true;
};

export default cacheCommandAction;
