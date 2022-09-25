/*
 * @Description:
 * @Author: wsy
 * @Date: 2021-12-14 15:45:49
 * @LastEditTime: 2021-12-15 16:12:08
 * @LastEditors: wsy
 */
const { printLoGo, printNodeVersionWarn, printPnpmWarn } = require('./print')

// 当前执行环境的node版本
const { version: VERSION } = process
// 最低需求的node版本
const SAFE_VERSION = 'v14.0.0'
const LOGO = 'wsy-admin'

// 打印LOGO
printLoGo(LOGO)

// node环境是否满足最低要求
printNodeVersionWarn(VERSION, SAFE_VERSION)

// 当前环境的包管理器是否是pnpm
printPnpmWarn()
