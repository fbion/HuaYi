import * as API from '@/api'

// 引入mockjs
const Mock = require('mockjs')

/**
 * 作业流程模板信息
 */

// 列表
Mock.mock(API.DMMS_GET_OPERATION_TEMPLATE_LIST + '?pageIndex=1&pageSize=10', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            operatingTemplId: '1',
            operationTemplateCode: '1',
            operationTemplateName: '测试模板',
            status: '1',
            statusName: '启用',
            createUser: '田军',
            createTime: '2018-08-20',
            createDept: '研发部门'
          },
          {
            operatingTemplId: '2',
            operationTemplateCode: 'xxxx',
            operationTemplateName: 'xxxx',
            status: '2',
            statusName: 'xxxx',
            createUser: 'xxxx',
            createTime: 'xxxx',
            createDept: 'xxxx'
          },
          {
            operatingTemplId: '3',
            operationTemplateCode: 'xxxx',
            operationTemplateName: 'xxxx',
            status: '3',
            statusName: 'xxxx',
            createUser: 'xxxx',
            createTime: 'xxxx',
            createDept: 'xxxx'
          }
        ]
      }
    }
  }
)

// 获取一条数据
Mock.mock(API.DMMS_ALL_OPERATION_TEMPLATE + '?operatingTemplId=1', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: {
          'operatingTemplId': '1',
          operationTemplateCode: '1',
          operationTemplateName: '测试模板',
          status: 1,
          statusName: '启用',
          createUser: '田军',
          createTime: '2018-08-20',
          createDept: '研发部门',
          tickets: [
            {
              'content': '作业内容1',
              'order': 1
            },
            {
              'content': '作业内容2',
              'order': 2
            }
          ]
        }
      }
    }
  }
)

// 编辑
const data = {
  operating_id: '1'
}
Mock.mock(API.DMMS_ALL_OPERATION_TEMPLATE, 'put', data, () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: {
          operating_id: '1',
          operating_content: 'xxxx',
          operating_type_code: '装船',
          create_time: '2008',
          create_id: 'tj'
        }
      }
    }
  }
)

// 删除
