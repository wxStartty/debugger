<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 16:09:18
 * @LastEditTime: 2022-05-18 17:01:58
 * @LastEditors: wsy
-->
<template>
  <transition name="main-sidebar">
    <div v-if="visible" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <component :is="currentSliderMenuComponent" />
    </div>
  </transition>
</template>

<script setup name="LayoutMainSidebar">
  import Logo from '../Logo/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()

  // 组件是否显示
  const visible = computed(
    () =>
      ['side', 'only-side'].includes(settingsStore.menu.menuMode) ||
      (settingsStore.mode === 'mobile' && settingsStore.menu.menuMode !== 'single')
  )

  // 当前菜单组件组
  const sliderMenuComponent = {
    side: defineAsyncComponent(() => import('./modules/side.vue')),
    sideMenu: defineAsyncComponent(() => import('./modules/sideMenu.vue'))
  }

  /**
   * @description 获取当前菜单组件
   * @author wsy
   * @date 2022-05-07  14:35:44
   * @param {Object} ( your introduction
   */
  const currentSliderMenuComponent = computed(() => {
    let current = ''
    if (
      settingsStore.menu.menuMode === 'side' ||
      (settingsStore.mode === 'mobile' && settingsStore.menu.menuMode !== 'single')
    ) {
      current = 'side'
    }
    if (settingsStore.menu.menuMode === 'only-side') {
      current = 'sideMenu'
    }
    return sliderMenuComponent[current]
  })
</script>

<style lang="scss" scoped>
  // 主侧边栏动画
  .main-sidebar-enter-active {
    transition: 0.3s;
  }

  .main-sidebar-enter-from {
    transform: translateX(calc(var(--g-main-sidebar-width) * -1));
  }

  .main-sidebar-container {
    @include themeify {
      color: themed('g-main-sidebar-menu-color');
      background-color: themed('g-main-sidebar-bg');
    }
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;

    position: relative;
    z-index: 1;
    width: var(--g-main-sidebar-width);
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .sidebar-logo {
      @include themeify {
        background-color: themed('g-main-sidebar-bg');
      }
      transition: 0.3s;
    }
  }
</style>
