<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 16:09:18
 * @LastEditTime: 2022-05-18 17:00:58
 * @LastEditors: wsy
-->
<template>
  <div
    class="topbar-container"
    :class="{
      'has-tabbar': tabbarAndToolbarOrder.includes('tabbar'),
      'has-toolbar': tabbarAndToolbarOrder.includes('toolbar'),
      fixed: settingsStore.topbar.fixed,
      shadow: !settingsStore.topbar.switchTabbarAndToolbar && scrollTop
    }"
    data-fixed-calc-width
  >
    <component
      :is="tabbarAndToolbarComponent(item)"
      v-for="item in tabbarAndToolbarOrder"
      :key="item"
    />
  </div>
</template>

<script setup name="LayoutTopBar">
  import Tabbar from './Tabbar/index.vue'
  import Toolbar from './Toolbar/index.vue'

  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()

  const tabbarAndToolbarOrder = computed(() => {
    let order = []
    if (settingsStore.tabbar.enable) {
      order.push('tabbar')
    }
    if (
      !(
        (settingsStore.menu.menuMode === 'head' &&
          !settingsStore.toolbar.enableSidebarCollapse &&
          !settingsStore.toolbar.enableBreadcrumb) ||
        (settingsStore.menu.menuMode === 'only-head' && !settingsStore.toolbar.enableBreadcrumb)
      )
    ) {
      order.push('toolbar')
    }
    if (settingsStore.topbar.switchTabbarAndToolbar) {
      order.reverse()
    }
    return order
  })

  const tabbarAndToolbarComponent = (name) => {
    const components = {
      tabbar: Tabbar,
      toolbar: Toolbar
    }
    return components[name]
  }

  const scrollTop = ref(0)
  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
  const onScroll = () => {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
  }
</script>

<style lang="scss" scoped>
  .topbar-container {
    position: absolute;
    z-index: 999;
    top: 0;
    transition: 0.3s, box-shadow 0.2s;

    &.fixed {
      position: fixed;

      &.shadow {
        box-shadow: 0 10px 10px -10px #ccc;
      }
    }
  }
</style>
