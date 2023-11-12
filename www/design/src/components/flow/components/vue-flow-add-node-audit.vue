<template>
  <div class="node-wrap audit-node-wrap">
    <div class="node-wrap-box creating-node">
      <div class="audit-background header-background" />
      <div class="header">
        <p class="node-name">节点名称</p>
        <el-input v-model="node.name" v-focus placeholder="请输入节点名" />
      </div>
      <div class="content">
        <p class="audit-title">负责人</p>
        <div class="audit-user-container">
          {{ node.audit.users.join('，') }}
        </div>
      </div>
      <div class="footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="warning" @click="createNode">创建</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, reactive, ref } from 'vue'
import _ from 'lodash'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import { NodeType } from '../flow'
import type { UserItem } from '#/user'
import type { RoleItem } from '#/role'
import actions from '@/actions'
import BlgPopover from '@/components/blgPopover/index.vue'
// import SharedModule from '@/shared'
const route = useRoute()
const placement = ref<string>('left-end')
const userList = ref<UserItem[]>([])
const roleList = ref<RoleItem[]>([])
const emits = defineEmits(['cancel', 'submit'])
const node = reactive({
  id: '', // 为空则创建新的node，否则复用之前的node_id（下同）
  name: '审批节点', // 节点名称
  type: NodeType.Audit,
  audit: {
    type: 'OR',
    users: ['用户a', '用户b'],
    roles: []
  }
})
const createNode = () => {
  console.log(node)
  emits('submit', node)
}
const cancel = () => {
  emits('cancel')
}

// const fetchProjectUser = () => {
//   const projectId = route.params.project_id as string
//   SharedModule.getShared()
//     .getListProjectUser(projectId)
//     .then((res) => {
//       if (res && res.length > 0) {
//         userList.value = _.cloneDeep(res)
//       } else {
//         userList.value = []
//       }
//     })
// }
// const fetchRole = () => {
//   SharedModule.getShared()
//     .getListRole()
//     .then((res) => {
//       if (res && res.length > 0) {
//         roleList.value = _.cloneDeep(res)
//       } else {
//         roleList.value = []
//       }
//     })
// }
// provide('fetchUser', fetchProjectUser)
// provide('fetchRole', fetchRole)
</script>

<style lang="scss" scoped>
.creating-node {
  width: 250px;

  .header-background {
    width: 100%;
    height: 10px;
    border-radius: 8px 8px 0 0;
  }

  .audit-background {
    background: linear-gradient(89.96deg, #fa6f32 0.05%, #fb9337 79.83%);
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

  .content {
    position: relative;
    width: 100%;
    padding: 15px;
    border-top: 1px solid #e6eaf0;
    border-bottom: 1px solid #e6eaf0;

    .audit-title {
      color: #767e89;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 15px;
    }

    .audit-user-container {
      .empty-container,
      .selected-list {
        display: flex;
        flex-wrap: wrap;

        & li {
          display: inline-flex;
          margin-right: 10px;
          margin-bottom: 10px;
          position: relative;

          &:hover {
            .icon-gmaster-delete-flow {
              display: inline-block;
            }
          }

          .icon-gmaster-delete-flow {
            display: none;
            position: absolute;
            font-size: 12px;
            top: -2px;
            right: -7px;
            cursor: pointer;
          }
        }
      }

      .frame-selector {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: rgb(242, 242, 242);
        color: rgb(195, 195, 195);
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-color: rgb(230, 230, 230);
          color: rgb(160, 160, 160);
        }
      }
    }
  }

  .footer {
    width: 100%;
    min-height: 56px;
    padding: 0 10px;
    color: #767e89;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;

    .el-button--warning {
      background-color: rgb(251, 136, 54);
      border-color: none;
    }

    .el-button--warning:hover {
      background-color: rgb(251 136 54 / 70%);
      border-color: none;
    }
  }
}
</style>
