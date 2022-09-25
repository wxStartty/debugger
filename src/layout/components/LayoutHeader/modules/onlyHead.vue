<!--
 * @Description:顶部精简模式
 * @Author: wsy
 * @Date: 2022-02-18 15:58:05
 * @LastEditTime: 2022-06-22 21:16:30
 * @LastEditors: wsy
-->
<template>
  <el-menu
    mode="horizontal"
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

<script setup name="OnlyHeadLayoutComponent">
  import SidebarItem from 'layout/components/SidebarItem/index.vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useMenuStore } from '@/store/modules/menu'
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()
</script>

<style lang="scss" scoped>
  .el-menu-nav {
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    margin-left: 50px;
    background-color: inherit;
    border-bottom: none;

    .sidebar-item,
    :deep(.el-sub-menu),
    :deep(.el-sub-menu__title) {
      display: flex;
      align-items: center;
      height: 100%;
    }

    :deep(.el-sub-menu.is-active) {
      .el-sub-menu__title {
        @include themeify {
          color: themed('g-header-menu-active-color') !important;
          background-color: themed('g-header-menu-active-bg') !important;
        }
      }
    }

    :deep(.el-sub-menu__title) {
      @include themeify {
        color: themed('g-header-menu-color') !important;
      }

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      padding: 0 10px;
      font-size: 14px;
      line-height: initial;
      transition: all 0.3s;

      &:hover {
        @include themeify {
          color: themed('g-header-menu-hover-color') !important;
          background-color: themed('g-header-menu-hover-bg') !important;
        }

        .svg-icon {
          transform: scale(1);
        }
      }

      .svg-icon {
        font-size: 24px;
        vertical-align: middle;
      }

      .title {
        @include text-overflow(1, false);

        flex: initial;
        height: initial;
        margin-left: initial;
        font-size: 16px;
        line-height: initial;
        text-align: center;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }

    &.el-menu-nav-radius {
      .sidebar-item {
        :deep(.el-sub-menu__title) {
          height: calc(100% - 10px);
          margin: 5px 5px 5px 0;
          border-radius: 5px;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &.el-menu-nav-arrow {
      .sidebar-item {
        :deep(.is-active) {
          .el-sub-menu__title {
            &::before {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 0;
              height: 0;
              margin-left: -7px;
              content: '';
              border-right: 7px solid transparent;
              border-bottom: 7px solid #fff;
              border-left: 7px solid transparent;
            }
          }
        }
      }
    }
  }
</style>
