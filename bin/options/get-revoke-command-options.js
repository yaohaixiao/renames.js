/**
 * # 辅助函数：获取 revoke 命令选项配置数据
 *
 * @function getRevokeCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getRevokeCommandOptions = () => [
  {
    flags: '-a, --all',
    description: `可选，撤销缓存中的所有重命名记录（将所有文件的文件名恢复成原来的名字）`,
  },
];

export default getRevokeCommandOptions;
