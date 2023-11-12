type Event<T> = {
  type: T
  event: EventName
  id: string
  data: any
}
export type FlowEvent = Event<NodeType>
export type LineEvent = Event<LineType>

export enum NodeTypeEnum {
  // 节点类型
  APPLICANT = 'APPLICANT', // 申请人节点: first node
  BRANCH = 'BRANCH', // 分支节点(暂时用不到)
  CONDITION = 'CONDITION', // 条件节点(暂时用不到)
  AUDIT = 'AUDIT', // 审批节点
  TIMEGATE = 'TIMEGATE', // 定时放行节点
  REQUEST = 'REQUEST', // Webhook(或请求)节点
  END = 'END' // 归档(或结束)节点: last node
}

export enum EventName {
  Click = 'click',
  Close = 'close',
  Detele = 'detele',
  Copy = 'copy',
  Add = 'add',
  Replace = 'replace',
  ModifyDrawer = 'modify-drawer',
  ModifyNode = 'modify-node'
}

export enum ScaleType {
  Plus = 'plus',
  Minus = 'minus'
}
export enum LineType {
  Base = 'base',
  StepEnd = 'stepEnd',
  StepBegin = 'stepBegin'
}
export enum NodeStatus {
  // 节点状态
  Pending = 'PENDING', // 待处理
  Processing = 'PROCESSING', // 处理中
  Processed = 'PROCESSED', // 已通过
  Refused = 'REFUSED' // 已拒绝
}

export enum NodeType {
  Applicant = 'APPLICANT',
  Timegate = 'TIMEGATE',
  Audit = 'AUDIT',
  Request = 'REQUEST',
  Branch = 'BRANCH',
  Condition = 'CONDITION',
  End = 'END'
}
export interface FlowBranches {
  nodes: FlowItem[]
}
export interface FlowItem {
  name: string
  type: string
  status: string
  pid?: string
  // 子节点最大长度
  size: number
  // 分支序号
  branchIndex: number
  // 当前分支index
  seriesIndex: number
  prev: FlowItem
  parent: FlowItem
  id: string
  audit: any
  x: number
  position: {
    x: number
    y: number
  }
  branches: FlowBranches[]
}

export const PropsLine = {
  id: {
    type: String,
    required: true
  },
  sourceX: {
    type: Number,
    required: true
  },
  sourceY: {
    type: Number,
    required: true
  },
  targetX: {
    type: Number,
    required: true
  },
  targetY: {
    type: Number,
    required: true
  },
  sourcePosition: {
    type: String,
    required: true
  },
  targetPosition: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: false
  },
  markerEnd: {
    type: String,
    required: false
  },
  style: {
    type: Object,
    required: false
  }
}
