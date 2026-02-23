import chalk from 'chalk';
import { select } from '@inquirer/prompts';

import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import isEmptyObject from '../../lib/utils/is-empty-object.js';
import readFile from '../../lib/utils/read-file.js';
import renames from '../../index.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';

import getFinalDirPath from '../utils/get-final-dir-path.js';
import executeHelpCommand from '../utils/execute-help-command.js';
import executeInitCommand from '../utils/execute-init-command.js';
import processNamesList from '../utils/process-names-list.js';
import terminalLink from '../utils/terminal-link.js';

/**
 * # 主命令的 action 逻辑
 *
 * @function mainCommandAction
 * @param {string} dirPath - 目标文件夹（绝对或相对）路径
 * @param {object} options - 配置参数对象
 * @returns {void}
 */
const mainCommandAction = async (dirPath, options) => {
  const {
    DEFAULT_CONFIG_PATH,
    CONFIG_FILE_NAME,
    CONFIG_FILE_PATH,
    CONFIG_FILE_PATH_URL,
  } = CONSTANTS;
  let answer;

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
          name: '退出',
          value: 'exit',
          disabled: false,
        },
      ],
    });
  }

  switch (answer) {
    case 'help': {
      executeHelpCommand();
      break;
    }
    case 'init': {
      executeInitCommand();
      break;
    }
    case 'exit': {
      console.log(chalk.green('\n已安全退出！'));
      break;
    }
    default: {
      // 获取配置文件内容
      const content = readFile(DEFAULT_CONFIG_PATH, { encoding: 'utf8' });
      const defaults = isFileExists(CONFIG_FILE_PATH)
        ? await getOptionsFromConfigJs()
        : JSON.parse(content);
      const config = defaults.default || defaults;

      // 获取最终的文件夹路径
      const finalDirPath = await getFinalDirPath(dirPath, config);

      // 合并命令行输入的配置参数
      const finalOptions = { ...config, ...options };
      const { namesList } = finalOptions;

      // 将 namesList 中的数据转化成数组格式的数据
      if (namesList) {
        finalOptions.namesList = processNamesList(namesList);
      }

      if (finalDirPath) {
        // 执行重命名
        renames(finalDirPath, finalOptions);
      } else if (isFileExists(CONFIG_FILE_PATH)) {
        // 提示修改配置文件中的 dirPath
        showWarningLog(
          '警告',
          `${terminalLink(CONFIG_FILE_PATH, CONFIG_FILE_PATH_URL)}`,
          '已生成，可配置 dirPath 属性后再执行 renames 命令。',
        );
      } else {
        showWarningLog(
          '警告',
          '执行重命名操作的文件夹路径',
          '未接受到任何信息，已退出程序。',
        );
      }
      break;
    }
  }
};

export default mainCommandAction;
