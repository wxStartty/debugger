/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-03-25 19:50:58
 * @LastEditTime: 2022-06-20 21:37:36
 * @LastEditors: wsy
 */
import { typeSource } from '@/util/index'
import { useKeepAliveOutsideStore } from '@/store/modules/keepAlive'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useUserOutsideStore } from '@/store/modules/user'
import { useRouteOutsideStore } from '@/store/modules/route'
import { useTabbarOutsideStore } from '@/store/modules/tabbar'
import { lastRoute } from './system/settingRouter'
import { useUrlSearchParams } from '@vueuse/core'
import storage from '@/util/storage'
import consola from 'consola'

// 缓存组接受的类型
const cacheTypeClass = ['String', 'Array', 'Boolean']
// 非缓存组接受的类型
const noCacheTypeClass = ['String', 'Array']

/**
 * 维护KeepAlive状态
 * @param {Route} to - 即将要进入的路由
 * @param {Route} from - 当前路由
 * @returns None
 */
export function keepAliveHelper(to, from) {
  const keepAliveOutsideStore = useKeepAliveOutsideStore()
  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
  if (to.meta.cache) {
    let componentName = to.matched[to.matched.length - 1].components.default.name
    if (componentName) {
      keepAliveOutsideStore.add(componentName)
    } else {
      // 如果.vue文件内设置了name属性，但是script内没有内容,则name失效
      // 一个简易处理办法是在script内写一句注释，更加建议使用defineComponent
      consola.error(new Error('当前页面组件未设置组件名name,会导致缓存失效,请检查!'))
    }
  }
  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
  if (from.meta.cache) {
    let componentName = from.matched[from.matched.length - 1].components.default.name
    // 通过 meta.cache 判断针对哪些页面进行缓存
    const fromMetaCacheType = typeSource(from.meta.cache)
    if (!cacheTypeClass.includes(fromMetaCacheType)) {
      consola.error(new Error('cache类型必须是String, Array, Boolean,请检查!'))
    }
    switch (fromMetaCacheType) {
      case 'String':
        if (from.meta.cache != to.name) {
          keepAliveOutsideStore.remove(componentName)
        }
        break
      case 'Array':
        if (!from.meta.cache.includes(to.name)) {
          keepAliveOutsideStore.remove(componentName)
        }
        break
    }
    // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
    if (from.meta.noCache) {
      const fromMetaNoCacheType = typeSource(from.meta.noCache)
      if (!noCacheTypeClass.includes(fromMetaNoCacheType)) {
        consola.error(new Error('noCache类型必须是 String, Array,请检查'))
      }
      switch (fromMetaNoCacheType) {
        case 'String':
          if (from.meta.noCache == to.name) {
            keepAliveOutsideStore.remove(componentName)
          }
          break
        case 'Array':
          if (from.meta.noCache.includes(to.name)) {
            keepAliveOutsideStore.remove(componentName)
          }
          break
      }
    }
    // 如果进入的是 reload 页面，则也将离开页面的缓存清空
    if (to.name == 'reload') {
      keepAliveOutsideStore.remove(componentName)
    }
  }
}

/**
 * @description
 * 在具有token切不过期的情况下,重新鉴权router组
 * @author wsy
 * @date 2022-05-10  09:02:42
 */
export async function generateAsyncRouter(router, asyncRoutes) {
  const settingsOutsideStore = useSettingsOutsideStore()
  const userOutsideStore = useUserOutsideStore()
  const routeOutsideStore = useRouteOutsideStore()
  const tabbarOutsideStore = useTabbarOutsideStore()
  if (userOutsideStore.isLogin) {
    if (!routeOutsideStore.isGenerate) {
      // 挂载动态路由的同时，根据当前帐号复原固定标签栏
      settingsOutsideStore.tabbar.enable &&
        tabbarOutsideStore.recoveryStorage(userOutsideStore.account)
      // 启动前端控制路由 or 后端控制路由
      if (!settingsOutsideStore.app.enableBackendReturnRoute) {
        // 前端生成路由
        await routeOutsideStore.generateRoutesAtFront(asyncRoutes)
      } else {
        // 后端生成路由
        await routeOutsideStore.generateRoutesAtBack()
      }
      // 记录需要卸载的路由栈
      let removeRoutes = []
      routeOutsideStore.flatRoutes.forEach((route) => {
        if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
          removeRoutes.push(router.addRoute(route))
        }
      })
      removeRoutes.push(router.addRoute(lastRoute))
      // 记录路由数据，在登出时会使用到，不使用 removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
      routeOutsideStore.setCurrentRemoveRoutes(removeRoutes)
    }
  }
}

/**
 * @description 设置token 维持isLogin的登录态，触发generateAsyncRouter的更新
 * @author wsy
 * @date 2022-05-10  09:01:58
 */
export async function urlParamsLogin() {
  let params = useUrlSearchParams('history')
  const { API_LOGIN } = useRequest()
  if (params.token) {
    API_LOGIN(params).then((res) => {
      // 设置本地持久化缓存
      storage.local.set('account', res.data.account)
      storage.local.set('token', res.data.token)
      storage.local.set('failure_time', res.data.failure_time)
    })
  }
}
