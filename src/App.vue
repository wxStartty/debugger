<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-07 11:27:25
 * @LastEditTime: 2022-09-25 14:41:54
 * @LastEditors: wsy
-->
<template>
  <el-config-provider v-bind="elementUIProvider">
    <RouterView
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth
      }"
    />
    <!-- <ReloadPrompt /> -->
  </el-config-provider>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useLayoutOutsideStore } from '@/store/modules/layout'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  import {
    InitMode,
    InitTheme,
    InitMenuMode,
    InitWidthMode,
    SettingEffect,
    InitIconDefaultSettings
  } from '@/util/settingEffect'
  import { useWindowSizeEffect } from '@/hooks/useWindowSize'
  const a = 1
  debugger
  console.log('output->a', a)
  // 获取配置
  const settingsStore = useSettingsStore()
  // 获取主菜单、子菜单宽度
  const { mainSidebarActualWidth, subSidebarActualWidth } = storeToRefs(useLayoutOutsideStore())
  const { componentSize } = toRefs(settingsStore.app)
  const elementUIProvider = ref({
    button: {
      autoInsertSpace: true
    },
    size: componentSize,
    locale: zhCn
  })
  InitMode()
  InitTheme()
  InitMenuMode()
  InitWidthMode()
  InitIconDefaultSettings()
  SettingEffect()
  useWindowSizeEffect()
</script>
