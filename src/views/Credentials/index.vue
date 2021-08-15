<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">Guia de instalação e geração de suas credenciais</p>
  </div>

  <div class="flex justify-center w-full h-fu">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || store.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div v-else class="flex py-3 pl-5 pr-20 mt-2 rounded justify-between items-center bg-brand-gray lg:w-1/2">
        <span v-if="state.hasErrors">Erro ao carregar a apikey</span>
        <span v-else> {{ store.User.currentUser.apiKey }} </span>
        <div class="flex ml-20 mr-5" v-if="!state.hasErrors">
          <icon
            @click="handleCopy"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApikey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="ml-3 cursor-pointer"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || store.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div v-else class="mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
      <span v-if="state.hasErrors">Erro ao carregar o script</span>
      <pre v-else>
        &lt;script src="https://luisdiaslima-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;
      </pre>
      </div>
    </div>

  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import Icon from '../../components/Icon'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import ContentLoader from '../../components/ContentLoader'
import { reactive } from '@vue/reactivity'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { watch } from '@vue/runtime-core'
import { useToast } from 'vue-toastification'

export default {
  components: { HeaderLogged, Icon, ContentLoader },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      isLoading: false,
      hasErrors: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (err) {
      state.isLoading = false
      state.hasErrors = !!err
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('ApiKey copiada para área de transferência')
      } catch (err) {
        handleError(err)
      }
    }

    async function handleGenerateApikey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApikey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (err) {
        handleError(err)
      }
    }

    return {
      store,
      state,
      handleGenerateApikey,
      handleCopy,
      brandColors: palette.brand
    }
  }

}
</script>

<style>

</style>
