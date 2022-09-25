<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-05-07 11:18:21
 * @LastEditTime: 2022-06-17 20:51:05
 * @LastEditors: wsy
-->
<script lang="jsx">
  import { resolveComponent } from 'vue'
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      flip: {
        type: String,
        validator(value) {
          return ['', 'horizontal', 'vertical', 'both'].includes(value)
        },
        default: ''
      },
      rotate: {
        type: Number,
        validator(value) {
          return value >= 0 && value <= 360
        },
        default: 0
      }
    },
    setup(props) {
      const transformStyle = computed(() => {
        let style = []
        if (props.flip != '') {
          switch (props.flip) {
            case 'horizontal':
              style.push('rotateY(180deg)')
              break
            case 'vertical':
              style.push('rotateX(180deg)')
              break
            case 'both':
              style.push('rotateX(180deg)')
              style.push('rotateY(180deg)')
              break
          }
        }
        if (props.rotate != 0) {
          style.push(`rotate(${props.rotate}deg)`)
        }
        return `transform: ${style.join(' ')};`
      })

      return () => {
        /* Element icon */
        if (props.name.indexOf('el-icon-') === 0 || props.name.indexOf('ElIcon') === 0) {
          return (
            <el-icon class='svg-icon' style={transformStyle}>
              {h(resolveComponent(props.name))}
            </el-icon>
          )
        } else if (props.name.indexOf('ri-') === 0) {
          return <i style={transformStyle} class={[props.name, 'svg-icon']} />
        } else if (props.name.indexOf('icon-') === 0) {
          return h(resolveComponent(props.name))
        } else if (props.name.startsWith('i-')) {
          return h(resolveComponent(props.name))
        } else {
          return (
            <svg class='svg-icon' style={transformStyle} aria-hidden='true'>
              <use xlink:href={`#icon-${props.name}`} />
            </svg>
          )
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }
</style>
