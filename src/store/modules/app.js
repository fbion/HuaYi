import { appRouter, otherRouter } from '@/router/routes'

const state = {
  isProMACE: false,
  openedPages: [{
    title: '首页',
    path: '/home',
    name: 'home',
    src: ''
  }],
  currentTagName: 'home', // iframe就是name,路由则是路由名字
  tagsList: [...appRouter.children, ...otherRouter.children],
  user: null,
  avator: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1517899008&di=7592169ab49f67d360ea1cea8febaf5d&src=http://img3.redocn.com/tupian/20141217/zhongguoshihuabiaozhi_3709483.jpg'
}
const mutations = {
  addIframToTagsList(state, iframsArr) {
    iframsArr.forEach((obj) => {
      state.tagsList.push({
        src: obj.src,
        path: '',
        name: obj.name,
        title: obj.title,
        component: ''
      })
    })
  },
  addPageTag(state, tagObj) {
    // if (!Util.oneOf(tagObj.name, state.dontCache)) {
    //   state.cachePage.push(tagObj.name);
    //   localStorage.cachePage = JSON.stringify(state.cachePage);
    // }
    state.openedPages.push(tagObj)
    // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
  },
  removePageTag(state, tagNamePos) {
    state.openedPages.splice(tagNamePos, 1)
  },
  clearAllTags(state) {
    state.openedPages.splice(1)
  }
}

export default {
  state,
  mutations
}
