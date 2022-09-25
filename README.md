# HESC 应急管理admin基础模板

## 🍔 简介

HESC 应急管理admin基础模板

## 🍩 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |


## 🍻 技术栈
- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue@3 基础语法
- [Pinia](https://pinia.vuejs.org/introduction.html#why-should-i-use-pinia) - 熟悉`Pinia`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法
- [unocss](https://github.com/nuysoft/Mock) - 原子化css库 unocss 基本语法
- [vueuse](https://vueuse.org/) - vue3的hook库
  
## 🍺 vscode 插件
- 🍭 editorconfig
- 🍬 dotenv
- 🍿 prettier-vscode
- 🍪 vscode-eslint
- 🍺 unocss
- 🍦 iconify
- 🍰 volar
- 🎂 errorlens
- 🍧 error-gutters
- 🍼 gitlens

## 🍭 安装使用

🍙 获取项目代码

```bash
git clone git@172.16.40.21:YJ/standard.git
```

🌈 安装依赖

```bash
pnpm install
```

🐥 运行

```bash
pnpm run dev
# 或
pnpm run serve
```

🍁 打包

```bash
pnpm run build
```

🍄 Git 提交

```bash
pnpm run cz
```

## 🍣 Git 规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `✨ feat` 增加新功能
  - `🐛 fix` 修复问题/BUG
  - `🎉 init` 初始化
  - `📝 docs` 文档变更
  - `💄 style` 代码格式(不影响代码运行的变动)
  - `♻️ refactor` 重构(既不是增加feature，也不是修复bug)
  - `⚡️ perf` 性能优化
  - `✅ test` 增加测试
  - `⏪️ revert` 回退
  - `🚀‍ build` 构建过程或辅助工具的变动
  - `👷 ci` CI 配置

## 🌯 Git 提交流程
```bash
git add .

pnpm run cz
```

