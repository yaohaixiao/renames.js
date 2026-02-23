#!/usr/bin/env node

import { program } from 'commander';

import CONSTANTS from '../lib/constants.js';

import addCommandOptions from './utils/add-command-options.js';
import cacheCommandAction from './actions/cache-command-action.js';
import initCommandAction from './actions/init-command-action.js';
import mainCommandAction from './actions/main-command-action.js';
import revokeCommandAction from './actions/revoke-command-action.js';

const { CONFIG_FILE_NAME, CACHE_FILE_NAME, PACKAGE_JSON } = CONSTANTS;
const { version, author, description } = PACKAGE_JSON;

// 配置主程序
const mainCommand = program
  .name('renames')
  .description(description)
  .version(`renames.js [version：${version}]\n(C) ${author}，保留所有权利。`)
  .usage('[arguments|command] [options]');

// 主命令添加选项
addCommandOptions(mainCommand);

// 主命令逻辑
mainCommand
  .argument(
    '[dir-path]',
    `可选，目标文件夹（绝对或相对）路径，如不设置，则使用 ${CONFIG_FILE_NAME} 中的 dirPath 属性`,
  )
  .action(mainCommandAction);

// 配置 init 命令
const initCommand = program
  .command('init')
  .description(`用以生成配置文件 ${CONFIG_FILE_NAME}`);

// init 命令添加选项
addCommandOptions(initCommand, 'init');

// init 命令逻辑
initCommand.action(initCommandAction);

// 配置 revoke 命令
const revokeCommand = program
  .command('revoke')
  .description(`开启缓存重命名结果后，用来撤某个目录或者全部重命名操作`);

// revoke 命令添加选项
addCommandOptions(revokeCommand, 'revoke');

// revoke 命令逻辑
revokeCommand
  .argument(
    '[dir-path]',
    `可选，目标文件夹（绝对或相对）路径，如不设置，则使用 ${CACHE_FILE_NAME} 中的 dirPath 属性`,
  )
  .action(revokeCommandAction);

// 配置 cache 命令
const cacheCommand = program
  .command('cache')
  .description(
    `显示缓存文件中的数据和调整配置文件中 cache 配置选项的开启或关闭状态`,
  );

// cache 命令添加选项
addCommandOptions(cacheCommand, 'cache');

// cache 命令逻辑
cacheCommand
  .argument(
    '[dir-path]',
    `可选，目标文件夹（绝对或相对）路径，如不设置，则是进行全局的（查看或清除全部的缓存数据）操作`,
  )
  .action(cacheCommandAction);

program.parse(process.argv);
