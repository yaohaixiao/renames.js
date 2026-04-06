import { execSync } from 'node:child_process';
import chalk from 'chalk';

/**
 * # 判断编辑器/命令是否存在
 *
 * @function hasEditor
 * @param {string} editor 编辑器命令：code / vim / subl / code-insiders
 * @returns {boolean} - 编辑器存在，返回 true，否则返回 false
 */
const hasEditor = (editor) => {
  if (!editor) {
    return false;
  }

  try {
    // 跨平台通用：检查命令是否存在
    const checkCmd =
      process.platform === 'win32'
        ? `where ${editor} >nul 2>&1` // Windows
        : `command -v ${editor} >/dev/null 2>&1`; // macOS / Linux

    execSync(checkCmd, { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.log(chalk.yellowBright('警告'), error.message);
    return false;
  }
};

export default hasEditor;
