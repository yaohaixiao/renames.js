import chalk from 'chalk';

import CONSTANTS from '../lib/constants.js';
import writeFile from '../lib/utils/write-file.js';

import convertReadmeMarkdownToHTML from './utils/convert-readme-markdown-to-html.js';
import getProcessArguments from './utils/get-process-arguments.js';
import formatHTMLCode from './utils/format-html-code.js';
import minifyHTMLCode from './utils/minify-html-code.js';
import parseHTMLKeyLayout from './utils/parse-html-key-layout.js';

/**
 * # 将 readme.md 文档中的 markdown 代码转化成 HTML 代码，写入到 ./docs/index.html 发布为 API 文档
 *
 * @function publishAPIHTML
 * @returns {Promise<boolean>} - 发布成功，返回 true，否则返回 false
 */
const publishAPIHTML = () => {
  const { API_PAGE_PATH } = CONSTANTS;
  const args = getProcessArguments();
  const HTMLCode = parseHTMLKeyLayout(convertReadmeMarkdownToHTML());

  let publishAction;

  switch (args.action) {
    case 'minify': {
      publishAction = minifyHTMLCode;
      break;
    }
    case 'format': {
      publishAction = formatHTMLCode;
      break;
    }
    default: {
      publishAction = minifyHTMLCode;
      break;
    }
  }

  return publishAction(HTMLCode)
    .then((convertedCode) => {
      writeFile(API_PAGE_PATH, convertedCode);
      console.log(
        chalk.greenBright('成功：'),
        chalk.blueBright(API_PAGE_PATH),
        chalk.green('API 文档发布成功！'),
      );
      return true;
    })
    .catch((error) => {
      console.log(chalk.redBright('错误：'), error);
      return false;
    });
};

publishAPIHTML();
