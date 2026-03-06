import showWarningLog from '../../lib/utils/show-warning-log.js';

/**
 * # 捕获异常信号处理逻辑
 *
 * @function setupGracefulExit
 * @returns {void}
 */
const setupGracefulExit = () => {
  // 监听 Ctrl+C 触发的 SIGINT 信号
  process.on('SIGINT', () => {
    // 输出友好提示（可选，避免终端输出中断的 "^C" 显得突兀）
    console.log('\n程序已被终止，已退出程序');
    process.exit(0);
    return false;
  });

  // 可选：监听 SIGTERM 信号（系统/进程管理器终止信号）
  process.on('SIGTERM', () => {
    console.log('\n程序已被终止，正在退出...');
    process.exit(0);
    return false;
  });

  // 可选：捕获未处理的异常，统一错误输出（避免程序崩溃时的杂乱报错）
  process.on('uncaughtException', (error) => {
    showWarningLog('警告', error.message, '已退出程序');
    process.exit(1);
    return false;
  });
};

export default setupGracefulExit;
