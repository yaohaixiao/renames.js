import { v5 } from 'uuid';

import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import uuidToArray from '../../lib/utils/uuid-to-array.js';

import clearOrDisplayAllCache from '../utils/clear-or-display-all-cache.js';
import clearOrDisplayGroupCache from '../utils/clear-or-display-group-cache.js';
import deleteCache from '../utils/delete-cache.js';
import displayCacheByCategory from '../utils/display-cache-by-category.js';
import switchCacheOfConfig from '../utils/switch-cache-of-config.js';

/**
 * # cache 命令的 action 逻辑
 *
 * @function cacheCommandAction
 * @param {string} groupId - 缓存记录 ID
 * @param {object} [options={}] - 配置参数对象. Default is `{}`
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const cacheCommandAction = async (groupId = '', options = {}) => {
  const { CONFIG_FILE_NAME, NAMESPACE_OID } = CONSTANTS;

  if (groupId) {
    return clearOrDisplayGroupCache(groupId, options);
  }

  // 关闭 cache 配置选项
  if (options?.off) {
    return switchCacheOfConfig(false);
  }

  // 开启 cache 配置选项
  if (options?.on) {
    return switchCacheOfConfig(true);
  }

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
  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog(
      '警告',
      CONFIG_FILE_NAME,
      '配置文件中未设置 dirPath 配置选项，无法获取缓存记录 ID 执行相关操作',
    );
    return false;
  }

  return clearOrDisplayGroupCache(
    `dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`,
    options,
  );
};

export default cacheCommandAction;
