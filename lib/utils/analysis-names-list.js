import readList from './read-list.js';
import showWarningLog from './show-warning-log.js';

/**
 * # 辅助函数：加载并校验文件名列表，并将名称列表复制给 options
 *
 * @function analysisNamesList
 * @param {object} options - 配置参数对象
 * @param {number} filesCount - 文件的数量
 * @returns {Array} - 返回分析后的 names 数组数据
 */
const analysisNamesList = (options, filesCount) => {
  const { namesList } = options;
  let names = [];

  // 加载名称列表（数组直接使用，非数组调用 readList）
  if (namesList) {
    names =
      Array.isArray(namesList) && namesList.length > 0
        ? namesList
        : readList(namesList);
  }

  // 校验名称列表与文件数量是否一致
  const namesCount = names.length;

  if (namesCount && namesCount !== filesCount) {
    showWarningLog(
      '警告',
      `配置选项 dirPath 指定的文件夹中的文件数量`,
      `与配置选项  namesList 中的数据数量不一致`,
    );
  }

  return names;
};

export default analysisNamesList;
