import { execSync } from 'node:child_process';

/**
 * # 辅助函数：执行帮助命令
 *
 * @function executeHelpCommand
 */
const executeHelpCommand = () => {
  execSync('renames -h', {
    encoding: 'utf8',
    stdio: 'inherit',
  });
};

export default executeHelpCommand;
