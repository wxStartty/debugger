/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-05-11 17:27:29
 * @LastEditors: wsy
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mocks = []
const mockContext = import.meta.globEager('./modules/**/*.js')
Object.keys(mockContext).forEach((v) => {
  mocks.push(...mockContext[v].default)
})

export function setupProdMockServer() {
  createProdMockServer(mocks)
}
