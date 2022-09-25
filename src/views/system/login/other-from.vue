<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-10 20:03:55
 * @LastEditTime: 2022-07-01 18:10:14
 * @LastEditors: wsy
-->
<template>
  <div class="w-full h-full mt-[90px] 2xl:mt-[160px] px-[35px] flex flex-col items-center">
    <div class="h-[400px] w-[400px] relative shadow-xl flex">
      <div
        class="flex justify-center items-center absolute transform bg-white rounded shadow-xl w-[80px] h-[80px] translate-y-2/4 translate-x-2/4 bottom-1/2 right-1/2"
      >
        <el-icon :size="60" color="#0053D9" v-if="formType === 'dd'">
          <i-uiw-dingding class="cursor-pointer"></i-uiw-dingding>
        </el-icon>
        <el-icon :size="65" color="#03DD6B" v-else>
          <i-uiw-weixin class="cursor-pointer"></i-uiw-weixin>
        </el-icon>
      </div>
      <!-- 前端生成的二维码 -->
      <canvas ref="canvas" width="400" height="400" />
    </div>
    <div class="flex h-[40px] w-[400px] mt-[30px] px-[10px]">
      <div class="w-2/12 h-[20px] border-gray-400 border-b-[1px]"></div>
      <div class="flex items-center justify-center w-8/12 h-full text-sm text-gray-500"
        >扫码后点击"确认"，即可完成登录</div
      >
      <div class="w-2/12 h-[20px] border-gray-400 border-b-[1px]"></div>
    </div>
    <el-button
      class="max-w-[400px] mt-[60px]"
      size="large"
      plain
      style="width: 100%"
      @click="replaceFrom"
      >返回</el-button
    >
  </div>
</template>

<script setup>
  import QRCode from 'qrcode'
  const emits = defineEmits(['replaceFrom'])
  const canvas = ref()
  defineProps({
    formType: String
  })
  onMounted(() => {
    QRCode.toCanvas(canvas.value, `应急管理-${import.meta.env.VITE_APP_TITLE}`, {
      width: 400,
      height: 400
    })
  })
  function replaceFrom() {
    emits('replaceFrom', 'login')
  }
</script>
