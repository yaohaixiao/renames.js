import CONSTANTS from '../../lib/constants.js';

/**
 * # 辅助函数：获取 cache 命令选项配置数据
 *
 * @function getCacheCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getCacheCommandOptions = () => {
  const { CONFIG_FILE_NAME } = CONSTANTS;

  return [
    {
      flags: '-a, --all',
      description: `可选，显示缓存中的所有重命名记录`,
    },
    {
      flags: '-c, --clear',
      description: `可选，清除缓存中的重命名记录`,
    },
    {
      flags: '--off',
      description: `可选，关闭缓存重命名记录，即将配置文件 ${CONFIG_FILE_NAME} 中 cache 设置为 false`,
    },
  ];
};

export default getCacheCommandOptions;
