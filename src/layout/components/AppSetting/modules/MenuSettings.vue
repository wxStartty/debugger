<!--
 * @Description: MenuSettings
 * @Author: wsy
 * @Date: 2022-05-18 16:13:03
 * @LastEditTime: 2022-05-18 19:36:15
 * @LastEditors: wsy
-->
<template>
  <el-divider>导航栏</el-divider>
  <div class="setting-item">
    <div class="label">是否折叠</div>
    <el-switch
      v-model="settings.menu.subMenuCollapse"
      :disabled="['only-side', 'only-head'].includes(settings.menu.menuMode)"
    />
  </div>
  <div class="setting-item">
    <div class="label">
      切换跳转
      <el-tooltip
        content="开启该功能后，切换侧边栏时，页面自动跳转至该侧边栏导航下第一个路由地址"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch
      v-model="settings.menu.switchMainMenuAndPageJump"
      :disabled="['single', 'only-side', 'only-head'].includes(settings.menu.menuMode)"
    />
  </div>
  <div class="setting-item">
    <div class="label">
      自动隐藏
      <el-tooltip
        content="开启该功能后，切换侧边栏时，如果次导航里只有一项时，则自动隐藏。搭配开启「切换跳转」可实现点击主导航跳转"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch
      v-model="settings.menu.subMenuOnylOneHide"
      :disabled="['single', 'only-side', 'only-head'].includes(settings.menu.menuMode)"
    />
  </div>
  <div class="setting-item">
    <div class="label">
      保持展开一个
      <el-tooltip
        content="开启该功能后，侧边栏只保持一个子菜单的展开"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch
      v-model="settings.menu.subMenuUniqueOpened"
      :disabled="['only-side', 'only-head'].includes(settings.menu.menuMode)"
    />
  </div>
</template>

<script setup name="MenuSettings">
  const { settings } = inject('AppSetting')
</script>
