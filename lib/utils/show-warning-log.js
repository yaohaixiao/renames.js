import chalk from 'chalk';

/**
 * # 显示警告提示信息
 *
 * @function showWarningLog
 * @param {string} title - 警告类型的文本，例如："警告"
 * @param {string} keyword - 警告内容的关键内容文本
 * @param {string} detail - 警告内容的详细描述文本
 * @returns {void}
 */
const showWarningLog = (title, keyword, detail) => {
  console.log(
    chalk.yellowBright(`${title}：`),
    chalk.blue(`${keyword}`),
    chalk.yellow(`${detail}`),
  );
};

export default showWarningLog;
