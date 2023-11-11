<script lang="ts" setup>
import { type CSSProperties, computed, onMounted, reactive, watch } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { EventName, NodeType } from '../flow'
import type { Connection, Edge, NodeProps } from '@vue-flow/core'
const props = defineProps(['id', 'data'])
const emits = defineEmits(['itemEvent'])
const targetHandleStyle: CSSProperties = { background: '#555' }
const itemClick = () => {
  emits('itemEvent', {
    type: NodeType.Applicant,
    event: EventName.Click,
    id: props.id,
    data: props.data
  })
}

const remove = () => {
  emits('itemEvent', {
    type: NodeType.Applicant,
    event: EventName.ModifyNode,
    id: props.id,
    data: props.data
  })
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div class="node-wrap applicant-node-wrap" @click="itemClick">
    <div class="node-wrap-box">
      <div class="title">
        <span>{{ data.name }}</span>
        <!-- <svg-icon name="content-ink-pen-write" /> -->
      </div>
      <div class="content">
        {{ data.userInfo.user }}
      </div>
    </div>
  </div>
  <Handle id="c" type="source" :position="Position.Bottom" :style="targetHandleStyle" />
</template>
