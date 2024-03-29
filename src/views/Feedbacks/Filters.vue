<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class=" {
          'bg-gray-200 bg-opacity-50': filter.active,
        } "
        @click="() => handleSelect(filter)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <div class="flex items-center">
          <span
            :class="`bg-${filter.color}`"
            class="inline-block w-2 h-2 mr-2 rounded-full" /> {{ filter.label }}
        </div>
        <span
          :class="filter.active ? `text-${filter.color}` : 'text-brand-graydark'"
          class="font-bold"
        >
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import useStore from '../../hooks/useStore'
import services from '../../services'

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: 'brand-info',
  issue: 'brand-danger',
  idea: 'brand-warning',
  other: 'brand-graydark'
}

function applyFiltersStructure (summary) {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: summary[cur]
    }

    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur
    }

    return [...acc, currentFilter]
  }, [])
}

export default {
  async setup (props, { emit }) {
    const store = useStore('Global')
    const state = reactive({
      hasErrors: false,
      filters: [
        { label: null, amount: null }
      ]
    })

    try {
      const { data } = await services.feedbacks.getSummary()
      state.filters = applyFiltersStructure(data)
    } catch (err) {
      state.hasErrors = !!err
      state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
    }

    function handleSelect ({ type }) {
      if (store.isLoading) {
        return
      }

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        } else {
          return { ...filter, active: false }
        }
      })

      emit('select', type)
    }

    return {
      state, handleSelect
    }
  }
}
</script>

<style>

</style>
