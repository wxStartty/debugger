/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-11 16:21:57
 * @LastEditTime: 2022-05-24 15:13:15
 * @LastEditors: wsy
 */
import { has } from 'lodash-es'
import { setActiveRequest } from './define'
import { service } from './createService'
import { request } from './createRequest'
import { validator } from './helper'
import consola from 'consola'
const map = {}
const generators = (files = import.meta.globEager('./modules/**/*.js')) => {
  return Object.keys(files).map((key) => {
    return files[key]?.default
  })
}

generators().forEach((generators) => {
  const generator = generators({
    service,
    request
  })
  for (const key in generator) {
    __DEV__ && validator(key)
    if (!has(map, key)) {
      const generatorProxy = new Proxy(generator[key], {
        apply() {
          setActiveRequest(generators.id)
          return Reflect.apply(...arguments)
        }
      })
      map[key] = generatorProxy
    } else {
      __DEV__ && consola.error(new Error(`API modules模块下 ${key} 接口名重复`))
      continue
    }
  }
})

export function useRequest() {
  return map
}

export default map
