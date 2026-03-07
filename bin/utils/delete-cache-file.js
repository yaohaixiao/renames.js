import CONSTANTS from '../../lib/constants.js';
import isFileExists from '../../lib/utils/is-file-exists.js';
import removeFile from '../../lib/utils/remove-file.js';
import showSuccessLog from '../../lib/utils/show-success-log.js';
import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 删除 renames.cache.json 缓存文件
 *
 * @function deleteCacheFile
 * @returns {boolean} - 操作成功，则返回 true，否则返回 false
 */
const deleteCacheFile = () => {
  const { CACHE_FILE_PATH, CACHE_FILE_NAME } = CONSTANTS;

  if (!isFileExists(CACHE_FILE_PATH)) {
    showWarningLog('警告', CACHE_FILE_NAME, '文件不存在或已被删除');
    return false;
  }

  removeFile(CACHE_FILE_PATH);

  showSuccessLog('成功', `缓存文件 ${CACHE_FILE_NAME}`, '已被删除');

  return true;
};

export default deleteCacheFile;
