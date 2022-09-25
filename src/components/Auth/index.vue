<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-03-28 17:13:21
 * @LastEditors: wsy
-->
<template>
  <div>
    <slot v-if="checkPermission" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script setup name="Auth">
  import usePermission from '@/util/usePermission'
  const { auth } = usePermission()
  const props = defineProps({
    value: {
      type: [String, Array],
      default: ''
    }
  })
  const checkPermission = computed(() => auth(props.value))
</script>
