<template>
  <div class="notfound">
    <svg-icon name="404" />
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <el-button type="primary" @click="goBack">{{ data.countdown }} 秒后，返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  import { useSettingsStore } from '@/store/modules/settings'
  const settingsStore = useSettingsStore()
  import { useTabbarStore } from '@/store/modules/tabbar'
  const tabbarStore = useTabbarStore()

  const data = ref({
    inter: null,
    countdown: 5
  })

  onBeforeRouteLeave(() => {
    clearInterval(data.value.inter)
  })

  onMounted(() => {
    if (settingsStore.tabbar.enable) {
      tabbarStore.remove(route.meta.activeMenu || route.fullPath)
    }
    data.value.inter = setInterval(() => {
      data.value.countdown--
      if (data.value.countdown == 0) {
        clearInterval(data.value.inter)
        goBack()
      }
    }, 1000)
  })

  function goBack() {
    router.push('/')
  }
</script>

<style lang="scss" scoped>
  .notfound {
    @include position-center(xy);

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 700px;

    .svg-icon {
      width: 400px;
      height: 400px;
    }

    .content {
      h1 {
        margin: 0;
        font-size: 72px;
        color: #303133;
      }

      .desc {
        margin: 20px 0 30px;
        font-size: 20px;
        color: #606266;
      }
    }
  }
</style>
