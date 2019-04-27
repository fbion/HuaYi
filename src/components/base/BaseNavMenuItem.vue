<template>
    <div>
        <template v-for="item in menuList">
            <template v-if="item.children && item.children.length">
                <el-submenu :index="item.title" :key="item.name">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <base-nav-menu-item :menuList='[child]' v-for="child in item.children"
                                      :key="child.title"></base-nav-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <template v-if="item.src">
                    <el-menu-item :index="item.name" @click.native="handleAddTab(item)" :key="item.name">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-menu-item :index="item.name" :key="item.name" @click.native="handleAddTab(item)">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </template>
    </div>
</template>

<script>
  import * as T from '@/utils/tools'

  export default {
    name: 'BaseNavMenuItem',
    components: {},
    data: function() {
      return {}
    },
    props: {
      menuList: {
        type: Array
      }
    },
    methods: {
      handleAddTab(item) {
        if (item.src) {
          // 有iframe外链接的场景
          T.openNewPage(this, item.name)
        } else {
          this.$router.push({
            name: item.name
          })
        }
      }
    }
  }
</script>
