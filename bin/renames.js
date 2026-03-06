#!/usr/bin/env node

import { program } from 'commander';

import CONSTANTS from '../lib/constants.js';

import addCommandOptions from './utils/add-command-options.js';
import setupGracefulExit from './utils/setup-graceful-exit.js';
import cacheCommandAction from './actions/cache-command-action.js';
import initCommandAction from './actions/init-command-action.js';
import mainCommandAction from './actions/main-command-action.js';
import revokeCommandAction from './actions/revoke-command-action.js';

const {
  DEMO_DIR_PATH,
  DEMO_GROUP_ID,
  DEMO_DIR_ID,
  CONFIG_FILE_NAME,
  CACHE_FILE_NAME,
  PACKAGE_JSON,
} = CONSTANTS;
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
    `可选，执行重命名操作的目标文件夹（绝对或相对）路径，例如："${DEMO_DIR_PATH}"。如不设置，则使用配置文件 ${CONFIG_FILE_NAME} 中的 dirPath 属性`,
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
  .description(
    `开启缓存重命名记录后，用来撤指定记录ID、或者 source 类型、以及全部重命名操作`,
  );

// revoke 命令添加选项
addCommandOptions(revokeCommand, 'revoke');

// revoke 命令逻辑
revokeCommand
  .argument(
    '[group-id]',
    `可选，指定缓存文件中的记录ID值，例如："${DEMO_DIR_ID}" 或者 "${DEMO_GROUP_ID}"（UUID 指 32 位字符的字符串）。\n如不设置，则使用配置文件 ${CACHE_FILE_NAME} 中的 dirPath 属性转化为 dir-UUID 格式，作为记录ID值`,
  )
  .action(revokeCommandAction);

// 配置 cache 命令
const cacheCommand = program
  .command('cache')
  .description(
    `开启缓存重命名记录后，用来删除缓存记录文件，或者显示或者清理定记录ID、或者 source 类型、以及全部缓存记录。也可以调整 ${CONFIG_FILE_NAME} 配置文件中的 cache 配置选项`,
  );

// cache 命令添加选项
addCommandOptions(cacheCommand, 'cache');

// cache 命令逻辑
cacheCommand
  .argument(
    '[group-id]',
    `指定缓存文件中的记录ID值，例如："${DEMO_DIR_ID}" 或者 "${DEMO_GROUP_ID}"（UUID 指 32 位字符的字符串）。\n如不设置，则使用配置文件 ${CACHE_FILE_NAME} 中的 dirPath 属性转化为 dir-UUID 格式，作为记录ID值`,
  )
  .action(cacheCommandAction);

setupGracefulExit();

program.parse(process.argv);
