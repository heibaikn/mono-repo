<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import Close from '../icon/close.vue'
import { EventName, NodeType } from '../flow'
import type { CSSProperties } from 'vue'
import type { Connection, Edge, NodeProps } from '@vue-flow/core'
const props = defineProps(['id', 'data', 'form'])
const emits = defineEmits(['itemEvent'])
const targetHandleStyle: CSSProperties = { background: '#555' }
const itemClick = () => {
  emits('itemEvent', {
    type: NodeType.Timegate,
    event: EventName.Click,
    id: props.id,
    data: props.data
  })
}

const detele = () => {
  emits('itemEvent', {
    type: NodeType.Timegate,
    event: EventName.Detele,
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
  <Handle id="a" type="source" :position="Position.Top" :style="targetHandleStyle" />
  <Handle id="b" type="source" :position="Position.Bottom" :style="targetHandleStyle" />
  <div class="node-wrap timegate-node-wrap" @click="itemClick">
    <div class="node-wrap-box">
      <div class="title">
        <span>{{ data.name }}</span>
        <div @click.stop>
          <el-popconfirm
            trigger="hover"
            confirm-button-text="删除"
            cancel-button-text="取消"
            width="290px"
            title="是否删除该节点"
            @confirm="detele"
          >
            <template #reference>
              <div title="删除" class="node-operation-img node-operation-close">
                <Close />
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="content">
        <div class="text">满足 ${时间1} 时放行</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.end-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
