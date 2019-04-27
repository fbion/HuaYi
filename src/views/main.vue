<template>
    <el-container
            class="main-wrap">
        <template
                v-if="!isProMACE">
            <el-header>
                <the-header></the-header>
            </el-header>
            <el-container>
                <Base-nav-menu
                        :menu-list="menuList"></Base-nav-menu>
                <el-main>
                    <the-tabsbar
                            :dynamicTags="dynamicTags"></the-tabsbar>
                    <section
                            class="page-content">
                        <keep-alive
                                :include="cacheRouter">
                            <router-view
                                    v-show="active"/>
                        </keep-alive>
                        <template
                                v-for="item in iframes">
                            <Base-frame-panel
                                    :src="item.src"
                                    :name="item.name"
                                    :title="item.title"
                                    :key="item.name"></Base-frame-panel>
                        </template>
                    </section>
                </el-main>
            </el-container>
        </template>
        <template
                v-else>
            <keep-alive>
                <keep-alive
                        :include="cacheRouter">
                    <router-view
                            v-show="active"/>
                </keep-alive>
            </keep-alive>
        </template>
    </el-container>
</template>

<script>
    import TheHeader
        from '@/components/singleton/TheHeader'
    import TheTabsbar
        from '@/components/singleton/TheTabsbar'
    import BaseNavMenu
        from '@/components/base/BaseNavMenu'
    import BaseFramePanel
        from '@/components/base/BaseFramePanel'

    export default {
        components: {
            TheHeader,
            TheTabsbar,
            BaseNavMenu,
            BaseFramePanel
        },
        data() {
            return {
                isProMACE: this.$store.state.app.isProMACE,
                menuList: []
            }
        },
        computed: {
            openedPages() {
                return this.$store.state.app.openedPages
            },
            cacheRouter() {
                return this.openedPages.length ? this.openedPages.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
            },
            active() {
                return this.$store.state.app.currentTagName === this.$route.name
            },
            dynamicTags() {
                return this.$store.state.app.openedPages
            },
            iframes: function () {
                return this.$store.state.app.openedPages.filter(function (item) {
                    return item.src && item.src.length > 0
                })
            }
        },
        created() {
            this.renderMenuList()
//      this.renderSyncMenuList()
        },
        methods: {
            async renderSyncMenuList() {
                let arr = []
                let getAllIframe = (data) => {
                    data.map(function (obj) {
                        if (obj.src && obj.src.length > 0) {
                            arr.push(obj)
                        }
                        if (obj.children && obj.children.length > 0) {
                            getAllIframe(obj.children)
                        }
                    })
                    return arr
                }
                try {
                    // 获取菜单数据
                    let response = await this.$http.get(this.$API.BASE_GET_MENU)
                    this.menuList = response.data
                    let allIframe = getAllIframe(this.menuList.data)
                    this.$store.commit('addIframToTagsList', allIframe)
                } catch (e) {
                }
            },
            renderMenuList() {
                let arr = []
                let getAllIframe = (data) => {
                    data.map(function (obj) {
                        if (obj.src && obj.src.length > 0) {
                            arr.push(obj)
                        }
                        if (obj.children && obj.children.length > 0) {
                            getAllIframe(obj.children)
                        }
                    })
                    return arr
                }
                //todo 获取菜单
                // 获取菜单
                if (!vm.$store.state.app.isProMACE) {
                    this.$http.get(this.$API.BASE_GET_MENU)
                        .then(response => {
                            this.menuList = response.data
                            let allIframe = getAllIframe(response.data)
                            this.$store.commit('addIframToTagsList', allIframe)
                        })
                }
            }
        }
    }
</script>

<style lang="less">
    .main-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .page-content {
            position: absolute;
            margin: 0 auto;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .el-header {
            padding: 0;
        }

        .el-main {
            position: relative;
            background-color: transparent;
            padding: 0;
            overflow: hidden;
        }
    }
</style>
