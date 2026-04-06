import { execSync } from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';

import hasEditor from './has-editor.js';

/**
 * # 在 CLI 中用编辑器打开文件
 *
 * @function editFile
 * @param {string} filename - 文件路径
 * @param {string} editor 可选，编辑器命令：code/vim/subl 等，默认系统编辑器
 * @returns {boolean} - 打开文件，返回 true，否则返回 false
 */
const editFile = (filename, editor) => {
  const OPTIONS = { stdio: 'inherit', encoding: 'utf8' };
  const file = path.resolve(filename);
  const { platform } = process;
  let cmd;

  try {
    // 已安装编辑器
    if (editor && hasEditor(editor)) {
      cmd = editor;

      // 给 vim 编辑器指定 utf-8 编码
      if (editor === 'vim') {
        cmd += ` -c "set encoding=utf-8"`;
      }
    } else {
      // 根据系统获取命令名称
      switch (platform) {
        case 'darwin': {
          cmd = 'open';
          break;
        }
        case 'win32': {
          // windows 需要加空字符串 "" 指定窗口名称
          cmd = `start ""`;
          break;
        }
        default: {
          cmd = 'xdg-open';
          break;
        }
      }
    }

    // 使用编辑器打开文件
    execSync(`${cmd} "${file}"`, OPTIONS);

    return true;
  } catch (error) {
    console.log(chalk.yellowBright('警告'), error.message);
    return false;
  }
};

export default editFile;
