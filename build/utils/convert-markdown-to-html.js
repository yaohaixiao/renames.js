import { marked } from 'marked';

const convertMarkdownToHTML = (content) => {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>renames.js - 基于 Node 的批量文件名重命名 cli 工具库</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/github.min.css">
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js"></script>
  <style>
    html,
    body {
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Microsoft YaHei UI', Arial, sans-serif;
      font-size: 16px;
      background-color: #fff;
      color: #333;
    }

    a:link,
    a:visited
    a:hover {
      text-decoration: underline;
      color: #4da621;
    }

    a:hover {
      text-decoration: none;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: Georgia, "Times New Roman", Times, serif;
    }

    pre {
      padding: 0.5em;
      border: 1px solid #ddd;
      margin: 1em 0;
      background-color: #f8f9f9;
    }

    code {
      font-family: 'Courier New', Menlo, Monaco, Consolas, monospace;
    }

    .hljs {
      background-color: #f8f9f9;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5em 0;
      border-top: 1px solid #ddd;
    }

    th, td {
      line-height: 2.5em;
      border-bottom: 1px solid #ddd;
      padding: 0 16px;
    }

    tr:nth-child(even) {
      background-color: #f8f8f6;
    }

    li {
      line-height: 1.5em;
    }

    img {
      max-width: 100%;
    }

    p {
      line-height: 1.6em;
    }

    .paper {
      max-width: 1200px;
      margin: 2.5em;
      box-shadow: 0 0 20px #ddd;
    }

    .header,
    .footer,
    .article {
      padding: 2.5em 3em;
    }

    .header,
    .footer {
      background-color: #f8f9f9;
    }

    .header {
      border-bottom: 1px solid #e3e4dd;
    }

    .shields-icons {
      padding-bottom: 1.5em;
    }

    .title {
      font-size: 4em;
      text-align: center;
    }

    .mark {
      color: #4da621;
    }

    .shields-icons,
    .screenshot{
      text-align: center;
    }

    .footer {
      border-top: 1px solid #e3e4dd;
      text-align: center;
    }

    /* 1. 基础手机适配（屏幕宽度 ≤ 768px，覆盖绝大多数手机） */
@media screen and (max-width: 768px) {
  /* 调整主体容器间距，适配手机窄屏 */
  .paper {
    max-width: 100%; /* 取消最大宽度限制，占满屏幕 */
    margin: 0; /* 移除左右外边距 */
    padding: 0; /* 保留内边距，避免内容贴边 */
    box-shadow: none; /* 移除阴影，节省视觉空间 */
  }

  /* 调整标题大小，适配手机 */
  .title {
    font-size: 2em; /* 从4em缩小到2em，避免超出屏幕 */
    margin: 1em 0; /* 调整间距 */
  }

  /* 调整 header/footer 内边距 */
  .header,
  .footer {
    padding: 1em; /* 从2.5em 3em缩小，适配手机 */
  }

  /* 调整表格样式，避免横向溢出 */
  table {
    display: block; /* 改为块级，允许横向滚动 */
    overflow-x: auto; /* 横向滚动条 */
    -webkit-overflow-scrolling: touch; /* 移动端顺滑滚动 */
  }

  /* 调整代码块样式 */
  pre {
    padding: 0.3em;
    font-size: 0.9em; /* 缩小代码字体 */
  }

  /* 调整 shields-icons 图标布局（你新增的class） */
  .shields-icons {
    text-align: center; /* 图标居中 */
  }
  .shields-icons a {
    display: inline-block;
    margin: 5px 2px; /* 缩小图标间距 */
  }
  .shields-icons img {
    max-width: 100%; /* 图标自适应 */
  }

  /* 调整截图样式 */
  .screenshot {
    margin: 10px 0;
  }

  /* 调整列表/段落行高，提升可读性 */
  p, li {
    line-height: 1.5em;
    font-size: 0.95em;
    padding: 0 5px;
  }
}

/* 2. 小屏手机适配（屏幕宽度 ≤ 480px，如iPhone SE/安卓小屏机） */
@media screen and (max-width: 480px) {
  .title {
    font-size: 1.5em; /* 进一步缩小标题 */
  }

  /* 代码字体再缩小，适配超小屏 */
  pre code {
    font-size: 0.85em;
  }

  /* 表格单元格内边距缩小 */
  th, td {
    padding: 0 8px;
    line-height: 2em;
  }
}

/* 3. 手机横屏适配（可选） */
@media screen and (max-width: 768px) and (orientation: landscape) {
  .title {
    font-size: 1.8em; /* 横屏时标题略大 */
  }
  .paper {
    padding: 15px; /* 横屏内边距稍大 */
  }
}

/* 4. 高清屏适配（Retina屏，如iPhone） */
@media screen and (-webkit-min-device-pixel-ratio: 2),
       screen and (min-device-pixel-ratio: 2) {
  /* 可选：高清屏优化，比如图标/图片清晰度 */
  img {
    image-rendering: -webkit-optimize-contrast;
  }
}
  </style>
</head>
<body>
<main class="paper">
  ${marked.parse(content)}
  <footer class="footer">
    <p>Copyright © 2026 <a href="https://github.com/yaohaixiao">乘风巨浪</a>, all right reserved.</p>
    <p>Code licensed under&nbsp;<a href="http://opensource.org/licenses/mit-license.html">MIT License</a></p>
    <p>Documentation licensed under&nbsp;<a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a></p>
    <p><a href="https://github.com/yaohaixiao/renames.js">View on GitHub</a> ·<a href="https://github.com/yaohaixiao/renames.js/issues">Issues</a></p>
  </footer>
</main>
<script>
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
</script>
</body>
</html>`;
};

export default convertMarkdownToHTML;
