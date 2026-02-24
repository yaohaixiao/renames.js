import prettier from 'prettier';

/**
 * # 使用 prettier 格式化 HTML 代码
 *
 * @function formatHTMLCode
 * @param {string} html - 需要 prettier 格式化的 HTML 代码
 * @param {object} [options={}] - Prettier 格式化的配置参数对象. Default is `{}`
 * @returns {Promise<string>} - 返回格式化后的 HTML 代码
 */
const formatHTMLCode = async (html, options = {}) => {
  const normalizedOptions = {
    // 必须指定解析器为html，否则无法正确格式化
    parser: 'html',
    // 缩进2个空格（可自定义）
    tabWidth: 2,
    // 使用空格而非制表符
    useTabs: false,
    // HTML属性用双引号（符合规范）
    singleQuote: false,
    // 每行最大字符数，超出自动换行
    printWidth: 180,
    // 标签大括号间保留空格
    bracketSpacing: true,
    // 换行符使用LF（跨平台通用）
    endOfLine: 'lf',
    ...options,
  };

  return prettier.format(html, normalizedOptions);
};

export default formatHTMLCode;
