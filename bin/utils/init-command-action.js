import chalk from 'chalk';

import terminalLink from './terminal-link.js';

import createConfig from '../../lib/create-config.js';

import CONSTANTS from '../../lib/constants.js';

const { CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL } = CONSTANTS;

const initCommandAction = (options) => {
  createConfig(options)
    .then(({ isCancel }) => {
      if (!isCancel) {
        console.log(
          chalk.green(
            `\n配置文件 ${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)} 已生成！`,
          ),
        );
        return false;
      }

      console.log(
        chalk.yellowBright(
          `\n已取消重写 ${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)} 配置文件！`,
        ),
      );
    })
    .catch((error) => {
      console.log(chalk.red(`生成配置文件失败：${error.message}`));
    });
};

export default initCommandAction;
