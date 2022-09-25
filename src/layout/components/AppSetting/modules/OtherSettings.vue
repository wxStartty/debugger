<!--
 * @Description: OtherSettings
 * @Author: wsy
 * @Date: 2022-05-18 20:04:02
 * @LastEditTime: 2022-05-18 20:22:48
 * @LastEditors: wsy
-->
<template>
  <el-divider>其它</el-divider>
  <div class="setting-item">
    <div class="label">
      组件尺寸
      <el-tooltip
        content="全局设置 AntDesignUI 组件的默认尺寸大小"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-radio-group v-model="settings.app.componentSize" size="small">
      <el-radio-button label="large">较大</el-radio-button>
      <el-radio-button label="default">默认</el-radio-button>
      <el-radio-button label="small">稍小</el-radio-button>
    </el-radio-group>
  </div>
  <div class="setting-item">
    <div class="label">是否启用权限</div>
    <el-switch v-model="settings.app.enablePermission" />
  </div>
  <div class="setting-item">
    <div class="label">是否开启后端返回路由数据</div>
    <el-switch v-model="settings.app.enableBackendReturnRoute" />
  </div>
  <div class="setting-item">
    <div class="label">
      载入进度条
      <el-tooltip
        content="该功能开启时，跳转路由会看到页面顶部有进度条"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.app.enableProgress" />
  </div>
  <div class="setting-item">
    <div class="label">
      动态标题
      <el-tooltip
        content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-switch v-model="settings.app.enableDynamicTitle" />
  </div>
  <div class="setting-item">
    <div class="label">
      Storage 前缀
      <el-tooltip
        content="localStorage 和 sessionStorage 的字段前缀"
        placement="top"
        :append-to-body="false"
      >
        <svg-icon name="ri-question-line" />
      </el-tooltip>
    </div>
    <el-input v-model="settings.app.storagePrefix" size="small" style="width: 100px" />
  </div>
  <div class="setting-item">
    <div class="label">页面水印</div>
    <el-switch v-model="settings.app.enableWatermark" />
  </div>
</template>

<script setup name="OtherSettings">
  const { settings } = inject('AppSetting')
</script>
