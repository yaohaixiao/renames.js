import getBasename from './get-basename.js';
import getExtension from './get-extension.js';

import appendPrefixAndSuffix from './append-prefix-and-suffix.js';
import formatBasename from './format-basename.js';
import generateIndexChapter from './generate-index-chapter.js';
import getNormalizedOptions from './get-normalized-config.js';
import getFilenameByNames from './get-filename-by-names.js';

/**
 * # 获取文件名，通过原文件名，文件在文件夹中所有文件中的索引值和配置参数
 *
 * @function generateFilename
 * @param {string} oldFilename - 原文件名
 * @param {number} index - 文件在文件夹中所有文件中的索引值
 * @param {object} [options={}] - 可选，配置参数对象数据. Default is `{}`
 * @param {Array} [options.names=[]] - 可选，要修改的对应的文件名列表数组. Default is `[]`
 * @param {string} [options.prefix=''] 可选，要添加的前缀. Default is `''`
 * @param {string} [options.suffix=''] - 可选，要添加的后缀，添加在文件名和扩展名之间. Default is `''`
 * @param {string} [options.connector=''] - 可选，Prefix 和 suffix 之间的连接符. Default
 *   is `''`
 * @param {boolean | string} [options.autoIndex=false] - 可选，是否自动编号. Default is
 *   `false`
 * @param {number} [options.startIndex=0] - 可选，自动编号的起始索引值. Default is `0`
 * @param {boolean} [options.indexPadZero=true] - 可选，是否索引编号自动补"0". Default is
 *   `true`
 * @param {number} [options.indexLength=2] - 可选，自动补齐的字符串长度值. Default is `2`
 * @param {string} [options.indexPrefix='第'] - 可选，自动编号后缀. Default is `'第'`
 * @param {string} [options.indexSuffix='集'] - 可选，是否自动编号. Default is `'集'`
 * @param {string} [options.delimiter='：'] - 可选，自动编号和名字间的分隔符. Default is `'：'`
 * @param {Function | null} [options.format=null] - 可选，文件名的格式化方法. Default is
 *   `null`
 * @param {string} [options.extname=''] - 可选，想替换的扩展名. Default is `''`
 * @returns {string} - 返回生成的文件名字符串
 */
const generateFilename = (oldFilename, index, options = {}) => {
  // 拆分文件名和扩展名（如 "photo.jpg" → 文件名"photo"，扩展名".jpg"）
  const basename = getBasename(oldFilename);
  const originExtname = getExtension(oldFilename);

  // 获取配置信息
  const normalizedOptions = getNormalizedOptions('generate-filename', options);
  const { extname, names, format, autoIndex } = normalizedOptions;
  const namesCount = names.length;
  let matchedName = '';

  // 直接使用 namesList 中的匹配的文件名，如果 namesList 和 dirPath 文件夹中的数量不一致，则使用原文件名
  if (namesCount && !autoIndex) {
    matchedName = names?.[index] ?? basename;
    return `${formatBasename(matchedName, format)}${originExtname}`;
  }

  const namesList = Array.isArray(names) && names.length > 0 ? names : [];
  const indexChapter = generateIndexChapter(index, normalizedOptions);
  const onlyIndex = autoIndex === 'only';
  let newFilename;

  // 存在名称列表
  if (namesList.length > 0) {
    newFilename = getFilenameByNames(
      oldFilename,
      index,
      indexChapter,
      normalizedOptions,
      namesList,
    );
  } else if (autoIndex) {
    // 无名称列表，但开启自动编号
    newFilename = onlyIndex
      ? indexChapter
      : `${indexChapter}${formatBasename(basename, format, index)}`;
  } else {
    // 无名称列表，无自动编号（默认场景）
    newFilename = formatBasename(basename, format, index);
  }

  // 拼接前后缀 + 确定扩展名
  newFilename = appendPrefixAndSuffix(newFilename, normalizedOptions);

  const finalExtname = extname || originExtname;

  // 返回最终结果
  return `${newFilename}${finalExtname}`;
};

export default generateFilename;
