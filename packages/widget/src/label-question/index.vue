<template>
  <el-tooltip placement="top-start" effect="dark" class="cloudbuild-tooltip">
    <template #content>
      <div class="tips">
        {{ props.tips }}
      </div>
    </template>
    <a href="javascript:;">
      <slot v-if="$slots.label" name="label" />
      <svg-icon v-else class="question-icon" name="help" />
    </a>
  </el-tooltip>
</template>

<script lang="ts" setup>
const props = defineProps({
  tips: String
})
</script>

<style>
/* 默认样式显示不全 */
.cloud-build .el-popper.is-config-tips {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: #dcdfe6;
}

.cloud-build .el-popper.is-config-tips .el-popper__arrow::before {
  background: #dcdfe6;
  right: 0;
}
</style>

<style lang="scss" scoped>
.question-icon {
  color: rgba(0, 0, 0, 0.33);
  transition: 0.25s;
  font-size: 16px;
  margin-bottom: 2px;
  margin-left: 3px;

  &:hover {
    color: rgba(0, 0, 0, 0.84);
  }
}

.tips {
  white-space: pre-line;
}
</style>
