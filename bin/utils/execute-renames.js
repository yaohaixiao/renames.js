import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import renames from '../../index.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import terminalLink from '../utils/terminal-link.js';

/**
 * # 执行重命名程序
 *
 * @function executeRenames
 * @param {string} dirPath - 需要执行重命名的文件夹路径
 * @param {Array} files - 需要执行重命名的文件数组
 * @param {object} options - 执行重命名的配置信息对象
 * @returns {boolean} - 执行成功，返回 true，否则返回 false
 */
const executeRenames = (dirPath, files, options) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL } = CONSTANTS;
  const filesCount = files.length;

  // 将配置信息中的 files 转成数组格式
  if (filesCount > 0) {
    options.files = files;
  }

  // 场景1：仅设置了 dirPath
  if (dirPath && filesCount === 0) {
    return renames(dirPath, options);
  }
  if (!dirPath && filesCount > 0) {
    // 场景2：仅设置了 files
    return renames(files, options);
  }
  if (dirPath && filesCount > 0) {
    // 场景3：同时设置了 dirPath 和 files
    return renames(dirPath, options);
  }
  if (isFileExists(CONFIG_FILE_PATH)) {
    // 配置文件已创建，提示修改配置中的 dirPath 或者 files
    showWarningLog(
      '警告',
      `${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)}`,
      '已生成，可配置 dirPath 或者 files 属性后再执行 renames 命令',
    );
    return false;
  }
  // 配置文件未创建，显示警告信息
  showWarningLog(
    '警告',
    '执行重命名操作的 dirPath （文件夹路径）或者 files （文件数据）',
    '未接受到任何信息，已退出程序',
  );
  return false;
};

export default executeRenames;
