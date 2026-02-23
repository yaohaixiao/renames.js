/**
 * # 格式化时间，返回本地化格式的时间格式的字符串
 *
 * @function toLocaleTime
 * @param {Date} [date=new Date()] - 可选，需要格式化的时间. Default is `new Date()`
 * @param {object} [options={}] - 可选，时间格式化的配置信息对象. Default is `{}`
 * @returns {string}
 */
const toLocaleTime = (date = new Date(), options = {}) => {
  const time = date;

  const normalizedOptions = {
    locales: 'zh-CN',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    ...options,
  };
  const { locales } = normalizedOptions;

  return time.toLocaleTimeString(locales, normalizedOptions);
};

export default toLocaleTime;
