import CONSTANTS from '../../lib/constants.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import readFile from '../../lib/utils/read-file.js';

import executeRenames from '../utils/execute-renames.js';
import getFinalDirPath from '../utils/get-final-dir-path.js';
import processNamesList from '../utils/process-names-list.js';

/**
 * # 执行 renames 命令的功能函数
 *
 * @function executeMainCommand
 * @param {string} dirPath - 文件夹路径
 * @param {object} options - 重名名操作的配置选项对象
 * @returns {Promise<boolean>} - 执行成功，返回 true，否则返回 false
 */
const executeMainCommand = async (dirPath, options) => {
  const { DEFAULT_CONFIG_PATH, CONFIG_FILE_PATH } = CONSTANTS;
  // 获取默认配置文件内容
  const content = readFile(DEFAULT_CONFIG_PATH, { encoding: 'utf8' });
  // 获取配置信息，先读取 renames.config.js 的配置，如果未生成，则读取默认配置
  const defaults = isFileExists(CONFIG_FILE_PATH)
    ? await getOptionsFromConfigJs()
    : JSON.parse(content);
  const config = defaults.default || defaults;

  // 获取最终的文件夹路径
  const finalDirPath = await getFinalDirPath(dirPath, config);

  // 合并命令行输入的配置参数
  const finalOptions = { ...config, ...options };
  const { namesList, filesList } = finalOptions;
  let finalFiles = [];

  // 将 namesList 配置项中的数据转化成数组格式的数据
  if (namesList) {
    finalOptions.namesList = processNamesList(namesList);
  }

  // 将 filesList 配置项中的数据转化成数组格式的数据
  if (filesList) {
    finalFiles = filesList.split(',');
  }

  return executeRenames(finalDirPath, finalFiles, finalOptions);
};

export default executeMainCommand;
