import Vue from 'vue'
import Router from 'vue-router'
import { routers, appRouter, otherRouter } from './routes'
import * as $T from '@/utils/tools'
import * as $API from '@/api'
import $store from '@/store'
import $http from '@/utils/axios'
// import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)
const router = new Router({
  base: 'hy',
  mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  // if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
  //   next({
  //     name: 'login'
  //   })
  // } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
  //   next({
  //     name: 'home'
  //   })
  // } else {x`x
  // 如果存在用户信息
  if ($store.state.app.user) {
    $T.toDefaultPage([...appRouter.children, ...otherRouter.children], to.name, router, next)
  } else {
    // 获取用户信息
    let  api=$API.findOpeIndexMnt+'?Unit_Code=code1&Prdt_Cell_Code=dy1&Index_Name=xxx&Grade=1&In_Use=1&pageIndex=1&pageSize=10'
      $http.get(api).then(response => {
        // 保存用户信息去store
          $T.setUserInfo({userName: 'lzz' })
        // $store.state.app.user = response.data
        $T.toDefaultPage([...appRouter.children, ...otherRouter.children], to.name, router, next)
      }).catch(() => {
          $T.error('获取用户信息失败！')
      })
  //   $http.get($API.PUBLIC_GET_USER_INFO).then(response => {
  //     // 保存用户信息去store
  //       $T.setUserInfo(response.data)
  //     // $store.state.app.user = response.data
  //     $T.toDefaultPage([...appRouter.children, ...otherRouter.children], to.name, router, next)
  //   }).catch(() => {
  //
  //       $T.error('获取用户信息失败！')
  //   })
  }
  // }
})

router.beforeResolve((routeTo, routeFrom, next) => {
  if (routeFrom.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to) => {
  NProgress.done()
  $T.openNewPage(router.app, to.name)
  window.scrollTo(0, 0)
})

export default router
