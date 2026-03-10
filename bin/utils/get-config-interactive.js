import chalk from 'chalk';
import { input } from '@inquirer/prompts';

/**
 * # 交互式获取必填配置（提取重复交互逻辑，减少分支嵌套）
 *
 * @async
 * @function getConfigInteractive
 * @param {object} config - 目标配置对象
 * @param {string} key - 配置项键名
 * @param {string} promptText - 提示文本
 * @param {string} demoText - 示例文本
 * @returns {Promise<void>}
 */
const getConfigInteractive = async (config, key, promptText, demoText) => {
  if (!config[key]) {
    const answer = await input({
      message: chalk.greenBright(
        `可选，${promptText}（例如："${demoText}"）：`,
      ),
    });

    if (answer) {
      config[key] = answer;
    }
  }
};

export default getConfigInteractive;
