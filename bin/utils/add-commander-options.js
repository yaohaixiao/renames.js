import getCommanderOptions from './get-commander-options.js';

/**
 * # 辅助函数：为 Commander 实例添加通用选项
 *
 * @function addCommanderOptions
 * @param {object} commanderInstance - Commander 实例
 */
const addCommanderOptions = (commanderInstance) => {
  const commonOptions = getCommanderOptions();

  for (const option of commonOptions) {
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

export default addCommanderOptions;
