import editGeneratedFile from '../utils/edit-generated-file.js';

/**
 * # edit 命令的 action 逻辑
 *
 * @function editCommandAction
 * @param {string} [type='config'] - 可选，指定编辑的文件类型名称：config 或者 cache. Default is
 *   `'config'`
 * @param {object} options - 可选，配置参数对象
 * @returns {boolean} - 操作成功，返回 true，否则返回 false
 */
const editCommandAction = (type = '', options = null) => {
  const editor = options.editor || '';

  switch (type) {
    case 'config': {
      return editGeneratedFile(editor);
    }
    case 'cache': {
      return editGeneratedFile(editor, false);
    }
    default: {
      return editGeneratedFile(editor);
    }
  }
};

export default editCommandAction;
