import _ from 'lodash'
import { type FlowBranches, type FlowItem, LineType, NodeType } from '../flow'

class Utils {
  source: FlowItem[] = []
  // 原始值 的集合
  sourceMap = new Map()
  // 处理后node 集合
  dataMap = new Map()
  // 处理后渲染node集合
  nodeMap = new Map()
  xGap = 150
  yGap = 260
  maxLen = 0
  constructor(source: FlowItem[]) {
    this.init(source)
  }
  reset() {
    this.sourceMap = new Map()
    this.dataMap = new Map()
    this.nodeMap = new Map()
  }
  generateWrap(node: FlowItem[], deep = true): FlowItem {
    const nodes = deep ? JSON.parse(JSON.stringify(node)) : node
    const data = {
      id: '0',
      type: 'BRANCH',
      position: { x: 0, y: 0 },
      branches: [
        {
          nodes
        }
      ]
    } as any
    return data
  }
  getLines(source: string, target: string, type = LineType.Base) {
    let data
    if (type === LineType.StepBegin) {
      const id = this.dataMap.get(target).parent.id
      data = this.sourceMap.get(id)
    }
    if (type === LineType.StepEnd) {
      const id = this.dataMap.get(source).parent.id
      data = this.sourceMap.get(id)
    }
    return {
      id: `e-${source}-${target}`,
      sourceHandle: 'b',
      markerEnd: 'arrowclosed',
      type,
      source,
      target,
      data
    }
  }
  generateData() {
    const nodes = [...this.nodeMap.values()]
      .map((item) => {
        return this.transferNode(item)
      })
      .map((item) => {
        item.position.x = item.position.x * this.xGap
        item.position.y = item.position.y * this.yGap
        return item
      })
    const lines = nodes
      .filter((item) => item.prevNodeId.length)
      .flatMap((item) => {
        let type = LineType.Base
        if (item.prevNodeId.length > 1) {
          type = LineType.StepEnd
        } else {
          const parentNode = this.dataMap.get(item.parentId)
          const selfNode = this.dataMap.get(item.id)
          if (parentNode.type === NodeType.Branch && selfNode.seriesIndex === 0 && parentNode.id) {
            type = LineType.StepBegin
          }
        }
        return item.prevNodeId.map((id) => {
          return this.getLines(id, item.id, type)
        })
      })
    return [...nodes, ...lines]
  }
  getLastLeafNode(node: FlowItem): string[] {
    const ret: string[] = []
    node.branches.forEach((branch, index) => {
      const lastId = branch.nodes[branch.nodes.length - 1].id
      const node = this.dataMap.get(lastId)
      if (node.type === NodeType.Branch) {
        ret.push(...this.getLastLeafNode(node))
      } else {
        ret.push(branch.nodes[branch.nodes.length - 1].id)
      }
    })
    return ret
  }
  getPrevNodeIds(node: FlowItem) {
    if (!node) {
      return []
    }
    if (node.type === NodeType.Branch) {
      return this.getLastLeafNode(node)
    } else {
      return [node.id]
    }
  }
  transferNode(item: FlowItem) {
    const prevNodeId = this.getPrevNodeIds(item.prev)
    return {
      id: item.id,
      prevNodeId,
      parentId: item.parent.id,
      name: item.name,
      type: item.type,
      data: this.sourceMap.get(item.id),
      status: item.status,
      position: JSON.parse(JSON.stringify(item.position))
    }
  }
  dataFlatFunc(node: FlowItem) {
    this.dataMap.set(node.id, node)
    if (node.type !== 'BRANCH') {
      this.nodeMap.set(node.id, node)
    }
    if (node.branches && node.branches.length) {
      node.branches.forEach((children, index) => {
        let pid = node.id
        let prev = node
        if (node.type === 'BRANCH') {
          prev = node.prev!
          pid = node.pid!
        }
        children.nodes.forEach((items) => {
          items.pid = pid
          items.prev = prev
          items.parent = node
          pid = items.id
          prev = items
          this.dataFlatFunc(items)
        })
      })
    }
  }

  calcCenter(items: number[]): number {
    let sum = 0
    const len = Math.floor((items.length + 1) / 2)
    for (let i = 0; i < len; i++) {
      sum += items[i]
    }
    sum = sum * 2
    return sum
  }
  calcLeafRangeX(node: FlowItem, rangeX = 1): [number, number[]] {
    let subArrLen: number[] = [1]
    if (node.branches && node.branches.length) {
      const { branches } = node
      subArrLen = []
      branches.forEach((branch, index) => {
        let subMaxLen = 0
        for (let i = 0; i < branch.nodes.length; i++) {
          const item = branch.nodes[i]
          item.seriesIndex = i
          item.branchIndex = index
          item.x = rangeX
          const [len, _] = this.calcLeafRangeX(item, rangeX)
          subMaxLen < len && (subMaxLen = len)
        }
        subArrLen.push(subMaxLen)
      })
      rangeX = subArrLen.reduce((sum, v) => sum + v, 0)
    }
    // console.log(subArrLen, 'subArrLen');
    return [rangeX, subArrLen]
  }

  calcLeafAxisX(node: FlowItem) {
    const { size, branches, position } = node
    if (branches && branches.length) {
      let sumX = 0
      const subArrLen: any[] = []
      branches.forEach((branch, branchIndex) => {
        if (branches.length === 1) {
          branch.nodes.forEach((item, idx) => {
            const [xLen, _] = this.calcLeafRangeX(item)
            item.size = xLen
            item.position.x = position.x
            this.calcLeafAxisX(item)
          })
        } else {
          let maxXLen = 0,
            positionX = 0
          branch.nodes.forEach((item, idx) => {
            const [xLen, center] = this.calcLeafRangeX(item)
            item.size = xLen
            if (maxXLen < xLen) {
              maxXLen = xLen
              positionX = this.calcCenter(center)
            }
          })
          subArrLen.push(JSON.stringify([maxXLen, positionX]))
          branch.nodes.forEach((item, idx) => {
            item.position.x = position.x + 2 * sumX
            this.calcLeafAxisX(item)
          })
          sumX += maxXLen
        }
      })
    }
  }
  calcLeafRangeY(source: FlowItem[], rangeY = 0): number {
    for (const element of source) {
      rangeY++
      if (!element.position) {
        element.position = {
          x: 0,
          y: rangeY
        }
      }
      if (element.type === 'BRANCH') {
        let temp = rangeY
        element.position.y = rangeY
        for (let j = 0; element.branches.length > j; j++) {
          const subrangeY = this.calcLeafRangeY(element.branches[j].nodes, rangeY - 1)
          subrangeY > temp && (temp = subrangeY)
        }
        rangeY = temp
      }
    }
    return rangeY
  }
  clgInfo() {
    console.log(
      new Map(
        [...this.dataMap.entries()].map((item) => [
          item[0],
          `${JSON.stringify(item[1].position)} ${item[1].size}`
        ])
      )
    )
    console.log(
      new Map(
        [...this.nodeMap.entries()].map((item) => [
          item[0],
          `${JSON.stringify(item[1].position)} ${item[1].size}`
        ])
      )
    )
  }
  cloneSource(node: FlowItem) {
    this.sourceMap.set(node.id, node)
    if (node.branches && node.branches.length) {
      node.branches.forEach((children, index) => {
        children.nodes.forEach((items) => {
          this.cloneSource(items)
        })
      })
    }
  }
  getNodeById(id: string) {
    return this.sourceMap.get(id)
  }
  getNodeXpathById(id: string) {
    const xpath = []
    let node = this.nodeMap.get(id)
    while (node) {
      if (node.prev && ![NodeType.Branch, NodeType.Condition].includes(node.prev.type)) {
        if (node.prev.parent.id === '0') {
          const sourceNode = this.sourceMap.get(node.prev.id)
          xpath.push(sourceNode)
        }
      }
      node = node.prev
    }
    return xpath
  }
  random(n = 6) {
    return Array.from({ length: n }, () => 0)
      .map((v) => Math.ceil(Math.random() * 35).toString(36))
      .join('')
  }
  addNodeByPrev(sourceId: string, node: FlowItem, replace = false) {
    const sourceNode = this.dataMap.get(sourceId)
    // let parentNode = _.cloneDeep(this.sourceMap.get(sourceNode.parent.id));
    const parentNode = this.sourceMap.get(sourceNode.parent.id)
    parentNode.branches[sourceNode.branchIndex].nodes.splice(
      sourceNode.seriesIndex + 1,
      replace ? 1 : 0,
      node
    )
    return this.source
  }
  replaceNode(sourceId: string, node: FlowItem) {
    return this.addNodeByPrev(sourceId, node, true)
  }
  modifyNode(node: FlowItem) {
    const targetNode = this.dataMap.get(node.id)
    const parentNode = this.sourceMap.get(targetNode.parent.id)
    parentNode.branches[targetNode.branchIndex].nodes.splice(targetNode.seriesIndex, 1, node)
    return this.source
  }
  removeBranchNodeId(branch: FlowBranches) {
    branch.nodes.forEach((node) => {
      node.id = this.random()
      if (node.branches && node.branches.length) {
        node.branches.forEach((children, index) => {
          this.removeBranchNodeId(children)
        })
      }
    })
    return branch
  }
  copyBranch(node: FlowItem) {
    const targetNode = this.dataMap.get(node.id)
    const parentNode = this.sourceMap.get(targetNode.parent.id)
    const newBranch = this.removeBranchNodeId(
      _.cloneDeep(parentNode.branches[targetNode.branchIndex])
    )
    parentNode.branches.push(newBranch)
    return this.source
  }
  removeNode(id: string) {
    const sourceNode = this.dataMap.get(id)
    const parentNode = this.sourceMap.get(sourceNode.parent.id)
    parentNode.branches[sourceNode.branchIndex].nodes.splice(sourceNode.seriesIndex, 1)
    return this.source
  }
  removeBranch(id: string) {
    const sourceNode = this.dataMap.get(id)
    const parentNode = this.sourceMap.get(sourceNode.parent.id)
    if (parentNode.branches.length === 2) {
      const pa = this.dataMap.get(sourceNode.parent.id)
      const grandPa = this.sourceMap.get(pa.parent.id)
      const idx = sourceNode.branchIndex ? 0 : 1
      const restNode = parentNode.branches[idx].nodes.slice(1)
      if (restNode.length > 0) {
        grandPa.branches[pa.branchIndex].nodes.splice(pa.seriesIndex, 1, ...restNode)
      } else {
        grandPa.branches[pa.branchIndex].nodes.splice(pa.seriesIndex, 1)
      }
    } else {
      parentNode.branches.splice(sourceNode.branchIndex, 1)
    }
    return this.source
  }
  getFlowSize() {
    const maxLevel = [1, 1]
    this.nodeMap.forEach((item) => {
      const [x, y] = maxLevel
      maxLevel[0] = item.position.x > x ? item.position.x : x
      maxLevel[1] = item.position.y > y ? item.position.y : y
    })
    return {
      w: (maxLevel[0] + 2) * this.xGap,
      h: (maxLevel[1] + 1) * this.yGap
    }
  }
  init(source: FlowItem[]) {
    this.reset()
    this.source = source
    this.cloneSource(this.generateWrap(this.source, false))
    const data = this.generateWrap(source)
    this.calcLeafRangeY(data.branches[0].nodes)
    const [size, rootAxisX] = this.calcLeafRangeX(data)
    data.position.x = 0
    data.size = size
    this.calcLeafAxisX(data)
    this.dataFlatFunc(data)
    // this.clgInfo();
    // console.log(this.dataMap);
    return this
  }
}

// export default new Utils()
export default Utils
