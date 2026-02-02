import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';

import isFileExists from './utils/is-file-exists.js';
import readFile from './utils/read-file.js';
import writeFile from './utils/write-file.js';

/**
 * # 辅助函数：解析配置文件路径（统一路径处理，避免重复解构和 resolve）
 *
 * @function getConfigFilePaths
 * @param {string} currentFilePath - 当前文件 URL 转换后的路径
 * @returns {object} - 配置文件路径集合
 */
const getConfigFilePaths = (currentFilePath) => {
  const configDir = path.dirname(currentFilePath);
  const CONFIG_JSON_FILE = 'renames.config.js';
  return {
    CONFIG_JSON_FILE,
    CONFIG_FILE_PATH: path.resolve(configDir, `../${CONFIG_JSON_FILE}`),
    DEFAULT_CONFIG_PATH: path.resolve(
      configDir,
      '../config/default.config.json',
    ),
  };
};

/**
 * # 辅助函数：初始化默认配置（集中管理默认值，减少零散条件判断）
 *
 * @function initDefaultConfig
 * @param {string} defaultConfigPath - 默认配置文件路径
 * @returns {object} - 初始化后的配置对象
 */
const initDefaultConfig = (defaultConfigPath) => {
  const defaultConfigJson = readFile(defaultConfigPath);
  const baseConfig = defaultConfigJson ? JSON.parse(defaultConfigJson) : {};
  // 补充核心默认值，统一覆盖
  return {
    folderPath: '',
    namesList: '',
    prefix: '',
    suffix: '',
    connector: '',
    autoIndex: false,
    startIndex: 0,
    indexPadZero: true,
    indexPrefix: '第',
    indexSuffix: '集',
    delimiter: '：',
    force: false,
    extname: '',
    sortBy: 'name',
    order: 'desc',
    sensitivity: 'base',
    ...baseConfig,
  };
};

/**
 * # 辅助函数：赋值配置项（统一处理配置赋值，减少重复 if 判断）
 *
 * @function assignConfigKeys
 * @param {object} config - 目标配置对象
 * @param {object} options - 传入的选项
 * @param {string[]} keys - 需要赋值的配置项键名列表
 */
const assignConfigKeys = (config, options, keys) => {
  for (const key in keys) {
    if (options[key] !== undefined) {
      // 特殊处理：startIndex 转为数字类型
      config[key] =
        key === 'startIndex' ? Number.parseInt(options[key], 10) : options[key];
    }
  }
};

/**
 * # 辅助函数：交互式获取必填配置（提取重复交互逻辑，减少分支嵌套）
 *
 * @function getRequiredConfigInteractive
 * @param {object} config - 目标配置对象
 * @param {string} key - 配置项键名
 * @param {string} promptText - 提示文本
 * @param {string} demoText - 示例文本
 * @returns {Promise<void>}
 */
const getRequiredConfigInteractive = async (
  config,
  key,
  promptText,
  demoText,
) => {
  if (!config[key]) {
    const answer = await input({
      message: chalk.greenBright(
        `（必须）${promptText}（例如："${demoText}"）：`,
      ),
    });
    if (answer) config[key] = answer;
  }
};

/**
 * # 生成工具的配置文件
 *
 * @function createConfig
 * @param {object} options - 配置信息
 * @param {string} [options.folderPath=''] - 必须，目标文件夹路径（绝对路径或相对路径）. Default is
 *   `''`
 * @param {string} [options.namesList=''] -
 *   可选，要修改的对应的文件名列表数组或者文件名列表的数据（例如：标题1，标题2）. Default is `''`
 * @param {string} [options.prefix=''] - 可选，要添加的前缀. Default is `''`
 * @param {string} [options.suffix=''] - 可选，要添加的后缀，添加在文件名和扩展名之间. Default is `''`
 * @param {string} [options.connector=''] - 可选，prefix 和 suffix 之间的连接符. Default
 *   is `''`
 * @param {string} [options.autoIndex=false] - 可选，是否自动生成索引编号. Default is `false`
 * @param {string} [options.startIndex=0] - 可选，自动编号的起始索引值. Default is `0`
 * @param {string} [options.indexPadZero=false] - 可选，是否索引编号自动补‘0’. Default is
 *   `false`
 * @param {string} [options.indexPrefix='第'] - 可选，自动编号后缀. Default is `'第'`
 * @param {string} [options.indexSuffix='集'] - 可选，是否自动编号. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，自动编号和名字间的分隔符. Default is `'：'`
 * @param {string} [options.force=false] - 可选，是否强制重命名. Default is `false`
 * @param {string} [options.extname=''] - 可选，重命名后的扩展名，例如: '.mp4'. Default is
 *   `''`
 * @param {string} [options.sortBy='name'] -
 *   可选，文件名的排序类型（可选项：name、size、type、birthtime 和 modify-time）. Default is
 *   `'name'`
 * @param {string} [options.order='name'] - 可选，文件名的排序方式（可选项：desc 和 asc）. Default
 *   is `'name'`
 * @param {string} [options.sensitivity='base'] - 可选，name
 *   排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant. Default is `'base'`
 * @returns {Promise<{
 *   folderPath: string;
 *   namesList: string;
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
 *   order: string;
 *   sensitivity: string;
 * }>}
 *   - 返回配置信息的 JSON 数据
 */
const createConfig = async (options) => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const { CONFIG_JSON_FILE, CONFIG_FILE_PATH, DEFAULT_CONFIG_PATH } =
    getConfigFilePaths(currentFilePath);
  const DEMO_FOLDER_PATH = String.raw`C:\Downloads\Videos`;
  const DEMO_LIST_PATH = String.raw`C:\Downloads\names.txt`;

  // 初始化默认配置（集中管理，减少零散条件判断）
  const config = initDefaultConfig(DEFAULT_CONFIG_PATH);

  // 交互式确认是否生成/重写配置
  const isConfigExists = isFileExists(CONFIG_FILE_PATH);
  const confirmMessage = isConfigExists
    ? `配置文件 ${CONFIG_JSON_FILE} 已存在，是否重写配置？`
    : `执行 init 命令后，工具将生成配置文件 ${CONFIG_JSON_FILE}，是否继续？`;
  const isConfirm = await confirm({ message: confirmMessage });

  if (!isConfirm) {
    console.log('\n已取消重写配置文件！');
    return config;
  }

  // 批量赋值可选配置项（提取工具函数，减少重复 if 判断）
  const configKeys = [
    'prefix',
    'suffix',
    'connector',
    'autoIndex',
    'startIndex',
    'indexPadZero',
    'indexPrefix',
    'indexSuffix',
    'delimiter',
    'force',
    'extname',
    'sortBy',
    'order',
    'sensitivity',
  ];

  // 赋值并交互式补充必填配置（folderPath / namesList），优先使用传入的 options 赋值
  if (options.folderPath) {
    config.folderPath = options.folderPath;
  }
  if (options.namesList) {
    config.namesList = options.namesList;
  }

  // 交互式获取必填项（仅需要用户输入 folderPath 和 namesList 参数，减少用户输入，提高效率）
  await getRequiredConfigInteractive(
    config,
    'folderPath',
    '请输入需要执行重命名操作的文件夹路径',
    DEMO_FOLDER_PATH,
  );
  await getRequiredConfigInteractive(
    config,
    'namesList',
    '请输入要修改的对应的文件名列表数组或者文件名列表的数据',
    DEMO_LIST_PATH,
  );

  // 其余非必填参数，如果用户输入了，按用户输入值，否则使用参数的默认值
  assignConfigKeys(config, options, configKeys);

  // 格式化配置并生成文件
  const formatedConfig = `export default ${JSON.stringify(config, null, 2)}`;

  console.log(
    `\n====== 配置文件已生成：${CONFIG_FILE_PATH} ======\n`,
    formatedConfig,
  );

  writeFile(CONFIG_FILE_PATH, formatedConfig);

  // 返回最终配置
  return config;
};

export default createConfig;
