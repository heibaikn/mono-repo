<template>
  <div class="flow-design-container">
    <div class="zoom-btns">
      <el-button
        :disabled="scale <= scaleRange.min"
        :icon="Minus"
        @click="clickScale(ScaleType.Minus)"
      />
      <span class="scale-text">{{ scale }}%</span>
      <el-button
        :disabled="scale >= scaleRange.max"
        :icon="Plus"
        @click="clickScale(ScaleType.Plus)"
      />
      <el-button @click="exportPng">导出</el-button>
    </div>
    <section class="flow-design">
      <div ref="wrapRef" class="box-scale-box vue-flow-wrap">
        <VueFlow
          v-if="draft.flow"
          ref="flowRef"
          :nodes="draft.flow.nodes"
          @scale-change="scaleChange"
          @flow-event="flowEvent"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, provide, reactive, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import _ from 'lodash'
import html2canvas from 'html2canvas'
import { Minus, Plus } from '@element-plus/icons-vue'
import VueFlow from './components/vue-flow.vue'
import {
  EventName,
  type FlowEvent,
  type FlowItem,
  type LineEvent,
  NodeStatus,
  NodeType,
  NodeTypeEnum,
  ScaleType
} from './flow'
const route = useRoute()
const flowRef = ref()
const wrapRef = ref()
const scale = ref<any>(100)
const scaleRange = reactive<Record<string, number>>({
  min: 10,
  max: 100
})
const draft = reactive({
  flow: {
    nodes: [
      {
        id: 'temp0',
        name: '申请人',
        userInfo: { user: '用户1' },
        type: NodeTypeEnum.APPLICANT,
        status: NodeStatus.Pending,
        audit: {
          field_permissions: {},
          table_permissions: {}
        }
      },
      {
        id: 'temp2',
        name: '结束',
        type: NodeTypeEnum.END,
        status: NodeStatus.Pending
      }
    ]
  },
  value: ''
})
const self = reactive({
  drawerVisible: {
    visible: false
  },
  activeNode: {} as FlowItem
})

const exportPng = async () => {
  const el = flowRef.value.getEl()
  const canvas = await html2canvas(el)
  canvas.toBlob((blob) => {
    // 创建一个临时的URL对象
    const url = URL.createObjectURL(blob!)
    // 创建一个虚拟的下载链接
    const a = document.createElement('a')
    a.href = url
    a.download = 'screenshot.png' // 可以指定下载的文件名
    // 触发下载链接的点击事件
    a.click()
    // 释放URL对象，防止内存泄漏
    URL.revokeObjectURL(url)
  })
}
const flowEvent = (evt: FlowEvent) => {
  if (
    [
      EventName.Add,
      EventName.Detele,
      EventName.Replace,
      EventName.Copy,
      EventName.ModifyNode,
      EventName.ModifyDrawer
    ].includes(evt.event)
  ) {
    updateNode(evt)
  } else {
    self.activeNode = evt.data
    setTimeout(() => {
      self.drawerVisible.visible = true
    }, 50)
  }
}
const updateNode = async (evt: FlowEvent) => {
  // 模拟api 请求
  setTimeout(() => {
    draft.flow.nodes = evt.data
  }, 500)
}

const clickScale = async (type: ScaleType) => {
  if (type === ScaleType.Plus) {
    scale.value += 10
  } else {
    scale.value -= 10
  }
  if (scale.value < scaleRange.min) {
    scale.value = 10
  }
  if (scale.value > scaleRange.max) {
    scale.value = 100
  }
  await nextTick()
  flowRef.value.setZoom(scale.value)
}
const scaleChange = (num: number) => {
  scale.value = num
}
</script>
<style lang="scss">
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';
@import './style.scss';

// .vue-flow-wrap {

// }
</style>
