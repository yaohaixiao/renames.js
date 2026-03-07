import rename from '../../lib/utils/rename.js';

/**
 * # 撤销重命名
 *
 * @function revokeCacheRecord
 * @param {object} record - 撤销的数据
 * @returns {boolean} - 撤销成功，返回 true，否则返回 false
 */
const revokeCacheRecord = (record) => {
  const { oldFilePath, newFilePath } = record;

  return rename(newFilePath, oldFilePath);
};

export default revokeCacheRecord;
