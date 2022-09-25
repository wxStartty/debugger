<template>
  <div v-if="needRefresh" class="pwa-toast" role="alert">
    <div class="message"> 页面已有更新，请点击“重新载入”，确保看到的是最新的内容。 </div>
    <button @click="updateServiceWorker()">重新载入</button>
    <button @click="close">关闭</button>
  </div>
</template>

<script setup name="ReloadPrompt">
  import { useRegisterSW } from 'virtual:pwa-register/vue'

  const { needRefresh, updateServiceWorker } = useRegisterSW()

  const close = async () => {
    needRefresh.value = false
  }
</script>

<style lang="scss" scoped>
  .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 10000;
    width: 300px;
    padding: 12px;
    margin: 16px;
    text-align: left;
    background-color: white;
    border: 1px solid #8885;
    border-radius: 4px;
    box-shadow: 3px 4px 5px 0 #8885;

    .message {
      margin-bottom: 8px;
    }

    button {
      padding: 3px 10px;
      margin-right: 5px;
      cursor: pointer;
      border: 1px solid #8885;
      border-radius: 2px;
      outline: none;

      &:hover {
        border-color: #3335;
      }
    }
  }
</style>
