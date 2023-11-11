<template>
  <div class="btn-wrapper">
    <svg-icon name="fill" />
    <el-popover placement="bottom" trigger="click" popper-class="btn-background-popper">
      <template #reference>
        <div class="background-wrapper" style="text-align: left">
          <span
            :style="{
              background: modelValue
            }"
            class="btn-background" />
        </div>
      </template>
      <div class="current-info">
        <el-row :gutter="6">
          <el-col :span="6">
            <span
              :style="{
                background: modelValue
              }"
              class="has-tooltip" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="colorStr" maxlength="7">
              {{ modelValue }}
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="colors-container">
        <div v-for="(item, index) in colors" :key="index" class="color-predefine__colors">
          <div class="color-predefine__color-selector">
            <div :style="{ backgroundColor: item }" @click="updateValue(item)" />
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { COLORS } from './utils'
const props = defineProps({
  modelValue: {
    type: String,
    default: () => 'red'
  }
})
const emit = defineEmits(['update:modelValue'])
const colors = ref(COLORS)
const colorStr = ref('')
onMounted(() => {
  colorStr.value = props.modelValue
})
const updateValue = (val: any) => {
  colorStr.value = val
  emit('update:modelValue', val)
}
</script>
<style lang="scss">
.btn-background-popper {
  width: 272px !important;
  border-radius: 10px !important;

  .title {
    position: relative;
  }

  .el-input {
    width: 100px;
    align-items: center;

    .el-input__inner {
      border-radius: 15px;
      line-height: 30px;
      height: 30px;
      border-radius: 4px;
    }
  }

  .current-info {
    position: relative;

    .el-row {
      width: 100%;
      align-items: center;
    }

    .el-col-6 {
      margin-top: 5px;
      max-width: 16%;
      flex: 0 0 16%;
    }

    .has-tooltip {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      margin-top: 1px;
      cursor: pointer;
      display: inline-block;
    }
  }

  .colors-container {
    display: flex;
    font-size: 12px;
    margin-top: 8px;
    width: 246px;
    flex-wrap: wrap;

    & .color-predefine__colors:first-child {
      .color-predefine__color-selector {
        & > div {
          border-radius: 6px 0 0 0;
        }
      }
    }

    & .color-predefine__colors:nth-child(7) {
      .color-predefine__color-selector {
        & > div {
          border-radius: 0 6px 0 0;
        }
      }
    }

    & .color-predefine__colors:nth-child(15) {
      .color-predefine__color-selector {
        & > div {
          border-radius: 0 0 0 6px;
        }
      }
    }

    & .color-predefine__colors:nth-child(21) {
      .color-predefine__color-selector {
        & > div {
          border-radius: 0 0 6px 0;
        }
      }
    }

    .color-predefine__colors {
      display: flex;
      flex-wrap: wrap;

      .color-predefine__color-selector {
        margin: 0;
        width: 35px;
        height: 30px;
        border-radius: 4px;
        cursor: pointer;

        & > div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .svg-icon {
    margin-right: 16px;
  }

  .background-wrapper {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 80px;
    height: 25px;
    padding: 5px;
    line-height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      width: 70px;
      height: 15px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>
