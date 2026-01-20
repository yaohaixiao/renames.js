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

const CONFIG_FILE_NAME = 'renames.config.json';
const CONFIG_PATH = resolve(currentFilePath, `../${CONFIG_FILE_NAME}`);
const DEFAULT_CONFIG_PATH = resolve(
  currentFilePath,
  '../config/default.config.json',
);
const DEMO_FOLDER_PATH = String.raw`C:\Downloads\Videos`;
const DEMO_LIST_PATH = String.raw`C:\Downloads\names.txt`;
const DEMO_FILE_NAME = '第01话：新的开始.mp4';
const DEMO_FULL_FILE_NAME = '动画片-第01话：新的开始-1080p.mp4';

program
  .name('renames')
  .description(description)
  .version(`renames.js [version：${version}]\n(C) ${author}，保留所有权利。`)
  .usage('[arguments|command] [options]')
  .option(
    '--names, --namesList <namesList>',
    `指定文件名列表数组数据或者文件名列表的路径，例如："${DEMO_LIST_PATH}"`,
  )
  .option(
    '--prefix <prefix>',
    `文件名的前缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"动画片"`,
  )
  .option(
    '--suffix <suffix>',
    `文件名的后缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"1080p"`,
  )
  .option(
    '--connector <connector>',
    `文件名的前/后缀字符串间的连接字符串，例如："${DEMO_FULL_FILE_NAME}"中的"-"`,
  )
  .option(
    '--autoIndex [enable]',
    '是否自动生成索引编号（default：false）',
    (enable) => {
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
          return false;
        }
      }
    },
  )
  .option(
    '--startIndex <startIndex>',
    '索引编号起始值（default：0）',
    (index) => {
      /*
       * argParser：参数处理函数，将字符串转为数值
       * 可选：增加合法性校验，避免非数字参数
       */
      const startIndex = Number(index);
      if (Number.isNaN(startIndex)) {
        showWarningLog(
          '警告',
          `${index} 为无效数字`,
          '--startIndex 必须传入合法数值，将使用默认值"0"。',
        );
        return 0;
      }
      return startIndex;
    },
  )
  .option(
    '--indexPadZero [enable]',
    '是否自动用"0"填充索引编号（default：true）',
    (enable) => {
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
          return true;
        }
      }
    },
  )
  .option(
    '--indexPrefix <indexPrefix>',
    `索引编号的前缀字符串，例如："${DEMO_FILE_NAME}"中的"第"`,
    '第',
  )
  .option(
    '--indexSuffix <indexSuffix>',
    `索引编号的后缀字符串，例如："${DEMO_FILE_NAME}"中的"话"`,
    '集',
  )
  .option(
    '--delimiter <delimiter>',
    `索引编号和的前/后缀字符串间的连接符，例如："${DEMO_FILE_NAME}"中的"："`,
    '：',
  )
  .option(
    '-f, --force [enable]',
    '是否强制重命名（default：true）',
    (enable) => {
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
          return true;
        }
      }
    },
  )
  .option('--ext, --extname <extname>', '重命名后的扩展名，例如：".txt"')
  .option(
    '--sort, --sortBy <sortBy>',
    '排序类型，可选项：name、type、size、birthtime 和 modify-time',
    'name',
  )
  .option('--order <order>', '排序方式，可选项：desc 和 asc', 'desc')
  .option(
    '--sensitivity <sensitivity>',
    'name 排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant',
    'base',
  )
  .arguments('[target-path]')
  .action(async (targetPath, options) => {
    let answer;

    if (!isFileExists(CONFIG_PATH) && isEmptyObject(options)) {
      answer = await select({
        message:
          `请指定命令的必要参数，或者创建 ${CONFIG_FILE_NAME} 配置文件，\n` +
          '执行命令：renames -h 将显示 renames 命令的详细参数帮助信息，\n' +
          '执行命令：renames init 将创建命令配置文件，请选择后序操作？',
        // 可选，配置每页展示的备选项数量（避免选项过多时溢出）
        pageSize: 3,
        // 配置备选项
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
        execSync('renames -h', {
          // 配置返回结果编码为 utf8（默认返回 Buffer 二进制数据）
          encoding: 'utf8',
          // 可选：将子进程的输入/输出继承到当前 CLI 进程（直接在终端打印命令输出）
          stdio: 'inherit',
        });
        break;
      }
      case 'init': {
        execSync('renames init -h', {
          // 配置返回结果编码为 utf8（默认返回 Buffer 二进制数据）
          encoding: 'utf8',
          // 可选：将子进程的输入/输出继承到当前 CLI 进程（直接在终端打印命令输出）
          stdio: 'inherit',
        });
        break;
      }
      case 'exit': {
        console.log(chalk.green('\n已退出！'));
        break;
      }
      default: {
        const configPath = isFileExists(CONFIG_PATH)
          ? CONFIG_PATH
          : DEFAULT_CONFIG_PATH;
        const content = readFile(configPath, { encoding: 'utf8' });
        const defaults = JSON.parse(content);
        const { folderPath } = defaults;

        let finalFolderPath = '';

        if (targetPath) {
          finalFolderPath = targetPath;
        } else if (folderPath) {
          finalFolderPath = folderPath;
        } else if (!folderPath) {
          answer = await input({
            message: chalk.greenBright(
              `请输入需要执行重命名操作的文件夹路径（例如："${DEMO_FOLDER_PATH}"）：`,
            ),
          });
          finalFolderPath = answer;
        }

        const finalOptions = Object.assign(defaults, options);

        renames(finalFolderPath, finalOptions);
        break;
      }
    }
  });

program
  .command('init')
  .description(`用以生成"${CONFIG_FILE_NAME}"配置文件`)
  .option(
    '--folder, --folderPath <folderPath>',
    `指定要重命名的文件夹路径，例如："${DEMO_FOLDER_PATH}"`,
  )
  .option(
    '--names, --namesList <namesList>',
    `指定文件名列表数组数据或者文件名列表的路径，例如："${DEMO_LIST_PATH}"`,
  )
  .option(
    '--prefix <prefix>',
    `文件名的前缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"动画片"`,
  )
  .option(
    '--suffix <suffix>',
    `文件名的后缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"1080p"`,
  )
  .option(
    '--connector <connector>',
    `文件名的前/后缀字符串间的连接字符串，例如："${DEMO_FULL_FILE_NAME}"中的"-"`,
  )
  .option(
    '--autoIndex [enable]',
    '是否自动生成索引编号（default：false）',
    (enable) => {
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
          return false;
        }
      }
    },
  )
  .option(
    '--startIndex <startIndex>',
    '索引编号起始值（default：0）',
    (index) => {
      /*
       * argParser：参数处理函数，将字符串转为数值
       * 可选：增加合法性校验，避免非数字参数
       */
      const startIndex = Number(index);
      if (Number.isNaN(startIndex)) {
        showWarningLog(
          '警告',
          `${index} 为无效数字`,
          '--startIndex 必须传入合法数值，将使用默认值"0"。',
        );
        return 0;
      }
      return startIndex;
    },
  )
  .option(
    '--indexPadZero [enable]',
    '是否自动用"0"填充索引编号（default：true）',
    (enable) => {
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
          return true;
        }
      }
    },
  )
  .option(
    '--indexPrefix <indexPrefix>',
    `索引编号的前缀字符串，例如："${DEMO_FILE_NAME}"中的"第"`,
    '第',
  )
  .option(
    '--indexSuffix <indexSuffix>',
    `索引编号的后缀字符串，例如："${DEMO_FULL_FILE_NAME}"中的"话"`,
    '集',
  )
  .option(
    '--delimiter <delimiter>',
    `索引编号和的前/后缀字符串间的连接符，例如："${DEMO_FULL_FILE_NAME}"中的"："`,
    '：',
  )
  .option(
    '-f, --force [enable]',
    '是否强制重命名（default：true）',
    (enable) => {
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
          return true;
        }
      }
    },
  )
  .option('--ext, --extname <extname>', '重命名后的扩展名，例如：".txt"')
  .option(
    '--sort, --sortBy <sortBy>',
    '排序方式，可选项：name、type、size、birthtime 和 modify-time',
    'name',
  )
  .option('--order <order>', '排序方式，可选项：desc 和 asc', 'desc')
  .option(
    '--sensitivity <sensitivity>',
    'name 排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant',
    'base',
  )
  .action((options) => {
    createConfig(options).then(
      () => {
        console.log(chalk.green(`\n${CONFIG_FILE_NAME} 配置文件已生成！`));
      },
      (error) => {
        console.log(chalk.green(error));
      },
    );
  });

program.parse(process.argv);
