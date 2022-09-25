<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-03-28 17:13:26
 * @LastEditors: wsy
-->
<template>
  <div>
    <slot v-if="checkPermission" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script setup name="AuthAll">
  import usePermission from '@/util/usePermission'
  const { authAll } = usePermission()
  const props = defineProps({
    value: {
      type: Array,
      default: () => []
    }
  })
  const checkPermission = computed(() => authAll(props.value))
</script>
