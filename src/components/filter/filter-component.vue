<template>
  <div class="filter-container">
    <custom-input
      v-model="generalFilter"
      @keyup="(!generalFilter || generalFilter?.length >= 3) ? emitFilters() : null"
      :stackLabel="false"
      :bottom-slots="false"
      label="Búsqueda general"
      icon="search"
      clearable
      class="full-width"
      style="max-width:230px" />

    <div class="vertical-divider" />

    <!-- Filters for the input type filter -->
    <custom-button outline icon="filter_list" :label="$t('components.filter.add_filter')" color="secondary">
      <q-menu v-model="showMenu" anchor="bottom left" self="top left" transition-show="jump-down" transition-hide="jump-up" @hide="clearMenu">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          :swipeable="false"
          :navigation="false"
          animated
        >
          <q-carousel-slide name="filter-selection">
            <q-item>
              <q-item-section>
                <custom-input v-model="searchFilter" :stackLabel="false" :bottom-slots="false" :label="$t('components.filter.search_filter')" icon="search" clearable class="full-width" style="max-width:230px" @update:model-value="clearInput" />
              </q-item-section>
            </q-item>
            <q-separator/>

            <q-item clickable v-for="filter in filterInputFilters" :key="filter.key" @click="updateSlide(filter)">
              <q-item-section>
                <div class="flex items-center gap-10">
                  <q-icon color="secondary" size="24px" :name="filter.icon"/>
                  <span class="filter-class">{{ filter.label }}</span>
                </div>
              </q-item-section>
            </q-item>
          </q-carousel-slide>

          <q-carousel-slide name="filter-form">
            <q-item>
              <q-item-section>
                <div class="text-center filter-class">{{ $t('components.filter.filtering') }}</div>
                <div class="flex justify-center items-center gap-10">
                  <q-icon color="secondary" size="24px" :name="filterSelected.icon"/>
                  <span class="filter-class">{{ filterSelected.label }}</span>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item>
              <q-item-section>
                <custom-input v-model="filterResult" :stackLabel="false" :bottom-slots="false" :label="$t('components.filter.search')" icon="search" clearable class="full-width" style="max-width:230px" />
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item>
              <q-item-section>
                <div class="flex no-wrap gap-5 justify-between">
                  <custom-button :label="$t('components.filter.back')" flat color="secondary" @click="clearMenu" />
                  <custom-button :label="$t('components.filter.search')" color="secondary" :disabled="!filterResult" @click="applyFilter" />
                </div>
              </q-item-section>
            </q-item>
          </q-carousel-slide>
        </q-carousel>
      </q-menu>
    </custom-button>

    <!-- Filters for the select type filter -->
    <template v-for="filter in filterSelectFilters" :key="filter.key">
      <div class="vertical-divider" />
      <custom-button outline :icon="filter.icon" :label="filter.label" color="secondary">
        <q-menu fit anchor="bottom left" self="top left" transition-show="jump-down" transition-hide="jump-up" @hide="clearMenu">
          <q-item clickable v-for="option in filter.options" :key="option.key" v-close-popup @click="filterSelected = filter; filterResult = option.key; applyFilter()">
            <q-item-section>
              <div class="flex items-center gap-10">
                <q-icon color="secondary" size="24px" :name="option.icon"/>
                <span class="filter-class">{{ option.label }}</span>
              </div>
            </q-item-section>
          </q-item>
        </q-menu>
      </custom-button>
    </template>
  </div>

  <div class="full-width flex gap-10" v-if="totalFilter?.length > 0">
    <chip-component v-model="totalFilter" @filter-removed="emitFilters" />
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import ChipComponent from 'src/components/chip/chip-component'

export default defineComponent({
  components: {
    ChipComponent
  },
  props: {
    filters: {
      type: Array,
      required: true
    }
  },
  emits: ['update-filters'],
  setup(props, { emit }) {
    const state = reactive({
      showMenu: false,
      slide: 'filter-selection',
      searchFilter: '',
      filterSelected: null,
      filterResult: '',
      generalFilter: '',
      totalFilter: [],
      filterInputFilters: computed(() => props.filters.filter((val) => {
        return val.type === 'input' && val.label.toLowerCase().includes(state.searchFilter.toLowerCase().trim())
      })),
      filterSelectFilters: computed(() => props.filters.filter((val) => val.type === 'select'))
    })

    const clearInput = () => {
      if (!state.searchFilter) state.searchFilter = ''
    }

    const clearMenu = () => {
      state.filterSelected = null
      state.searchFilter = ''
      state.filterResult = ''
      state.slide = 'filter-selection'
    }

    const updateSlide = (filter = null) => {
      state.filterSelected = filter
      state.slide = 'filter-form'
    }

    const applyFilter = () => {
      const positionFilter = state.totalFilter.findIndex(val => val.key === state.filterSelected.key)
      // update filter object
      if (positionFilter >= 0) {
        state.totalFilter[positionFilter].value = state.filterResult
        state.totalFilter[positionFilter].newModifiableValue = state.filterResult
      }
      // create new filter object
      else {
        state.totalFilter.push({
          ...state.filterSelected,
          value: state.filterResult,
          newModifiableValue: state.filterResult,
        })
      }
      state.showMenu = false
      emitFilters()
    }

    const emitFilters = () => {
      let filterString = ''

      if (state.generalFilter?.length >= 3) {
        filterString += `any=${encodeURIComponent(state.generalFilter)}`
        if (state.totalFilter.length > 0) {
          filterString += '&'
        }
      }

      state.totalFilter.forEach((el, index) => {
        filterString += `${el.key}[${el.operator}]=${encodeURIComponent(el.value)}`
        if ((state.totalFilter.length - 1) !==  index) {
          filterString += '&'
        }
      })
      emit('update-filters', filterString)
    }

    return {
      ...toRefs(state),
      clearInput,
      clearMenu,
      updateSlide,
      applyFilter,
      emitFilters
    }
  }
})
</script>


<style lang="scss" scoped>
  .filter-container {
    border-radius: 12px;
    padding: 5px;
    gap: 5px;
    background-color: var(--background-color);
    box-shadow: var(--main-shadow);
    display: flex;
    max-width: max-content;
    align-items: center;

    .vertical-divider {
      padding: 1px;
      border-radius: 8px;
      height: 80%;
      background-color: var(--body-color);
    }

  }

  .filter-class {
    font-weight: 400;
    color: var(--main-text-color);
    margin-right: 5px;
  }
</style>