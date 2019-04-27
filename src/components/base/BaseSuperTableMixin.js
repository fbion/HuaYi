export default {
  methods: {
    init(colModel, mode) {
      colModel.forEach((obj) => {
         console.log(obj)
        let opts = obj.opts
        if (opts && opts.type === 'select') {
          if (opts.group && opts.group.level !== 1) {
            // 级联的场合，下级默认禁止点开
            if (!mode) {
              this.setDisabled(obj)
            }
          } else {
            if (!opts.hasOwnProperty('data') || !Array.isArray(opts.data) || !opts.data.length) {
              if (opts.url) {
                // 没有data数据就异步获取数据
                // alert(this.$route.components + '==' + opts.url)
                this.$http.get(opts.url).then(res => {
                  let data = []
                  if (res) {
                    // 判读如果有match项，将数据字段替换成match项
                    data = this.replaceMatchProps(opts, res)
                    this.$set(opts, 'data', data)
                    this.$set(opts, 'dictionaryData', res)
                  }
                })
              }
            }
          }
        }
      })
    },
    replaceMatchProps(opts, data) {
      if (!opts.dictionary) return data
      if (opts.match && Array.isArray(data)) {
        let newData = data.map(function(o) {
          // 获取对象的值
          let obj = {}
          obj[opts.match.label] = o[opts.dictionary ? opts.dictionary.label : 'dictionaryName']
          obj[opts.match.value] = o[opts.dictionary ? opts.dictionary.value : 'dictionaryCode']
          return obj
        })
        return newData
      }
      return data
    },
    changeProps(opts) {
      if (opts.type === 'select' && opts.showMode === 'cascader' && opts.match) {
        return {
          value: opts.match.value ? opts.match.value : 'value',
          label: opts.match.label ? opts.match.label : 'label',
          children: opts.match.children ? opts.match.children : 'children'
        }
      }
    },
    getMatchValue(opts) {
      if (opts.match) {
        return opts.match.value
      } else {
        return 'value'
      }
    },
    getCurrentOpts(colModel, val) {
      let item = colModel.find(obj => {
        if (obj.opts && obj.opts.data) {
          return obj.opts.data.find(o => {
              return o[this.getMatchValue(obj.opts)] === val
            }
          )
        }
      })
      if (item) {
        return item.opts
      } else {
        return false
      }
    },
    getNextCol(colModel, id, level) {
      let nextLevel = level * 1 + 1
      let item = colModel.find(obj => {
        if (obj.opts && obj.opts.group) {
          return obj.opts.group.id === id && obj.opts.group.level === nextLevel
        }
      })
      if (item) {
        return item
      } else {
        return false
      }
    },
    getNextOpts(colModel, id, level) {
      let col = this.getNextCol(colModel, id, level)
      if (col) {
        return col.opts
      } else {
        return false
      }
    },
    setCascaderData(colModel, o, data) {
      colModel.forEach((obj) => {
        let opts = obj.opts
        if (opts && opts.type === 'select' && opts.group) {
          if (opts.group.id === o.group.id && opts.group.level === o.group.level) {
            this.$set(opts, 'data', data)
          }
        }
      })
    },
    change(colModel, currentOpts, val) {
      let group = currentOpts.group
      if (!group) {
        return
      }
      let nextCol = this.getNextCol(colModel, group.id, group.level)
      if (nextCol) {
        // 如果有级联则加载级联数据
        let nextOpts = nextCol.opts
        // 级联是最后一级的场合则返回
        if (!nextOpts) return
        // 清除下一级的禁止状态
        this.clearDisabled(nextCol)
        // 获取当前key
        let key = this.getMatchValue(currentOpts)
        // 有自定义的级联value的场景则替换成自定的value
        key = this.replaceCascadeKey(currentOpts, key)
        let params = {}
        params[key] = val
        this.$http.get(nextOpts.url, params).then(response => {
          // 判读如果有match项，将数据字段替换成match项
          let data = this.replaceMatchProps(nextOpts, response.data)
          this.setCascaderData(colModel, nextOpts, data)
        })
      }
    },
    replaceCascadeKey(opts, value) {
      if (opts.match.cascadeValue) return opts.match.cascadeValue
      return value
    }
  }
}
