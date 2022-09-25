<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-06-22 10:07:58
 * @LastEditTime: 2022-06-22 21:24:58
 * @LastEditors: wsy
-->
<template>
  <div class="horizontal-scroll" ref="scrollRef">
    <div v-if="isScrollbar" class="scroll-btn left" @click="scrollDirectionChanged('left')">
      <el-icon>
        <ElIconArrowLeft />
      </el-icon>
    </div>

    <div
      ref="scrollBar"
      class="scroll-content"
      :class="{ 'shadow-inner': isScrollbar }"
      @click="clickHandler($event)"
    >
      <div class="flex"> <slot></slot> </div>
    </div>

    <div v-if="isScrollbar" class="scroll-btn right" @click="scrollDirectionChanged('right')">
      <el-icon>
        <ElIconArrowRight />
      </el-icon>
    </div>
  </div>
</template>
<script setup name="LayoutHeaderScroll">
  import { useElementSize } from '@vueuse/core'
  const scrollRef = ref(null)
  const scrollBar = ref(null)
  const { width: scrollRefWidth } = useElementSize(scrollRef)
  const isScrollbar = ref(false)

  watch(scrollRefWidth, () => {
    if (scrollBar.value.scrollWidth > scrollBar.value.clientWidth) {
      isScrollbar.value = true
    } else {
      isScrollbar.value = false
    }
  })
  function scrollDirectionChanged(direction) {
    let step = 150
    if (direction === 'left') step = -step
    scrollTo(scrollBar.value.scrollLeft + step)
  }

  function clickHandler(event) {
    let eventTarget = event.target
    while (eventTarget.nodeName !== 'DIV') {
      eventTarget = eventTarget.parentNode
    }
    const rect = eventTarget.getBoundingClientRect()
    const parent = scrollBar.value.getBoundingClientRect()

    const targetRectLeft = rect.left
    const parentReactLeft = parent.left
    const distance = targetRectLeft - parentReactLeft
    scrollTo(distance)
  }

  function scrollTo(offsetLeft) {
    scrollBar.value.scrollTo({
      left: offsetLeft,
      behavior: 'smooth'
    })
  }
</script>

<style lang="scss" scoped>
  .horizontal-scroll {
    @apply w-[100%] h-[100%] flex items-center relative px-[20px];

    .scroll-content {
      @apply w-[100%] h-[100%] flex items-center relative overflow-x-auto overflow-y-hidden;

      // firefox隐藏滚动条
      scrollbar-width: none;

      // chrome隐藏滚动条
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .scroll-btn {
      @include themeify {
        color: themed('g-header-menu-hover-color');
        background-color: themed('g-header-menu-hover-bg');
      }
      @apply w-[15px] h-[40px] opacity-70 shadow-sm cursor-pointer absolute transition-all duration-200 rounded flex items-center justify-center;

      &.left {
        @apply left-[0px];
      }

      &.right {
        @apply right-[0px];
      }

      &:hover {
        @apply opacity-90;
      }

      &:active {
        @apply opacity-100;
      }
    }
  }
</style>
