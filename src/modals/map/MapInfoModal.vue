<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="nicheData?.internalCode" :width="calcWidth">
    <div class="niche-container">
      <div class="flex column gap-5 justify-center" v-for="row in urnMatrix" :key="row">
        <div :class="getUrnStatusColor(urn)" v-for="urn in row" :key="urn">
          {{urn}}
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <custom-button :label="$t('general_texts.close')" color="secondary" @click="closeModal" />
    </div>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
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
        state.nicheData = data
        state.nicheLength = data.storageQuantity
        state.lines = data.storageRows
        fetchData()
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openMapInfoModal')
    })

    const { t } = useI18n({})

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      nicheData: null,
      urnMatrix: [],
      nicheLength: 0,
      lines: 0,
      calcWidth: computed(() => {
        const widthNeeded = state.urnMatrix?.length * 50
        if (widthNeeded > 350) {
          return widthNeeded?.toString()
        }
        return '350'
      })
    })

    const fetchData = () => {
      drawUrns()
    }

    const drawUrns = () => {
      for (let i = 0; i < state.lines; i++) {
        state.urnMatrix.push([])
      }

      const maxPerLine = Math.ceil(state.nicheLength / state.lines)
      let cont = 1
      for (let i = 0; i < state.lines; i++) {
        for (let j = 0; j < maxPerLine; j++) {
          if (cont <= state.nicheLength) {
            state.urnMatrix[i].push(cont)
          } else {
            state.urnMatrix[i].push(null)
          }
          cont++
        }
      }

      state.urnMatrix.forEach(element => {
        element.reverse()
      })


      // Alternate numbers
      // for (let i = 0; i < state.nicheLength; i = i + state.lines) {
      //   for (let j = 0; j < state.lines; j++) {
      //     const number = i+j
      //     if (number < state.nicheLength) {
      //       state.urnMatrix[j].push(number + 1)
      //     } else {
      //       state.urnMatrix[j].push(null)
      //     }
      //   }
      // }
      // for (let i = 0; i < state.lines; i++) {
      //   state.urnMatrix[i].reverse()
      // }
      // state.urnMatrix.reverse()

      // console.table(state.urnMatrix)
    }


    const getUrnStatusColor = (index) => {
      if (!index) return 'void-urn'

      const urns = state.nicheData?.urns
      const status = urns?.[index-1].status
      if (status === 'AVAILABLE') return 'urn green-urn'
      if (status === 'RESERVED') return 'urn yellow-urn'
      if (status === 'EXPIRED') return 'urn purple-urn'
      if (status === 'OCCUPIED') return 'urn red-urn'
      if (status === 'DISABLED') return 'urn black-urn'
      return 'void-urn'
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.urnMatrix = []
      state.nicheData = null
      state.nicheLength = 0
      state.lines = 0
    }

    return {
      ...toRefs(state),
      getUrnStatusColor,
      closeModal
    };
  }
})
</script>

<style lang="scss" scoped>
  .niche-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
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