const uuidToArray = (uuidStr) => {
  // 去掉横线，按每2位拆分为16进制，转10进制整数
  const hex = uuidStr.replaceAll('-', '');
  const arr = [];

  for (let i = 0; i < 32; i += 2) {
    arr.push(Number.parseInt(hex.slice(i, i + 2), 16));
  }

  return arr;
};

export default uuidToArray;
