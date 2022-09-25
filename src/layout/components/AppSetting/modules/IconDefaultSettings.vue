<!--
 * @Description: IconDefaultSettings
 * @Author: wsy
 * @Date: 2022-05-18 21:06:43
 * @LastEditTime: 2022-05-20 15:36:24
 * @LastEditors: wsy
-->
<template>
  <el-divider>图标设置</el-divider>
  <el-alert :title="titleAlert" type="info" :closable="false" />
  <div class="icon-setting-item">
    <div class="label">图标大小</div>
    <el-slider size="default" v-model="settings.iconStyle.size" :max="48" :min="12" show-input />
  </div>
  <div class="icon-setting-item">
    <div class="label">线段粗细</div>
    <el-slider
      show-stops
      size="default"
      v-model="settings.iconStyle.strokeWidth"
      :max="4"
      :min="1"
      show-input
    />
  </div>
  <!-- 选择图标风格 -->
  <div class="icon-setting-item">
    <div class="label">图标风格(颜色)</div>
    <div class="icon-style">
      <div
        class="icon-style-item"
        v-for="item in Object.keys(settings.iconStyle.colors)"
        :class="{ active: settings.iconStyle.theme === kebabCase(item) }"
        :key="item"
        @click="settings.iconStyle.theme = kebabCase(item)"
        >{{ colorsText[item] }}
        <svg-icon
          class="checkout-icon"
          v-show="settings.iconStyle.theme === kebabCase(item)"
          name="ri-checkbox-circle-fill"
      /></div>
    </div>
  </div>
  <!-- 风格对应的选择项 -->
  <div class="icon-setting-item">
    <IconColorSettings :theme="settings.iconStyle.theme" />
  </div>
  <!-- 端点类型 -->
  <div class="icon-setting-item">
    <div class="label">端点类型</div>
    <div class="icon-style">
      <div
        class="icon-style-item"
        v-for="item in StrokeLinecap"
        :class="{ active: settings.iconStyle.strokeLinecap === item.type }"
        :key="item"
        @click="settings.iconStyle.strokeLinecap = item.type"
        ><Component
          :is="item.icon"
          size="16"
          theme="outline"
          fill="#333"
          :strokeWidth="5"
          strokeLinecap="butt"
        />
      </div>
    </div>
  </div>
  <!-- 拐点类型 -->
  <div class="icon-setting-item">
    <div class="label">拐点类型</div>
    <div class="icon-style">
      <div
        class="icon-style-item"
        v-for="item in StrokeLinejoin"
        :class="{ active: settings.iconStyle.strokeLinejoin === item.type }"
        :key="item"
        @click="settings.iconStyle.strokeLinejoin = item.type"
        ><Component
          :is="item.icon"
          theme="outline"
          fill="#333"
          size="16"
          :strokeWidth="5"
          strokeLinecap="butt"
      /></div>
    </div>
  </div>
</template>

<script setup name="IconDefaultSettings">
  import { kebabCase } from 'lodash-es'
  import IconColorSettings from './IconColorSettings.vue'
  const { settings } = inject('AppSetting')
  const colorsText = {
    outline: '线性',
    filled: '填充',
    twoTone: '双色',
    multiColor: '多色'
  }
  const StrokeLinecap = [
    { type: 'butt', icon: 'icon-endpoint-flat' },
    { type: 'round', icon: 'icon-endpoint-round' },
    { type: 'square', icon: 'icon-endpoint-square' }
  ]
  const StrokeLinejoin = [
    { type: 'miter', icon: 'icon-node-flat' },
    { type: 'round', icon: 'icon-node-round' },
    { type: 'bevel', icon: 'icon-node-square' }
  ]
  const titleAlert = 'Icon 组件的线性、填充的颜色不对侧栏和顶部工具栏生效,仅对主视图icon生效。'
</script>

<style lang="scss" scoped>
  .icon-setting-item {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;

    .label {
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;
      padding-bottom: 10px;

      i {
        margin-left: 4px;
        font-size: 17px;
        color: #e6a23c;
        cursor: help;
      }
    }

    .icon-style {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;

      .icon-style-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 65px;
        height: 32px;
        background-color: #ebeef1;
        margin-bottom: 8px;
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        transition: all 0.3s;

        .park-icon {
          display: flex;
        }

        &.active {
          color: #409eff;
          box-shadow: 0 0 0 2px #409eff;
          background-color: rgba(64, 158, 255, 0.1);

          .park-icon {
            display: flex;
            color: #409eff;
          }

          .checkout-icon {
            margin-left: 5px;
            color: #409eff;
          }
        }
      }
    }
  }
</style>
