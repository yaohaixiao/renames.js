/**
 * # 辅助函数：获取 revoke 命令选项配置数据
 *
 * @function getRevokeCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getRevokeCommandOptions = () => [
  {
    flags: '-a, --all',
    description: `可选，撤销（将所有文件的文件名恢复成原来的名字）缓存中所有重命名的记录`,
  },
  {
    flags: '--dirs',
    description: `可选，撤销缓存中的所有通过 dirPath 配置选项重命名的记录`,
  },
  {
    flags: '--groups',
    description: `可选，撤销缓存中的所有通过 files 配置选项重命名的记录`,
  },
];

export default getRevokeCommandOptions;
