import CONSTANTS from '../../lib/constants.js';
import editFile from '../../lib/utils/edit-file.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 用指定编辑器打开 renames 生成的（配置或者缓存）文件
 *
 * @function editGeneratedFile
 * @param {string} [editor=''] - 可选，编辑器命令. Default is `''`
 * @param {boolean} [isConfig=true] - 可选，是否打开配置文件. Default is `true`
 * @returns {boolean} - 打开文件，返回 true，否则返回 false
 */
const editGeneratedFile = (editor = '', isConfig = true) => {
  const {
    CACHE_FILE_PATH,
    CACHE_FILE_NAME,
    CONFIG_FILE_PATH,
    CONFIG_FILE_NAME,
  } = CONSTANTS;
  let generatedFilePath = CONFIG_FILE_PATH;
  let generatedFileName = CONFIG_FILE_NAME;

  if (!isConfig) {
    generatedFilePath = CACHE_FILE_PATH;
    generatedFileName = CACHE_FILE_NAME;
  }

  if (!isFileExists(generatedFilePath)) {
    showWarningLog('警告', generatedFileName, '文件不存在，或已经被删除');
    return false;
  }

  return editFile(generatedFilePath, editor);
};

export default editGeneratedFile;
