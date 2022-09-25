/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-05-10 15:46:16
 * @LastEditors: wsy
 */
import { viteMockServe } from 'vite-plugin-mock'

export default function createMock() {
  return viteMockServe({
    // eslint-disable-next-line
    ignore: /^\_/,
    mockPath: 'mock',
    injectCode: `
            import { setupProdMockServer } from '../mock/_createProductionServer.js';
            import { sanitizeIdentifier } from 'prettier';
            setupProdMockServer();
        `
  })
}
