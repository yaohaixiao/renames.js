/**
 * # 判断一个值是否为空对象（纯对象 + 无自身可枚举属性）
 *
 * @function isEmptyObject
 * @param {object} obj - 要检测的值
 * @returns {boolean} - 是为空对象返回 true，否则返回 false
 */
const isEmptyObject = (obj) => {
  // 先判断是否为纯对象（排除 null、数组、函数、基本类型等）
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  // 判断是否为空数组
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  }

  // 判断是否有自身可枚举属性
  return Object.keys(obj).length === 0;
};

export default isEmptyObject;
