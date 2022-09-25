<!--
 * @Description: 侧栏精简模式
 * @Author: wsy
 * @Date: 2022-02-23 15:40:16
 * @LastEditTime: 2022-02-25 21:33:24
 * @LastEditors: wsy
-->
<template>
  <el-menu
    collapse
    :default-active="$route.meta.activeMenu || $route.path"
    class="el-menu-nav"
    :class="{
      'el-menu-nav-radius': settingsStore.menu.menuStyle === 'radius',
      'el-menu-nav-arrow': settingsStore.menu.menuStyle === 'arrow'
    }"
  >
    <template v-for="(route, index) in menuStore.allMenus">
      <SidebarItem v-if="route.meta.sidebar !== false" :key="index" :item="route" />
    </template>
  </el-menu>
</template>

<script setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import { useMenuStore } from '@/store/modules/menu'
  import SidebarItem from '@/layout/components/SidebarItem/index.vue'
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()
</script>

<style lang="scss" scoped>
  .el-menu-nav {
    padding-top: $g-sidebar-logo-height;
    border-right: none;
    background-color: inherit;
    width: initial;

    :deep(.el-sub-menu.is-active) {
      .el-sub-menu__title {
        @include themeify {
          color: themed('g-main-sidebar-menu-active-color') !important;
          background-color: themed('g-main-sidebar-menu-active-bg') !important;
        }
      }
    }

    :deep(.el-sub-menu__title) {
      @include themeify {
        color: themed('g-main-sidebar-menu-color') !important;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      height: 60px;
      line-height: initial;
      transition: all 0.3s;

      &:hover {
        @include themeify {
          color: themed('g-main-sidebar-menu-hover-color') !important;
          background-color: themed('g-main-sidebar-menu-hover-bg') !important;
        }

        .svg-icon {
          transform: scale(1);
        }
      }

      .svg-icon {
        font-size: 24px;
        vertical-align: middle;
        color: inherit;
      }

      .title {
        @include text-overflow(1, false);
        flex: initial;
        margin-left: initial;
        height: initial;
        line-height: initial;
        text-align: center;
        font-size: 14px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }

    &.el-menu-nav-radius {
      .sidebar-item {
        :deep(.el-sub-menu__title) {
          border-radius: 5px;
          margin: 0 5px 5px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &.el-menu-nav-arrow {
      .sidebar-item {
        :deep(.is-active) {
          .el-sub-menu__title {
            &::before {
              content: '';
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -7px;
              width: 0;
              height: 0;
              border-top: 7px solid transparent;
              border-bottom: 7px solid transparent;
              border-right: 7px solid #fff;
            }
          }
        }
      }
    }
  }
</style>
