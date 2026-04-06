import generateIndexChapter from './generate-index-chapter.js';
import getBasename from './get-basename.js';
import isFunction from './is-function.js';

/**
 * # 从名称列表生成核心文件名
 *
 * @function getFilenameByNamesList
 * @param {Array} namesList - 文件名列表数据
 * @param {number} index - 索引值
 * @param {object} options - 配置参数对象
 * @param {string} oldFilename - 原始文件名
 * @returns {string} - 返回解析后的文件名
 */
const getFilenameByNamesList = (namesList, index, options, oldFilename) => {
  const indexChapter = generateIndexChapter(index, options);
  const { format, autoIndex } = options;
  const onlyIndex = autoIndex === 'only';

  // onlyIndex 模式直接返回索引章节
  if (onlyIndex) {
    return indexChapter;
  }

  const filename = namesList[index] || getBasename(oldFilename);

  // 优先使用格式化函数，否则直接使用列表中的文件名
  let newFilename = isFunction(format)
    ? format(oldFilename, filename, index, namesList)
    : filename;

  // 拼接自动编号（仅非 onlyIndex 模式）
  if (autoIndex && !onlyIndex) {
    newFilename = `${indexChapter}${newFilename}`;
  }

  return newFilename;
};

export default getFilenameByNamesList;
