<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <!-- :visible="self.visible" -->
      <el-popover
        ref="popverRef"
        placement="right-start"
        :width="popoverWidth"
        trigger="click"
        popper-class="add-node-popover"
        @show="showEvent"
        @hide="hideEvent"
      >
        <template #reference>
          <span type="text" class="add-bar" @click="showPopover">
            <el-icon>
              <Plus />
            </el-icon>
          </span>
        </template>
        <ul v-if="self.step === StepName.Select" class="step-select">
          <li @click="showCreator(NodeType.Audit)">
            <svg-icon name="user" color="#c8c8c8" />
            审批节点
          </li>
          <li @click="showCreator(NodeType.Request)">
            <svg-icon name="request" />
            Webhook节点
          </li>
          <li @click="showCreator(NodeType.Timegate)">
            <svg-icon name="time" />
            定时放行节点
          </li>
          <li v-if="branch" @click="nodeBranchCreate()">
            <svg-icon name="branch" />
            添加分支节点
          </li>
        </ul>
        <create-node v-else :type="self.type" @cancel="nodeCancel" @submit="nodeCreate" />
      </el-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, reactive, ref } from 'vue'
import { rand } from '@vueuse/shared'
import { Plus } from '@element-plus/icons-vue'
import { EventName, NodeType } from '../flow'
import CreateNode from './vue-flow-add-node.vue'
const popverRef = ref()
const props = defineProps({
  branch: {
    type: Boolean,
    default: true
  }
})
enum StepName {
  Select,
  Edit
}
const self = reactive({
  step: StepName.Select,
  type: '',
  visible: false
})
const popoverWidth = computed(() => {
  return self.step === StepName.Select ? 176 : 250
})
const emits = defineEmits(['addNode'])
const showPopover = () => {
  self.visible = !self.visible
}
const showCreator = (type: NodeType) => {
  self.step = StepName.Edit
  self.type = type
}
const random = (n = 6) => {
  return Array.from({ length: n }, () => '')
    .map((v) => Math.ceil(Math.random() * 36).toString(36))
    .join('')
}
const nodeCancel = () => {
  popverRef.value.hide()
}
const nodeCreate = (data: any) => {
  !data.id && (data.id = random())
  emits('addNode', data)
  popverRef.value.hide()
}
const nodeBranchCreate = () => {
  const data = {
    id: random(),
    name: '分支节点',
    type: NodeType.Branch,
    status: 'PENDING',
    branches: [
      {
        nodes: [
          {
            id: random(),
            name: '筛选节点',
            type: NodeType.Condition
          }
        ]
      },
      {
        nodes: [
          {
            id: random(),
            name: '筛选节点',
            type: NodeType.Condition
          }
        ]
      }
    ]
  }
  nodeCreate(data)
}
const hideEvent = () => {
  self.step = StepName.Select
}
const showEvent = () => {
  self.step = StepName.Select
}
</script>
<style lang="scss" scoped>
.add-bar {
  width: 35px;
  height: 35px;
  background-color: #fff;
  box-shadow: 0 4px 10px 0 rgb(12 31 80 / 8%);
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  outline: none;
  border: none;
  color: rgb(200, 200, 200);
  text-align: center;
  line-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #23ade5 !important;
    color: #fff !important;
  }
}
</style>
<style lang="scss">
.el-popover.add-node-popover {
  width: 180px;
  height: auto;
  min-height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 3;
  height: auto !important;
  padding: 0 !important;

  ul.step-select {
    position: relative;
    margin: 0;
    max-width: 100%;
    width: 100%;
    outline: none;
    padding: 10px;

    > li {
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      padding: 0 5px;
      cursor: pointer;

      & .svg-icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      &:hover {
        background: #ebebf0 !important;
        font-weight: 500 !important;
      }

      &:active {
        color: #fb9337;
      }
    }

    li.divider {
      min-height: 1px;
      line-height: 0;
      height: 1px;
      border-radius: 4px;
      background-color: #f0f0f0;
      margin: 4px 0;
    }
  }
}
</style>
