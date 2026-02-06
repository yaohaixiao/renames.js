import chalk from 'chalk';

/**
 * # 创建命令行的链接文本
 *
 * @function terminalLink
 * @param {string} text - 必须，链接的文本
 * @param {string} url - 必须，链接的 URL 地址
 * @returns {string} - 返回链接文本
 */
const terminalLink = (text, url) =>
  chalk.blueBright.underline(
    `\u001B]8;;${url}\u001B\\${text}\u001B]8;;\u001B\\`,
  );

export default terminalLink;
