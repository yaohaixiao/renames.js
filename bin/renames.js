#!/usr/bin/env node

import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { program } from 'commander';
import chalk from 'chalk';
import { select, input } from '@inquirer/prompts';

import createConfig from '../lib/create-config.js';
import isFileExists from '../lib/utils/is-file-exists.js';
import isEmptyObject from '../lib/utils/is-empty-object.js';
import readFile from '../lib/utils/read-file.js';
import renames from '../index.js';
import showWarningLog from '../lib/utils/show-warning-log.js';

const { resolve, dirname } = path;
const currentFilePath = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFile(resolve(currentFilePath, '../package.json')));
const { version, author, description } = pkg;

// 配置文件相关常量
const CONSTANTS = {
  CONFIG_FILE_NAME: 'renames.config.json',
  DEMO_FOLDER_PATH: String.raw`C:\Downloads\Videos`,
  DEMO_LIST_PATH: String.raw`C:\Downloads\names.txt`,
  DEMO_LIST_DATA: '悟空成了通缉犯,当牙医的悟空',
  DEMO_FILE_NAME: '第01话：新的开始.mp4',
  DEMO_FULL_FILE_NAME: '动画片-第01话：新的开始-1080p.mp4',
  DEFAULT_SORT: 'name',
  DEFAULT_ORDER: 'desc',
  DEFAULT_SENSITIVITY: 'base',
  DEFAULT_INDEX_PREFIX: '第',
  DEFAULT_INDEX_SUFFIX: '集',
  DEFAULT_DELIMITER: '：',
  DEFAULT_START_INDEX: 0,
};

// 解构常量
const {
  CONFIG_FILE_NAME,
  DEMO_FOLDER_PATH,
  DEMO_LIST_PATH,
  DEMO_LIST_DATA,
  DEMO_FILE_NAME,
  DEMO_FULL_FILE_NAME,
  DEFAULT_SORT,
  DEFAULT_ORDER,
  DEFAULT_SENSITIVITY,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_START_INDEX,
} = CONSTANTS;

// 配置文件路径
const CONFIG_PATH = resolve(currentFilePath, `../${CONFIG_FILE_NAME}`);
const DEFAULT_CONFIG_PATH = resolve(
  currentFilePath,
  '../config/default.config.json',
);

/**
 * # 辅助函数：解析布尔型 CLI 参数
 *
 * @function parseBooleanOption
 * @param {string} enable - 输入的参数值
 * @param {boolean} defaultValue - 默认值
 * @returns {boolean} 解析后的布尔值
 */
const parseBooleanOption = (enable, defaultValue = false) => {
  switch (enable) {
    case '1':
    case 'true': {
      return true;
    }
    case '0':
    case 'false': {
      return false;
    }
    default: {
      return defaultValue;
    }
  }
};

/**
 * # 辅助函数：解析数值型 CLI 参数
 *
 * @function parseNumberOption
 * @param {string} value - 输入的参数值
 * @param {number} defaultValue - 默认值
 * @param {string} paramName - 参数名（用于错误提示）
 * @returns {number} 解析后的数值
 */
const parseNumberOption = (
  value,
  defaultValue = DEFAULT_START_INDEX,
  paramName = '--startIndex',
) => {
  const numValue = Number(value);
  if (Number.isNaN(numValue)) {
    showWarningLog(
      '警告',
      `${value} 为无效数字`,
      `${paramName} 必须传入合法数值，将使用默认值"${defaultValue}"。`,
    );
    return defaultValue;
  }
  return numValue;
};

/**
 * # 辅助函数：获取通用的 CLI 选项配置
 *
 * @function getCommonOptions
 * @returns {Array} 选项配置数组
 */
const getCommonOptions = () => [
  {
    flags: '--names, --namesList <namesList>',
    description: `文件名列表数组数据，例如："${DEMO_LIST_DATA}"。或者文件名列表文件的路径，例如："${DEMO_LIST_PATH}"。`,
  },
  {
    flags: '--prefix <prefix>',
    description: `文件名的前缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"动画片"`,
  },
  {
    flags: '--suffix <suffix>',
    description: `文件名的后缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"1080p"`,
  },
  {
    flags: '--connector <connector>',
    description: `文件名的前/后缀字符串间的连接字符串，例如："${DEMO_FULL_FILE_NAME}"中的"-"`,
  },
  {
    flags: '--autoIndex [enable]',
    description: '是否自动生成索引编号（default：false）',
    parser: (enable) => parseBooleanOption(enable, false),
  },
  {
    flags: '--startIndex <startIndex>',
    description: `索引编号起始值（default：${DEFAULT_START_INDEX}）`,
    parser: (index) => parseNumberOption(index, DEFAULT_START_INDEX),
  },
  {
    flags: '--indexPadZero [enable]',
    description: '是否自动用"0"填充索引编号（default：true）',
    parser: (enable) => parseBooleanOption(enable, true),
  },
  {
    flags: '--indexPrefix <indexPrefix>',
    description: `索引编号的前缀字符串，例如："${DEMO_FILE_NAME}"中的"第"`,
    defaultValue: DEFAULT_INDEX_PREFIX,
  },
  {
    flags: '--indexSuffix <indexSuffix>',
    description: `索引编号的后缀字符串，例如："${DEMO_FILE_NAME}"中的"话"`,
    defaultValue: DEFAULT_INDEX_SUFFIX,
  },
  {
    flags: '--delimiter <delimiter>',
    description: `索引编号和的前/后缀字符串间的连接符，例如："${DEMO_FILE_NAME}"中的"："`,
    defaultValue: DEFAULT_DELIMITER,
  },
  {
    flags: '-f, --force [enable]',
    description: '是否强制重命名（default：false）',
    parser: (enable) => parseBooleanOption(enable, false),
  },
  {
    flags: '--ext, --extname <extname>',
    description: '重命名后的扩展名，例如：".txt"',
  },
  {
    flags: '--sort, --sortBy <sortBy>',
    description: '排序类型，可选项：name、type、size、birthtime 和 modify-time',
    defaultValue: DEFAULT_SORT,
  },
  {
    flags: '--order <order>',
    description: '排序方式，可选项：desc 和 asc',
    defaultValue: DEFAULT_ORDER,
  },
  {
    flags: '--sensitivity <sensitivity>',
    description:
      'name 排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant',
    defaultValue: DEFAULT_SENSITIVITY,
  },
];

/**
 * # 辅助函数：为 Commander 实例添加通用选项
 *
 * @function addCommonOptions
 * @param {object} commanderInstance - Commander 实例
 */
const addCommonOptions = (commanderInstance) => {
  const commonOptions = getCommonOptions();

  for (const option of commonOptions) {
    if (option.parser) {
      commanderInstance.option(
        option.flags,
        option.description,
        option.parser,
        option.defaultValue,
      );
    } else if (option.defaultValue) {
      commanderInstance.option(
        option.flags,
        option.description,
        option.defaultValue,
      );
    } else {
      commanderInstance.option(option.flags, option.description);
    }
  }
};

/**
 * # 辅助函数：处理文件名列表参数
 *
 * @function processNameList
 * @param {string} nameList - 输入的文件名列表（路径或逗号分隔字符串）
 * @returns {Array | string} 解析后的数组或原路径
 */
const processNameList = (nameList) => {
  if (!nameList) return '';

  // 如果不是文件路径，解析为数组
  if (!isFileExists(nameList)) {
    return nameList.split(',').map((item) => item.trim());
  }

  return nameList;
};

/**
 * # 辅助函数：获取最终的文件夹路径
 *
 * @function getFinalFolderPath
 * @param {string} targetPath - 命令行传入的路径
 * @param {object} defaults - 默认配置
 * @returns {Promise<string>} 最终的文件夹路径
 */
async function getFinalFolderPath(targetPath, defaults) {
  // 优先使用命令行传入的路径
  if (targetPath) {
    return targetPath;
  }

  // 使用默认配置中的路径
  if (defaults?.folderPath) {
    return defaults.folderPath;
  }

  // 交互式获取路径
  return await input({
    message: chalk.greenBright(
      `请输入需要执行重命名操作的文件夹路径（例如："${DEMO_FOLDER_PATH}"）：`,
    ),
  });
}

/**
 * # 辅助函数：执行帮助命令
 *
 * @function executeHelpCommand
 */
const executeHelpCommand = () => {
  execSync('renames -h', {
    encoding: 'utf8',
    stdio: 'inherit',
  });
};

/**
 * # 辅助函数：执行初始化命令
 *
 * @function executeInitCommand
 */
const executeInitCommand = () => {
  execSync('renames init -h', {
    encoding: 'utf8',
    stdio: 'inherit',
  });
};

// 配置主程序
const mainCommander = program
  .name('renames')
  .description(description)
  .version(`renames.js [version：${version}]\n(C) ${author}，保留所有权利。`)
  .usage('[arguments|command] [options]');

// 主程序添加通用选项
addCommonOptions(mainCommander);

// 主命令逻辑
mainCommander.arguments('[target-path]').action(async (targetPath, options) => {
  let answer;

  // 无配置文件且无选项时，提供交互式选择
  if (!isFileExists(CONFIG_PATH) && isEmptyObject(options)) {
    answer = await select({
      message:
        `请指定命令的必要参数，或者创建 ${CONFIG_FILE_NAME} 配置文件，\n` +
        '执行命令：renames -h 将显示 renames 命令的详细参数帮助信息，\n' +
        '执行命令：renames init 将创建命令配置文件，请选择后序操作？',
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
      console.log(chalk.green('\n已退出！'));
      break;
    }
    default: {
      // 获取配置文件内容
      const configPath = isFileExists(CONFIG_PATH)
        ? CONFIG_PATH
        : DEFAULT_CONFIG_PATH;
      const content = readFile(configPath, { encoding: 'utf8' });
      const defaults = JSON.parse(content);

      // 获取最终的文件夹路径
      const finalFolderPath = await getFinalFolderPath(targetPath, defaults);

      // 合并配置并处理文件名列表
      const finalOptions = { ...defaults, ...options };

      finalOptions.namesList = processNameList(finalOptions.namesList);

      // 执行重命名
      renames(finalFolderPath, finalOptions);
      break;
    }
  }
});

// 配置 init 命令
const initCommand = program
  .command('init')
  .description(`用以生成"${CONFIG_FILE_NAME}"配置文件`);

// init 命令添加通用选项
addCommonOptions(initCommand);

// init 命令逻辑
initCommand.action((options) => {
  createConfig(options)
    .then(() => {
      console.log(chalk.green(`\n${CONFIG_FILE_NAME} 配置文件已生成！`));
    })
    .catch((error) => {
      console.log(chalk.red(`生成配置文件失败：${error.message}`));
    });
});

program.parse(process.argv);
