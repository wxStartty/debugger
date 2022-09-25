/*
 * @Description: 收集静态资源
 * @Author: wsy
 * @Date: 2022-04-21 14:36:46
 * @LastEditTime: 2022-06-08 16:46:17
 * @LastEditors: wsy
 */
import fs from 'fs'
import path from 'path'
function generateScssResource() {
  const resources = []
  const globalAssets = path.resolve(process.cwd(), 'src/assets')
  // 全局 scss 资源
  fs.readdirSync(`${globalAssets}/styles/resources`).map((dirname) => {
    if (fs.statSync(`${globalAssets}/styles/resources/${dirname}`).isFile()) {
      resources.push(`@use "@/assets/styles/resources/${dirname}" as *;`)
    }
  })
  // css 精灵图相关
  fs.readdirSync(`${globalAssets}/sprites`).map((dirname) => {
    if (fs.statSync(`${globalAssets}/sprites/${dirname}`).isDirectory()) {
      // css 精灵图生成的 scss 文件也需要放入全局 scss 资源
      resources.push(`@use "@/assets/sprites/_${dirname}.scss" as *;`)
    }
  })
  return resources
}

const scssResources = generateScssResource()
export { scssResources }
