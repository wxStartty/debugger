/*
 * @Description: release.js
 * @Author: wsy
 * @Date: 2021-12-29 19:34:07
 * @LastEditTime: 2022-04-20 16:01:55
 * @LastEditors: wsy
 */
import { execSync } from 'child_process'
import { readJSONSync } from 'fs-extra'
import chalk from 'chalk'
import boxen from 'boxen'
import ora from 'ora'
const standardVersion = require('standard-version')

// 读取现在的版本
const { version: oldVersion } = readJSONSync('package.json')

// 执行bumpp指令，更新版本号
execSync('npx bumpp', { stdio: 'inherit' })

// 读取更新后的版本号
const { version } = readJSONSync('package.json')

// 版本号如果没有变化，则退出
if (oldVersion === version) {
  process.exit()
}

// 链接git仓库的动画
const spinner = ora('Link to Git ...').start()

/* =============================================
=           生成版本CHANGELOG文件                =
=============================================*/

standardVersion({
  releaseAs: version,
  silent: true,
  header: '# Wsy-Admin ChangeLog\n\n',
  types: [
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    { type: 'init', section: '🎉 Init | 初始化' },
    { type: 'docs', section: '✏️ Documentation | 文档' },
    { type: 'style', section: '💄 Styles | 风格' },
    { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
    { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
    { type: 'test', section: '✅ Tests | 测试' },
    { type: 'revert', section: '⏪ Revert | 回退' },
    { type: 'build', section: '📦‍ Build System | 打包构建' },
    { type: 'chore', section: '🚀 Chore | 构建/工程依赖/工具' },
    { type: 'ci', section: '👷 Continuous Integration | CI 配置' }
  ]
})
  .then(() => {
    // ─── SUCCESSFUL ──────────────────────────────────────────────────
    execSync('git push --follow-tags', { stdio: 'inherit' })
    spinner.succeed('Git push successful!')
    // eslint-disable-next-line
    console.log(
      boxen(`${chalk('\n\n🎉 ')}${chalk.green.bold('project release success!\n')}`, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      })
    )
  })
  .catch((err) => {
    // ─── FAILED ──────────────────────────────────────────────────────
    spinner.fail('Git push failed!')
    console.error(
      `${boxen(`${chalk('\n\n❌ ')}${chalk.red.bold(`${err.message}!\n`)}`, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red'
      })}`
    )
  })
