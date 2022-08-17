<template>
<header class="header">
  <div class="header-group">
    <div class="flex items-center justify-between py-10">
      <div class="w-28 lg:w-36">
        <img src="../../assets/images/logo_white.png" alt="logo" class="w-full">
      </div>

      <div class="flex">
        <button id="open-search" v-show="false" />
        <input
          id="inputRef"
          type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent"
          placeholder="john@gmail.com"
        >
        <button
          class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
          @click="() => emit('create_account')"
        >
          Crie uma conta
        </button>
        <button
          class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          @click="() => emit('login')"
        >
          Entrar
        </button>
      </div>
    </div>

    <div class="flex flex-col mt-28">
      <h1 class="text-4xl font-black text-white">
        Tenha um feedback. <br>
        E faça seus clientes mais felizes! <br class="hidden lg:inline-block">
      </h1>
      <p class="text-lg font-medium text-white">
        Receba ideias, reclamações e feedbacks com um<br class="hidden lg:inline-block">
        simples widget na página.
      </p>

      <div>
        <button
        class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none"
        >
          Crie uma conta grátis
        </button>
      </div>
    </div>

  </div>
</header>
</template>

<script>
export default {
  setup (_, { emit }) {
    return { emit }
  },
  mounted() {
    this.onFocusSearchProducts()
  },
  methods: {
    onFocusSearchProducts() {
      const openButton = document.getElementById('open-search')
      const searchInput = document.getElementById('inputRef')
      openButton.onclick = function () {
        searchInput.focus()
      }
      openButton.onclick()
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_ballons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
