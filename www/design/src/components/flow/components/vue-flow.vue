<template>
  <VueFlow
    ref="flowRef"
    v-model="elements"
    class="gmaster-flow-setting"
    :style="{ backgroundColor: bgColor }"
    @viewport-change="paneScroll"
  >
    <template #node-APPLICANT="props">
      <NodeStart v-bind="props" @item-event="nodeEvent" />
    </template>
    <template #node-REQUEST="props">
      <NodeWebhook v-bind="props" @item-event="nodeEvent" />
    </template>
    <template #node-TIMEGATE="props">
      <NodeTimeGate v-bind="props" @item-event="nodeEvent" />
    </template>
    <template #node-AUDIT="props">
      <NodeAudit v-bind="props" @item-event="nodeEvent" />
    </template>
    <template #node-CONDITION="props">
      <NodeCondition v-bind="props" @item-event="nodeEvent" />
    </template>
    <template #node-END="props">
      <NodeEnd v-bind="props" @item-event="nodeEvent" />
    </template>

    <template #edge-base="props">
      <LineBase v-bind="props" @line-event="lineEvent" />
    </template>
    <template #edge-stepBegin="props">
      <LineStepBegin v-bind="props" @line-event="lineEvent" />
    </template>
    <template #edge-stepEnd="props">
      <LineStepEnd v-bind="props" @line-event="lineEvent" />
    </template>
    <!-- <Controls /> -->
  </VueFlow>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { type Elements, VueFlow, isEdge, useVueFlow } from '@vue-flow/core'
// import { Controls } from '@vue-flow/controls'
import { EventName, type FlowEvent, type LineEvent, LineType, NodeType } from '../flow'
import NodeStart from './vue-flow-node-applicant.vue'
import NodeWebhook from './vue-flow-node-webhook.vue'
import NodeTimeGate from './vue-flow-node-timegate.vue'
import NodeCondition from './vue-flow-node-condition.vue'
import NodeAudit from './vue-flow-node-audit.vue'
import NodeEnd from './vue-flow-node-end.vue'
import LineBase from './vue-flow-line-base.vue'
import LineStepBegin from './vue-flow-line-step-begin.vue'
import LineStepEnd from './vue-flow-line-step-end.vue'
import flowUtils from './vue-flow-utils'
const flowRef = ref()
const elements = ref<Elements>([])
const bgColor = ref('#fff')
const props = defineProps(['nodes', 'form'])
const emits = defineEmits(['flowEvent', 'scaleChange'])
const maxZoom = 1.2
const { onPaneReady, zoomTo, getTransform } = useVueFlow({
  maxZoom,
  minZoom: 0.12,
  fitViewOnInit: true,
  nodesDraggable: false,
  snapToGrid: true,
  defaultEdgeOptions: {
    type: 'step'
  }
})
const self = reactive({
  flowTools: {} as flowUtils
})
const nodeEvent = (evt: FlowEvent) => {
  if (evt.event === EventName.Detele) {
    if (evt.type === NodeType.Condition) {
      evt.data = self.flowTools.removeBranch(evt.id)
    } else {
      evt.data = self.flowTools.removeNode(evt.id)
    }
  }
  if ([EventName.ModifyNode, EventName.ModifyDrawer].includes(evt.event)) {
    evt.data = self.flowTools.modifyNode(evt.data)
  }
  if (evt.event === EventName.Copy) {
    evt.data = self.flowTools.copyBranch(evt.data)
    // console.log("object",evt);
  }
  emits('flowEvent', evt)
}
const lineEvent = (evt: LineEvent) => {
  console.log(self.flowTools)
  let ret = [] as any
  if (evt.event === EventName.Replace) {
    ret = self.flowTools.replaceNode(evt.data[0], evt.data[1])
  } else {
    ret = self.flowTools.addNodeByPrev(evt.data[0], evt.data[1])
  }
  evt.data = ret
  emits('flowEvent', evt)
}
const init = () => {
  elements.value = []
  const source = JSON.parse(JSON.stringify(props.nodes))
  self.flowTools = new flowUtils(source)
  const data = self.flowTools.generateData()

  console.log(self.flowTools, 'self.flowTools')
  elements.value = data
}

const debounceWheel = (fn: () => void, timeout: number) => {
  let timer = 0
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

const paneScroll = debounceWheel((e: WheelEvent) => {
  const pane = getTransform()
  emits('scaleChange', Math.floor((pane.zoom / maxZoom) * 100))
}, 300)
const getEl = () => {
  const el = flowRef.value.$el.querySelector('.vue-flow__transformationpane') || flowRef.value.$el
  const flowInfo = self.flowTools.getFlowSize()
  el.style.width = `${flowInfo.w}px`
  el.style.height = `${flowInfo.h}px`
  console.log(el, flowInfo)
  return el
}

onMounted(() => {
  init()
})
watch(
  () => props.nodes,
  () => {
    init()
  }
)

onPaneReady((i) => {
  i.zoomTo(maxZoom * 0.5)
  i.fitView()
})
const setZoom = (percent: number) => {
  // console.log(maxZoom * percent / 100);
  zoomTo((maxZoom * percent) / 100)
}
defineExpose({ setZoom, setNode: nodeEvent, getEl })
// return {
//   el: flowRef
// }
</script>
<style lang="scss">
.gmaster-flow-setting {
  .vue-flow__node-start {
    padding: 0px;
  }

  .node-wrap {
    .top-left-cover-line {
      left: -1px;
    }

    .top-left-cover-line,
    .top-right-cover-line {
      position: absolute;
      height: 3px;
      width: 50%;
      background-color: #fff;
      top: -2px;
    }

    .top-right-cover-line {
      right: -1px;
    }

    .bottom-left-cover-line {
      left: -1px;
    }

    .bottom-left-cover-line,
    .bottom-right-cover-line {
      position: absolute;
      height: 3px;
      width: 50%;
      background-color: #fff;
      bottom: -2px;
    }

    .bottom-right-cover-line {
      right: -1px;
    }

    .node-wrap-box {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 270px;
      flex-shrink: 0; // flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果一个项目的flex-shrink属性为0，其他项目为1，则空间不足时，前者不缩小。
      box-shadow: 0 4px 10px 0 rgb(12 31 80 / 8%);
      background-color: #fff;
      cursor: pointer;
      border-radius: 8px;

      &:after {
        pointer-events: none;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        border-radius: 8px;
        border: 1px solid transparent;
        transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
      }

      &.error {
        &:after {
          border: 1px solid #f25643;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }
      }

      .title {
        position: relative;
        display: flex;
        width: 100%;
        color: #fff;
        height: 50px;
        line-height: 50px;
        border-radius: 8px 8px 0 0;
        padding: 0 14px;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        justify-content: space-between;
        background: linear-gradient(90.04deg, #268bfb -16.37%, #33e1ae 137.34%);
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          max-width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .icon-gmaster-delete-flow {
        position: relative;
        right: 0;
      }

      .content {
        position: relative;
        padding: 15px;
        font-size: 14px;
        color: #767e89;
        line-height: 22px;

        .audit-user-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .empty-container,
          .selected-list {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            flex-wrap: wrap;
          }
        }

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          padding: 10px 0;
        }
      }

      &.active:after,
      &:active:after,
      &:hover:after {
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
      }

      &.active .close,
      &:active .close,
      &:hover .close {
        display: block;
      }

      & .icon-seal-manage,
      & .icon-webhook,
      & .icon-timegate,
      & .icon-content-ink-pen-write {
        font-size: 22px;
        right: 16px;
        position: absolute;
      }
    }
  }

  .node-wrap.request-node-wrap {
    .content {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .node-wrap.request-node-wrap {
    .node-wrap-box {
      .title {
        background: linear-gradient(89.96deg, #ff6666 0.05%, #cc3399 79.83%);
      }
    }
  }

  .node-wrap.condition-node-wrap {
    .node-wrap-box {
      .title {
        background: linear-gradient(89.96deg, #864dd3 0.05%, #3381e1 79.83%);
      }

      .content {
        max-height: 108px;
        overflow: hidden;
      }
    }
  }

  .node-wrap.audit-node-wrap {
    .node-wrap-box {
      .title {
        background: linear-gradient(89.96deg, #fa6f32 0.05%, #fb9337 79.83%);
      }
    }
  }

  .node-wrap.timegate-node-wrap {
    .node-wrap-box {
      .title {
        background: linear-gradient(90.04deg, #2a933c -16.37%, #36d9a9 137.34%);
      }

      .field-name {
        color: #409eff;
      }
    }
  }

  .branch-box-wrap {
    .condition-node-box {
      .auto-judge {
        position: relative;
        display: inline-flex;
        flex-wrap: wrap;
        width: 270px;
        min-height: 100px;
        background: #fff;
        box-shadow: 0 4px 10px 0 rgb(12 31 80 / 8%);
        border-radius: 8px;
        cursor: pointer;

        .head-row {
          position: relative;
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 550;
        }

        .foot-row {
          width: 100%;
          height: 35px;
          margin: 0 16px;
          padding: 8px 0;
          border-top: 1px solid #e6eaf0;

          a {
            color: #f5bc21;
          }
        }
      }
    }
  }

  .node-wrap-box,
  .condition-node-box {
    &:hover {
      .node-operation-img {
        display: block;
      }
    }

    .node-operation-img {
      display: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: absolute;
      text-align: center;
      line-height: 24px;
      color: #eee;
      z-index: 1019;

      svg {
        font-size: 20px;
        color: rgb(40 40 40 / 40%);
      }
    }

    .node-operation-close {
      right: -6px;
      top: -6px;
      // color: #1a192b94;
    }

    .node-operation-copy {
      right: 30px;
      top: -6px;
      // color: #1a192b94;
    }
  }
}
</style>
