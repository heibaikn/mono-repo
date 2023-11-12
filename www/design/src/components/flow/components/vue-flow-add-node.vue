<template>
  <component :is="render()" @cancel="cancel" @submit="submit" />
</template>

<script setup lang="ts">
import { NodeType } from '../flow'
import NodeAudit from './vue-flow-add-node-audit.vue'
import NodeRequest from './vue-flow-add-node-webhook.vue'
import NodeTimegate from './vue-flow-add-node-timegate.vue'
const props = defineProps(['type'])
const emits = defineEmits(['cancel', 'submit'])
const cancel = () => {
  emits('cancel')
}
const submit = (data: any) => {
  emits('submit', data)
}
const render = () => {
  switch (props.type) {
    case NodeType.Audit:
      return NodeAudit
    case NodeType.Request:
      return NodeRequest
    case NodeType.Timegate:
      return NodeTimegate
    default:
      return NodeAudit
  }
}
</script>

<style scoped></style>
