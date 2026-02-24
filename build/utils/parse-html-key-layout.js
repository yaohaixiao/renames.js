import readFile from '../../lib/utils/read-file.js';

const parseHTMLKeyLayout = (html) => {
  const TITLE_TAG = /<h1>(.+)(\.js)<\/h1>/g;
  const SHIELDS_ICONS =
    /(<p>)(\s*?<a href="https:\/\/www.npmjs.com\/package\/@yaohaixiao\/renames.js">[\s\S]*?MIT License<\/a>\s*?)<\/p>/g;
  const MAIN_LAYOUT =
    /(<header class="header">[\s\S]*?<\/header>)([\s\S]*?)(<footer class="footer">[\s\S]*?<\/footer>)/g;
  const P_CONTAINS_IME = /<p>(\s*<img[^>]+>\s*)<\/p>/g;

  return html
    .replaceAll(
      TITLE_TAG,
      '<header class="header"><h1 class="title">$1<strong class="mark">$2</strong></h1></header>',
    )
    .replace(SHIELDS_ICONS, '<p class="shields-icons">$2</p>')
    .replaceAll(
      MAIN_LAYOUT,
      '$1<article class="article" id="article">$2</article>$3',
    )
    .replaceAll('./docs/', './')
    .replace(P_CONTAINS_IME, '<p class="screenshot">$1</p>');
};

export default parseHTMLKeyLayout;
