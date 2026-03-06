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
      description: `可选，显示缓存文件中的所有重命名记录`,
    },
    {
      flags: '-c, --clear',
      description: `可选，清理缓存文件中的重命名记录`,
    },
    {
      flags: '--delete',
      description: `可选，删除缓存文件或者清理缓存文件中（指定 source 类型，或者缓存记录 ID）的重命名记录`,
    },
    {
      flags: '--dirs',
      description: `可选，显示缓存文件中所有 source 类型为 dir 的重命名的记录`,
    },
    {
      flags: '--groups',
      description: `可选，显示缓存文件中所有 source 类型为 group 的重命名的记录`,
    },
    {
      flags: '--off',
      description: `可选，关闭 ${CONFIG_FILE_NAME} 配置文件中的 cache 配置选项`,
    },
    {
      flags: '--on',
      description: `可选，开启 ${CONFIG_FILE_NAME} 配置文件中的 cache 配置选项`,
    },
    {
      flags: '-l, --list',
      description: `可选，用有序列表显示缓存记录`,
    },
  ];
};

export default getCacheCommandOptions;
