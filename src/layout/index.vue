<template>
  <div class="layout">
    <div id="app-main" :class="{ 'main-page-maximize': settingsStore.mainPageMaximizeStatus }">
      <LayoutHeader />
      <div class="wrapper">
        <div
          class="sidebar-container"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse }"
        >
          <LayoutMainSidebar />
          <LayoutSubSidebar />
        </div>
        <LayoutSideBarMask />
        <div class="main-container" :style="{ 'padding-bottom': $route.meta.paddingBottom }">
          <!-- TODO 简单处理隐藏 -->
          <LayoutTopbar v-show="!settingsStore.mainPageMaximizeStatus" />
          <div class="main">
            <div
              v-show="settingsStore.mainPageMaximizeStatus"
              class="exit-main-page-maximize"
              @click="settingsStore.setMainPageMaximize()"
            >
              <svg-icon name="ri-logout-box-line" />
            </div>
            <router-view v-slot="{ Component, route }">
              <transition name="main" mode="out-in" appear>
                <!-- BUG https://github.com/vuejs/vue-next/issues/4984 -->
                <keep-alive :include="[...keepAliveStore.list]">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
          <Copyright v-if="showCopyright" />
        </div>
      </div>
    </div>
    <LayoutSearch />
    <AppSetting />
  </div>
</template>

<script setup name="Layout">
  import LayoutHeader from './components/LayoutHeader/index.vue'
  import LayoutMainSidebar from './components/LayoutMainSidebar/index.vue'
  import LayoutSubSidebar from './components/LayoutSubSidebar/index.vue'
  import LayoutTopbar from './components/LayoutTopbar/index.vue'
  import LayoutSearch from './components/LayoutSearch/index.vue'
  import LayoutSideBarMask from './components/LayoutSideBarMask/index.vue'
  import AppSetting from './components/AppSetting/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useKeepAliveStore } from '@/store/modules/keepAlive'
  import { useWatermark } from '@/util/useWatermark'
  import { useReload } from '@/hooks/useReload'
  const { proxy } = getCurrentInstance()
  const reload = useReload()
  const routeInfo = useRoute()

  const settingsStore = useSettingsStore()
  const keepAliveStore = useKeepAliveStore()
  useWatermark()
  /**
   * @description 是否显示版权信息
   * 优先级最高中的是路由meta.copyright
   */
  const showCopyright = computed(() => routeInfo?.meta?.copyright || settingsStore.copyright.enable)

  onMounted(() => {
    proxy.$hotkeys('f5', (e) => {
      if (settingsStore.toolbar.enablePageReload) {
        e.preventDefault()
        reload({ hotkeys: true })
      }
    })
  })
</script>

<style lang="scss" scoped>
  [data-app-width-mode='adaption'] {
    #app-main {
      width: 100%;
    }
  }

  [data-app-width-mode='adaption-min-width'] {
    #app-main {
      min-width: $g-app-width;
    }
  }

  [data-app-width-mode='center'] {
    #app-main {
      width: $g-app-width;
    }
  }

  [data-app-width-mode='center-max-width'] {
    #app-main {
      width: $g-app-width;
      max-width: 100%;
    }
  }

  [data-mode='mobile'] {
    #app-main {
      width: 100%;
      min-width: unset;
      max-width: unset;
    }

    .sidebar-container {
      transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

      &.show {
        transform: translateX(0);
      }
    }

    .main-container {
      margin-left: 0 !important;
    }

    &[data-menu-mode='single'] {
      .sidebar-container {
        transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

        &.show {
          transform: translateX(0);
        }
      }
    }
  }

  .layout {
    height: 100%;
  }

  #app-main {
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;

    // 当前标签页全屏
    &.main-page-maximize {
      header,
      .sidebar-container {
        display: none;
      }

      .wrapper {
        padding-top: 0;

        .main-container {
          margin-left: 0;

          .tabbar-container,
          .toolbar-container {
            display: none;
          }

          .main {
            margin: 0;
          }
        }
      }

      :deep([data-fixed-calc-width]) {
        width: 100%;
        transform: translateX(-50%);
      }
    }
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .sidebar-container {
      @include themeify {
        box-shadow: -1px 0 0 0 darken(themed('g-main-bg'), 10);
      }

      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 1010;
      display: flex;
      width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
      transition: transform 0.3s;
    }

    /* .sidebar-mask {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 50%);
      backdrop-filter: blur(2px);
      transition: all 0.2s;
      transform: translateZ(0);
      opacity: 0;
      visibility: hidden;

      &.show {
        opacity: 1;
        visibility: visible;
      }
    } */

    .main-sidebar-container + .sub-sidebar-container {
      left: var(--g-main-sidebar-width);
    }

    .main-container {
      @include themeify {
        background-color: themed('g-main-bg');
        box-shadow: -1px 0 0 0 darken(themed('g-main-bg'), 10),
          1px 0 0 0 darken(themed('g-main-bg'), 10);
      }

      display: flex;
      flex-direction: column;
      height: 100%;
      margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
      transition: margin-left 0.3s;

      .main {
        position: relative;
        flex: auto;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        transition: 0.3s;

        .exit-main-page-maximize {
          position: fixed;
          top: -40px;
          right: -40px;
          z-index: 1000;
          width: 80px;
          height: 80px;
          cursor: pointer;
          background-color: rgb(0 0 0 / 30%);
          border-radius: 50%;
          transition: 0.3s;

          i {
            position: absolute;
            bottom: 16px;
            left: 16px;
            transition: 0.3s;
          }

          &:hover {
            background-color: rgb(0 0 0 / 70%);

            i {
              color: #fff;
            }
          }
        }
      }

      .topbar-container.has-tabbar + .main {
        margin: $g-tabbar-height 0 0;
      }

      .topbar-container.has-toolbar + .main {
        margin: $g-toolbar-height 0 0;
      }

      .topbar-container.has-tabbar.has-toolbar + .main {
        margin: calc(#{$g-tabbar-height} + #{$g-toolbar-height}) 0 0;
      }
    }
  }

  header + .wrapper {
    padding-top: $g-header-height;

    .sidebar-container {
      top: $g-header-height;

      :deep(.sidebar-logo) {
        display: none;
      }

      :deep(.el-menu) {
        padding-top: 0;
      }
    }

    .main-container {
      .topbar-container {
        top: $g-header-height;

        :deep(.tools) {
          display: none;
        }
      }
    }
  }

  // 主内容区动画
  .main-enter-active {
    transition: 0.2s;
  }

  .main-leave-active {
    transition: 0.15s;
  }

  .main-enter-from {
    margin-left: -20px;
    opacity: 0;
  }

  .main-leave-to {
    margin-left: 20px;
    opacity: 0;
  }
</style>
