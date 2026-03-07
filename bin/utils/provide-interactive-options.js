import { select } from '@inquirer/prompts';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import isEmptyObject from '../../lib/utils/is-empty-object.js';

/**
 * # 无配置文件且未提供配置参数时，提供交互式选择
 *
 * @function provideInteractiveOptions
 * @param {object} options - 用户从命令行传入的配置选项
 * @returns {Promise<string>} - 返回用户对交互选择的结果
 */
const provideInteractiveOptions = async (options) => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_NAME } = CONSTANTS;
  let answer = '';

  // 无配置文件且未提供配置参数时，提供交互式选择
  if (!isFileExists(CONFIG_FILE_PATH) && isEmptyObject(options)) {
    answer = await select({
      message:
        `请指定命令或参数，或者创建配置文件 ${CONFIG_FILE_NAME}，\n` +
        '执行命令：renames -h，将显示 renames 命令的详细帮助信息，\n' +
        '执行命令：renames init，将创建命令配置文件，请选择后序操作？',
      pageSize: 3,
      choices: [
        {
          name: '执行命令：renames -h',
          value: 'help',
          description: '执行 renames -h 命令，显示帮助信息',
        },
        {
          name: '执行命令：renames init 命令',
          value: 'init',
          description: '执行命令：renames init，创建配置文件',
        },
        {
          name: '退出程序',
          value: 'exit',
          disabled: false,
        },
      ],
    });
  }

  return answer;
};

export default provideInteractiveOptions;
