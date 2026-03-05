/**
 * # 辅助函数：获取 cache 命令选项配置数据
 *
 * @function getCacheCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getCacheCommandOptions = () => [
  {
    flags: '-a, --all',
    description: `可选，显示缓存中的所有重命名记录`,
  },
  {
    flags: '-c, --clear',
    description: `可选，清除缓存中的重命名记录`,
  },
  {
    flags: '--dirs',
    description: `可选，显示缓存中的所有通过 dirPath 配置选项重命名的记录`,
  },
  {
    flags: '--delete',
    description: `可选，删除缓存文件或者清除缓存中的重命名记录`,
  },
  {
    flags: '--groups',
    description: `可选，显示缓存中的所有通过 files 配置选项重命名的记录`,
  },
  {
    flags: '--off',
    description: `可选，关闭缓存重命名记录`,
  },
  {
    flags: '--on',
    description: `可选，开启缓存重命名记录`,
  },
  {
    flags: '-l, --list',
    description: `可选，列表显示缓存的记录`,
  },
];

export default getCacheCommandOptions;
