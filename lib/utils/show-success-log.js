import chalk from 'chalk';

/**
 * # 显示成功提示信息
 *
 * @function showWarningLog
 * @param {string} title - 提示类型的文本，例如："警告"
 * @param {string} keyword - 提示内容的关键字文本
 * @param {string} detail - 提示内容的详细描述文本
 * @returns {void}
 */
const showSuccessLog = (title, keyword, detail) => {
  console.log(
    chalk.greenBright(`${title}:`),
    chalk.blueBright(keyword),
    chalk.green(detail),
  );
};

export default showSuccessLog;
