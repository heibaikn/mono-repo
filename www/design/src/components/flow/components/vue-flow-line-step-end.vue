<script setup lang="ts">
import { computed } from 'vue'
import {
  BaseEdge,
  EdgeLabelRenderer,
  SmoothStepEdge,
  StepEdge,
  getBezierPath,
  getSmoothStepPath,
  useVueFlow
} from '@vue-flow/core'
import { EventName, LineType, NodeType, PropsLine } from '../flow'
import type { FlowItem } from '../flow'
import addNode from '@/components/flow/components/vue-flow-add.vue'
const props = defineProps(PropsLine)
const emits = defineEmits(['lineEvent'])

const path = computed(() =>
  getSmoothStepPath(Object.assign({ centerY: props.targetY - 60 }, props))
)
const click = (node: FlowItem) => {
  const targetId = props.id?.split('-')[1]
  emits('lineEvent', {
    type: LineType.Base,
    event: EventName.Add,
    id: props.id,
    data: [targetId, node]
  })
}

const clickEnd = (node: FlowItem) => {
  const data = JSON.parse(JSON.stringify(props.data))
  console.log('line click', data)
  // let targetId = props.id?.split('-')[1];
  emits('lineEvent', {
    type: LineType.StepEnd,
    event: EventName.Add,
    id: props.id,
    data: [data.id, node]
  })
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <SmoothStepEdge :id="id" type="step" :style="style" :path="path[0]" :marker-end="markerEnd" />
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, 30%) translate(${props.sourceX}px,${props.sourceY}px)`
      }"
      class="nodrag nopan"
    >
      <addNode @add-node="click" />
    </div>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -130%) translate(${props.targetX}px,${props.targetY}px)`
      }"
      class="nodrag nopan"
    >
      <addNode :branch="false" @add-node="clickEnd" />
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

.branch-button {
}
</style>
