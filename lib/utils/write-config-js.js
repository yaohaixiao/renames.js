import prettier from 'prettier';
import { highlight } from 'cli-highlight';

import CONSTANTS from '../constants.js';
import writeFile from './write-file.js';

/**
 * # 创建 renames.config.js 配置文件
 *
 * @function writeConfigJs
 * @param {object} config - 配置信息对象
 * @param {boolean} [showJsCode=false] - 是否显示 renames.config.js 源代码. Default is
 *   `false`
 * @returns {Promise<void>}
 */
const writeConfigJs = async (config, showJsCode = false) => {
  const { stringify } = JSON;
  const { CONFIG_FILE_PATH } = CONSTANTS;
  const jsCode = `export default ${stringify(config)}`;
  const formatedJsCode = await prettier.format(jsCode, {
    // JS 解析器
    parser: 'babel',
    // 缩进 2 空格
    tabWidth: 2,
    // 单引号
    singleQuote: true,
    // 尾逗号
    trailingComma: 'es5',
    // 保留分号
    semi: true,
  });

  if (showJsCode) {
    console.log(
      `\n配置文件内容如下：\n\n`,
      highlight(formatedJsCode, {
        language: 'javascript',
      }),
    );
  }

  writeFile(CONFIG_FILE_PATH, formatedJsCode);
};

export default writeConfigJs;
