import getCommonOptions from './get-common-options.js';

/**
 * # 辅助函数：为 Commander 实例添加通用选项
 *
 * @function addCommonOptions
 * @param {object} commanderInstance - Commander 实例
 */
const addCommonOptions = (commanderInstance) => {
  const commonOptions = getCommonOptions();

  for (const option of commonOptions) {
    if (option.parser) {
      commanderInstance.option(
        option.flags,
        option.description,
        option.parser,
        option.defaultValue,
      );
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

export default addCommonOptions;
