import getConfigInteractive from '../../lib/utils/get-config-interactive.js';

import CONSTANTS from '../../lib/constants.js';

const { DEMO_DIR_PATH } = CONSTANTS;

const revokeCommandAction = async (options) => {
  const config = {};

  // 优先使用传入的 options 的 dirPath 值
  if (options.dirPath) {
    config.dirPath = options.dirPath;
  } else {
    // 然后使用交互式获取 dirPath 参数
    await getConfigInteractive(
      config,
      'dirPath',
      '请输入需要执行重命名操作的文件夹路径',
      DEMO_DIR_PATH,
    );
  }
};

export default revokeCommandAction;
