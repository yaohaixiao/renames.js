/**
 * # 将 renames 缓存记录转化成数组
 *
 * @function parseRenamesToList
 * @param {object} renames - 缓存的所有记录对象
 * @returns {string[]} - 返回转化后的数组数据
 */
const parseRenamesToList = (renames) => {
  const groups = Object.keys(renames);
  const records = [];

  for (const group of groups) {
    records.push(...renames[group]);
  }

  return records;
};

export default parseRenamesToList;
