import getCacheCommandOptions from '../options/get-cache-command-options.js';
import getInitCommandOptions from '../options/get-init-command-options.js';
import getMainCommandOptions from '../options/get-main-command-options.js';
import getRevokeCommandOptions from '../options/get-revoke-command-options.js';

/**
 * # 辅助函数：为 Commander 实例添加通用选项
 *
 * @function addCommandOptions
 * @param {object} commanderInstance - Commander 实例
 * @param {string} [commandName='main'] - 命令名称. Default is `'main'`
 */
const addCommandOptions = (commanderInstance, commandName = 'main') => {
  let commandOptions = '';

  // 获取命令选项配置
  switch (commandName) {
    case 'cache': {
      commandOptions = getCacheCommandOptions();
      break;
    }
    case 'init': {
      commandOptions = getInitCommandOptions();
      break;
    }
    case 'revoke': {
      commandOptions = getRevokeCommandOptions();
      break;
    }
    default: {
      commandOptions = getMainCommandOptions();
      break;
    }
  }

  // 给命令实例添加选项配置
  for (const option of commandOptions) {
    if (option.parser) {
      commanderInstance.option(option.flags, option.description, option.parser);
    } else if (option.defaultValue) {
      commanderInstance.option(
        option.flags,
        option.description,
        option.defaultValue,
      );
    } else {
      commanderInstance.option(option.flags, option.description);
    }
  }
};

export default addCommandOptions;
