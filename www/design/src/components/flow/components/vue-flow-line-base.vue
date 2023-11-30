<script lang="ts" setup>
import { computed } from 'vue'
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import { EventName, LineType, NodeType, PropsLine } from '../flow'
import type { FlowItem } from '../flow'
import addNode from '@/components/flow/components/vue-flow-add.vue'
const props = defineProps(PropsLine) as any
const emits = defineEmits(['lineEvent'])
// const { removeEdges } = useVueFlow()
const path = computed(() => getBezierPath(props))
const click = (node: FlowItem) => {
  const nextId = props.id?.split('-')[1]
  emits('lineEvent', {
    type: LineType.Base,
    event: EventName.Add,
    id: props.id,
    data: [nextId, node]
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
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />
  <!-- transform: `translate(-50%, -120%) translate(${path[1]}px,${path[2]}px)`, -->
  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${props.sourceX}px,${path[2]}px)`
      }"
      class="nodrag nopan"
    >
      <addNode @add-node="click" />
    </div>
  </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
.edgebutton {
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
</style>
