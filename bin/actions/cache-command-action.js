import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import clearOrDisplayAllCache from '../utils/clear-or-display-all-cache.js';
import clearOrDisplayGroupCache from '../utils/clear-or-display-group-cache.js';
import deleteCache from '../utils/delete-cache.js';
import displayCacheByCategory from '../utils/display-cache-by-category.js';
import switchCacheOfConfig from '../utils/switch-cache-of-config.js';

/**
 * # cache 命令的 action 逻辑
 *
 * @function cacheCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} [options={}] - 配置参数对象. Default is `{}`
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const cacheCommandAction = async (dirPath = '', options = {}) => {
  let targetDirPath = dirPath;

  // 设置 cache 配置选项
  if (!targetDirPath) {
    // 关闭缓存
    if (options?.off) {
      return switchCacheOfConfig(false);
    }

    // 开启缓存
    if (options?.on) {
      return switchCacheOfConfig(true);
    }
  }

  // 处理未传入目录路径的情况
  if (!targetDirPath) {
    // 删除缓存文件或清理缓存记录
    if (options?.delete) {
      return deleteCache(options);
    }

    // 显示 source 为 dir 类型缓存记录
    if (options?.dirs) {
      return displayCacheByCategory(options, 'dirs');
    }

    if (options?.groups) {
      return displayCacheByCategory(options, 'groups');
    }

    // 处理全量操作
    if (options?.all) {
      return clearOrDisplayAllCache(options);
    }

    // 获取默认目录路径
    targetDirPath = await getOptionsFromConfigJs('dirPath');
  }

  // 处理指定目录的缓存操作
  if (targetDirPath) {
    return clearOrDisplayGroupCache(targetDirPath, options);
  }

  showWarningLog('警告', '无任何相关缓存数据', '请指缓存记录的 groupId');

  return true;
};

export default cacheCommandAction;
