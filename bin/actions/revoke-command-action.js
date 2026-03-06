import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';

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
  let finalGroupId = groupId;

  // 未传入的 dirPath 值，进行全局操作，或者读取配置文件中的 dirPath 值
  if (finalGroupId) {
    // 恢复缓存的操作记录
    return revokeGroupRecords(finalGroupId);
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
  finalGroupId = getOptionsFromConfigJs('dirPath');

  return revokeGroupRecords(finalGroupId);
};

export default revokeCommandAction;
