/**
 * # 拼接前后缀
 *
 * @function appendPrefixAndSuffix
 * @param {string} filename - 文件名字符串
 * @param {object} options - 配置参数对象
 * @returns {string} - 返回组合前后缀的文件名
 */
const appendPrefixAndSuffix = (filename, options) => {
  const { prefix, suffix, connector } = options;
  let finalFilename = filename;

  // 拼接前缀
  if (prefix) {
    finalFilename = `${prefix}${connector}${finalFilename}`;
  }

  // 拼接后缀
  if (suffix) {
    finalFilename = `${finalFilename}${connector}${suffix}`;
  }

  return finalFilename;
};

export default appendPrefixAndSuffix;
