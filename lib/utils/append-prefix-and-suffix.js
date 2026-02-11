// 辅助函数：拼接前后缀
const appendPrefixAndSuffix = (filename, options) => {
  const { prefix, suffix, connector } = options;
  let result = filename;

  // 拼接前缀
  if (prefix) {
    result = `${prefix}${connector}${result}`;
  }

  // 拼接后缀
  if (suffix) {
    result = `${result}${connector}${suffix}`;
  }

  return result;
};

export default appendPrefixAndSuffix;
