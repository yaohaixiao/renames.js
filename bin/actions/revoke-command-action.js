import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import revokeGroupsRecordsByCategory from '../utils/revoke-groups-records-by-category.js';
import revokeGroupRecords from '../utils/revoke-group-records.js';

/**
 * # revoke 命令的 action 逻辑
 *
 * @function revokeCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} options - 配置参数对象
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const revokeCommandAction = async (dirPath = '', options = null) => {
  const { parse } = JSON;
  const { CONFIG_FILE_NAME, CACHE_FILE_NAME, CACHE_FILE_PATH } = CONSTANTS;

  let groupId = dirPath;
  let renames = {};

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在，无任何数据可恢复');
    return false;
  }

  renames = parse(readFile(CACHE_FILE_PATH));

  // 未传入的 dirPath 值，进行全局操作，或者读取配置文件中的 dirPath 值
  if (groupId) {
    // 恢复缓存的操作记录
    revokeGroupRecords(renames, groupId);
  } else {
    // options 配置了 all 则还原所有数据
    if (options.all) {
      return revokeGroupsRecordsByCategory(renames, 'all');
    }
    if (options.dirs) {
      // options 配置了 dirs 则还原所有 dirPath 数据
      return revokeGroupsRecordsByCategory(renames, 'dirs');
    }
    if (options.groups) {
      // options 配置了 groups 则还原所有 files 数据
      return revokeGroupsRecordsByCategory(renames, 'groups');
    }
    // 读取配置文件
    const config = await import(`../../${CONFIG_FILE_NAME}`);

    // 使用 renames.config.js 中的 dirPath 参数
    groupId = config?.default?.dirPath || '';

    revokeGroupRecords(renames, groupId);
  }

  return true;
};

export default revokeCommandAction;
