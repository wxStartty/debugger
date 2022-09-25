<template>
  <transition name="header">
    <header v-if="visible">
      <div class="header-container">
        <div class="main">
          <Logo />
          <component :is="currentHeadMenuComponent" />
        </div>
        <Tools />
      </div>
    </header>
  </transition>
</template>

<script setup name="LayoutHeader">
  import Logo from 'layout/components/Logo/index.vue'
  import Tools from 'layout/components/Tools/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()

  // 组件可见性
  const visible = computed(
    () => settingsStore.mode === 'pc' && ['head', 'only-head'].includes(settingsStore.menu.menuMode)
  )

  // 当前菜单组件组
  const headers = {
    head: defineAsyncComponent(() => import('./modules/head.vue')),
    'only-head': defineAsyncComponent(() => import('./modules/onlyHead.vue')),
    'head-simple': '',
    'only-head-simple': ''
  }

  // 获取当前菜单组件
  const currentHeadMenuComponent = computed(() => {
    return headers[settingsStore.menu.menuMode]
  })
</script>

<style lang="scss" scoped>
  // 头部动画
  .header-enter-active {
    transition: 0.2s;
  }

  .header-enter-from {
    transform: translateY(-#{$g-header-height});
  }

  header {
    @include themeify {
      color: themed('g-header-color');
      background-color: themed('g-header-bg');
    }

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    height: $g-header-height;
    padding: 0 20px;
    @media screen and (max-width: $g-header-width) {
      .header-container {
        width: 100%;
      }
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: $g-header-width;
      height: 100%;
      margin: 0 auto;

      .main {
        display: flex;
        flex: auto;
        align-items: center;
        height: 100%;
      }
    }

    :deep(.title) {
      position: relative;
      flex: none;
      width: inherit;
      height: inherit;
      padding: inherit;
      background-color: inherit;

      .logo {
        width: 30px;
        height: 30px;
      }

      .title-font {
        width: 143px;
        height: 100%;
        margin-left: 10px;
      }

      span {
        @include themeify {
          color: themed('g-header-color');
        }

        font-size: 21px;
        letter-spacing: 1px;
      }
    }

    :deep(.nav) {
      flex: auto;
    }

    :deep(.tools) {
      flex: none;
      padding: 0;

      .buttons [class^='ri-'] {
        @include themeify {
          color: themed('g-header-color');
        }
      }

      .user-container {
        @include themeify {
          color: themed('g-header-color');
        }

        font-size: 16px;
      }
    }
  }
</style>
