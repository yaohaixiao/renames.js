/**
 * # 捕获异常信号处理逻辑
 *
 * @function setupGracefulExit
 * @param {boolean} [SIGINT=true] - 可选，是否监听 Ctrl+C 触发的 SIGINT 信号. Default is
 *   `true`
 * @param {boolean} [SIGTERM=false] - 可选，是否监听 SIGTERM 信号（系统/进程管理器终止信号）. Default
 *   is `false`
 * @param {boolean} [uncaughtException=false] -
 *   可选，是否捕获未处理的异常，统一错误输出（避免程序崩溃时的杂乱报错）. Default is `false`
 * @returns {void}
 */
const setupGracefulExit = (
  SIGINT = true,
  SIGTERM = false,
  uncaughtException = false,
) => {
  if (SIGINT) {
    // 监听 Ctrl+C 触发的 SIGINT 信号
    process.on('SIGINT', () => {
      // 输出友好提示（可选，避免终端输出中断的 "^C" 显得突兀）
      console.log('\n程序已被终止，已退出程序');
      process.exit(0);
      return false;
    });
  }

  // 可选：监听 SIGTERM 信号（系统/进程管理器终止信号）
  if (SIGTERM) {
    process.on('SIGTERM', () => {
      console.log('\n程序已被终止，正在退出...');
      process.exit(0);
      return false;
    });
  }

  // 可选：捕获未处理的异常，统一错误输出（避免程序崩溃时的杂乱报错）
  if (uncaughtException) {
    process.on('uncaughtException', () => {
      console.log('\n程序已被终止，已退出程序');
      process.exit(1);
      return false;
    });
  }
};

export default setupGracefulExit;
