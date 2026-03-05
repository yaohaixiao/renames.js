import chalk from 'chalk';
import { input } from '@inquirer/prompts';

import CONSTANTS from '../../lib/constants.js';

/**
 * # 辅助函数：获取最终的文件夹路径
 *
 * @function getFinalDirPath
 * @param {string} dirPath - 命令行传入的路径
 * @param {object} options - 配置参数对象
 * @returns {Promise<string>} 最终的文件夹路径
 */
const getFinalDirPath = async (dirPath, options) => {
  const { DEMO_DIR_PATH } = CONSTANTS;

  // 优先使用命令行传入的路径
  if (dirPath) {
    return dirPath;
  }

  // 使用默认配置中的路径
  if (options?.dirPath) {
    return options.dirPath;
  }

  // 仅设置了 options.filesList
  if (options?.filesList) {
    return '';
  }

  // 交互式获取路径
  return await input({
    message: chalk.greenBright(
      `请输入需要执行重命名操作的文件夹路径（例如："${DEMO_DIR_PATH}"）：`,
    ),
  });
};

export default getFinalDirPath;
