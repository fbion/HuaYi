export default {
  data() {
    return {
      formData: {}
    }
  },
  props: {
    tableOpts: {
      type: Object,
      default: function() {
        return {}
      }
    },
    editParams: Object,
    popupType: String
  },
  computed: {
    formProps: function() {
      return this.tableOpts.colModel
    },
    editMode: function() {
      return this.popupType === 'edit' ? true : false
    },
    addMode: function() {
      return this.popupType === 'add' ? true : false
    },
    queryMode: function() {
      return this.popupType === 'query' ? true : false
    }
  },
  created() {
    if (this.editMode) {
      this.openEditFormDialog()
    }
    if (this.queryMode) {
      this.openQueryFormDialog()
    }
    if (this.addMode) {
      this.openAddFormDialog()
    }
  },
  methods: {
    openEditFormDialog() {
      this.renderFormData(this.editParams)
    },
    openQueryFormDialog() {
      this.renderFormData(this.editParams)
    },
    openAddFormDialog() {

    },
    renderFormData(data) {
      if (this.$T.isInlineParams(data.url)) {
        // 严格遵循restful标准的url的场景
        let url = this.$T.replaceUrlParams(data.url, data.params)
        this.$http.get(url).then(response => {
          this.formData = Array.isArray(response.data) ? response.data[0] : response.data
        })
      } else {
        this.$http.get(data.url, data.params).then(response => {
          this.formData = Array.isArray(response.data) ? response.data[0] : response.data
        })
      }
    }
  }
}
