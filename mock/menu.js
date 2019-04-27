import * as API from '@/api'
// 引入mockjs
const Mock = require('mockjs')

// 获取菜单数据

/**
 *  菜单属性都必须存在，字符类型可以填空字符串，数组类型填写[]空数组
 *  src是iframe的地址，path是单页面路由地址，注意两者不能同时填写
 *  name 属性是一个唯一的标识
 *  主页的name 默认是home。如要更改 需更改代码（尽量不要修改）
 *
 */
Mock.mock(API.BASE_GET_MENU, () => {
  return {
    code: 200,
    msg: 'Succeed!',
    body: {
      data: [
          {
              path: '',
              title: 'KPI',
              icon: 'el-icon-my-computer',
              children: [
                  { path: '/kpi/opeindexmnt', name: 'OpeIndexMnt', title: 'kpi' },
                  { path: '/kpi/CPKCheck', name: 'CPKCheck', title: '指标CPK查看' },
                  { path: '/kpi/InhibitorConf', name: 'InhibitorConf', title: '阻聚剂' }
              ]
          }
      ]
    }
  }
})
