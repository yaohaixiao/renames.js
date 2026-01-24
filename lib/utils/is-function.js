/**
 * # 判断一个值是否为函数（兼容所有函数类型）
 *
 * @function isFunction
 * @param {Function} val - 要判断的值
 * @returns {boolean} - 返回是否为函数的检测结果
 */
const isFunction = (val) => {
  // 基础判断：排除 null/undefined/非对象类型
  if (val == null || (typeof val !== 'function' && typeof val !== 'object')) {
    return false;
  }

  /**
   * 核心判断：通过原型链和内部属性区分函数与其他对象
   *
   * 1. 普通函数/箭头函数/异步函数/生成器函数：prototype 存在（箭头函数除外，但 typeof 为 function）
   * 2. DOM 方法（如 document.createElement）：typeof 为 function
   * 3. 类（class）：typeof 为 function，但实例化需要 new，仍属于函数类型
   * 4. 排除其他对象（如数组、对象字面量等）
   */
  return (
    // 处理某些特殊环境下 typeof 误判为 object 的函数（极少数情况）
    typeof val === 'function' ||
    Object.prototype.toString.call(val) === '[object Function]'
  );
};

export default isFunction;
