<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { Connection, Edge, NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'
const targetHandleStyle: CSSProperties = { background: '#555' }
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <Handle id="c" type="source" :position="Position.Top" :style="targetHandleStyle" />
  <div class="end-node">
    <div class="end-node-text">结束</div>
  </div>
</template>

<style lang="scss" scoped>
.end-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 270px;
  font-size: 14px;
  text-align: left;
  color: #191f2566;

  .end-node-text {
    width: 50px;
    height: 50px;
    background: #fff;
    box-shadow: 0 4px 10px #0c1f5014;
    border-radius: 100%;
    color: #121315;
    text-align: center;
    line-height: 50px;
  }
}
</style>
