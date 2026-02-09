import chalk from 'chalk';
import { input } from '@inquirer/prompts';

import CONSTANTS from '../../lib/constants.js';

const { DEMO_DIR_PATH } = CONSTANTS;

/**
 * # 辅助函数：获取最终的文件夹路径
 *
 * @function getFinalDirPath
 * @param {string} dirPath - 命令行传入的路径
 * @param {object} options - 默认配置
 * @returns {Promise<string>} 最终的文件夹路径
 */
async function getFinalDirPath(dirPath, options) {
  // 优先使用命令行传入的路径
  if (dirPath) {
    return dirPath;
  }

  // 使用默认配置中的路径
  if (options?.dirPath) {
    return options.dirPath;
  }

  // 交互式获取路径
  return await input({
    message: chalk.greenBright(
      `请输入需要执行重命名操作的文件夹路径（例如："${DEMO_DIR_PATH}"）：`,
    ),
  });
}

export default getFinalDirPath;
