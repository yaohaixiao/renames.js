import prettier from 'prettier';
import { highlight } from 'cli-highlight';

/**
 * # 显示缓存记录
 *
 * @function displayCacheRecordsJSON
 * @param {string} cacheJSON - 要显示的 JSON 数据
 * @returns {Promise<void>}
 */
const displayCacheRecordsJSON = async (cacheJSON) => {
  const formatedJSONCode = await prettier.format(cacheJSON, {
    // 指定解析器为 json
    parser: 'json',
    // 每行最大字符数（可选，默认80）
    printWidth: 80,
    // 缩进空格数（可选，默认2）
    tabWidth: 2,
    // 是否使用制表符缩进（可选，默认false）
    useTabs: false,
  });

  // 高亮显示缓存数据
  console.log(
    highlight(formatedJSONCode, {
      language: 'json',
    }),
  );
};

export default displayCacheRecordsJSON;
