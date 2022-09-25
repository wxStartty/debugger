<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-14 15:59:21
 * @LastEditTime: 2022-02-14 16:50:37
 * @LastEditors: wsy
-->
<template>
  <iframe :src="$route.meta.link" frameborder="0" />
</template>

<script>
  export default {
    name: 'IframeLayout'
  }
</script>

<style lang="scss" scoped>
  iframe {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
</style>
