<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-19 17:44:31
 * @LastEditTime: 2022-05-20 15:23:25
 * @LastEditors: wsy
-->
<template>
  <div class="icon-picker">
    <IconColorPicker
      v-for="(item, index) in themeController"
      :key="index"
      :title="item.label"
      :colorKey="item.value"
      v-model="settings.iconStyle.colors[camelCase(theme)][item.value]"
    />
  </div>
</template>

<script setup name="IconColorSettings">
  import { camelCase } from 'lodash-es'
  import IconColorPicker from './IconColorPicker.vue'
  const { settings } = inject('AppSetting')
  const props = defineProps({
    theme: {
      type: String,
      validator(value) {
        return ['outline', 'filled', 'two-tone', 'multi-color'].includes(value)
      }
    }
  })
  const themeController = computed(() => {
    const map = {
      outline: [{ label: '描边颜色', value: 'fill' }],
      filled: [{ label: '填充颜色', value: 'fill' }],
      twoTone: [
        { label: '描边颜色', value: 'fill' },
        { label: '填充颜色', value: 'twoTone' }
      ],
      multiColor: [
        { label: '外部描边颜色', value: 'outStrokeColor' },
        { label: '外部填充颜色', value: 'outFillColor' },
        { label: '内部描边颜色', value: 'innerStrokeColor' },
        { label: '内部填充颜色', value: 'innerFillColor' }
      ]
    }
    return map[camelCase(props.theme)]
  })
</script>

<style lang="scss" scoped>
  .icon-picker {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
