function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
    findComponentHandler(targetComponentName) {
      let finedComponent = null

      function find(componentSubs) {
        for (let i = 0, len = componentSubs.length; i < len; i++) {
          let component = componentSubs[i]
          let name = component.$options.name
          if (name === targetComponentName) {
            finedComponent = component
            break
          }
          if (targetComponentName !== name) {
            find(component.$children)
          } else {
            return true
          }
        }
      }

      find(this.$children)
      return finedComponent
    }
  }
}
