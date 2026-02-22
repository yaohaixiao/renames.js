import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import getOptionsFromConfigJs from '../../lib/utils/get-options-from-config-js.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';
import writeConfigJs from '../../lib/utils/write-config-js.js';
import chalk from 'chalk';

/**
 * # 处理关闭缓存的逻辑
 *
 * @function disableCache
 * @returns {Promise<boolean>} - 操作成功，则返回 true，否则返回 false
 */
const disableCache = async () => {
  const { CONFIG_FILE_NAME, CONFIG_FILE_PATH } = CONSTANTS;

  if (!isFileExists(CONFIG_FILE_PATH)) {
    showWarningLog('警告', CONFIG_FILE_NAME, '配置文件不存在或已被删除');
    return false;
  }

  // 读取并更新配置文件
  const config = await getOptionsFromConfigJs();

  config.cache = false;

  await writeConfigJs(config);

  console.log(
    chalk.greenBright('成功:'),
    chalk.blueBright(CONFIG_FILE_NAME),
    '文件的缓存配置已关闭',
  );

  return true;
};

export default disableCache;
