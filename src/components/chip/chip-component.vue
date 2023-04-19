<template>
  <div :id="filter.key" v-for="filter in filters" :key="filter.key">
    <div class="chip-container">
      <div class="flex justify-center items-center gap-5">
        <q-btn padding="none" round color="negative" flat no-caps icon="highlight_off" size="12px" @click.stop="removeFilter(filter.key)" />

        <div class="chip-text">
          <span>{{ filter.label }}:&nbsp;</span>
          <span class="filter-value">{{ getFilterValue(filter)}}</span>
          <q-icon size="21px" name="keyboard_arrow_down" />
        </div>

      </div>
    </div>

    <q-menu v-bind="showMenu" anchor="bottom middle" self="top middle" transition-show="jump-down" transition-hide="jump-up" @hide="cancelFilter(filter)">
      <q-item>
        <q-item-section>
          <div class="text-center filter-class">{{ $t('components.filter.filtering') }}</div>
          <div class="flex justify-center items-center gap-10">
            <q-icon color="secondary" size="24px" :name="filter.icon"/>
            <span class="filter-class">{{ filter.label }}</span>
          </div>
        </q-item-section>
      </q-item>
      <q-separator/>

      <template v-if="filter.type === 'input'">
        <q-item>
          <q-item-section>
            <custom-input v-model="filter.newModifiableValue" :stackLabel="false" :bottom-slots="false" :label="$t('components.filter.search')" icon="search" clearable class="full-width" style="max-width:230px" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section v-close-popup>
            <div class="flex no-wrap gap-5 justify-between">
              <custom-button :label="$t('components.filter.cancel')" flat color="secondary" @click="cancelFilter(filter)"/>
              <custom-button :label="$t('components.filter.search')" color="secondary" :disabled="!filter.newModifiableValue" @click="modifyFilter(filter)" />
            </div>
          </q-item-section>
        </q-item>
      </template>

      <template v-if="filter.type === 'select'">
        <q-item clickable v-for="option in filter.options" :key="option.key" v-close-popup @click="filter.value = option.key; emitFilters()" style="padding:0 8px">
          <q-item-section>
            <div class="flex items-center gap-10" style="min-width:150px">
              <q-radio keep-color v-model="filter.value" :val="option.key" :label="option.label" color="secondary" v-close-popup @click="filter.value = option.key; emitFilters()" />
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-menu>
  </div>

</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      required: true
    },
  },
  emits: ['update:modelValue', 'filter-removed'],
  setup(props, { emit }) {
    const filters = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const state = reactive({
      showMenu: false
    })

    const removeFilter = (key) => {
      filters.value = filters.value.filter(val => key !== val.key)
      emitFilters()
    }

    const cancelFilter = (filter) => {
      filter.newModifiableValue = filter.value
      state.showMenu = false
    }

    const modifyFilter = (filter) => {
      filter.value = filter.newModifiableValue
      state.showMenu = false
      emitFilters()
    }

    const getFilterValue = (filter) => {
      if (filter.type === 'input') {
        return filter.value
      }

      const valuePosition = filter.options.findIndex(val => val.key === filter.value)
      return filter.options[valuePosition].label
    }

    const emitFilters = () => {
      emit('filter-removed')
    }

    return {
      ...toRefs(state),
      filters,
      cancelFilter,
      removeFilter,
      modifyFilter,
      getFilterValue,
      emitFilters
    }
  },
})
</script>


<style lang="scss" scoped>
  .chip-container {
    border-radius: 8px;
    padding: 5px 8px;
    gap: 5px;
    background-color: var(--background-color);
    box-shadow: var(--main-shadow);
    display: flex;
    max-width: max-content;
    align-items: center;
    cursor: pointer;
    transition: 0.3s all;
    border: 1px solid var(--background-color);
    &:hover{
      border-color: $secondary;
    }

    .chip-text {
      font-weight: 400;
      color: var(--main-text-color);
      .filter-value {
        font-weight: 500;
      }
    }
  }
</style>