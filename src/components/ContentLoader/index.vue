<template>
  <div
    :style="{
      width: computedWidth,
      height
    }"
    class="opacity-75 content-loader"
  >
    <span :style="{ animationDuration }" class="content-loader--fx"/>
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    animationDuration: {
      type: String,
      default: '1.6s'
    },
    height: {
      default: '1rem',
      type: String
    },
    width: {
      default: '1rem',
      type: String
    }
  },
  setup (props) {
    const computedWidth = computed(() => {
      const value = Math.random() * (props.width - props.minWidth)
      return props.width ?? `${Math.floor(value + props.minWidth)}%`
    })
    return { computedWidth }
  }
}
</script>
<style lang="postcss" scoped>
@keyframes shimmer {
   0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
    }
}
.content-loader {
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
}
.content-loader--fx {
  display: flex;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  height: 100%;

  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 100%;
  display: inline-block;
  position: relative;
  animation: shimmer infinite ease-in-out;
}
</style>
