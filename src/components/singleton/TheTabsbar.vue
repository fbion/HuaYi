<template>
    <section ref="scrollCon" class="tabsbar-wrapper" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
        <el-header class="tags-outer-scroll">
            <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
                <cover-el-tag
                        size='false'
                        ref="tagsPageOpened"
                        v-for="tag in dynamicTags"
                        :key="tag.title"
                        :title="tag.title"
                        :name="tag.name"
                        :src="tag.src"
                        :closable="tag.name==='home'?false:true"
                        :disable-transitions="false"
                        color="#fff"
                        @click.native="linkToPage(tag)"
                        @close="handleClose">
                    <el-icon :name="tag.name===currentName?'location':'location-outline'"></el-icon>
                    <span>&nbsp;{{tag.title}}</span>
                </cover-el-tag>
            </div>
            <div class="close-all-tag" @click="clearAllTags">
                <el-button type="primary" size="small">关闭所有</el-button>
            </div>
        </el-header>
    </section>
</template>

<script>
  import CoverElTag from '@/components/overwriting/CoverElTag'

  export default {
    components: { CoverElTag },
    props: {
      dynamicTags: Array
    },
    data: function() {
      return {
        tagBodyLeft: 0,
//        currentRouterName: this.$route.name,
        refsTag: []
      }
    },
    computed: {
      currentName() {
        return this.$store.state.app.currentTagName
      }
    },
    watch: {
      '$route'(to) {
        this.$nextTick(() => {
          this.refsTag.forEach((item, index) => {
            if (to.name === item.name) {
              let tag = this.refsTag[index].$el
              this.moveToView(tag)
            }
          })
        })
      }
    },
    mounted() {
      this.refsTag = this.$refs.tagsPageOpened
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      }, 1) // 这里不设定时器就会有偏移bug
    },
    methods: {
      handleScroll(e) {
        let type = e.type
        let delta = 0
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
        }
        let left = 0
        if (delta > 0) {
          left = Math.min(0, this.tagBodyLeft + delta)
        } else {
          if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
              left = this.tagBodyLeft
            } else {
              left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
            }
          } else {
            this.tagBodyLeft = 0
          }
        }
        this.tagBodyLeft = left
      },
      handleClose(e, tag) {
        let openedPages = this.$store.state.app.openedPages
        let len = openedPages.length
        let tagNamePos = openedPages.findIndex(function(item) {
          return item.title === tag.title
        })
        let nextRouterName = ''
        let nextSrc = ''
        if (tagNamePos === (len - 1)) {
          // 关闭最后一个tag的场景
          nextRouterName = openedPages[tagNamePos - 1].name
          nextSrc = openedPages[tagNamePos - 1].src
        } else {
          nextRouterName = openedPages[tagNamePos + 1].src
          nextSrc = openedPages[tagNamePos - 1].src
          let tagWidth = e.target.parentNode.offsetWidth
          this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0)
        }

        if (!nextSrc) {
          // 路由的场景
          this.linkToPage({
            name: nextRouterName
          })
        } else {
          this.$store.state.app.currentTagName = nextRouterName
        }
        this.$store.commit('removePageTag', tagNamePos)
      },
      linkToPage(tag) {
        this.$store.state.app.currentTagName = tag.name
        if (!tag.src) {
          let routerObj = {}
          routerObj.name = tag.name
          this.$router.push(routerObj)
        }
      },
      moveToView(tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          if (tag.offsetWidth - tag.offsetLeft + 10 < this.$refs.scrollCon.offsetWidth - 110) {
            this.tagBodyLeft = 0
          } else {
            this.tagBodyLeft = -tag.offsetLeft + 10
          }
        } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
          // 标签在可视区域
          this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20)
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20)
        }
      },
      clearAllTags() {
        this.$store.commit('clearAllTags')
        this.$router.push({
          name: 'home'
        })
        this.$store.state.app.currentTagName = 'home'
      }
    }
  }
</script>

<style lang="less">
    .tabsbar-wrapper {
        width: 100%;
        background-color: #606266;
        overflow: hidden;

        .el-header {
            color: #fff;
            text-align: left;
            padding: 5px 10px;
            height: 50px !important;
            line-height: 50px !important;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }

        .tags-outer-scroll {
            position: relative;
            padding-right: 120px;
            width: 100%;
            height: 100%;
            cursor: pointer;

            .tags-inner-scroll-body {
                position: absolute;
                padding: 0 10px;
                overflow: visible;
                white-space: nowrap;
                transition: left .3s ease;
            }
            .close-all-tag {
                position: absolute;
                right: 0;
                top: 0;
                line-height: 50px;
                text-align: center;
                width: 110px;
                height: 100%;
                border-bottom: 1px solid #606266;
                background: white;
                box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
                z-index: 10;
            }
        }

    }
</style>
