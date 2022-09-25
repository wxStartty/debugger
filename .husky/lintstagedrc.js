/*
 * @Description: lintstagedrc
 * @Author: wsy
 * @Date: 2021-12-20 15:41:21
 * @LastEditTime: 2021-12-22 15:41:57
 * @LastEditors: wsy
 */
module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write'],
  'src/**/*.{scss,less}': ['stylelint --fix', 'prettier --write'],
  'package.json': ['prettier --write']
}
