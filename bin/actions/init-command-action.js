import chalk from 'chalk';

import CONSTANTS from '../../lib/constants.js';
import createConfig from '../../lib/create-config.js';

import terminalLink from '../utils/terminal-link.js';

/**
 * # init 命令的 action 逻辑
 *
 * @function initCommandAction
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const initCommandAction = async (options) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL } = CONSTANTS;

  return createConfig(options)
    .then(({ isCancel }) => {
      if (!isCancel) {
        console.log(
          chalk.green(
            `\n成功: ${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)} 配置文件已生成！`,
          ),
        );
        return true;
      }

      console.log(
        chalk.yellowBright(
          `\n提示: 已取消重写 ${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)} 配置文件！`,
        ),
      );
      return false;
    })
    .catch((error) => {
      throw new Error(`${error.message}`);
    });
};

export default initCommandAction;
