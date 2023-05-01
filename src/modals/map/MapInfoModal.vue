<template>
  <dialog-component v-model="isDialogOpen" dialog-title="01-01-03-07" :width="calcWidth">
    <div class="niche-container">
      <div class="flex gap-5 justify-center" v-for="row in urnMatrix" :key="row">
        <div :class="urn ? 'urn' : 'void-urn'" class="green-urn" v-for="urn in row" :key="urn">
          {{urn}}
        </div>
      </div>
    </div>

    <div class="flex justify-between">
      <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
      <custom-button icon="close" :label="$t('general_texts.close')" color="secondary" @click="closeModal" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { useBuildingStore } from 'stores/building'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openMapInfoModal', (data) => {
        closeModal()
        fetchData()
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openMapInfoModal')
    })

    const { t } = useI18n({})
    const buildingStore = useBuildingStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      urnMatrix: [],
      nicheLength: 14,
      lines: 2,
      calcWidth: computed(() => {
        const maxPerLine = Math.ceil(state.nicheLength / state.lines)
        const widthNeeded = maxPerLine * 48
        if (widthNeeded > 600) {
          return widthNeeded?.toString()
        }
        return '600'
      })
    })

    const fetchData = () => {
      drawUrns()
    }

    const drawUrns = () => {
      for (let i = 0; i < state.lines; i++) {
        state.urnMatrix.push([])
      }

      for (let i = 0; i < state.nicheLength; i = i + state.lines) {
        for (let j = 0; j < state.lines; j++) {
          const number = i+j
          if (number < state.nicheLength) {
            state.urnMatrix[j].push(number + 1)
          } else {
            state.urnMatrix[j].push(null)
          }
        }
      }

      for (let i = 0; i < state.lines; i++) {
        // state.urnMatrix[i].reverse()
      }
      // state.urnMatrix.reverse()
      console.table(state.urnMatrix)
    }


    const deleteBuilding = async () => {

    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.urnMatrix = []
    }

    return {
      ...toRefs(state),
      deleteBuilding,
      closeModal
    };
  }
})
</script>

<style lang="scss" scoped>
  .niche-container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .urn {
      background: var(--background-color);
      border: 1px solid var(--main-text-color);
      color: var(--main-text-color);
      width: 40px;
      height: 40px;
      display: flex;
      font-size: 18px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        border: 3px solid $secondary;
        font-weight: 500;
      }

      &.green-urn {
        background-color: #91d79d;
      }
      &.yellow-urn {
        background-color: #fbdea2;
      }
      &.red-urn {
        background-color: #fba6a1;
      }
      &.purple-urn {
        background-color: #e6a1fb;
      }
      &.black-urn {
        background-color: #575e68;
        color: var(--background-color);
      }
    }
    .void-urn {
      background: var(--background-color);
      border: 1px solid var(--main-text-color);
      width: 40px;
      height: 40px;
    }
  }
</style>