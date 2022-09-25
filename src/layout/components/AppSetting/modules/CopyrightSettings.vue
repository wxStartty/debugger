<!--
 * @Description: CopyrightSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:04:02
 * @LastEditTime: 2022-05-18 20:14:08
 * @LastEditors: wsy
-->
<template>
  <el-divider>底部版权</el-divider>
  <div class="setting-item">
    <div class="label">是否启用</div>
    <el-switch v-model="settings.copyright.enable" />
  </div>
  <div class="setting-item">
    <div class="label">日期</div>
    <el-input
      v-model="settings.copyright.dates"
      size="small"
      :disabled="!settings.copyright.enable"
    />
  </div>
  <div class="setting-item">
    <div class="label">公司</div>
    <el-input
      v-model="settings.copyright.company"
      size="small"
      :disabled="!settings.copyright.enable"
    />
  </div>
  <div class="setting-item">
    <div class="label">网址</div>
    <el-input
      v-model="settings.copyright.website"
      size="small"
      :disabled="!settings.copyright.enable"
    />
  </div>
</template>

<script setup name="CopyrightSettings">
  const { settings } = inject('AppSetting')
</script>
