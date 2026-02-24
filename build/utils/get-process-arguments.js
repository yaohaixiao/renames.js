const getProcessArguments = () => {
  // 提取自定义参数（过滤掉前两项）
  const customArgs = process.argv.slice(2);

  // 解析键值对格式的参数（推荐）
  const args = {};

  for (const arg of customArgs) {
    const [key, value] = arg.split('=');

    if (key && value) {
      args[key] = value;
    }
  }

  return args;
};

export default getProcessArguments;
