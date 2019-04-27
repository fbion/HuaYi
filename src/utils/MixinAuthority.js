import * as $API from '@/api'
import $http from '@/utils/axios'

export default {
  data() {
    return {
      isOauthAdd: true,
      isOauthEdit: true,
      isOauthDelete: true,
      isOauthExport: true,
      isOauthImport: true,
      isOauthStart: true,
      isOauthStop: true,
      isOnlyQuery: false
    }
  },
  provide: function() {
    return {
      oauth: this.$data
    }
  },
  methods: {},
  created() {
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    const routerName = to.name
    $http.get($API.PUBLIC_GET_PAGES_RESOURCE, {
      pageCode: routerName
    }).then(response => {
      const str = response.data
      if (!str.includes('query')) {
        vm.$T.warning('您没有权限查看页面内容，请联系管理员分配权限！')
        return
      }
      // 处理权限
      next(vm => {
        // 仅有查询权限的时候
        if (str === 'query') {
          vm.isOnlyQuery = true
        }

        // 没有添加权限的场景
        if (!str.includes('add')) {
          vm.isOauthAdd = false
        }

        // 没有修改权限的场景
        if (!str.includes('edit')) {
          vm.isOauthEdit = false
        }

        // 没有删除权限的场景
        if (!str.includes('delete')) {
          vm.isOauthDelete = false
        }

        // 没有导出权限的场景
        if (!str.includes('export')) {
          vm.isOauthExport = false
        }

        // 没有导入权限的场景
        if (!str.includes('import')) {
          vm.isOauthImport = false
        }

        // 没有启用权限的场景
        if (!str.includes('start')) {
          vm.isOauthStart = false
        }

        // 没有停用权限的场景
        if (!str.includes('stop')) {
          vm.isOauthStop = false
        }
      })
    }).catch(() => {
      vm.$T.error('获取页面资源权限失败！')
      // next()
    })
  }
}
