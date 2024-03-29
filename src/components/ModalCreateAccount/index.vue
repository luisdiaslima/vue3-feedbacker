<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
     Crie sua conta
    </h1>

    <button
      @click="close"
      class="text-4xl text-gray-600"
    >
      &times;
      </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          type="text"
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent"
          placeholder="Jon Doe"
        >
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent"
          placeholder="jondoe@gmail.com"
        >
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent"
          placeholder="********"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabld="state.isLoading"
        type="submit"
        :class=" {
          'opacity-50': state.isLoading
        } "
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outlined-none"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else >Criar Conta</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import Icon from '../Icon'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'
import services from '../../services'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  components: {
    Icon
  },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({ email: data.email, password: data.password })
          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o registro')
        }

        state.isLoading = false
      } catch (error) {
        console.log(error)
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o registro')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
