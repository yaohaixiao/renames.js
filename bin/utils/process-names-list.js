import isFileExists from '../../lib/utils/is-file-exists.js';

/**
 * # 辅助函数：处理文件名列表参数
 *
 * @function processNamesList
 * @param {string} nameList - 输入的文件名列表（路径或逗号分隔字符串）
 * @returns {Array | string} 解析后的数组或原路径
 */
const processNamesList = (nameList) => {
  if (!nameList) {
    return '';
  }

  // 如果不是文件路径，解析为数组
  if (!isFileExists(nameList)) {
    return nameList.split(',').map((item) => item.trim());
  }

  return nameList;
};

export default processNamesList;
