import * as API from '@/api'
// 引入mockjs
const Mock = require('mockjs')

Mock.mock(API.PUBLIC_GET_USER_INFO, () => {
  return {
    code: 200,
    msg: 'Succeed!',
    body: {
      data: {
        'userClass': '0',
        'orderId': '0',
        'crtUserDate': '2018-12-18 10:35:12',
        'postionCode': '4340590',
        'mntUserDate': '2018-12-18 14:00:25',
        'userCode': 'tianjun7321',
        'postionId': '1045',
        'enabled': '1',
        'orgUnitCode': '34860011',
        'crtUserId': 'admin',
        'orgUnitId': '106846',
        'email': 'tianjun@pcitc.com',
        'mntUserId': 'admin',
        'postionName': '系统管理主管',
        'crtUserName': 'admin',
        'sex': '1',
        'employeeId': '89757',
        'isAdmin': '1',
        'userName': '田军',
        'userId': '2428',
        'version': '3',
        'mntUserName': 'admin',
        'orgUnitViews': '[ ]',
        'userType': '1',
        'orgUnitName': '信息部'
      }
    }
  }
})

Mock.mock(RegExp(API.PUBLIC_GET_PAGES_RESOURCE + '.*'), () => {
  return {
    code: 200,
    msg: 'Succeed!',
    body: {
      data: 'add,delete,edit,query,import,export,start,stop'
    }
  }
})
