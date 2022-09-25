<template>
  <div
    v-if="enableSidebar"
    class="sub-sidebar-container"
    :class="{
      'is-collapse': settingsStore.mode === 'pc' && settingsStore.menu.subMenuCollapse
    }"
    @scroll="onSidebarScroll"
  >
    <Logo
      :show-logo="settingsStore.menu.menuMode === 'single'"
      :class="{
        'sidebar-logo': true,
        'sidebar-logo-bg': settingsStore.menu.menuMode === 'single',
        shadow: sidebarScrollTop
      }"
    />
    <!-- 侧边栏模式（无主导航）或侧边栏精简模式 -->
    <el-menu
      :unique-opened="settingsStore.menu.subMenuUniqueOpened"
      :default-openeds="menuStore.defaultOpenedPaths"
      :default-active="$route.meta.activeMenu || $route.path"
      :collapse="settingsStore.mode === 'pc' && settingsStore.menu.subMenuCollapse"
      :collapse-transition="false"
      :class="{
        'is-collapse-without-logo':
          settingsStore.menu.menuMode !== 'single' && settingsStore.menu.subMenuCollapse,
        'menu-radius': settingsStore.menu.menuStyle === 'radius'
      }"
    >
      <transition-group name="sub-sidebar">
        <template v-for="route in menuStore.sidebarMenus">
          <SidebarItem
            v-if="route.meta.sidebar !== false"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </template>
      </transition-group>
    </el-menu>
  </div>
</template>

<script setup name="LayoutSubSidebar">
  import Logo from '../Logo/index.vue'
  import SidebarItem from '../SidebarItem/index.vue'
  import { useMenuStore } from '@/store/modules/menu'
  import { useSettingsStore } from '@/store/modules/settings'

  const settingsStore = useSettingsStore()

  const menuStore = useMenuStore()

  const sidebarScrollTop = ref(0)
  function onSidebarScroll(e) {
    sidebarScrollTop.value = e.target.scrollTop
  }

  const enableSidebar = computed(() => {
    return (
      settingsStore.mode === 'mobile' ||
      (['side', 'head', 'single'].includes(settingsStore.menu.menuMode) &&
        menuStore.sidebarMenus.length !== 0 &&
        !(
          settingsStore.menu.subMenuOnylOneHide &&
          menuStore.sidebarMenus.length === 1 &&
          (!menuStore.sidebarMenus[0].children ||
            menuStore.sidebarMenus[0]?.children.every((item) => item.meta.sidebar === false))
        ))
    )
  })
</script>

<style lang="scss" scoped>
  // 次侧边栏动画
  .sub-sidebar-enter-active {
    transition: 0.3s;
  }

  .sub-sidebar-enter-from,
  .sub-sidebar-leave-active {
    opacity: 0;
    transform: translateY(30px) skewY(10deg);
  }

  .sub-sidebar-leave-active {
    position: absolute;
  }

  .sub-sidebar-container {
    @include themeify {
      background-color: themed('g-sub-sidebar-bg');
      box-shadow: 10px 0 10px -10px darken(themed('g-sub-sidebar-bg'), 20);
    }

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--g-sub-sidebar-width);
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    transition: 0.3s;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.is-collapse {
      width: 64px;

      .sidebar-logo {
        &:not(.sidebar-logo-bg) {
          display: none;
        }

        :deep(span) {
          display: none;
        }
      }
    }

    .sidebar-logo {
      @include themeify {
        background-color: themed('g-sub-sidebar-bg');
      }

      transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;

      &:not(.sidebar-logo-bg) {
        :deep(span) {
          @include themeify {
            color: themed('g-sub-sidebar-menu-color');
          }
        }
      }

      &.sidebar-logo-bg {
        @include themeify {
          background-color: themed('g-main-sidebar-bg');
        }
      }

      &.shadow {
        @include themeify {
          box-shadow: 0 10px 10px -10px darken(themed('g-sub-sidebar-bg'), 20);
        }
      }
    }

    .el-menu {
      @include themeify {
        background-color: themed('g-sub-sidebar-bg');
      }

      padding-top: $g-sidebar-logo-height;
      border-right: 0;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;

      &:not(.el-menu--collapse) {
        width: inherit;
      }

      &.is-collapse-without-logo {
        padding-top: 0;
      }

      &.el-menu--collapse {
        :deep(.icon) {
          margin-right: 0;
        }

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title) {
          span {
            display: none;

            &.park-icon {
              display: flex;
            }
          }

          .el-sub-menu__icon-arrow {
            right: 7px;
            margin-top: -5px;
          }
        }
      }

      &.menu-radius:not(.el-menu--collapse) {
        .sidebar-item {
          padding: 0 10px;

          &:first-child {
            padding-top: 10px;
          }

          &:last-child {
            padding-bottom: 10px;
          }
        }

        :deep(.el-menu--inline),
        :deep(.el-menu-item),
        :deep(.el-sub-menu__title) {
          border-radius: 10px;
        }
      }
    }
  }
</style>
