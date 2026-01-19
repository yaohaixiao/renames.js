import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

import isFileExists from './utils/is-file-exists.js';
import readFile from './utils/read-file.js';
import writeFile from './utils/write-file.js';

/**
 * # 生成工具的配置文件
 *
 * @function createConfig
 * @param {object} options - 配置信息
 * @param {string} [options.folderPath=''] - 必须，目标文件夹路径（绝对路径或相对路径）. Default is
 *   `''`
 * @param {Array | string} [options.namesList=''] - 可选，要修改的对应的文件名列表数组或者文件名列表的数据.
 *   Default is `''`
 * @param {string} [options.autoIndex=false] - 可选，是否自动生成索引编号. Default is `false`
 * @param {string} [options.indexPadZero=true] - 可选，是否索引编号自动补"0". Default is
 *   `true`
 * @param {string} [options.force=false] - 可选，是否强制重命名. Default is `false`
 * @param {string} [options.sortBy='name'] -
 *   可选，文件名的排序方式（可选项：name、time、type、birthtime、size 和 modify-time）. Default is
 *   `'name'`
 * @returns {Promise<{
 *   folderPath: string;
 *   namesList: Array | string;
 *   prefix: string;
 *   suffix: string;
 *   connector: string;
 *   autoIndex: boolean;
 *   startIndex: string;
 *   indexPadZero: boolean;
 *   indexPrefix: string;
 *   indexSuffix: string;
 *   delimiter: string;
 *   force: boolean;
 *   extname: string;
 *   sortBy: string;
 * }>}
 *   - 返回配置信息的 JSON 数据
 */
const createConfig = async (options) => {
  const { resolve, dirname } = path;
  const { stringify } = JSON;
  const currentFilePath = fileURLToPath(import.meta.url);

  const CONFIG_JSON_FILE = 'renames.config.json';
  const CONFIG_FILE_PATH = resolve(
    dirname(currentFilePath),
    `../${CONFIG_JSON_FILE}`,
  );
  const DEFAULT_CONFIG_PATH = resolve(
    dirname(currentFilePath),
    `../config/default.config.json`,
  );

  const DEMO_FOLDER_PATH = String.raw`C:\Downloads\Videos`;
  const DEMO_LIST_PATH = String.raw`C:\Downloads\names.txt`;
  const CONFIG_JSON = readFile(DEFAULT_CONFIG_PATH);

  const config = CONFIG_JSON ? JSON.parse(CONFIG_JSON) : {};
  let answer;

  // 使用 '@inquirer/prompts 交互工具接受用户确认
  answer = await (isFileExists(CONFIG_FILE_PATH)
    ? confirm({
        message: `配置文件 ${CONFIG_JSON_FILE} 已存在，是否重写配置？`,
      })
    : confirm({
        message: `执行 init 命令后，工具将生成配置文件 ${CONFIG_JSON_FILE}，y是否继续？`,
      }));

  if (!answer) {
    console.log('\n已取消重写配置文件！');
  }

  // 目标文件夹路径（绝对路径或相对路径）
  if (options.folderPath) {
    config.folderPath = options.folderPath;
  } else {
    answer = await input({
      message: chalk.greenBright(
        `（必须）请输入需要执行重命名操作的文件夹路径（例如："${DEMO_FOLDER_PATH}"）：`,
      ),
    });

    if (answer) {
      config.folderPath = answer;
    }
  }

  // 文件名列表（数组）数据或者文件名列表文件的路径
  if (options.namesList) {
    config.namesList = options.namesList;
  } else {
    answer = await input({
      message: chalk.greenBright(
        `请输入要修改的对应的文件名列表数组或者文件名列表的数据（例如："${DEMO_LIST_PATH}"）：`,
      ),
    });

    if (answer) {
      config.namesList = answer;
    }
  }

  // 是否自动生成索引编号
  config.autoIndex = options.autoIndex || false;

  // 是否索引编号自动补"0"
  config.indexPadZero = options.indexPadZero || true;

  // 是否强制重命名
  config.force = options.force || false;

  // 文件名列表（数组）数据或者文件名列表文件的路径
  if (options.sortBy) {
    config.sortBy = options.sortBy;
  } else {
    answer = await input({
      message: chalk.greenBright(
        `请输入文件名的排序方式（可选项：name、time、type、birthtime、size 和 modify-time）：`,
      ),
    });

    if (answer) {
      config.sortBy = answer;
    }
  }

  const FORMATED_CONFIG = stringify(config, null, 2);

  // 显示配置内容
  console.log(FORMATED_CONFIG);

  // 生成配置文件
  writeFile(CONFIG_FILE_PATH, FORMATED_CONFIG);

  return config;
};

export default createConfig;
