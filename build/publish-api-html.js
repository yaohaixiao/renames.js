import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import prettier from 'prettier';
import { minify } from 'html-minifier-terser';

import CONSTANTS from '../lib/constants.js';
import readFile from '../lib/utils/read-file.js';
import writeFile from '../lib/utils/write-file.js';

import convertMarkdownToHTML from './utils/convert-markdown-to-html.js';

const { README_PATH, API_PAGE_PATH } = CONSTANTS;

const publishApiHTML = async (markdownPath, htmlPath) => {
  const { resolve } = path;

  const TITLE_PATTERN = /<h1>(.+)(\.js)<\/h1>/g;
  const SHIELDS_PATTERN =
    /(<p>)(\s*?<a href="https:\/\/www.npmjs.com\/package\/@yaohaixiao\/renames.js">[\s\S]*?MIT License<\/a>\s*?)<\/p>/g;
  const MAIN_PATTERN =
    /(<header class="header">[\s\S]*?<\/header>)([\s\S]*?)(<footer class="footer">[\s\S]*?<\/footer>)/g;
  const IMAGE_PATTERN = /<p>(\s*<img[^>]+>\s*)<\/p>/g;

  const markdownCode = readFile(markdownPath);
  const HTMLCode = convertMarkdownToHTML(markdownCode)
    .replaceAll(
      TITLE_PATTERN,
      '<header class="header"><h1 class="title">$1<strong class="mark">$2</strong></h1></header>',
    )
    .replace(SHIELDS_PATTERN, '<p class="shields-icons">$2</p>')
    .replaceAll(
      MAIN_PATTERN,
      '$1<article class="article" id="article">$2</article>$3',
    )
    .replaceAll('./docs/', './')
    .replace(IMAGE_PATTERN, '<p class="screenshot">$1</p>');
  const formattedHTMLCode = await prettier.format(HTMLCode, {
    // 必须指定解析器为html，否则无法正确格式化
    parser: 'html',
    // 缩进2个空格（可自定义）
    tabWidth: 2,
    // 使用空格而非制表符
    useTabs: false,
    // HTML属性用双引号（符合规范）
    singleQuote: false,
    // 每行最大字符数，超出自动换行
    printWidth: 180,
    // 标签大括号间保留空格
    bracketSpacing: true,
    // 换行符使用LF（跨平台通用）
    endOfLine: 'lf',
  });
  // 配置压缩选项（按需调整）
  const minifyOptions = {
    // 折叠空白字符（核心压缩项）
    collapseWhitespace: true,
    // 移除 HTML 注释
    removeComments: true,
    // 移除冗余属性（如 input 的 type="text"）
    removeRedundantAttributes: true,
    // 移除 script 标签的 type="text/javascript"
    removeScriptTypeAttributes: true,
    // 移除 style/link 标签的 type="text/css"
    removeStyleLinkTypeAttributes: true,
    // 压缩 HTML 内联的 CSS
    minifyCSS: true,
    // 压缩 HTML 内联的 JS
    minifyJS: true,
    // 折叠布尔属性（如 checked="checked" → checked）
    collapseBooleanAttributes: true,
  };

  // 执行压缩
  minify(formattedHTMLCode, minifyOptions)
    .then((minifiedHTML) => {
      // 将压缩后的代码写入文件
      writeFile(htmlPath, minifiedHTML);
      console.log('API 文档发布完成！');
    })
    .catch((error) => {
      console.error('API 文档发布失败：', error);
    });
};

publishApiHTML(README_PATH, API_PAGE_PATH);
