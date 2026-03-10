import CONSTANTS from '../../lib/constants.js';
import createConfig from '../../lib/create-config.js';
import showSuccessLog from '../../lib/utils/show-success-log.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

import terminalLink from '../../lib/utils/terminal-link.js';

/**
 * # init 命令的 action 逻辑
 *
 * @async
 * @function initCommandAction
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const initCommandAction = async (options) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL } = CONSTANTS;

  return createConfig(options)
    .then(({ isCancel }) => {
      // 取消重写配置文件
      if (isCancel) {
        showWarningLog(
          '\n提示',
          '已取消重写配置文件',
          `稍后可手动编辑：${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)}`,
        );
        return false;
      }

      showSuccessLog(
        '\n成功',
        terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL),
        '配置文件已生成',
      );
      return true;
    })
    .catch((error) => {
      throw new Error(`${error.message}`);
    });
};

export default initCommandAction;
