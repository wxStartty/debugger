<template>
  <div>
    <el-drawer
      v-model="isShow"
      title="应用配置"
      direction="rtl"
      :size="350"
      custom-class="flex-container"
    >
      <div class="container">
        <el-alert
          v-if="isDEV"
          title="应用配置可实时预览效果，但仅是临时生效，要想真正作用于项目，可以点击下方的“复制配置”按钮，将配置粘贴到 src/settings.custom.json 中即可，或者也可在 src/settings.js 中直接修改默认配置。同时建议在生产环境隐藏应用配置功能。"
          type="error"
          :closable="false"
        />
        <!-- 主题风格 -->
        <ThemeSettings />
        <!-- 导航栏模式 -->
        <ModeSettings />
        <!-- 页面宽模式 -->
        <WidthModeSettings />
        <!-- 图标设置 -->
        <IconDefaultSettings />
        <!-- 导航栏风格 -->
        <MenuStyleSettings />
        <!-- 导航栏 -->
        <MenuSettings />
        <!-- 顶栏 -->
        <TopToolsBarSettings />
        <!-- 标签栏 -->
        <LabelSettings />
        <!-- 工具栏 -->
        <ToolBarSettings v-if="isDEV" />
        <!-- 底部版权 -->
        <CopyrightSettings v-if="isDEV" />
        <!-- 控制台 -->
        <DashboardSettings v-if="isDEV" />
        <!-- 其他 -->
        <OtherSettings v-if="isDEV" />
      </div>
      <div v-if="isSupported && isDEV" class="action-buttons">
        <el-button icon="el-icon-document-copy" type="primary" @click="handleCopy"
          >复制配置</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script setup name="AppSetting">
  import ModeSettings from './modules/ModeSettings.vue'
  import MenuStyleSettings from './modules/MenuStyleSettings.vue'
  import WidthModeSettings from './modules/WidthModeSettings.vue'
  import ThemeSettings from './modules/ThemeSettings.vue'
  import MenuSettings from './modules/MenuSettings.vue'
  import TopToolsBarSettings from './modules/TopToolsBarSettings.vue'
  import LabelSettings from './modules/LabelSettings.vue'
  import ToolBarSettings from './modules/ToolBarSettings.vue'
  import CopyrightSettings from './modules/CopyrightSettings.vue'
  import DashboardSettings from './modules/DashboardSettings.vue'
  import OtherSettings from './modules/OtherSettings.vue'
  import IconDefaultSettings from './modules/IconDefaultSettings.vue'
  import { useClipboard } from '@vueuse/core'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useMenuStore } from '@/store/modules/menu'
  import globalSettings from '@/settings/settings'
  import { ElMessage } from 'element-plus'
  const { proxy } = getCurrentInstance()
  const route = useRoute()
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()
  const settings = ref(globalSettings)
  provide('AppSetting', { settings, settingsStore, menuStore })
  const isShow = ref(false)
  const isDEV = __DEV__
  watch(
    () => settings,
    () => {
      if (settings.value.menu.menuMode === 'single' && settings.value.menu.menuStyle === 'arrow') {
        settings.value.menu.menuStyle = 'card'
      }
      settingsStore.updateSettings(settings.value)
      menuStore.setActived(0)
      settings.value.menu.menuMode !== 'single' && menuStore.setActived(route.fullPath)
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    proxy.$eventBus.on('global-app-setting-toggle', () => {
      isShow.value = !isShow.value
    })
  })

  const { copy, copied, isSupported } = useClipboard()

  watch(
    copied,
    (val) => val && ElMessage.success('复制成功，请粘贴到 src/settings.custom.json 文件中！')
  )

  function handleCopy() {
    copy(JSON.stringify(settings.value, null, 4))
  }
</script>

<style lang="scss" scoped>
  :deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0;
  }

  :deep(.el-drawer__header) {
    margin-bottom: initial;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  .flex-container {
    .container {
      padding: 15px;
      overflow: auto;
      flex: 1;
    }

    .action-buttons {
      padding: 15px;
      text-align: center;
      background-color: #fff;
      border-top: 1px solid #ddd;

      .el-button {
        width: 100%;
      }
    }
  }

  :deep(.el-divider) {
    margin: 36px 0 24px;
  }

  :deep(.setting-item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;

    &:hover {
      background: #f1f1f1;
    }

    .label {
      font-size: 14px;
      color: #666;
      display: flex;
      align-items: center;

      i {
        margin-left: 4px;
        font-size: 17px;
        color: #e6a23c;
        cursor: help;
      }
    }

    .el-switch {
      height: auto;
    }

    .el-input {
      width: 150px;
    }
  }
</style>
