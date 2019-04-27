export const PICKER_OPTIONS_SHORTCUTS = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export const GET_USER_CODE_API = 'getUserCode'

// 错误消息
export const MSG_SYS_ERR = '服务器运行错误，请联系管理人员！'
export const MSG_SYS_TIME_OUT = '当前网络环境较差，访问超时，请刷新重试！'
export const MSG_SYS_SUCCESS = '操作成功！'
export const MSG_SYS_FAIL = '操作失败！'
export const MSG_SYS_CANCELED = '操作已取消！'
export const MSG_SYS_WARNING = '警告，表单未按规则输入！'
export const MSG_SYS_DELETE_OPERATION = '此操作将删除该数据, 是否继续？'
export const MSG_SYS_DELETE_SUBMIT = '此操作将提交该数据, 是否继续？'

export const MSG_RULES_NUMBER = '必须为数字值！'
export const MSG_RULES_REQUIRED = '不能为空！'

export const MSG_BUSINESS_SELECTED = '请先选择要操作的数据！'
export const MSG_BUSINESS_START = '此操作将启用该数据, 是否继续？'
export const MSG_BUSINESS_STOP = '此操作将停用该数据, 是否继续？'
export const MSG_BUSINESS_IMPORT = '数据导入中，请耐心等待！'
export const MSG_BUSINESS_UPLOAD = '上传中，请耐心等待！'
export const MSG_BUSINESS_UPLOAD_SUCCESS = '上传成功！'
export const MSG_BUSINESS_UPLOAD_FAIL = '上传失败！'
export const MSG_BUSINESS_UPLOAD_IMG = '上传图片只能是 JPG/PNG 格式！'
export const MSG_BUSINESS_UPLOAD_SIZE_2M = '上传图片大小不能超过 2MB！'
export const MSG_BUSINESS_UPLOAD_SIZE_10M = '上传图片大小不能超过 10MB！'
