<!--
 * @Description: DashboardSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:16:30
 * @LastEditTime: 2022-05-18 20:16:34
 * @LastEditors: wsy
-->
<template>
  <el-divider>控制台</el-divider>
  <div class="setting-item">
    <div class="label">
      是否开启
      <el-tooltip
        content="该功能开启时，登录成功默认进入控制台页面，反之则默认进入导航栏里第一个导航页面"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.dashboard.enable" />
  </div>
  <div class="setting-item">
    <div class="label">
      控制台名称
      <svg-icon name="ri-question-line" />
    </div>
    <el-input v-model="settings.dashboard.title" size="small" />
  </div>
</template>

<script setup name="DashboardSettings">
  const { settings } = inject('AppSetting')
</script>
