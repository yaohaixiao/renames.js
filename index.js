import batchRename from './lib/batch-rename.js';

/**
 * # 批量重命名（指定文件夹）文件名
 *
 * @function renames
 * @param {string | Array} dirFiles - 必须，目标文件夹（绝对或相对）路径，或者需要修改文件名的文件数组数据
 * @param {object} [options] - 可选，指定重命名的配置参数信息
 * @returns {boolean} - 数据异常时返回 false，数据处理完成，返回 true.
 * @see lib/batch-rename.js
 */
const renames = (dirFiles, options) => batchRename(dirFiles, options);

export default renames;
