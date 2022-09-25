/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-01-04 18:05:03
 * @LastEditTime: 2022-01-04 18:08:10
 * @LastEditors: wsy
 */

/**
 * @description
 * 将env文件的处理数据类型,并赋值给process.env
 * @author wsy
 * @date 2022-01-04  18:08:10
 * @param {Object} envConf env 变量
 */
export function wrapperEnv(envConf) {
  const ret = {}
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
