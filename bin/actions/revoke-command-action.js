import { v5 } from 'uuid';

import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import uuidToArray from '../../lib/utils/uuid-to-array.js';

import revokeGroupsRecordsByCategory from '../utils/revoke-groups-records-by-category.js';
import revokeGroupRecords from '../utils/revoke-group-records.js';

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
    return revokeGroupRecords(groupId);
  }

  // options 配置了 all 则还原所有数据
  if (options?.all) {
    return revokeGroupsRecordsByCategory('all');
  }

  if (options?.dirs) {
    // options 配置了 dirs 则还原所有 dirPath 数据
    return revokeGroupsRecordsByCategory('dirs');
  }

  if (options?.groups) {
    // options 配置了 groups 则还原所有 files 数据
    return revokeGroupsRecordsByCategory('groups');
  }

  // 使用 renames.config.js 中的 dirPath 参数
  const dirPath = await getOptionsFromConfigJs('dirPath');

  if (!dirPath) {
    showWarningLog(
      '警告',
      CONFIG_FILE_NAME,
      '配置文件中未设置 dirPath 配置选项，无法获取缓存记录 ID 执行撤销操作',
    );
    return false;
  }

  return revokeGroupRecords(`dir-${v5(dirPath, uuidToArray(NAMESPACE_OID))}`);
};

export default revokeCommandAction;
