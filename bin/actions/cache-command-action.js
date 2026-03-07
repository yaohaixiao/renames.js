import { v5 } from 'uuid';

import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import uuidToArray from '../../lib/utils/uuid-to-array.js';

import clearOrLogAllCacheRecords from '../utils/clear-or-log-all-cache-records.js';
import clearOrLogCacheRecordsById from '../utils/clear-or-log-cache-records-by-id.js';
import deleteOrClearCache from '../utils/delete-or-clear-cache.js';
import logCacheByCategory from '../utils/log-cache-by-category.js';
import switchCacheOption from '../utils/switch-cache-option.js';

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

  // 清理或者显示指定缓存 ID 的缓存信息
  if (groupId) {
    return clearOrLogCacheRecordsById(groupId, options);
  }

  /* -------- 全局相关的操作 -------- */
  // 关闭 cache 配置选项
  if (options?.off) {
    return switchCacheOption(false);
  }

  // 开启 cache 配置选项
  if (options?.on) {
    return switchCacheOption(true);
  }

  // 删除缓存文件或清理缓存记录
  if (options?.delete) {
    return deleteOrClearCache(options);
  }

  // 清理或者显示全部缓存记录
  if (options?.all) {
    return clearOrLogAllCacheRecords(options);
  }

  // 显示 source 为 dir 类型缓存记录
  if (options?.dirs) {
    return logCacheByCategory(options, 'dirs');
  }

  // 显示 source 为 group 类型缓存记录
  if (options?.groups) {
    return logCacheByCategory(options, 'groups');
  }

  /* -------- 未传递缓存记录 ID 时，读取配置文件的 dirPath 配置选项转化为缓存记录 ID -------- */
  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog(
      '警告',
      CONFIG_FILE_NAME,
      '配置文件中未设置 dirPath 配置选项，无法获取缓存记录 ID 执行相关操作',
    );
    return false;
  }

  return clearOrLogCacheRecordsById(
    `dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`,
    options,
  );
};

export default cacheCommandAction;
