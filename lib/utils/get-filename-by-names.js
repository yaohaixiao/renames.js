import getBasename from './get-basename.js';
import isFunction from './is-function.js';

// 辅助函数：从名称列表生成核心文件名
const getFilenameByNames = (
  oldFilename,
  index,
  indexChapter,
  options,
  namesList,
) => {
  const { format, autoIndex } = options;
  const onlyIndex = autoIndex === 'only';
  const matchedName = namesList[index] || getBasename(oldFilename);

  // 优先使用格式化函数，否则直接使用列表中的文件名
  let newFilename = isFunction(format)
    ? format(oldFilename, matchedName, index, namesList)
    : matchedName;

  // 拼接自动编号（仅非 onlyIndex 模式）
  if (autoIndex && !onlyIndex) {
    newFilename = `${indexChapter}${newFilename}`;
  }

  // onlyIndex 模式直接返回索引章节
  return onlyIndex ? indexChapter : newFilename;
};

export default getFilenameByNames;
