import batchRename from './lib/batch-rename.js';

/**
 * # 批量重命名（指定文件夹）文件名
 *
 * @function renames
 * @param {string} dirPath - 指定的文件夹路径
 * @param {object} [options] - 可选，指定重命名的配置参数信息
 * @returns {boolean} - 数据异常时返回 false，数据处理完成，返回 true.
 * @see lib/batch-rename.js
 */
const renames = (dirPath, options) => batchRename(dirPath, options);

export default renames;
