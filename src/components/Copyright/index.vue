<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-15 16:09:18
 * @LastEditTime: 2022-05-18 17:03:31
 * @LastEditors: wsy
-->
<template>
  <footer class="copyright">
    Copyright © {{ settingsStore.copyright.dates }}
    <a
      v-if="settingsStore.copyright.website"
      :href="settingsStore.copyright.website"
      target="_blank"
      rel="noopener"
      >{{ settingsStore.copyright.company }},</a
    >
    <span v-else>{{ settingsStore.copyright.company }},</span>
    All Rights Reserved
  </footer>
</template>

<script setup name="Copyright">
  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
  footer {
    margin: 40px 0 20px;
    line-height: 20px;
    text-align: center;
    color: #808695;
    font-size: 14px;

    a {
      text-decoration: none;
      color: #808695;

      &:hover {
        color: #3d4047;
      }
    }
  }
</style>
