/*
 * @Description: unplugin-auto-import eslint 配置
 * @Author: wsy
 * @Date: 2022-01-18 15:41:57
 * @LastEditTime: 2022-05-19 19:58:04
 * @LastEditors: wsy
 */
module.exports = {
  globals: {
    /**
    |--------------------------------------------------
    | vue
    |--------------------------------------------------
    */
    // lifecycle
    onActivated: 'readonly',
    onBeforeMount: 'readonly',
    onBeforeUnmount: 'readonly',
    onBeforeUpdate: 'readonly',
    onDeactivated: 'readonly',
    onErrorCaptured: 'readonly',
    onMounted: 'readonly',
    onServerPrefetch: 'readonly',
    onUnmounted: 'readonly',
    onUpdated: 'readonly',
    // reactivity
    computed: 'readonly',
    customRef: 'readonly',
    isReadonly: 'readonly',
    isRef: 'readonly',
    isReactive: 'readonly',
    markRaw: 'readonly',
    reactive: 'readonly',
    readonly: 'readonly',
    ref: 'readonly',
    shallowReactive: 'readonly',
    shallowReadonly: 'readonly',
    shallowRef: 'readonly',
    toRaw: 'readonly',
    toRef: 'readonly',
    toRefs: 'readonly',
    triggerRef: 'readonly',
    unref: 'readonly',
    watch: 'readonly',
    watchEffect: 'readonly',
    // component
    defineComponent: 'readonly',
    defineAsyncComponent: 'readonly',
    getCurrentInstance: 'readonly',
    resolveDynamicComponent: "readonly",
    h: 'readonly',
    inject: 'readonly',
    nextTick: 'readonly',
    provide: 'readonly',
    useCssModule: 'readonly',
    useAttrs: 'readonly',
    /**
    |--------------------------------------------------
    | other
    |--------------------------------------------------
    */
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    /**
    |--------------------------------------------------
    | vue-router
    |--------------------------------------------------
    */
    useRoute: 'readonly',
    useRouter: 'readonly',
    onBeforeRouteUpdate:'readonly',
    onBeforeRouteLeave:'readonly',
    /**
    |--------------------------------------------------
    | vue-router
    |--------------------------------------------------
    */
    useStore: 'readonly',
    /**
    |--------------------------------------------------
    | api
    |--------------------------------------------------
    */
    useRequest: 'readonly',
    defineRequest:'readonly',
    /**
    |--------------------------------------------------
    | env
    |--------------------------------------------------
    */
    __DEV__: 'readonly',
  }
}
