<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { Connection, Edge, NodeProps } from '@vue-flow/core'
import Close from '../icon/close.vue';
import Copy from '../icon/copy.vue';
import { Handle, Position } from '@vue-flow/core'
import { EventName, NodeType } from '../flow'
const props = defineProps(['id', 'data'])
const emits = defineEmits(['itemEvent'])
const targetHandleStyle: CSSProperties = { background: '#555' }
const itemClick = () => {
  emits('itemEvent', {
    type: NodeType.Condition,
    event: EventName.Click,
    id: props.id,
    data: props.data
  })
}
const detele = () => {
  emits('itemEvent', {
    type: NodeType.Condition,
    event: EventName.Detele,
    id: props.id,
    data: props.data
  })
}
const copy = () => {
  emits('itemEvent', {
    type: NodeType.Condition,
    event: EventName.Copy,
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
  <div class="node-wrap condition-node-wrap" @click="itemClick">
    <div class="node-wrap-box">
      <div class="title">
        <span>{{ data.name }}</span>
        <div @click.stop>
          <el-popconfirm
                         trigger="hover"
                         confirmButtonText="删除"
                         cancel-button-text="取消"
                         @confirm="detele"
                         width="290px"
                         title="是否删除该节点">
            <template #reference>
              <div title="删除" class="node-operation-img node-operation-close">
                <Close />
              </div>
            </template>
          </el-popconfirm>
          <el-popconfirm
                         trigger="hover"
                         confirmButtonText="复制"
                         cancel-button-text="取消"
                         @confirm="copy"
                         width="290px"
                         title="是否复制整个分支">
            <template #reference>
              <div title="复制" class="node-operation-img node-operation-copy">
                <Copy />
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="content" v-if="data.validators && data.validators.length > 0">
        <ul>
          <li v-for="(item, index) in data.validators" :key="index">{{ item.fail_msg }}
          </li>
        </ul>
      </div>
      <div class="content" v-else>
        <span>所有数据可进入该分支</span>
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
