/**
 * # 将 UUID 字符串转化成数组
 *
 * @function uuidToArray
 * @param {string} uuid - UUID 字符串
 * @returns {number[]} - 返回转化后的数组
 */
const uuidToArray = (uuid) => {
  // 去掉横线
  const hex = uuid.replaceAll('-', '');
  const arr = [];

  for (let i = 0; i < 32; i += 2) {
    // 按每2位拆分为16进制，转10进制整数
    arr.push(Number.parseInt(hex.slice(i, i + 2), 16));
  }

  return arr;
};

export default uuidToArray;
