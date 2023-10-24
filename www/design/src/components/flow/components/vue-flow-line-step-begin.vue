<script setup lang="ts">
import {
  BaseEdge,
  StepEdge,
  SmoothStepEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  getBezierPath,
  useVueFlow,
  type SmoothStepEdgeProps
} from '@vue-flow/core'
import { computed } from 'vue'
import addNode from '@/components/flow/components/vue-flow-add.vue'
import { PropsLine, LineType, EventName, NodeType, type FlowItem } from '../flow'
const props = defineProps(PropsLine)
const emits = defineEmits(['lineEvent'])
const path = computed(() => getSmoothStepPath(props))
// console.log(path, props);
const click = (node: FlowItem) => {
  let targetId = props.id?.split('-')[1]
  emits('lineEvent', {
    type: LineType.StepBegin,
    event: EventName.Add,
    id: props.id,
    data: [targetId, node]
  })
}
const random = (n = 6) => {
  return new Array(n).fill(0).map(v => (Math.ceil(Math.random() * 36)).toString(36)).join('')
}
const branchItem = () => {
  return {
    nodes: [
      {
        id: random(),
        name: '未命名筛选节点',
        type: NodeType.Condition
      }
    ]
  }
}
const addBranch = () => {
  let data = JSON.parse(JSON.stringify(props.data))
  data.branches.push(branchItem())
  let targetId = props.id?.split('-')[1]
  emits('lineEvent', {
    type: LineType.StepBegin,
    event: EventName.Replace,
    id: props.id,
    data: [targetId, data]
  })
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <SmoothStepEdge type="step" :id="id" :style="style" :path="path[0]"
                  :marker-end="markerEnd" />
  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
         :style="{
           pointerEvents: 'all',
           position: 'absolute',
           transform: `translate(-50%, 20%) translate(${props.sourceX}px,${props.sourceY}px)`
         }"
         class="nodrag nopan">
      <addNode @add-node="click" :branch="false"></addNode>
    </div>
    <div
         :style="{
           pointerEvents: 'all',
           position: 'absolute',
           transform: `translate(-50%, 180%) translate(${props.sourceX}px,${props.sourceY}px)`
         }"
         class="nodrag nopan">
      <button class="edge-button" @click="addBranch()">+</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
.edge-button {
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 4px 10px #0c1f5014;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  outline: none;
  border: none;
  color: #c8c8c8;
  text-align: center;
  line-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #23ade5;
    color: #fff;
  }
}

.branch-button {}
</style>
