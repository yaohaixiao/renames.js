import { execSync } from 'node:child_process';

/**
 * # 执行初始化命令
 *
 * @function executeInitCommand
 */
const executeInitCommand = () => {
  execSync('renames init -h', {
    encoding: 'utf8',
    stdio: 'inherit',
  });
};

export default executeInitCommand;
