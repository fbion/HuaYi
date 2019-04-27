import dragDialog from './dragDialog'
import flatDialog from './flatDialog'
import tabsFitHeightDialog from './tabsFitHeightDialog'

const directives = Vue => {
  Vue.directive('drag-dialog', dragDialog)
  Vue.directive('flat-dialog', flatDialog)
  Vue.directive('tabs-fit-height-dialog', tabsFitHeightDialog)
}

export default directives
