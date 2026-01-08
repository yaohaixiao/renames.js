const batchRename = require('./utils/batchRename')
const getBasename = require('./utils/getBasename')
const getExtension = require('./utils/getExtension')

// -------------------------- 调用示例 --------------------------
// rename('C:\\Users\\haixi\\Videos', '国漫+电影+电视剧[分享中].txt', '分享')

// 给 "images" 文件夹下的所有文件添加前缀 "vacation_"、后缀 "_2024"
batchRename('C:\\Users\\haixi\\Downloads', {
  // namesList: [
  //   '小妖怪的夏天',
  //   '鹅鹅鹅',
  //   '林林',
  //   '乡村巴士带走了王孩儿和神仙',
  //   '小满',
  //   '飞鸟与鱼',
  //   '小卖部',
  //   '玉兔'
  // ],

  // namesList: 'C:\\Users\\haixi\\Downloads\\names.txt',

  prefix: '庆余年',
  connector: '.',

  autoIndex: 'only',
  indexPadZero: true,
  // force: true,
  // extname: '.mkv'

  // startIndex: 10,

  filter: (files) => {
    return files.filter((file) => {
      const extname = getExtension(file)

      return extname === '.txt'
    })
  },

  // sort: (files) => {
  //   return files.sort((a, b) => {
  //     const aBase = getBasename(a).replace(/\-/g, '')
  //     const bBase = getBasename(b).replace(/\-/g, '')
  //
  //     return Number(aBase) - Number(bBase)
  //   })
  // },

  // format: (oldFileName) => {
  //   const basename = getBasename(oldFileName)
  //   return basename.replace(/(\d+)\s/, '第$1集：')
  // }
})
