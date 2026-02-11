import readList from './read-file.js';
import showWarningLog from './show-warning-log.js';

// 辅助函数：加载并校验文件名列表，并将名称列表复制给 options
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
      `当前配置指定的 dirPath 文件夹中的文件数量`,
      `与 namesList 中的数据数量不一致。`,
    );
  }

  // 校验通过，挂载名称列表到配置并返回名称数组
  options.names = names;
};

export default analysisNamesList;
