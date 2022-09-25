/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-01-05 21:40:29
 * @LastEditTime: 2022-06-06 20:30:49
 * @LastEditors: wsy
 */
/*
 * @Description: Prettier Settings
 * @Author: wsy
 * @Date: 2021-12-13 19:17:53
 * @LastEditTime: 2021-12-15 17:35:39
 * @LastEditors: wsy
 */
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80，官方建议设100-120其中一个数
  printWidth: 100,
  // 一个tab代表几个空格数，默认就是2
  tabWidth: 2,
  // 启用tab取代空格符缩进，默认为false
  useTabs: false,
  // 行尾是否使用分号，默认为true(添加理由:更加容易复制添加数据,不用去管理尾行)
  semi: false,
  vueIndentScriptAndStyle: true,
  // 字符串是否使用单引号，默认为false，即使用双引号，建议设true，即单引号
  singleQuote: true,
  // 给对象里的属性名是否要加上引号，默认为as-needed，即根据需要决定，如果不加引号会报错则加，否则不加
  quoteProps: 'as-needed',
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 在jsx里是否使用单引号，你看着办
  jsxSingleQuote: true,
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto'
}
