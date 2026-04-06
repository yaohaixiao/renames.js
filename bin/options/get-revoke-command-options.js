/**
 * # 获取 revoke 命令选项配置数据
 *
 * @function getRevokeCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getRevokeCommandOptions = () => [
  {
    flags: '-a, --all',
    description: `可选，撤销缓存文件中所有重命名操作`,
  },
  {
    flags: '--dirs',
    description: `可选，撤销缓存文件中所有 source 类型为 dir 的重命名操作`,
  },
  {
    flags: '--groups',
    description: `可选，撤销缓存文件中所有 source 类型为 group 的重命名操作`,
  },
];

export default getRevokeCommandOptions;
