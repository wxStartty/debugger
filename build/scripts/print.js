/*
 * @Description:
 * @Author: wsy
 * @Date: 2021-12-14 18:03:17
 * @LastEditTime: 2021-12-15 17:53:20
 * @LastEditors: wsy
 */
const CFonts = require('cfonts')
const chalk = require('chalk')
const semver = require('semver')
/**
 * @description 打印LOGO
 * @author wsy
 * @date 2021-12-14  18:10:27
 */
const printLoGo = (logo) => {
  CFonts.say(logo, {
    font: 'simple3d',
    align: 'left',
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: 0,
    gradient: ['blue', 'magenta'],
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
  })
}
/**
 * @description node版本是否满足最低要求
 * @author wsy
 * @date 2021-12-15  15:54:50
 */
const printNodeVersionWarn = (version, safeVersion) => {
  // node环境是否满足最低要求
  const nodeVersionIsSatisfy = semver.gte(version, safeVersion)
  if (!nodeVersionIsSatisfy) {
    console.warn(`
  \n${chalk.bold.red('❌ 当前node版本过低，请升级node版本，node版本应 >= v14.0.0')}
  `)
    process.exit(1)
  }
}
/**
 * @description 包管理器是否是pnpm
 * @author wsy
 * @date 2021-12-15  15:59:46
 */
const printPnpmWarn = () => {
  if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn(`
  \n${chalk.bold.yellow('❌ 当前vue3.x 项目需要使用pnpm作为包管理器脚本才能正常工作，请执行')}
  \n${chalk.bold.cyan('🍀 npm install -g pnpm')}
  \n${chalk.bold.cyan('🍀 pnpm install')}
  \n${chalk.bold.cyan('🍀 pnpm run serve')}\n
  `)
    process.exit(1)
  }
}

module.exports = {
  printLoGo,
  printNodeVersionWarn,
  printPnpmWarn
}
