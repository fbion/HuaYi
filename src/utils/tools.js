import { OAUTH_API_GROUP } from '@/utils/authorityAPI'
import * as CONST from './constant'
import { Message } from 'element-ui'

export const _ = require('lodash')

/**
 * 将内容存储到sessionStorage
 * @param key {string} key
 * @param content {Object} 存储json对象
 * @author TJ 2018/05/28
 * @example 略
 */
export function setSessionStorage(key, content) {
  if (!key) return false
  let jsonContent = JSON.stringify(content)
  jsonContent ? sessionStorage.setItem(key, jsonContent) : sessionStorage.setItem(key, content)
}

/**
 * 获取存储到sessionStorage的内容
 * @param key {string} key
 * @return {object} 返回json对象
 * @author TJ 2018/05/28
 * @example 略
 */
export function getSessionStorage(key) {
  let item = sessionStorage.getItem(key)
  if (!item) return false
  let result = JSON.parse(sessionStorage.getItem(key))
  return result ? result : item
}

/**
 * 删除存储到sessionStorage的内容
 * @param key {string} key
 * @author TJ 2018/05/28
 * @example 略
 */
export function removeSessionStorage(key) {
  sessionStorage.removeItem(key)
}

/**
 * 判断json对象是否为空对象
 * @param obj {object} json对象
 * @return {boolean} 空对象返回 true 否则返回 false
 * @author TJ 2018/05/28
 * @example 略
 */
export function isEmptyObject(obj) {
  if (obj === null) return true
  return Object.keys(obj).length === 0
}

/**
 * 过滤参数
 * @param params {object} 需要格式化的时间
 * @return {object} 格式化后的时间
 * @author TJ 2017/05/28
 * @example 略
 */
export function filterParams(params) {
  if (!_.isObject(params)) {
    return params
  }
  let newParams = {}
  _.each(params, function(v, k) {
    // 过滤掉条件是空的项
    if (typeof v === 'string' && ( v === '*全*部*')) {
      newParams[k] = ''
    } else {
      newParams[k] = v
    }
  })
  return newParams
}

/**
 * 将null转换为空对象
 * @param params {obj}
 * @author TJ 2018/05/31
 */
export function emptyObjectWrapper(obj) {
  return obj === null ? {} : obj
}

/**
 * 格式化时间
 * @param time {string} 需要格式化的时间
 * @param cFormat {string} 时间格式
 * @return {string} 格式化后的时间
 * @author TJ 2017/07/21
 * @example 略
 */
export function parseTime(time, cFormat) {
  if (!time) return false
  if (arguments.length === 0) {
    return false
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    if (('' + time).length === 8 && ('' + time).indexOf('-') === -1 && ('' + time).indexOf('/') === -1) {
      time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8)
    }

    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 将时间数组分割成开始时间和结束时间
 * @param time {array}
 * @return {object}
 * @author TJ 2017/08/01
 * @example 略
 */
export function formatTime(time) {
  if (Array.isArray(time)) {
    if (!time[0] || !time[1]) return false
    var start = parseTime(time[0], '{y}-{m}-{d}')
    var end = parseTime(time[1], '{y}-{m}-{d}')
    return {
      start: start,
      end: end
    }
  }

  return false
}

/**
 * 判断请求的api是否是要追加权限的
 * @param api {String}
 * @return {boolean}
 * @author TJ 2017/08/01
 * @example 略
 */
export function isExistOauthApi(api) {
  let isExist = false
  for (let item of OAUTH_API_GROUP) {
    if (api && api.includes(item)) {
      isExist = true
      break
    }
  }
  return isExist
}

/**
 * 权限API拼接用户名
 * @param api {String}
 * @return {boolean}
 * @author TJ 2017/08/01
 * @example 略
 */
export function getJoinOauthApi(url) {
  let name = window._loginName ? window._loginName : ''
  if (url.includes('?')) {
    url += '&createId=' + name
  } else {
    url += 'createId=' + name
  }
  return url
}

/**
 * 拼接查询URL
 * @param url {String}
 * @param obj {obj}
 * @return {String}
 * @author TJ 2017/08/01
 * @example 略
 */
export function joinQueryUrl(url, obj) {
  let str = ''
  let fullUrl = ''
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return
    if (str) {
      str += '&'
    }
    str += key + '=' + obj[key]
  }
  if (url.includes('?')) {
    fullUrl = url + '&' + str
  } else {
    fullUrl = url + '?' + str
  }
  return fullUrl
}

/**
 * 判断参数是否嵌入在url中
 * @param url {String}
 * @param params {obj}
 * @author TJ 2018/08/27
 */
export function isInlineParams(url) {
  const splitChar = '{&'
  if (url && url.indexOf(splitChar) > -1) {
    return true
  } else {
    return false
  }
}

/**
 * 替换url里的参数
 * @param url {String}
 * @param params {obj}
 * @author TJ 2018/05/31
 */
export function replaceUrlParams(url, params) {
  if (url) {
    if (!isInlineParams(url)) {
      return url
    }
    // 正则匹配{}，生成数组
    let patt = /\{.*?\}/g
    let arr = url.match(patt) ? url.match(patt) : []
    arr.forEach(function(item) {
      let key = item.replace('{', '').replace('}', '').replace('$', '')
      url = url.replace(item, params[key])
    })
  }
  return url
}

/**
 * 配置Echart主题颜色
 * @author TJ 2017/10/17
 */
export function resgisterTheme(echart) {
  /* eslint-disable */
  let theme = {
    'color': [
      '#29d0b0',
      '#2d99ed',
      '#fd8667',
      '#72ccff',
      '#f7c5a0',
      '#d4a4eb',
      '#fdc547',
      '#76f2f2',
      '#da4d00',
      '#b0419e'
    ],
    'backgroundColor': 'transparents',
    'textStyle': {
      'itemStyle': {
        'normal': {
          'color': '#fff'
        }
      }
    },
    'title': {
      'textStyle': {
        'color': '#ffffff'
      },
      'subtextStyle': {
        'color': '#dddddd'
      }
    },
    'line': {
      'itemStyle': {
        'normal': {
          'borderWidth': '1'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '1'
        }
      },
      'symbolSize': '4',
      'symbol': 'circle',
      'smooth': false
    },
    'radar': {
      'itemStyle': {
        'normal': {
          'borderWidth': '4'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '3'
        }
      },
      'symbolSize': '1',
      'symbol': 'circle',
      'smooth': true
    },
    'bar': {
      'itemStyle': {
        'normal': {
          'barBorderWidth': 0,
          'barBorderColor': '#ccc'
        },
        'emphasis': {
          'barBorderWidth': 0,
          'barBorderColor': '#ccc'
        }
      }
    },
    'pie': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'scatter': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'boxplot': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'parallel': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'sankey': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'funnel': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'gauge': {
      'itemStyle': {
        'normal': {
          'borderWidth': 1,
          'borderColor': '#fff'
        },
        'emphasis': {
          'borderWidth': 1,
          'borderColor': '#fff'
        }
      }
    },
    'candlestick': {
      'itemStyle': {
        'normal': {
          'color': '#fc97af',
          'color0': 'transparent',
          'borderColor': '#fc97af',
          'borderColor0': '#87f7cf',
          'borderWidth': '2'
        }
      }
    },
    'graph': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '1',
          'color': '#ffffff'
        }
      },
      'symbolSize': '5',
      'symbol': 'circle',
      'smooth': true,
      'color': [
        '#29d0b0',
        '#2d99ed',
        '#fd8667',
        '#72ccff',
        '#f7c5a0',
        '#d4a4eb',
        '#fdc547',
        '#76f2f2',
        '#da4d00',
        '#b0419e'
      ],
      'label': {
        'normal': {
          'textStyle': {
            'color': '#293441'
          }
        }
      }
    },
    'map': {
      'itemStyle': {
        'normal': {
          'areaColor': '#f3f3f3',
          'borderColor': '#999999',
          'borderWidth': 0.5
        },
        'emphasis': {
          'areaColor': 'rgba(255,178,72,1)',
          'borderColor': '#eb8146',
          'borderWidth': 1
        }
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#893448'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': 'rgb(137,52,72)'
          }
        }
      }
    },
    'geo': {
      'itemStyle': {
        'normal': {
          'areaColor': '#f3f3f3',
          'borderColor': '#999999',
          'borderWidth': 0.5
        },
        'emphasis': {
          'areaColor': 'rgba(255,178,72,1)',
          'borderColor': '#eb8146',
          'borderWidth': 1
        }
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#893448'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': 'rgb(137,52,72)'
          }
        }
      }
    },
    'categoryAxis': {
      'axisLine': {
        'show': true,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#fff'
        }
      },
      'splitLine': {
        'show': false,
        'lineStyle': {
          'color': [
            '#e6e6e6'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'valueAxis': {
      'axisLine': {
        'show': true,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#fff'
        }
      },
      'splitLine': {
        'show': false,
        'lineStyle': {
          'color': [
            '#e6e6e6'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'logAxis': {
      'axisLine': {
        'show': true,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#333'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#fff'
        }
      },
      'splitLine': {
        'show': false,
        'lineStyle': {
          'color': [
            '#e6e6e6'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'timeAxis': {
      'axisLine': {
        'show': true,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#fff'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#fff'
        }
      },
      'splitLine': {
        'show': false,
        'lineStyle': {
          'color': [
            '#fff'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'toolbox': {
      'iconStyle': {
        'normal': {
          'borderColor': '#999999'
        },
        'emphasis': {
          'borderColor': '#666666'
        }
      }
    },
    'legend': {
      'textStyle': {
        'color': '#e0e0e0'
      }
    },
    'tooltip': {
      'axisPointer': {
        'lineStyle': {
          'color': '#cccccc',
          'width': 1
        },
        'crossStyle': {
          'color': '#cccccc',
          'width': 1
        }
      }
    },
    'timeline': {
      'lineStyle': {
        'color': '#87f7cf',
        'width': 1
      },
      'itemStyle': {
        'normal': {
          'color': '#87f7cf',
          'borderWidth': 1
        },
        'emphasis': {
          'color': '#f7f494'
        }
      },
      'controlStyle': {
        'normal': {
          'color': '#87f7cf',
          'borderColor': '#87f7cf',
          'borderWidth': 0.5
        },
        'emphasis': {
          'color': '#87f7cf',
          'borderColor': '#87f7cf',
          'borderWidth': 0.5
        }
      },
      'checkpointStyle': {
        'color': '#fc97af',
        'borderColor': 'rgba(252,151,175,0.3)'
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#87f7cf'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': '#87f7cf'
          }
        }
      }
    },
    'visualMap': {
      'color': [
        '#fc97af',
        '#87f7cf'
      ]
    },
    'dataZoom': {
      'backgroundColor': 'rgba(255,255,255,0)',
      'dataBackgroundColor': 'rgba(114,204,255,1)',
      'fillerColor': 'rgba(114,204,255,0.2)',
      'handleColor': '#72ccff',
      'handleSize': '100%',
      'textStyle': {
        'color': '#fff'
      }
    },
    'markPoint': {
      'label': {
        'normal': {
          'textStyle': {
            'color': '#293441'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': '#293441'
          }
        }
      }
    }
  }
  echart.registerTheme('dark', theme)
  /* eslint-enable */
}

/**
 * 设置SessionStorage初始用户信息
 * @author TJ 2017/10/17
 */
export function setUserInfo(content) {
  // setSessionStorage('HDRI_USER', content)
  vm.$store.state.app.user = content
}

/**
 * 获取SessionStorage用户信息
 * @author TJ 2017/10/17
 */
export function getUserInfo() {
  // return getSessionStorage('HDRI_USER')
  return vm.$store.state.app.user
}

export function openNewPage(vm, name, params, query) {
  let openedPagesArr = vm.$store.state.app.openedPages
  let tagHasOpened = false

  for (let item of openedPagesArr) {
    if (name === item.name) {
      // 页面已经打开
      // vm.$store.commit('pageOpenedList', {
      //   index: i,
      //   argu: argu,
      //   query: query
      // });
      tagHasOpened = true
      break
    }
  }

  if (!tagHasOpened) {
    let tagArr = vm.$store.state.app.tagsList.filter((item) => {
      return name === item.name
    })
    if (tagArr.length) {
      let tagObj = tagArr[0]
      vm.$store.commit('addPageTag', {
        title: tagObj.title,
        path: tagObj.path ? tagObj.path : '',
        name: tagObj.name,
        src: tagObj.src ? tagObj.src : ''
      })
    }
  }

  // 当前打开tab的name
  vm.$store.state.app.currentTagName = name
}

export function toDefaultPage(routers, name, route, next) {
  let len = routers.length
  let i = 0
  let notHandle = true
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      })
      notHandle = false
      next()
      break
    }
    i++
  }
  if (notHandle) {
    next()
  }
}

export function success(msg = CONST.MSG_SYS_SUCCESS) {
  Message({
    message: msg,
    type: 'success'
  })
}

export function fail(msg = CONST.MSG_SYS_FAIL) {
  Message({
    message: msg,
    type: 'error'
  })
}

export function error(msg = CONST.MSG_SYS_ERR) {
  Message({
    message: msg,
    type: 'error'
  })
}

export function warning(msg = CONST.MSG_SYS_WARNING) {
  Message({
    message: msg,
    type: 'warning'
  })
}

export function info(msg = CONST.MSG_SYS_CANCELED) {
  Message({
    message: msg,
    type: 'info'
  })
}

export function alertError(msg = CONST.MSG_SYS_ERR, options) {
  options = Object.assign({
    dangerouslyUseHTMLString: true,
    title: '提示',
    type: 'error',
    'show-icon': true
  }, options)
  vm.$alert(msg, options)
}

export function alertWarning(msg = CONST.MSG_SYS_WARNING, options) {
  options = Object.assign({
    dangerouslyUseHTMLString: true,
    title: '提示',
    type: 'warning',
    'show-icon': true
  }, options)
  vm.$alert(msg, options)
}

export function todo() {
  warning('开发中。。。')
}
