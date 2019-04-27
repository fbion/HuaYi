<template>
    <div class="search-scope-wrap has-top-label">
        <div class="search-item-wrap">
            <el-form ref="$searchForm" :inline="true" :model="searchForm">
                <template v-for="item in searchOpts">
                    <el-form-item
                            v-if="item.opts && item.opts.type==='input' && item.opts.searchFilterItem"
                            :class="handleLabelClass(item)"
                            :label="item.label"
                            :key="item.label">
                        <el-input v-model="searchForm[item.prop]"
                                  :placeholder="item.opts.label ? item.opts.label : item.label"
                                  clearable
                                  @clear="onInputClear(item)"
                                  @focus="onInputFocus(item)"
                                  @blur="onInputBlur(item)"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                            v-if="item.opts && item.opts.type==='select' && item.opts.showMode==='cascader'  && item.opts.searchFilterItem"
                            :label="item.opts.showLabel ? item.label : ''"
                            :key="item.label">
                        <el-cascader
                                :placeholder="item.opts.label ? item.opts.label : item.label"
                                :show-all-levels="false"
                                filterable
                                clearable
                                :options="item.opts.data"
                                :props="changeProps(item.opts)"
                                v-model="searchForm[item.opts.match ? item.opts.match.value : item.prop]"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item
                            v-if="item.opts && item.opts.type==='select' && item.opts.showMode==='normal' && item.opts.searchFilterItem"
                            :class="handleLabelClass(item)"
                            :label="item.label"
                            :key="item.label">
                        <el-select v-model="searchForm[item.prop]"
                                   filterable
                                   clearable
                                   :disabled="disableds[item.prop]"
                                   :placeholder="item.opts.label ? item.opts.label : item.label"
                                   @change="handleChange(item,searchForm[ item.prop])"
                                   @clear="onInputClear(item)"
                                   @focus="onInputFocus(item)"
                                   @blur="onInputBlur(item)"
                        >
                            <el-option label="全部" value="*全*部*"></el-option>
                            <el-option
                                    v-for="obj in item.opts.data"
                                    :key="item.opts.match ? obj[item.opts.match.value] : obj.value"
                                    :label="item.opts.match ? obj[item.opts.match.label] : obj.label"
                                    :value="item.opts.match ? obj[item.opts.match.value] : obj.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            v-if="item.opts && item.opts.type==='date' && item.opts.searchFilterItem"
                            :class="handleLabelClass(item)"
                            :label="item.label"
                            :key="item.label">
                        <el-date-picker v-model="searchForm[item.prop]"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        :type="datePickerDateType(item.opts)"
                                        :placeholder="item.opts.label ? item.opts.label : item.label"
                                        :start-placeholder="datePickerDateStartPlaceholder(item.opts)"
                                        :end-placeholder="datePickerDateEndPlaceholder(item.opts)"
                                        @change="onDateChange(item)"
                                        @focus="onInputFocus(item)"
                                        @blur="onInputBlur(item)"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                            v-if="item.opts && item.opts.type==='datetime' && item.opts.searchFilterItem"
                            :class="handleLabelClass(item)"
                            :label="item.label"
                            :key="item.label">
                        <el-date-picker :type="datePickerTimeType(item.opts)"
                                        v-model="searchForm[item.prop]"
                                        :placeholder="item.opts.label ? item.opts.label : item.label"
                                        :format="item.opts.format ? item.opts.format : 'yyyy-MM-dd HH:mm:ss'"
                                        :value-format="item.opts.valueFormat ? item.opts.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                                        range-separator="至"
                                        :start-placeholder="datePickerTimeStartPlaceholder(item.opts)"
                                        :end-placeholder="datePickerTimeEndPlaceholder(item.opts)"
                                        @change="onDateChange(item)"
                                        @focus="onInputFocus(item)"
                                        @blur="onInputBlur(item)"
                        >
                        </el-date-picker>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <div class="search-btns-wrap">
            <base-btn type="primary" @on-click="handleSearch">查询</base-btn>
        </div>
    </div>
</template>

<script>
    import superTableMixin from './BaseSuperTableMixin'

    export default {
        name: 'BaseGenerateSearch',
        mixins: [superTableMixin],
        props: {
            searchOpts: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data: function () {
            return {
                searchForm: {},
                disableds: {},
                dateOrTimeRangePropObj: {},
                currentFocusLabels: []
            }
        },
        computed: {},
        watch: {
            searchForm: function (newData, oldData) {
            }
        },
        created() {
            this.initData()
        },
        methods: {
            getSearchItems() {
                let items = []
                this.searchOpts.forEach((item) => {
                    if (item.opts.searchFilterItem && item.opts.searchFilterItem == true) {
                        items.push(item)
                    }
                })
                return items
            },
            datePickerDateType(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    return 'daterange'
                } else {
                    return 'date'
                }
            },
            datePickerDateStartPlaceholder(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    if (opts.searchDateRange.startPlaceholder) {
                        return opts.searchDateRange.startPlaceholder
                    } else if (opts.searchDateRange.label) {
                        return opts.searchDateRange.label + '开始日期'
                    } else {
                        return '开始日期'
                    }
                }
            },
            datePickerDateEndPlaceholder(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    if (opts.searchDateRange.endPlaceholder) {
                        return opts.searchDateRange.endPlaceholder
                    } else if (opts.searchDateRange.label) {
                        return opts.searchDateRange.label + '结束日期'
                    } else {
                        return '结束日期'
                    }
                }
            },
            datePickerTimeStartPlaceholder(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    if (opts.searchDateRange.startPlaceholder) {
                        return opts.searchDateRange.startPlaceholder
                    } else if (opts.searchDateRange.label) {
                        return opts.searchDateRange.label + '开始时间'
                    } else {
                        return '开始时间'
                    }
                }
            },
            datePickerTimeEndPlaceholder(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    if (opts.searchDateRange.endPlaceholder) {
                        return opts.searchDateRange.endPlaceholder
                    } else if (opts.searchDateRange.label) {
                        return opts.searchDateRange.label + '结束时间'
                    } else {
                        return '结束时间'
                    }
                }
            },
            datePickerTimeType(opts) {
                if (opts.searchDateRange && opts.searchDateRange.range) {
                    return 'datetimerange'
                } else {
                    return 'datetime'
                }
            },
            initPickerDefaultValue() {
                for (let key in this.dateTimeRangePropObj) {
                    this.$set(this.searchForm, key, this.dateTimeRangePropObj[key].defaultValue)
                }
            },
            initData() {
                this.dateOrTimeRangePropObj = this.getDateOrTimeRangeProp()
                this.init(this.searchOpts)
                this.initPickerDefaultValue()
                this.initValue()
            },
            initValue() {
                this.searchOpts.forEach((item) => {
                    if (item.opts.initValue) {
                        this.$set(this.searchForm, item.prop, item.opts.initValue)
                    }
                })

            },
            clearDisabled(obj) {
                this.disableds[obj.prop] = false
            },
            setDisabled(obj) {
                if (obj.opts.group.level !== 1) {
                    this.disableds[obj.prop] = true
                }
            },
            handleDateOrTimeRangeParams(key, val, params) {
                const props = this.dateOrTimeRangePropObj[key].paramProps
                let rangStartProp = ''
                let rangEndProp = ''
                if (props.length) {
                    rangStartProp = props[0]
                    rangEndProp = props[1]
                } else {
                    // 默认属性名称后拼接
                    rangStartProp = key + 'Start'
                    rangEndProp = key + 'End'
                }
                params[rangStartProp] = val[0]
                params[rangEndProp] = val[1]
                return params
            },
            getDateOrTimeRangeProp() {
                let obj = {}
                this.searchOpts.forEach((item) => {
                    let opts = item.opts
                    if (opts && (opts.type === 'datetime' || opts.type === 'date')) {
                        if (opts.searchDateRange && opts.searchDateRange.range) {
                            obj[item.prop] = {
                                paramProps: opts.searchDateRange.paramProps ? opts.searchDateRange.paramProps : [],
                                defaultValue: opts.searchDateRange.defaultValue ? opts.searchDateRange.defaultValue : ''
                            }
                        }
                    }
                })
                return obj
            },
            getQueryParams() {
                let params = {}
                let searchItems = this.getSearchItems()
                searchItems.forEach((item) => {
                    if (this.searchForm.hasOwnProperty(item.prop)) {
                        params[this.polyfillReplaceSelectCode(item.prop)] = this.searchForm[item.prop]
                    } else {
                        params[this.polyfillReplaceSelectCode(item.prop)] = ''
                    }
                })
                //todo 时间段查询，需要时再增加
                // for (let key in this.searchForm) {
                //   let val = this.searchForm[key]
                //  // if (val) {
                //     if (!this.$T.isEmptyObject(this.dateOrTimeRangePropObj) && this.dateOrTimeRangePropObj.hasOwnProperty(key)) {
                //       params = this.handleDateOrTimeRangeParams(key, val, params)
                //     } else {
                //       params[this.polyfillReplaceSelectCode(key)] = val
                //     }
                //   //}
                //
                return params
            },
            handleSearch() {
                this.$emit('on-search', this.getQueryParams())
            },
            handleChange(currentSelect, val) {
                if (val) {
                    // 当选择options时候，失去了焦点。导致label消失。所以要将label再次加入到容器中
                    this.onInputFocus(currentSelect)
                }
                this.change(this.searchOpts, currentSelect.opts, val)
            },
            polyfillReplaceSelectCode(key) {
                let filterKey = ''
                this.searchOpts.forEach(function (item) {
                    let opts = item.opts
                    if (opts.type === 'select' && opts.searchFilterItem && opts.match) {
                        if (opts.match.filterValue && opts.match.value === key) {
                            filterKey = opts.match.filterValue
                            return false
                        }
                    }
                })
                return filterKey ? filterKey : key
            },
            onInputFocus(item) {
                const ind = this.currentFocusLabels.indexOf(item.label)
                if (ind === -1) {
                    this.currentFocusLabels.push(item.label)
                }
            },
            onInputBlur(item) {
                if (!this.searchForm[item.opts.match ? item.opts.match.value : item.prop]) {
                    const ind = this.currentFocusLabels.indexOf(item.label)
                    if (ind > -1) {
                        this.currentFocusLabels.splice(ind, 1)
                    }
                }
            },
            onInputClear(item) {
                this.onInputBlur(item)
            },
            handleLabelClass: function (item) {
                // return this.currentFocusLabels.includes(item.label) ? 'label-show' : 'label-hide'
                return this.currentFocusLabels.includes(item.label) ? 'label-show' : 'label-show'
            },
            onDateChange(item) {
                if (!this.searchForm[item.prop]) {
                    // 清空的场合
                    this.onInputClear(item)
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../styles/var/variable';

    .search-scope-wrap {
        position: relative;
        &.has-top-label {
            .el-form-item__label {
                font-size: 12px;
                color: @color-primary;
                // position: absolute;
                z-index: 99;
                top: -22px;
            }

            & .el-form-item.label-show {
                .el-form-item__label {
                    display: inline-block;
                }
            }
            & .el-form-item.label-hide {
                .el-form-item__label {
                    display: none;
                }
            }
        }
        .search-item-wrap {
            padding-right: 60px;
            text-align: right;
            .el-form-item {
                position: relative;
                margin-top: 12px;
                padding-bottom: 10px;
            }
        }
        .search-btns-wrap {
            position: absolute;
            top: 12px;
            right: -12px;
        }
        .el-input {
            width: 150px;
        }
        .el-date-editor.el-input {
            width: 200px;
        }
        .el-date-editor.el-range-editor {
            width: 285px;
            &.el-input__inner {
                padding: 3px 5px 3px 10px;
            }
            .el-range-separator {
                width: 8%;
            }
            .el-range-input {
                width: 45%;
            }
        }
    }
</style>
