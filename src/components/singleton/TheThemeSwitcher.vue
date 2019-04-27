<template>
  <div style="display:inline-block;margin-right: 10px">
    <el-dropdown style="color: #fff;" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-success el-icon--right"></i>
          {{theme.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="blue_蓝色">
          <i class="el-icon-success"></i>
          蓝色
        </el-dropdown-item>
        <el-dropdown-item command="dark_暗色">
          <i class="el-icon-success"></i>
          暗色
        </el-dropdown-item>
        <el-dropdown-item command="light_柔色">
          <i class="el-icon-success"></i>
          柔色
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

  export default {
    components: {},
    name: 'TheThemeSwitcher',
    data() {
      return {
        path: '../theme/',
        theme: {
          name: '蓝色',
          code: 'blue'
        },
        themeList: []
      }
    },
    methods: {
      handleCommand(command) {
        let pos = command.indexOf('_')
        let themeCode = command.substr(0, pos)
        let themeName = command.substring(pos + 1)

        this.theme = {
          name: themeName,
          code: themeCode
        }

        this.setTheme(themeCode)
      },
      setTheme(themeCode) {
        let body = document.querySelector('body')
        body.setAttribute('class', themeCode)
      }
    },
    created() {
    }
  }
</script>
