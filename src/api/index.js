/**
 * 框架用api,不用care,打包生产环境的场景自动去除
 *
 */
const $HOST = process.env.VUE_APP_API_HOST
// 菜单
export const BASE_GET_MENU = $HOST + '/v1/permissions/menu'
// demo页面
export const BASE_GET_DEMO_COUNTRY = $HOST + '/v1/demo/country'
export const BASE_GET_DEMO_CITY = $HOST + '/v1/demo/city'
export const BASE_GET_DEMO_DISTRICT = $HOST + '/v1/demo/district'
export const BASE_GET_DEMO_LIST = $HOST + '/v1/demo/list'
export const BASE_ALL_DEMO = $HOST + '/v1/demo'

/**
 * 服务模块定义
 *
 */
// 公共服务
const $HOST_PUBLIC_SERVICE = process.env.VUE_APP_PUBLIC_SERVICE
// 主数据服务
const $HOST_DMMS_SERVICE = process.env.VUE_APP_DMMS_SERVICE
// 船舶装卸管理服务
const $HOST_DLMS_SERVICE = process.env.VUE_APP_DLMS_SERVICE
// 码头巡检管理服务
const $HOST_DPMS_SERVICE = process.env.VUE_APP_DPMS_SERVICE

/**
 * AAA权限相关
 *
 */

// 获取用户信息
export const PUBLIC_GET_USER_INFO = $HOST_PUBLIC_SERVICE + '/api/public/v1/permissions/user/info'
// 获取页面资源
export const PUBLIC_GET_PAGES_RESOURCE = $HOST_PUBLIC_SERVICE + '/api/public/v1/permissions/pagesResource'
// 获取全部人员列表
export const PUBLIC_GET_USER_LIST = $HOST_PUBLIC_SERVICE + '/api/public/v1/permissions/user/list'

/**
 * 公共服务
 *
 */

// 字典数据----2.1是否状态
export const PUBLIC_GET_DICTIONARIES_YES_NO = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=YES_NO'
// 字典数据----2.2船型
export const PUBLIC_GET_DICTIONARIES_SHIPS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=SHIPS_TYPE'
// 字典数据----2.3国家字典表
export const PUBLIC_GET_DICTIONARIES_STATE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=STATE'
// 字典数据----2.4数据状态字典表,启停状态
export const PUBLIC_GET_DICTIONARIES_DATA_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=DATA_STATUS_TYPE'
// 字典数据----2.5生产动态字典表
export const PUBLIC_GET_DICTIONARIES_GENERATING_STATE_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=GENERATING_STATE_TYPE'
// 字典数据----2.6作业类型字典表【废弃】
export const PUBLIC_GET_DICTIONARIES_OPERATING_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=OPERATING_TYPE'
// 字典数据----2.8拖轮种类字典表
export const PUBLIC_GET_DICTIONARIES_TUG_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=TUG_TYPE'
// 字典数据----2.9评价状态字典表
export const PUBLIC_GET_DICTIONARIES_ASSESSMENT_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=ASSESSMENT_TYPE'
// 字典数据----2.10黑名单类型字典表
export const PUBLIC_GET_DICTIONARIES_BLACK_LIST_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=BLACK_LIST_TYPE'
// 字典数据----2.11信用评价状态字典表
export const PUBLIC_GET_DICTIONARIES_STANDARD_RESULT = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=STANDARD_RESULT'
// 字典数据----2.12装卸方案状态字典表
export const PUBLIC_GET_DICTIONARIES_SCHEME_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=SCHEME_STATUS_TYPE'
// 字典数据----2.13商检状态字典表
export const PUBLIC_GET_DICTIONARIES_INSPECTION_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=INSPECTION_STATUS_TYPE'
// 字典数据----2.14商检机构字典表
export const PUBLIC_GET_DICTIONARIES_INSPECTION_ORGANIZATION = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=INSPECTION_ORGANIZATION'
// 字典数据----2.15商检作业状态字典表
export const PUBLIC_GET_DICTIONARIES_INSPECTION_JOB_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=INSPECTION_JOB_STATUS_TYPE'
// 字典数据----2.17作业票状态字典表
export const PUBLIC_GET_DICTIONARIES_OPERATION_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=OPERATION_STATUS_TYPE'
// 字典数据----2.18巡检策略审核状态字典表
export const PUBLIC_GET_DICTIONARIES_STRATEGY_STATUS_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=STRATEGY_STATUS_TYPE'
// 字典数据----2.19巡检任务异常状态字典表
export const PUBLIC_GET_DICTIONARIES_STRATEGY_JOB_EXCEPTION_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=STRATEGY_JOB_EXCEPTION_TYPE'
// 字典数据----2.20巡检班次字典表
export const PUBLIC_GET_DICTIONARIES_PATROL_TEAM_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=PATROL_TEAM_TYPE'
// 字典数据----2.21公司性质字典表
export const PUBLIC_GET_DICTIONARIES_COMPANY_NATURE_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=COMPANY_NATURE_TYPE'
// 字典数据----2.22方案编制审批字典
export const PUBLIC_GET_DICTIONARIES_SCHEME_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=SCHEME_STATUS_TYPE'
// 字典数据----4.5.2商检状态字典表
export const PUBLIC_GET_DICTIONARIES_INSPECTION_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=INSPECTION_STATUS_TYPE'
// 字典数据----4.5.2 商检 确认结果字典表
export const PUBLIC_GET_DICTIONARIES_INSPECTION_CONFIRM_TYPE = $HOST_PUBLIC_SERVICE + '/api/public/v1/dictionaries?dictionaryCode=INSPECTION_CONFIRM_TYPE'

/**
 * 文件服务
 *
 */

// dpms服务文件上传
export const PUBLIC_POST_DPMS_FILE_UPLOAD = $HOST_PUBLIC_SERVICE + '/api/public/v1/file/dpms/upload'
// dlms服务文件上传
export const PUBLIC_POST_DLMS_FILE_UPLOAD = $HOST_PUBLIC_SERVICE + '/api/public/v1/file/dlms/upload'
// dmms服务文件上传
export const PUBLIC_POST_DMMS_FILE_UPLOAD = $HOST_PUBLIC_SERVICE + '/api/public/v1/file/dmms/upload'
// 文件下载
export const PUBLIC_GET_FILE_DOWN = $HOST_PUBLIC_SERVICE + '/api/public/v1/file/down/$filename'

/************************************************************************************************************
 * 业务api区域
 *
 ************************************************************************************************************/

/**
 * 主数据管理
 *
 */

// 作业票流程模板
export const DMMS_GET_OPERATION_TEMPLATE_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/operation/template/list'
export const DMMS_ALL_OPERATION_TEMPLATE = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/operation/template'
export const DMMS_PUT_OPERATION_TEMPLATE_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/operation/template/status'
export const DMMS_PUT_OPERATION_TEMPLATE_TYPE = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/operation/template/type'

// 船舶公司
export const DMMS_GET_SHIPPING_COMPANY_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company/list'
export const DMMS_ALL_SHIPPING_COMPANY = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company'
export const DMMS_GET_SHIPPING_COMPANY_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company/export'
export const DMMS_POST_SHIPPING_COMPANY_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company/import'
export const DMMS_PUT_SHIPPING_COMPANY_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company/status'
export const DMMS_PUT_SHIPPING_COMPANY_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/shipping/company/all' // 用于下拉

// 锚地信息
export const DMMS_GET_ANCHORAGE_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage/list'
export const DMMS_ALL_ANCHORAGE = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage'
export const DMMS_GET_ANCHORAGE_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage/export'
export const DMMS_POST_ANCHORAGE_IMPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage/import'
export const DMMS_PUT_ANCHORAGE_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage/status'
export const DMMS_GET_ANCHORAGE_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/anchorage/all' // 用于下拉

// 设备信息
export const DMMS_GET_EQUIPMENT_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment/list'
export const DMMS_GET_EQUIPMENT_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment/export'
export const DMMS_POST_EQUIPMENT_IMPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment/import'
export const DMMS_ALL_EQUIPMENT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment'
export const DMMS_PUT_EQUIPMENT_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment/status'
export const DMMS_GET_EQUIPMENT_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/equipment/all' // 用于下拉

// 物料信息
export const DMMS_GET_MATERIEL_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel/list'
export const DMMS_ALL_MATERIEL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel'
export const DMMS_GET_MATERIEL_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel/export'
export const DMMS_POST_MATERIEL_IMPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel/import'
export const DMMS_PUT_MATERIEL_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel/status'
export const DMMS_GET_MATERIEL_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/materiel/all' // 用于下拉

// 泊位信息
export const DMMS_GET_BERTH_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth/list'
export const DMMS_ALL_BERTH = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth'
export const DMMS_GET_BERTH_EXPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth/export'
export const DMMS_POST_BERTH_IMPORT = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth/import'
export const DMMS_PUT_BERTH_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth/status'
export const DMMS_GET_BERTH_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/berth/all' // 用于下拉

// 动态监控港口底图维护
export const DMMS_ALL_SHIPPING_DYNAMICS_IMAGE_LIST = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/image/list'
export const DMMS_ALL_SHIPPING_DYNAMICS_IMAGE = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/image'
export const DMMS_PUT_SHIPPING_DYNAMICS_IMAGE_STATUS = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/image/status'
export const DMMS_GET_SHIPPING_DYNAMICS_IMAGE_ACTIVITY = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/image/activiti'

/**
 * 船舶装卸管理
 *
 */

// 装卸作业管理
export const DLMS_GET_TICKET_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/operation/ticket/list'
export const DLMS_POST_TICKET = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/operation/ticket'
export const DLMS_PUT_TICKET = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/operation/ticket/approve'
export const DLMS_PUT_CONFIRM = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/operation/ticket/confirm'
export const DMMS_GET_TEMPLATE_ALL = $HOST_DMMS_SERVICE + '/api/hdri/dmms/v1/operation/template/all'

// 船舶信息维护 + 船舶生产动态 + 船舶查询
export const DLMS_GET_SHIPPING_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/list'
export const DLMS_ALL_SHIPPING = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping'
export const DLMS_GET_SHIPPING_DETAIL = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/detail'
export const DLMS_GET_SHIPPING_ALL = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/all' // 用于下拉

// 船期预报
export const DLMS_ALL_SHIPPING_FUTURE = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/future'
export const DLMS_GET_SHIPPING_EXPORT = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/export'
export const DLMS_GET_SHIPPING_ERP = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/date/order/erp/list' // EPR订单列表查询
export const DLMS_GET_SHIPPING_ASSESSMENT_HISTORY = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/assessment/history/list'

// 船舶到港记录
// 船舶离港记录
// 拖轮作业动态
export const DLMS_GET_SHIPPING_TUG_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/tug/list'
export const DLMS_ALL_SHIPPING_TUG = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/tug'
export const DLMS_GET_SHIPPING_TUG_EXPORT = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/tug/export'

// 船舶信用管理
export const DLMS_GET_SHIPPING_ASSESSMENT_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/assessment/list'
export const DLMS_POST_SHIPPING_ASSESSMENT = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/assessment'
export const DLMS_GET_SHIPPING_ASSESSMENT = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/assessment'

// 黑名单管理
export const DLMS_GET_SHIPPING_BLACK_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/black/list'
export const DLMS_SHIPPING_BLACK_ALL = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/black'
export const DLMS_PUT_BLACK_RELIEVE = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/black/relieve'

// 方案编制
export const DLMS_GET_SHIPPING_SCHEME_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/list'
export const DLMS_GET_SHIPPING_SCHEME_ODS_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/scheduling/ods/list'
export const DLMS_POST_SHIPPING_SCHEME = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme'
export const DLMS_POST_SHIPPING_SCHEME_APPROVE = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/approve'

// 方案审核
export const DLMS_POST_SHIPPING_SCHEME_APPROVE_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/approve/list'
// 商检需求录入
export const DLMS_GET_SHIPPING_INSPECTION_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/inspection/list'
// 商检需求录入保存
export const DLMS_GET_SHIPPING_INSPECTION_REQUIREMENT = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/inspection/requirement'
// 商检需求录入提交
export const DLMS_GET_SHIPPING_INSPECTION_REQUIREMENT_APPROVE = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/inspection/requirement/approve'
// 商检确认保存
export const DLMS_GET_SHIPPING_INSPECTION_REQUIREMENT_CONFIRM = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/inspection/requirement/confirm'
// 商检作业保存
export const DLMS_GET_SHIPPING_INSPECTION_JOB = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/inspection/job'

// ODS生成调度计划同步列表
export const DLMS_GET_SHIPPING_SCHEDULING_LIST = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/scheduling/local/list'
export const DLMS_POST_SHIPPING_SCHEDULING = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/scheme/scheduling/local'

// 船舶动态监控
export const DLMS_GET_SHIPPING_DYNAMICS = $HOST_DLMS_SERVICE + '/api/hdri/dlms/v1/shipping/dynamics'

/**
 * 码头巡检管理
 *
 */

// 巡检路线
export const DPMS_GET_LINE_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/line/list'
export const DPMS_ALL_LINE = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/line'
export const DPMS_PUT_LINE_STATUS = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/line/status'
export const DPMS_GET_LINE_ALL = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/line/all'

// 巡检策略
export const DPMS_GET_STRATEGY_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/list'
export const DPMS_ALL_STRATEGY = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy'
export const DPMS_GET_STRATEGY_ALL = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/all'
export const DPMS_PUT_STRATEGY_STATUS = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/status'
export const DPMS_PUT_STRATEGY_APPROVE = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/approve'
// 巡检规则
export const DPMS_GET_STRATEGY_LINE_CONFIG_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/line/config/list'
export const DPMS_ALL_STRATEGY_LINE_CONFIG = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/line/config'
export const DPMS_ALL_STRATEGY_LINE_CONFIG_STATUS = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/line/config/status'
// export const DPMS_GET_STRATEGY_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/strategy/list'
// 检查任务 综合查询
export const DPMS_GET_PATROL_TASK_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/task/list'
export const DPMS_GET_PATROL_TASK_EXPORT = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/task/list/export'
export const DPMS_ALL_PATROL_TASK = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/task'

// 异常记录
export const DPMS_GET_PATROL_EXCEPTION_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/exception/list'
export const DPMS_GET_PATROL_EXCEPTION = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/exception'
export const DPMS_GET_PATROL_EXCEPTION_EXPORT = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/exception/export'
export const DPMS_PUT_PATROL_EXCEPTION_APPROVE = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/exception/approve'
export const DPMS_GET_PATROL_EXCEPTION_APPROVE_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/patrol/exception/approve/list'

// PAD信息管理
export const DPMS_GET_PDA_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/pda/list'
export const DPMS_ALL_PDA = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/pda'
export const DPMS_GET_PDA_EXPORT = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/pda/export'
export const DPMS_PUT_PDA_STATUS = $HOST_DPMS_SERVICE + '/api/hdri/dmms/v1/pda/status'

// 射频卡管理
export const DPMS_GET_RF_CARD_LIST = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/card/list'
export const DPMS_ALL_RF_CARD = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/card'
export const DPMS_PUT_RF_CARD_STATUS = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/card/status'

// 位号对照
export const DPMS_GET_RF_CARD_DETAIL = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/card/detail'
export const DPMS_POST_TAG_IMPORT = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/equipment/tag/import'
export const DPMS_POST_TAG_MAPPING = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/equipment/tag/mapping'
export const DPMS_GET_RF_CARD_ALL = $HOST_DPMS_SERVICE + '/api/hdri/dpms/v1/rf/card/all'

// KPI
export const findOpeIndexMnt = $HOST_DPMS_SERVICE + '/KPIhy/findOpeIndexMnt'
export const addOpeIndexMnt = $HOST_DPMS_SERVICE + '/KPIhy/addOpeIndexMnt'
export const delectOpeIndexMnt = $HOST_DPMS_SERVICE + '/KPIhy/delectOpeIndexMnt'
export const updateOpeIndexMnt = $HOST_DPMS_SERVICE + '/KPIhy/updateOpeIndexMnt'
export const initDicGrade = $HOST_DPMS_SERVICE + '/KPIhy/initDicGrade?ConfConst_Conf_Id=21'
export const initDicUnit = $HOST_DPMS_SERVICE + '/KPIhy/initDicUnit'
export const findCPKCheck = $HOST_DPMS_SERVICE + '/KPIhy/findCPKCheck'
export const findCPKAnalyze = $HOST_DPMS_SERVICE + '/KPIhy/findCPKAnalyze'
export const addCPKAnalyze = $HOST_DPMS_SERVICE +'/KPIhy/addCPKAnalyze'
export const  updateCPKAnalyze = $HOST_DPMS_SERVICE + '/KPIhy/updateCPKAnalyze'
export const  delectCPKAnalyze = $HOST_DPMS_SERVICE + '/KPIhy/delectCPKAnalyze'
export const  findInhibitor = $HOST_DPMS_SERVICE + '/KPIhy/findInhibitor'
export const  pdateInhibitor=   $HOST_DPMS_SERVICE + '/KPIhy/updateInhibitor'
export const  calculateInhibitor= $HOST_DPMS_SERVICE +'/KPIhy/calculateInhibitor'
export  const  nitInhibitor= $HOST_DPMS_SERVICE +'/KPIhy/initInhibitor'
export  const  initInhibitor= $HOST_DPMS_SERVICE +'/KPIhy/initInhibitor'
export  const  updateInhibitor= $HOST_DPMS_SERVICE +'/KPIhy/updateInhibitor'
export  const  downExInhibitor= $HOST_DPMS_SERVICE +'/KPIhy/downExInhibitor'
export  const  findOpeStableRate= $HOST_DPMS_SERVICE +'/KPIhy/findOpeStableRate'
export  const  findOpeStableRateCPK= $HOST_DPMS_SERVICE +'/KPIhy/findOpeStableRateCPK'
export  const  downOpeStableRate= $HOST_DPMS_SERVICE +'/KPIhy/downOpeStableRate'
