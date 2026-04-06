/**
 * # 获取 edit 命令选项配置数据
 *
 * @function getEditCommandOptions
 * @returns {Array} - 选项配置数组
 */
const getEditCommandOptions = () => [
  {
    flags: '--editor [editor]',
    description: `可选，指定编辑器名称，例如：code/vim/subl/notepad`,
  },
];

export default getEditCommandOptions;
