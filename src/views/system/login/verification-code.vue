<!--
 * @Description: 验证码
 * @Author: wsy
 * @Date: 2022-06-09 20:59:57
 * @LastEditTime: 2022-06-09 21:43:29
 * @LastEditors: wsy
-->

<template>
  <div class="flex justify-center w-full h-full cursor-pointer">
    <canvas ref="verify" :width="code.width" :height="code.height" @click="draw"></canvas>
  </div>
</template>

<script setup name="VerificationCode">
  import { useVModel } from '@vueuse/core'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const data = useVModel(props, 'modelValue', emit)

  const code = reactive({
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    width: 120,
    height: 30
  })

  const randomNum = (min, max) => {
    return parseInt(Math.random() * (max - min) + min)
  }
  const randomColor = (min, max) => {
    const r = randomNum(min, max)
    const g = randomNum(min, max)
    const b = randomNum(min, max)
    return `rgb(${r},${g},${b})`
  }
  const verify = ref(null)
  const draw = () => {
    const ctx = verify.value.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, code.width, code.height)
    let imgCode = ''
    for (let i = 0; i < 4; i++) {
      const text = code.pool[randomNum(0, code.pool.length)]
      imgCode += text
      const fontSize = randomNum(18, 40)
      const deg = randomNum(-30, 30)
      ctx.font = fontSize + 'px Simhei'
      ctx.textBaseline = 'top'
      ctx.fillStyle = randomColor(80, 150)

      ctx.save()
      ctx.translate(30 * i + 15, 15)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(text, -15 + 5, -15)
      ctx.restore()
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(randomNum(0, code.width), randomNum(0, code.height))
      ctx.lineTo(randomNum(0, code.width), randomNum(0, code.height))
      ctx.strokeStyle = randomColor(180, 230)
      ctx.closePath()
      ctx.stroke()
    }
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(randomNum(0, code.width), randomNum(0, code.height), 1, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = randomColor(150, 200)
      ctx.fill()
    }
    data.value = imgCode
  }
  onMounted(() => {
    draw()
  })
</script>

<style lang="scss" scoped></style>
