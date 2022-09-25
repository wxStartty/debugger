<!--
 * @Description: 侧栏模式
 * @Author: wsy
 * @Date: 2022-02-23 15:40:00
 * @LastEditTime: 2022-08-22 18:48:55
 * @LastEditors: wsy
-->
<template>
  <div
    class="nav"
    :class="{
      'nav-radius': settingsStore.menu.menuStyle === 'radius',
      'nav-arrow': settingsStore.menu.menuStyle === 'arrow'
    }"
  >
    <template v-for="(item, index) in menuStore.allMenus">
      <div
        v-if="item.children && item.children.length !== 0"
        :key="index"
        :class="{
          item: true,
          active: index === menuStore.actived
        }"
        :title="item.meta.title"
        @click="switchMenuHandler(index)"
      >
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </div>
      <div
        v-else-if="item.path"
        :key="item.path"
        :class="{
          item: true,
          active: index === menuStore.actived
        }"
        :title="item.meta.title"
        @click="switchPage(item)"
      >
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import { useMenuStore } from '@/store/modules/menu'
  import { useSwitchMenu } from '@/hooks/useSwitchMenu'
  import { ElMessage } from 'element-plus'
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()
  const switchMenu = useSwitchMenu()
  const switchMenuHandler = (index) => {
    const none = menuStore.allMenus[index]?.meta.none
    if (none) {
      ElMessage({
        message: '暂未上线，敬请期待',
        type: 'warning'
      })
      return
    }
    switchMenu(index)
  }
  const switchPage = (router) => {
    const { path } = router
    window.open(path)
  }
</script>

<style lang="scss" scoped>
  .nav {
    width: inherit;
    padding-top: $g-sidebar-logo-height;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60px;
      padding: 0 5px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;

      .park-icon {
        color: unset;
      }

      &:hover {
        @include themeify {
          color: themed('g-main-sidebar-menu-hover-color');
          background-color: themed('g-main-sidebar-menu-hover-bg');
        }
      }

      &.active {
        @include themeify {
          color: themed('g-main-sidebar-menu-active-color');
          background-color: themed('g-main-sidebar-menu-active-bg');
        }
      }

      .svg-icon {
        margin: 0 auto;
        font-size: 24px;
      }

      span {
        @include text-overflow(1, false);

        font-size: 14px;
        text-align: center;
      }
    }

    &.nav-radius {
      .item {
        margin: 0 5px 5px;
        border-radius: 5px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &.nav-arrow {
      .item {
        position: relative;

        &.active::before {
          @include themeify {
            border-right: 7px solid themed('g-sub-sidebar-bg');
          }

          position: absolute;
          top: 50%;
          right: 0;
          width: 0;
          height: 0;
          margin-top: -7px;
          content: '';
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
        }
      }
    }
  }
</style>
