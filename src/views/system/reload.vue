<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-07 18:58:50
 * @LastEditTime: 2022-05-10 09:46:51
 * @LastEditors: wsy
-->
<template>
  <div class="alert-message-warp" />
</template>

<script setup name="reload">
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  onMounted(() => {
    router.go(-1)
  })
  onBeforeRouteLeave((to) => {
    const metaTitleIsUnf = to?.meta?.title
    const msg = metaTitleIsUnf ? `${to?.meta?.title}页面，刷新成功` : ''
    ElMessage({
      message: msg,
      type: 'success'
    })
  })
</script>
