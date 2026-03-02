import { confirm } from '@inquirer/prompts';

import isFileExists from './utils/is-file-exists.js';
import readFile from './utils/read-file.js';

import getConfigInteractive from './utils/get-config-interactive.js';
import getNormalizedOptions from './utils/get-normalized-config.js';
import writeConfigJs from './utils/write-config-js.js';

import CONSTANTS from './constants.js';

/**
 * # 批量重命名配置类型
 *
 * @typedef {object} InitCommandOptions
 * @property {string} dirPath 目录路径
 * @property {string} namesList 文件名列表（逗号分隔）
 */

/**
 * # 取消操作类型
 *
 * @typedef {object} CancelConfirm
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
 * @returns {Promise<InitCommandOptions | CancelConfirm>}
 *
 *   - 返回配置信息的 JSON 数据
 */
const createConfig = async (options) => {
  const {
    DEMO_DIR_PATH,
    DEMO_LIST_PATH,
    DEFAULT_CONFIG_PATH,
    CONFIG_FILE_NAME,
    CONFIG_FILE_PATH,
  } = CONSTANTS;
  // 初始化默认配置（集中管理，减少零散条件判断）
  const defaultConfigJSON = readFile(DEFAULT_CONFIG_PATH);
  const defaultOptions = defaultConfigJSON ? JSON.parse(defaultConfigJSON) : {};
  const config = getNormalizedOptions('create-config', defaultOptions);

  // 交互式确认是否生成/重写配置
  const isConfigExists = isFileExists(CONFIG_FILE_PATH);
  const confirmMessage = isConfigExists
    ? `配置文件 ${CONFIG_FILE_NAME} 已存在，是否重写配置？`
    : `执行 init 命令后，工具将生成配置文件 ${CONFIG_FILE_NAME}，是否继续？`;
  const isConfirm = await confirm({ message: confirmMessage });

  if (!isConfirm) {
    return { isCancel: true };
  }

  // 优先使用传入的 options 的 dir 值
  if (options.dirPath) {
    config.dirPath = options.dirPath;
  } else {
    // 然后使用交互式获取 dir 参数
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

  // 格式化配置并生成文件
  await writeConfigJs(config, true);

  // 返回最终配置
  return config;
};

export default createConfig;
