<template>
    <div class="base-nav-menu-wrap">
        <el-aside :style="{width: isCollapse ? '64px' : '200px'}">
            <template v-if="isCollapse">
                <el-button icon="el-icon-my-liebiao" style="width: 100%" @click="handleToggleExpand"></el-button>
            </template>
            <template v-else>
                <el-button icon="el-icon-my-liebiao rotate" style="width: 100%" @click="handleToggleExpand"></el-button>
            </template>
            <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose"
                     :collapse="isCollapse"
                     unique-opened
                     background-color="#42485b"
                     text-color="#fff"
                     active-text-color="#409EFF">
                <base-nav-menu-item :menuList='menuList'></base-nav-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
  import BaseNavMenuItem from './BaseNavMenuItem'

  export default {
    name: 'BusiNavMenu',
    components: { BaseNavMenuItem },
    props: {
      menuTheme: {
        type: String,
        default: 'dark'
      },
      menuList: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data: function() {
      return {
        isCollapse: false
      }
    },
    created() {
    },
    methods: {
      handleToggleExpand() {
        if (!this.isCollapse) {
          this.isCollapse = true
        } else {
          this.isCollapse = false
        }
      },
      handleOpen() {
      },
      handleClose() {
      }
    }
  }
</script>

<style lang="less">
    .base-nav-menu-wrap {
        position: relative;
        background-color: #333744;
        color: #333;

        .el-menu {
            border: 0;
        }

        .el-aside {
            overflow: hidden;
        }

        .el-menu-vertical:not(.el-menu--collapse) {
            width: 200px;
            position: absolute;
            top: 50px;
            right: 0;
            left: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .rotate:before {
            display: inline-block;
            transform: rotate(90deg);
        }

        .el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu > .el-submenu__title span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
        }
        .el-button {
            border-radius: 0;
            background: #4a5064;
            border: 1px solid #4a5064;
            color: #aeb9c2;
            padding: 16px 20px;
        }
        .el-button:focus, .el-button:hover {
            color: #409EFF;
            border-color: #4a5064;
            background-color: #4a5064
        }
        .el-button:active {
            color: #3a8ee6;
            border-color: #4a5064;
            outline: 0
        }
    }
</style>
