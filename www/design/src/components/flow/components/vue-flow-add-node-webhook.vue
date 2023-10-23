<template>
  <div class="node-wrap audit-node-wrap">
    <div class="node-wrap-box creating-node">
      <div class="request-background header-background"></div>
      <div class="header">
        <p class="node-name">节点名称</p>
        <el-input v-focus v-model="node.name" placeholder="请输入节点名"></el-input>
      </div>
      <div class="footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="danger" @click="createNode">创建</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from 'vue'
import { NodeType } from '../flow'
const emits = defineEmits(['cancel', 'submit'])
const node = reactive({
  id: '',
  name: 'webhook节点',
  type: NodeType.Request,
  action: {
    request: null,
    expected_response: null
  }
})
const createNode = () => {
  emits('submit', node)
}
const cancel = () => {
  emits('cancel')
}
</script>

<style lang="scss" scoped>
.creating-node {
  width: 250px;

  .header-background {
    width: 100%;
    height: 10px;
    border-radius: 8px 8px 0 0;
  }

  .request-background {
    background: linear-gradient(89.96deg, #ff6666 0.05%, #cc3399 79.83%);
  }

  :deep(.header) {
    width: 100%;
    height: 84px;
    padding: 10px;
    color: #767e89;

    .node-name {
      margin-bottom: 6px;
      font-weight: 500;
    }

    .el-input {
      height: 36px;
      line-height: 36px;
    }

    .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
  }

  .footer {
    width: 100%;
    min-height: 56px;
    padding: 0 10px;
    color: #b0b0b9;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
