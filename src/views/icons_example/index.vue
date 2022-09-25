<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-31 17:57:04
 * @LastEditTime: 2022-07-22 16:21:42
 * @LastEditors: wsy
-->
<template>
  <div class="w-full h-full grid grid-cols-[300px_auto]">
    <!-- class="w-full h-full rounded shadow-lg bg-white" -->
    <div class="h-full p-4 pr-0">
      <div bg="white" w="full" h="full" rounded shadow-lg bg-white> </div>
    </div>
    <div
      class="p-4 h-full overflow-auto grid grid-cols-[repeat(auto-fill,224px)] grid-rows-[repeat(auto-fill,64px)] justify-around gap-[15px]"
    >
      <div
        class="test grid grid-cols-2 transition-all hover:outline outline-offset-4 outline-2 active:outline-3 outline-blue-300 active:outline-blue-400 rounded shadow-md bg-white w-[224px] h-[64px] cursor-pointer"
        v-for="item in icons"
        :key="item.iconName"
      >
        <div class="items">
          {{ item.iconText }}
        </div>
        <div>4</div>
      </div>
      <component :is="item"> </component>
    </div>
  </div>
</template>
<script setup>
  import icons from './icons'
</script>

<style lang="scss" scoped>
  #app {
    cursor: pointer;
  }

  .test {
    @apply bg-white;
  }
</style>
