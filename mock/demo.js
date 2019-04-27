import * as API from '@/api'
// 引入mockjs
const Mock = require('mockjs')

Mock.mock(API.BASE_GET_DEMO_COUNTRY, () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            countryName: '中国',
            countryCode: '1'
          },
          {
            countryName: '美国',
            countryCode: '2'
          },
          {
            countryName: '法国',
            countryCode: '3'
          }
        ]
      }
    }
  }
)

Mock.mock(API.BASE_GET_DEMO_CITY + '?countryValue=1', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            cityName: '北京',
            cityCode: '11'
          },
          {
            cityName: '上海',
            cityCode: '22'
          },
          {
            cityName: '广州',
            cityCode: '33'
          }
        ]
      }
    }
  }
)

Mock.mock(API.BASE_GET_DEMO_CITY + '?country=1', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            cityName: '北京',
            cityCode: '11'
          },
          {
            cityName: '上海',
            cityCode: '22'
          },
          {
            cityName: '广州',
            cityCode: '33'
          }
        ]
      }
    }
  }
)

Mock.mock(API.BASE_GET_DEMO_DISTRICT + '?city=11', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            districtName: '朝阳',
            districtCode: '111'
          },
          {
            districtName: '海淀',
            districtCode: '222'
          },
          {
            districtName: '昌平',
            districtCode: '333'
          }
        ]
      }
    }
  }
)

Mock.mock(API.BASE_GET_DEMO_LIST + '?pageIndex=1&pageSize=10', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data: [
          {
            id: '1',
            countryName: '中国',
            cityName: '北京',
            districtName: '朝阳区',
            country: '1',
            city: '11',
            district: '111',
            sexName: '男',
            sex: '1'
          },
          {
            id: '2',
            countryName: '中国',
            cityName: '北京',
            districtName: '朝阳区',
            country: '2',
            city: '22',
            district: '222'
          },
          {
            id: '3',
            countryName: '中国',
            cityName: '北京',
            districtName: '朝阳区',
            country: '3',
            city: '33',
            district: '333'
          }
        ]
      }
    }
  }
)

Mock.mock(API.BASE_ALL_DEMO + '?id=1', () => {
    return {
      code: 200,
      msg: 'Succeed!',
      body: {
        data:
          {
            id: '1',
            countryName: '中国',
            cityName: '北京',
            districtName: '朝阳区',
            country: '1',
            city: '11',
            district: '111',
            sexName: '男',
            sex: '1'
          }
      }
    }
  }
)
