import axios from 'axios'
import * as CONST from '@/utils/constant'
import * as $T from '@/utils/tools'
import * as ET from '@/utils/ETTool'

/**
 * 定义返回的json数据格式
 *
 * === 分页数据 ===
 * {
 *    code:200,
 *    body:{
 *      data:[{},{}],
 *      total:xx,
 *      pageIndex:xx
 *      pageSize:xx
 *      pages:xx
 *    },
 *    msg:'ok'
 * }
 *
 * === 列表数据 ===
 *
 * {
 *    code:200,
 *    body:{
 *      data:[{},{}]
 *    },
 *    msg:'ok'
 * }
 *
 * === 一条数据 ===
 *
 * {
 *    code:200,
 *    body:{
 *      data:{}
 *    },
 *    msg:'ok'
 * }
 *
 */

// 创建axios实例
const service = axios.create({
  timeout: 10000
})

// function showDebugInfo(config) {
//   console.group('%cMethod::' + config.method + '::Url::' + config.url, 'color:red;font-size:12px;')
//   console.log('%c保存/更新/查看场合，传入的参数::', 'font-size:12px;')
//   console.log(config.hasOwnProperty('params') ? JSON.stringify(config.params) : JSON.stringify(config.data))
//   console.groupEnd()
// }

function filterOauthData(config) {
  let url = config.url
  if (config.method === 'post' && $T.isExistOauthApi(url)) {
    // post请求的场合下，追加角色名称
  }

  if (config.method === 'get' && $T.isExistOauthApi(url)) {
    // get请求的场合下，追加角色名称
    if (config.hasOwnProperty('params')) {
      config.params['userCode'] = ''
    } else {
      config['params'] = {}
      config.params['userCode'] = ''
    }
  }
  return config
}

// request拦截器
service.interceptors.request.use(
  config => {
    let copyConfig = Object.assign({}, config)
    copyConfig = filterOauthData(copyConfig)
    // showDebugInfo(copyConfig)
    return copyConfig
  },
  error => {
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code * 1 !== 200) {
      // $T.warning(res.msg)
        if(typeof res === 'object')
           return ET.toObjectArr(res)
        return res;
     // return Promise.reject(res)
    } else {
      return res.body
    }
  },
  error => {
    if (error.message.includes('timeout')) {
      $T.fail(CONST.MSG_SYS_TIME_OUT)
    } else {
      $T.fail(CONST.MSG_SYS_ERR)
    }
    return Promise.reject(error)
  }
)

const $http = {}
$http.$service = service
$http.$axios = axios
$http.get = function(url, params = {}) {
  console.log(url,'123')
  return service({
    url: url,
    method: 'get',
    params: $T.filterParams(params)
  })
}
$http.post = function(url, data = {}) {
  return service({
    url: url,
    method: 'post',
    data: data
  })
}
$http.put = function(url, data = {}) {
  return service({
    url: url,
    method: 'put',
    data: data
  })
}
$http.delete = function(url, data = {}) {
  return service({
    url: url,
    method: 'delete',
    data: data
  })
}
export default $http
