import chalk from 'chalk';

/**
 * # 创建命令行的链接文本
 *
 * @function terminalLink
 * @param {string} text - 必须，链接的文本
 * @param {string} url - 必须，链接的 URL 地址
 * @returns {string}
 */
const terminalLink = (text, url) => {
  return chalk.blue.underline(`\x1B]8;;${url}\x1B\\${text}\x1B]8;;\x1B\\`);
};

export default terminalLink;
