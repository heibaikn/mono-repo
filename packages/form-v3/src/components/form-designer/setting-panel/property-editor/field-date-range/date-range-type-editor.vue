<template>
  <el-form-item :label="i18nt('designer.setting.displayType')">
    <el-select v-model="optionModel.type">
      <el-option label="daterange" value="daterange" />
      <el-option label="datetimerange" value="datetimerange" />
      <el-option label="monthrange" value="monthrange" />
    </el-select>
  </el-form-item>
</template>

<script>
import i18n from '@/utils/i18n'

export default {
  name: 'date-range-type-editor',
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
}
</script>

<style lang="scss" scoped></style>
