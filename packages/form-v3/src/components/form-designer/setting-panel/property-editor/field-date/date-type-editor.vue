<template>
  <el-form-item :label="i18nt('designer.setting.displayType')">
    <el-select v-model="optionModel.type">
      <el-option label="datetime" value="datetime" />
      <el-option label="date" value="date" />
      <el-option label="dates" value="dates" />
      <el-option label="year" value="year" />
      <el-option label="month" value="month" />
      <el-option label="week" value="week" />
    </el-select>
  </el-form-item>
</template>

<script>
import i18n from '@/utils/i18n'

export default {
  name: 'date-type-editor',
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
}
</script>

<style scoped></style>
