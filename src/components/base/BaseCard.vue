<template>
    <div class="base-card-wrap" :style="style">
        <div class="base-card-header">
            <slot name="header"></slot>
            <div class="base-card-header-btns-wrap" v-if="!noShow">
                <template v-if="btnsMode==='text'">
                    <base-btn v-if="addEvent" :disabled="addButtonDisabled" size="mini" type="primary"
                              icon="el-icon-plus" @on-click="handleAdd">新增
                    </base-btn>
                    <base-btn v-if="editEvent" :disabled="editButtonDisabled" size="mini" type="primary"
                              icon="el-icon-edit" @on-click="handleEdit">
                        编辑
                    </base-btn>
                    <base-btn v-if="deleteEvent" :disabled="deleteButtonDisabled" size="mini" type="primary"
                              icon="el-icon-delete"
                              @on-click="handleDelete">删除
                    </base-btn>
                    <base-btn-import v-if="importEvent" :action="importAction" :successCallback="handleSuccessCallback">
                        <base-btn slot="trigger-btn" type="primary" size="mini" icon="el-icon-download">导入</base-btn>
                    </base-btn-import>
                    <base-btn v-if="exportEvent" size="mini" type="primary" icon="el-icon-upload2"
                              @on-click="handleExport">导出
                    </base-btn>
                </template>
                <template v-else>
                    <el-tooltip content="新增" placement="top" v-if="addEvent">
                        <i class="el-icon-plus" @click="handleAdd"></i>
                    </el-tooltip>
                    <el-tooltip content="编辑" placement="top" v-if="editEvent">
                        <i class="el-icon-edit" @click="handleEdit"></i>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top" v-if="deleteEvent">
                        <i class="el-icon-delete" @click="handleDelete"></i>
                    </el-tooltip>
                    <el-tooltip content="导入" placement="top" v-if="importEvent">
                        <base-btn-import :action="importAction" :successCallback="handleSuccessCallback">
                            <i slot="trigger-btn" class="el-icon-download"></i>
                        </base-btn-import>
                    </el-tooltip>
                    <el-tooltip content="导出" placement="top" v-if="exportEvent">
                        <i class="el-icon-upload2" @click="handleExport"></i>
                    </el-tooltip>
                </template>
                <slot name="append"></slot>
            </div>
        </div>
        <div class="base-card-body" :class="border ? 'border' : ''">
            <slot></slot>
        </div>
        <div class="base-card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'BaseCard',
    props: {
      addEvent: Function,
      deleteEvent: Function,
      importEvent: Boolean,
      exportEvent: Function,
      editEvent: Function,
      noShow: Boolean,
      border: Boolean,
      height: String,
      importAction: String,
      btnsMode: {
        type: String,
        default: function() {
          return 'text'
        }
      },
      editButtonDisabled: Boolean,
      addButtonDisabled: Boolean,
      deleteButtonDisabled: Boolean
    },
    data() {
      return {}
    },
    computed: {
      style() {
        let style = {}
        if (this.width) {
          style.width = this.width
        }
        if (this.height) {
          style.height = this.height
        }
        return style
      }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleAdd() {
        if (typeof this.addEvent !== 'function') {
          console.warn('BaseCard::handleAdd::配置问题::addEvent')
          return
        }
        this.addEvent()
      },
      handleEdit() {
        if (typeof this.editEvent !== 'function') {
          console.warn('BaseCard::editEvent::配置问题::editEvent')
          return
        }
        this.editEvent()
      },
      handleDelete() {
        if (typeof this.deleteEvent !== 'function') {
          console.warn('BaseCard::handleDelete::配置问题::deleteEvent')
          return
        }
        this.deleteEvent()
      },
      handleExport() {
        if (typeof this.exportEvent !== 'function') {
          console.warn('BaseCard::handleDelete::配置问题::exportEvent')
          return
        }
        this.exportEvent()
      },
      handleImport() {
        if (typeof this.ImportEvent !== 'function') {
          console.warn('BaseCard::handleDelete::配置问题::ImportEvent')
          return
        }
        this.ImportEvent()
      },
      handleSuccessCallback(response, file, fileList) {
        this.$emit('on-import-success', response, file, fileList)
      }
    }
  }
</script>

<style lang="less">
    @import '../../styles/var/variable';

    .base-card-wrap {
        position: relative;
        border-radius: 4px;
        background-color: @color-white;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .base-card-header {
            position: relative;
            padding: 7px 10px;
            border-bottom: 1px solid @border-color-base;
            background-color: @color-primary;
            color: @color-white;
            p {
                font-weight: 600;
            }
            .base-card-header-btns-wrap {
                position: absolute;
                top: 50%;
                right: 15px;
                transform: translate(0, -50%);
                i {
                    cursor: pointer;
                    font-weight: 600;
                }
                .el-button--primary.is-disabled:hover {
                    color: @color-text-placeholder;
                    background-color: transparent;
                    border: 0;
                }
                .el-button--mini {
                    &.is-disabled {
                        background-color: transparent;
                        border: 0;
                        color: @color-text-placeholder;
                    }
                }
            }
        }
        .base-card-body {
            position: relative;
            padding: 10px;
        }
        & + & {
            margin-top: 10px;
        }
        .border {
            border-left: solid 1px #e6e6e6;
            border-right: solid 1px #e6e6e6;
            border-bottom: solid 1px #e6e6e6;
        }
        .el-button--mini {
            padding: 7px 2px;
        }
    }
</style>
