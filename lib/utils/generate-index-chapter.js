import padZero from './pad-zero.js';
import toIndexChapter from './to-index-chapter.js';

/**
 * # 辅助函数：生成索引章节字符串
 *
 * @function generateIndexChapter
 * @param {string | number} index - 索引值（字符串或者数值）
 * @param {object} options - 配置参数对象
 * @returns {string} - 返回生成的章节字符串
 */
const generateIndexChapter = (index, options) => {
  const {
    autoIndex,
    indexPadZero,
    indexLength,
    startIndex,
    indexPrefix,
    indexSuffix,
    delimiter,
  } = options;

  if (!autoIndex) {
    return '';
  }

  const onlyIndex = autoIndex === 'only';
  const fileIndex = index + 1 + startIndex;
  const paddedIndex = indexPadZero
    ? padZero(fileIndex, indexLength)
    : `${fileIndex}`;

  return toIndexChapter(paddedIndex, onlyIndex, {
    indexPrefix,
    indexSuffix,
    delimiter,
  });
};

export default generateIndexChapter;
