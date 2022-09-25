<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-19 17:53:17
 * @LastEditTime: 2022-05-20 15:31:09
 * @LastEditors: wsy
-->
<template>
  <div class="colors-picker">
    <div class="picker-label">{{ title }}</div>
    <div class="picker-color">
      <el-color-picker show-alpha v-model="value" :predefine="predefineColors" />
      <el-input size="small" v-model="value"
    /></div>
  </div>
</template>

<script setup name="IconColorPicker">
  import { useCssVar } from '@vueuse/core'
  const color = useCssVar('--icon-fill-color', document.body)
  const props = defineProps({
    title: String,
    modelValue: String,
    colorKey: String
  })
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      const isFill = !['outFillColor', 'innerStrokeColor', 'innerFillColor', 'twoTone'].includes(
        props.colorKey
      )
      if (isFill) {
        color.value = value
      }
      emit('update:modelValue', value)
    }
  })
  const predefineColors = ref([
    '#337ecc',
    '#409EFF',
    '#79bbff',
    '#a0cfff',
    '#c6e2ff',
    '#d9ecff',
    '#ecf5ff',
    '#529b2e',
    '#67C23A',
    '#95d475',
    '#b3e19d',
    '#d1edc4',
    '#e1f3d8',
    '#f0f9eb',
    '#b88230',
    '#E6A23C',
    '#eebe77',
    '#f3d19e',
    '#f8e3c5',
    '#faecd8',
    '#fdf6ec',
    '#c45656',
    '#F56C6C',
    '#f89898',
    '#fab6b6',
    '#fcd3d3',
    '#fcd3d3',
    '#fde2e2',
    '#fef0f0',
    '#333333',
    '#606266',
    '#73767a',
    '#909399',
    '#A8ABB2',
    '#b1b3b8',
    '#c8c9cc',
    '#CDD0D6',
    '#dedfe0',
    '#e9e9eb',
    '#f4f4f5'
  ])
</script>

<style lang="scss" scoped>
  .colors-picker {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding-right: 15px;
    flex: auto;

    .picker-label {
      font-size: 13px;
      color: #333;
      margin: 0 0 5px 3px;
    }

    .picker-color {
      display: flex;
    }

    :deep(.el-input) {
      margin-left: 15px;
      justify-content: space-between;
      flex: auto;
    }
  }
</style>
