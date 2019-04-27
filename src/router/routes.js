const Login = r => require.ensure([], () => r(require('../views/login')), 'frame')
const Main = r => require.ensure([], () => r(require('../views/main')), 'frame')
const Home = r => require.ensure([], () => r(require('../views/home')), 'frame')
const Test = r => require.ensure([], () => r(require('../views/_test')), 'test')
const DemoCascader = r => require.ensure([], () => r(require('../views/_demoCascader')), 'demo')
const DemoFormUpload = r => require.ensure([], () => r(require('../views/_demoFormUpload')), 'demo')
/*
 * 业务相关路由
 */

// 泊位信息
const Berth = r => require.ensure([], () => r(require('../views/dmms/berth')), 'dmms')
// 方案编制
const SchemeCompile = r => require.ensure([], () => r(require('../views/dlms/schemeCompile')), 'dlms')

const OpeIndexMnt = r => require.ensure([], () => r(require('../views/kpi/OpeIndexMnt')), 'kpi')
const CPKCheck = r => require.ensure([], () => r(require('../views/kpi/cpk/CPKCheck')), 'kpi')
const InhibitorConf = r => require.ensure([], () => r(require('../views/kpi/InhibitorConf')), 'kpi')
const OpeStableRate = r => require.ensure([], () => r(require('../views/kpi/OpeStableRate')), 'kpi')
const WasteWaterPHConf = r => require.ensure([], () => r(require('../views/kpi/WasteWaterPHConf')), 'kpi')
const WasteWaterCODConf = r => require.ensure([], () => r(require('../views/kpi/WasteWaterCODConf')), 'kpi')




// 框架相关
export const frameRouter = [{
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/_demoCascader',
    name: 'demoCascader',
    component: DemoCascader
}, {
    path: '/_demoFormUpload',
    name: 'demoFormUpload',
    component: DemoFormUpload
}, {
    path: '/_test',
    name: 'test',
    component: Test
}]

// 不是挂载menu上
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: []
}

// 主数据
const dmms = [{
    path: '/dmms/berth',
    name: 'berth',
    title: '泊位信息',
    component: Berth
}]

// 船舶装卸管理
const dlms = [
    {
        path: '/dlms/scheme-compile',
        name: 'schemeCompile',
        title: '方案编制',
        component: SchemeCompile
    }
]

export const kpiRouter = [{
    path: '/kpi/opeindexmnt',
    name: 'OpeIndexMnt',
    title: '操作指标维护',
    component: OpeIndexMnt
},
    {
        path: '/kpi/CPKCheck',
        name: 'CPKCheck',
        title: '指标CPK查看',
        component: CPKCheck
    }, {
        path: '/kpi/InhibitorConf',
        name: 'InhibitorConf',
        title: '阻聚剂',
        component: InhibitorConf
    },
    {
        path: '/kpi/OpeStableRate',
        name: 'OpeStableRate',
        title: '操作平稳率',
        component: OpeStableRate
    },{
        path: '/kpi/WasteWaterPHConf',
        name: 'WasteWaterPHConf',
        title: '废水PH配置',
        component:WasteWaterPHConf
    },{
        path: '/kpi/WasteWaterCODConf',
        name: 'WasteWaterCODConf',
        title: '废水COD配置',
        component:WasteWaterCODConf
    }]
// 业务页面挂载menu上的
export const appRouter = {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        name: 'home',
        title: '首页',
        component: Home
    }, ...dmms, ...dlms, ...kpiRouter]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    ...frameRouter,
    otherRouter,
    appRouter
]

// 异步加载组件
/* eslint-disable */
function lazyLoadView(AsyncView) {
    const AsyncComponent = () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: AsyncView,
        // 异步组件加载时使用的组件
        loading: '',
        // 加载失败时使用的组件
        error: '',
        // 展示加载时组件的延时时间。默认值是 200 (毫秒)
        delay: 200,
        // 如果提供了超时时间且组件加载也超时了，
        // 则使用加载失败时使用的组件。默认值是：`Infinity`
        timeout: 3000
    })

    return Promise.resolve({
        functional: true,
        render(h, {data, children}) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncComponent, data, children)
        }
    })
}
