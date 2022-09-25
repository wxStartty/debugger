<!--
 * @Description: 登录页
 * @Author: wsy
 * @Date: 2022-06-09 15:48:38
 * @LastEditTime: 2022-07-19 15:13:44
 * @LastEditors: wsy
-->
<template>
  <div class="login-bg" relative flex w-full h-full overflow-hidden>
    <div flex p-0 justify-center w-0 overflow-hidden xl="flex-auto p-350px">
      <svg-icon class="logo" name="logo-white"></svg-icon>
    </div>
    <div
      w-full
      h-full
      flex
      flex-col
      justify-between
      bg-white
      bg-opacity-0
      backdrop-blur-20px
      shadow-lg
      overflow-auto
      xl="bg-opacity-80 backdrop-blur-[30px] w-4/12 min-w-[500px]"
    >
      <component :is="component" @replaceFrom="replaceFrom" :formType="formType" />
      <Copyright pb-20px xl="w-full"></Copyright>
    </div>
  </div>
</template>

<script setup name="Login">
  import LoginFrom from './login-from.vue'
  const formType = ref('login')

  const fromTypeArr = {
    login: LoginFrom,
    wx: defineAsyncComponent(() => import('./other-from.vue')),
    dd: defineAsyncComponent(() => import('./other-from.vue')),
    reset: defineAsyncComponent(() => import('./reset-from.vue'))
  }
  const component = computed(() => {
    return fromTypeArr[formType.value]
  })
  function replaceFrom(targetFrom) {
    formType.value = targetFrom
  }
</script>

<style lang="scss" scoped>
  .login-bg {
    background: url('@/assets/images/login-bg.webp') no-repeat center center;
    background-size: cover;

    .logo {
      width: 100%;
      max-width: 150px;
      height: 100%;
      max-height: 150px;
    }
  }
</style>
