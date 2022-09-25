<!--
 * @Description: ToolBarSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:04:02
 * @LastEditTime: 2022-05-18 20:11:18
 * @LastEditors: wsy
-->
<template>
  <el-divider>工具栏</el-divider>
  <div v-if="settingsStore.mode === 'pc'" class="setting-item">
    <div class="label">折叠按钮</div>
    <el-switch
      v-model="settings.toolbar.enableSidebarCollapse"
      :disabled="['only-side', 'only-head'].includes(settings.menu.menuMode)"
    />
  </div>
  <div v-if="settingsStore.mode === 'pc'" class="setting-item">
    <div class="label">面包屑导航</div>
    <el-switch v-model="settings.toolbar.enableBreadcrumb" />
  </div>
  <div class="setting-item">
    <div class="label">
      导航栏搜索
      <el-tooltip content="对导航栏进行快捷搜索" placement="top" :append-to-body="false">
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.toolbar.enableNavSearch" />
  </div>
  <div class="setting-item">
    <div class="label">
      通知中心
      <el-tooltip
        content="该功能具体业务功能需自行开发，框架仅提供示例模版"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.toolbar.enableNotification" />
  </div>

  <div v-if="settingsStore.mode === 'pc'" class="setting-item">
    <div class="label">
      全屏
      <el-tooltip
        content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.toolbar.enableFullscreen" />
  </div>
  <div class="setting-item">
    <div class="label">
      页面刷新
      <el-tooltip
        content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.toolbar.enablePageReload" />
  </div>
</template>

<script setup name="ToolBarSettings">
  const { settings, settingsStore } = inject('AppSetting')
</script>
