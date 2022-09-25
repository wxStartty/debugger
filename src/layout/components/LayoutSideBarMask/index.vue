<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-16 08:43:53
 * @LastEditTime: 2022-05-18 17:01:37
 * @LastEditors: wsy
-->
<template>
  <div
    class="sidebar-mask"
    :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse }"
    @click="settingsStore.toggleSidebarCollapse()"
  >
    <slot />
  </div>
</template>

<script setup name="LayoutSideBarMask">
  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
  .sidebar-mask {
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
  }
</style>
