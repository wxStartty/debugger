<!--
 * @Description: LabelSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:04:02
 * @LastEditTime: 2022-05-18 20:07:52
 * @LastEditors: wsy
-->
<template>
  <el-divider>标签栏</el-divider>
  <div class="setting-item">
    <div class="label">是否启用</div>
    <el-switch v-model="settings.tabbar.enable" />
  </div>
  <div class="setting-item">
    <div class="label">标签栏风格</div>
    <el-radio-group
      v-model="settings.tabbar.style"
      size="small"
      :disabled="!settings.tabbar.enable"
    >
      <el-radio-button label="fashion">时尚</el-radio-button>
      <el-radio-button label="card">卡片</el-radio-button>
      <el-radio-button label="square">方块</el-radio-button>
    </el-radio-group>
  </div>
  <div class="setting-item">
    <div class="label">合并标签页</div>
    <el-switch v-model="settings.tabbar.mergeTabs" :disabled="!settings.tabbar.enable" />
  </div>
</template>

<script setup name="LabelSettings">
  const { settings } = inject('AppSetting')
</script>
