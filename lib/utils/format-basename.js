import isFunction from './is-function.js';

/**
 * # 辅助函数：获取格式化后的文件名
 *
 * @function formatBasename
 * @param {string} basename - 文件的基础名称
 * @param {Function} [format=null] - 可选，用来格式化的回调函数. Default is `null`
 * @param {number} [index=-1] - 可选，文件在 dirPath 文件排序后的索引值. Default is `-1`
 * @returns {string} - 返回格式化后的文件名
 */
const formatBasename = (basename, format = null, index = -1) =>
  isFunction(format) ? format(basename, index) : basename;

export default formatBasename;
