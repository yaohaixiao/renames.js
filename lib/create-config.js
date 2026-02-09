import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';
import { highlight } from 'cli-highlight';
import prettier from 'prettier';

import isFileExists from './utils/is-file-exists.js';
import readFile from './utils/read-file.js';
import writeFile from './utils/write-file.js';

import CONSTANTS from './constants.js';

const {
  DEMO_DIR_PATH,
  DEMO_LIST_PATH,
  DEFAULT_CONFIG_PATH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_CONNECTOR,
  DEFAULT_AUTO_INDEX,
  DEFAULT_START_INDEX,
  DEFAULT_INDEX_PAD_ZERO,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_EXTNAME,
  DEFAULT_FORCE,
  DEFAULT_FILTER,
  DEFAULT_SORT_BY,
  DEFAULT_ORDER,
  DEFAULT_SENSITIVITY,
  DEFAULT_FORMAT,
  CONFIG_FILE_NAME,
  CONFIG_FILE_PATH,
} = CONSTANTS;

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
    dirPath: '',
    namesList: '',
    prefix: DEFAULT_PREFIX,
    suffix: DEFAULT_SUFFIX,
    connector: DEFAULT_CONNECTOR,
    autoIndex: DEFAULT_AUTO_INDEX,
    startIndex: DEFAULT_START_INDEX,
    indexPadZero: DEFAULT_INDEX_PAD_ZERO,
    indexPrefix: DEFAULT_INDEX_PREFIX,
    indexSuffix: DEFAULT_INDEX_SUFFIX,
    delimiter: DEFAULT_DELIMITER,
    extname: DEFAULT_EXTNAME,
    force: DEFAULT_FORCE,
    filter: DEFAULT_FILTER,
    sortBy: DEFAULT_SORT_BY,
    order: DEFAULT_ORDER,
    sensitivity: DEFAULT_SENSITIVITY,
    format: DEFAULT_FORMAT,
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
    if (answer) config[key] = answer;
  }
};

/**
 * 批量重命名配置类型
 *
 * @typedef {object} RenameConfig
 * @property {string} dirPath 目录路径
 * @property {string} namesList 文件名列表（逗号分隔）
 * @property {string} prefix 文件名前缀
 * @property {string} suffix 文件名后缀
 * @property {string} connector 前缀与索引/名称的连接符
 * @property {boolean} autoIndex 是否自动添加索引
 * @property {string} startIndex 起始索引
 * @property {boolean} indexPadZero 索引是否补零
 * @property {string} indexPrefix 索引前缀
 * @property {string} indexSuffix 索引后缀
 * @property {string} delimiter 列表分隔符
 * @property {boolean} force 是否强制覆盖
 * @property {string} extname 文件扩展名
 * @property {string} sortBy 排序依据
 * @property {string} order 排序顺序（asc/desc）
 * @property {string} sensitivity 排序敏感度
 */

/**
 * 取消操作类型
 *
 * @typedef {object} CancelAction
 * @property {boolean} isCancel 是否取消操作
 */

/**
 * # 生成工具的配置文件
 *
 * @async
 * @function createConfig
 * @param {object} options - 配置信息
 * @param {string} [options.dirPath=''] - 必须，目标文件夹路径（绝对路径或相对路径）. Default is `''`
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
 * @param {string} [options.order='asc'] - 可选，文件名的排序方式（可选项：desc 和 asc）. Default
 *   is `'asc'`
 * @param {string} [options.sensitivity='base'] - 可选，name
 *   排序时大小写/重音处理的方式，可选项：base、accent、case 和 variant. Default is `'base'`
 * @returns {Promise<RenameConfig | CancelAction>}
 *
 *   - 返回配置信息的 JSON 数据
 */
const createConfig = async (options) => {
  // 初始化默认配置（集中管理，减少零散条件判断）
  const config = initDefaultConfig(DEFAULT_CONFIG_PATH);

  // 交互式确认是否生成/重写配置
  const isConfigExists = isFileExists(CONFIG_FILE_PATH);
  const confirmMessage = isConfigExists
    ? `配置文件 ${CONFIG_FILE_NAME} 已存在，是否重写配置？`
    : `执行 init 命令后，工具将生成配置文件 ${CONFIG_FILE_NAME}，是否继续？`;
  const isConfirm = await confirm({ message: confirmMessage });

  if (!isConfirm) {
    return { isCancel: true };
  }

  // 批量赋值可选配置项（提取工具函数，减少重复 if 判断）
  const configKeys = [
    'dirPath',
    'namesList',
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

  // 优先使用传入的 options 的 dirPath 值
  if (options.dirPath) {
    config.dirPath = options.dirPath;
  } else {
    // 然后使用交互式获取 dirPath 参数
    await getConfigInteractive(
      config,
      'dirPath',
      '请输入需要执行重命名操作的文件夹路径',
      DEMO_DIR_PATH,
    );
  }

  // 优先使用传入的 options 的 namesList 值
  if (options.namesList) {
    config.namesList = options.namesList;
  } else {
    // 然后使用交互式获取 namesList 参数
    await getConfigInteractive(
      config,
      'namesList',
      '请输入要修改的对应的文件名列表数组或者文件名列表的数据',
      DEMO_LIST_PATH,
    );
  }

  // 其余非必填参数，如果用户输入了，按用户输入值，否则使用参数的默认值
  assignConfigKeys(config, options, configKeys);

  // 格式化配置并生成文件
  const configCode = `export default ${JSON.stringify(config)}`;
  const formatedConfigCode = await prettier.format(configCode, {
    // JS 解析器
    parser: 'babel',
    // 缩进 2 空格
    tabWidth: 2,
    // 单引号
    singleQuote: true,
    // 尾逗号
    trailingComma: 'es5',
    // 保留分号
    semi: true,
  });

  console.log(
    `\n配置文件内容如下：\n\n`,
    highlight(formatedConfigCode, {
      language: 'javascript',
    }),
  );

  writeFile(CONFIG_FILE_PATH, formatedConfigCode);

  // 返回最终配置
  return config;
};

export default createConfig;
