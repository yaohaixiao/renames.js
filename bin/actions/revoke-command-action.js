import { v5 } from 'uuid';

import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import uuidToArray from '../../lib/utils/uuid-to-array.js';

import revokeCacheRecordsByCategory from '../utils/revoke-cache-records-by-category.js';
import revokeCacheRecordsById from '../utils/revoke-cache-records-by-id.js';

/**
 * # revoke 命令的 action 逻辑
 *
 * @function revokeCommandAction
 * @param {string} groupId - 缓存记录 id
 * @param {object} options - 配置参数对象
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const revokeCommandAction = async (groupId = '', options = null) => {
  const { CONFIG_FILE_NAME, NAMESPACE_OID } = CONSTANTS;

  // 传入的 groupId，撤销对应的重命名操作
  if (groupId) {
    // 恢复缓存的操作记录
    return revokeCacheRecordsById(groupId);
  }

  /* -------- 全局相关的操作 -------- */

  // 撤销 source 为 dir 类型缓存记录的重命名操作
  if (options?.dirs) {
    return revokeCacheRecordsByCategory('dirs');
  }

  // 撤销 source 为 group 类型缓存记录的重命名操作
  if (options?.groups) {
    return revokeCacheRecordsByCategory('groups');
  }

  // 撤销所有缓存记录中的重命名操作
  if (options?.all) {
    return revokeCacheRecordsByCategory('all');
  }

  /* -------- 未传递缓存记录 ID 时，读取配置文件的 dirPath 配置选项转化为缓存记录 ID -------- */
  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog(
      '警告',
      CONFIG_FILE_NAME,
      '配置文件中未设置 dirPath 配置选项，无法获取缓存记录 ID 执行撤销操作',
    );
    return false;
  }

  return revokeCacheRecordsById(
    `dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`,
  );
};

export default revokeCommandAction;
