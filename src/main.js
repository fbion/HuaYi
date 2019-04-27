import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerDirectives from './directive'
import '@components/_globals'
import '@styles/ele-theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '@styles/index.less'
import  './assets/iconfont/iconfont.css'
import * as filters from './filters'
import * as API from './api'
import * as CONST from '@/utils/constant'
import * as T from '@utils/tools'
import http from '@utils/axios'
import * as  ET from  '@utils/ETTool'
 import  moment from 'moment'
Vue.config.productionTip = false

Vue.prototype.$API = API
Vue.prototype.$http = http
Vue.prototype.$T = T
Vue.prototype.$CONST = CONST
Vue.prototype.$ET=ET
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.moment = moment;
moment.locale('zh-cn')
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};



// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 注册指令
registerDirectives(Vue)
// 开发环境下加载假数据
if (process.env.NODE_ENV === 'development') {
  // demo
  require('../mock/demo')
  // aaa
  require('../mock/aaa')

}

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// // 加载菜单
if (vm.$store.state.app.isProMACE === false) {
  require('../mock/menu')
}
