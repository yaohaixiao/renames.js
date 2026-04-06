import getCacheCommandOptions from '../options/get-cache-command-options.js';
import getEditCommandOptions from '../options/get-edit-command-options.js';
import getInitCommandOptions from '../options/get-init-command-options.js';
import getMainCommandOptions from '../options/get-main-command-options.js';
import getRevokeCommandOptions from '../options/get-revoke-command-options.js';

/**
 * # 为 Commander 实例添加通用选项
 *
 * @function addCommandOptions
 * @param {object} command - Commander 实例
 * @param {string} [name='main'] - 可选，命令名称. Default is `'main'`
 */
const addCommandOptions = (command, name = 'main') => {
  let options = '';

  // 获取命令选项配置
  switch (name) {
    case 'cache': {
      options = getCacheCommandOptions();
      break;
    }
    case 'edit': {
      options = getEditCommandOptions();
      break;
    }
    case 'init': {
      options = getInitCommandOptions();
      break;
    }
    case 'revoke': {
      options = getRevokeCommandOptions();
      break;
    }
    default: {
      options = getMainCommandOptions();
      break;
    }
  }

  // 给命令实例添加配置选项
  for (const option of options) {
    if (option.parser) {
      command.option(option.flags, option.description, option.parser);
    } else if (option.defaultValue) {
      command.option(option.flags, option.description, option.defaultValue);
    } else {
      command.option(option.flags, option.description);
    }
  }
};

export default addCommandOptions;
