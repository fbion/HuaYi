import * as API from '@/api'
// 引入mockjs
const Mock = require('mockjs')

// 获取字典数据
Mock.mock(API.PUBLIC_GET_DICTIONARIES_YES_NO, () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            dictionaryName: '启动',
            dictionaryCode: 1
          },
          {
            dictionaryName: '停用',
            dictionaryCode: 0
          }
        ]
      }
    }
  }
)
