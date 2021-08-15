<template>
  <div
    class="flex flex-col items-start rounded w-full h-4/5"
  >
      <content-loader
      class="mt-3 rounded"
      width="80%"
      height="25px"
      animation-duration="2.9s"
      />
      <content-loader
      class="mt-3 rounded"
      width="65%"
      height="25px"
      animation-duration="2.9s"
      />
      <content-loader
      class="mt-3 rounded"
      width="65%"
      height="25px"
      animation-duration="2.9s"
      />
      <content-loader
      class="mt-3 rounded"
      width="65%"
      height="25px"
      animation-duration="2.9s"
      />
  </div>
</template>

<script>
import ContentLoader from '../../components/ContentLoader'
export default {
  components: { ContentLoader }
}
</script>

<style>

</style>
