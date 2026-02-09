#!/usr/bin/env node

import { program } from 'commander';

import addCommonOptions from './utils/add-common-options.js';
import initCommandAction from './utils/init-command-action.js';
import mainCommandAction from './utils/main-command-action.js';

import CONSTANTS from '../lib/constants.js';

const { DEMO_DIR_PATH, CONFIG_FILE_NAME, PACKAGE_JSON } = CONSTANTS;
const { version, author, description } = PACKAGE_JSON;

// 配置主程序
const mainCommander = program
  .name('renames')
  .description(description)
  .version(`renames.js [version：${version}]\n(C) ${author}，保留所有权利。`)
  .usage('[arguments|command] [options]');

// 主程序添加通用选项
addCommonOptions(mainCommander);

// 主命令逻辑
mainCommander
  .argument(
    '[dir-path]',
    `可选，目标文件夹（绝对或相对）路径，如不设置，则使用 ${CONFIG_FILE_NAME} 中的 dirPath 属性。`,
  )
  .action(mainCommandAction);

// 配置 init 命令
const initCommand = program
  .command('init')
  .description(`用以生成"${CONFIG_FILE_NAME}"配置文件`);

// init 命令添加 dirPath 选项
initCommand.option(
  '--dir, --dirPath <dirPath>',
  `可选，目标文件夹（绝对或相对）路径，例如：${DEMO_DIR_PATH}`,
);

// init 命令添加通用选项
addCommonOptions(initCommand);

// init 命令逻辑
initCommand.action(initCommandAction);

program.parse(process.argv);
