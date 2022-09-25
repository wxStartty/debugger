<!--
 * @Description: TopToolsBarSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:04:02
 * @LastEditTime: 2022-05-18 20:07:13
 * @LastEditors: wsy
-->
<template>
  <el-divider>顶栏</el-divider>
  <div class="setting-item">
    <div class="label">
      是否固定
      <el-tooltip content="包含标签栏和工具栏" placement="top" :append-to-body="false">
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.topbar.fixed" />
  </div>
  <div class="setting-item">
    <div class="label">
      展示切换
      <el-tooltip content="切换标签栏和工具栏的展示顺序" placement="top" :append-to-body="false">
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch
      v-model="settings.topbar.switchTabbarAndToolbar"
      :disabled="!settings.tabbar.enable"
    />
  </div>
</template>

<script setup name="TopToolsBarSettings">
  const { settings } = inject('AppSetting')
</script>
