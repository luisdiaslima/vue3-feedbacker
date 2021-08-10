<template>
  <h1> Bem-Vindo {{ state.user.name }} </h1>
</template>

<script>
import { reactive } from '@vue/reactivity'
import useStore from '../../hooks/useStore'
const user = useStore('User')
export default {
  setup () {
    const state = reactive({
      user: user.currentUser
    })

    return {
      state
    }
  }
}
</script>
<style>

</style>
