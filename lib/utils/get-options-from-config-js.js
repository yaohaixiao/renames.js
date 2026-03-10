import CONSTANTS from '../constants.js';
import isFileExists from './is-file-exists.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 从配置文件中获取指定或者全部配置信息
 *
 * @async
 * @function getOptionsFromConfigJs
 * @param {string} [prop=''] - 可选，配置属性名称，不传递则获取所有配置属性. Default is `''`
 * @returns {Promise<string | number | boolean | string>} 配置文件中的目录路径，无则返回空字符串
 */
const getOptionsFromConfigJs = async (prop = '') => {
  const { CONFIG_FILE_PATH, CONFIG_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CONFIG_FILE_PATH)) {
    showWarningLog('警告', CONFIG_FILE_PATH, '文件不存在或已被删除');
    return false;
  }

  const config = await import(`../../${CONFIG_FILE_NAME}`);
  const defaults = config?.default;

  return prop ? defaults[prop] : defaults;
};

export default getOptionsFromConfigJs;
