<!--
 * @Description: Logo SFC
 * @Author: wsy
 * @Date: 2022-02-15 16:09:18
 * @LastEditTime: 2022-06-14 17:27:07
 * @LastEditors: wsy
-->
<template>
  <router-link
    :to="to"
    class="title"
    :class="{ 'is-link': settingsStore.dashboard.enable }"
    :title="title"
  >
    <svg-icon v-if="showLogo" class="logo" name="logo-white"></svg-icon>
    <span v-if="showTitle">{{ title }}</span>
  </router-link>
</template>

<script setup name="Logo">
  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()

  defineProps({
    showLogo: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  })

  const title = ref(import.meta.env.VITE_APP_TITLE)

  const to = computed(() => {
    let rtn = {}
    if (settingsStore.dashboard.enable) {
      rtn.name = 'dashboard'
    }
    return rtn
  })
</script>

<style lang="scss" scoped>
  .title {
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: $g-sidebar-logo-height;
    padding: 0 10px;
    overflow: hidden;
    text-align: center;
    text-decoration: none;

    &.is-link {
      cursor: pointer;
    }

    .logo {
      width: 30px;
      height: 30px;

      & + span {
        margin-left: 10px;
      }
    }

    span {
      @include text-overflow;

      display: block;
      font-weight: bold;
      color: #fff;
    }
  }
</style>
