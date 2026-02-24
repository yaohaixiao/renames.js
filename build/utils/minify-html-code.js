import { minify } from 'html-minifier-terser';

/**
 * # 使用 minify 技术压缩 HTML 代码
 *
 * @function minifyHTMLCode
 * @param {string} html - 需要 minify 压缩的 HTML 代码
 * @param {object} [options={}] - Minify 压缩的配置参数对象. Default is `{}`
 * @returns {Promise<string>} - 返回压缩后的 HTML 代码
 */
const minifyHTMLCode = (html, options = {}) => {
  // 配置压缩选项（按需调整）
  const normalizedOptions = {
    // 折叠空白字符（核心压缩项）
    collapseWhitespace: true,
    // 移除 HTML 注释
    removeComments: true,
    // 移除冗余属性（如 input 的 type="text"）
    removeRedundantAttributes: true,
    // 移除 script 标签的 type="text/javascript"
    removeScriptTypeAttributes: true,
    // 移除 style/link 标签的 type="text/css"
    removeStyleLinkTypeAttributes: true,
    // 压缩 HTML 内联的 CSS
    minifyCSS: true,
    // 压缩 HTML 内联的 JS
    minifyJS: true,
    // 折叠布尔属性（如 checked="checked" → checked）
    collapseBooleanAttributes: true,
    ...options,
  };

  return minify(html, normalizedOptions);
};

export default minifyHTMLCode;
