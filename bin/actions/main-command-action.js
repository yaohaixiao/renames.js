import chalk from 'chalk';

import executeHelpCommand from '../utils/execute-help-command.js';
import executeInitCommand from '../utils/execute-init-command.js';
import executeMainCommand from '../utils/execute-main-command.js';
import provideInteractiveOptions from '../utils/provide-interactive-options.js';

/**
 * # 主命令的 action 逻辑
 *
 * @async
 * @function mainCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} options - 配置参数对象
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const mainCommandAction = async (dirPath, options) => {
  const answer = provideInteractiveOptions(options);

  switch (answer) {
    case 'help': {
      executeHelpCommand();
      return true;
    }
    case 'init': {
      executeInitCommand();
      return true;
    }
    case 'exit': {
      console.log(chalk.green('\n已退出程序！'));
      return false;
    }
    default: {
      return await executeMainCommand(dirPath, options);
    }
  }
};

export default mainCommandAction;
