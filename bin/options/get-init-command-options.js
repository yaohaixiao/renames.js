import CONSTANTS from '../../lib/constants.js';

const { DEMO_DIR_PATH, DEMO_LIST_PATH, DEMO_LIST_DATA } = CONSTANTS;

/**
 * # 辅助函数：获取 init 命令选项配置数据
 *
 * @function getInitCommandOptions
 * @returns {Array} 选项配置数组
 */
const getInitCommandOptions = () => [
  {
    flags: '--dir, --dirPath <dirPath>',
    description: `可选，目标文件夹（绝对或相对）路径，例如：${DEMO_DIR_PATH}`,
  },
  {
    flags: '--names, --namesList <namesList>',
    description: `可选，文件名列表数组数据，例如："${DEMO_LIST_DATA}"。或者文件名列表文件的路径，例如："${DEMO_LIST_PATH}"。`,
  },
];

export default getInitCommandOptions;
