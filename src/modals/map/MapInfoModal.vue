<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="urnSelected ? urnSelected.internalCode : nicheData?.internalCode" :width="calcWidth">
    <q-carousel v-model="step" transition-prev="slide-right" transition-next="slide-left" :swipeable="false" :navigation="false" animated>
      <q-carousel-slide name="niche-map">
        <div class="niche-container">
          <div class="flex column gap-5 justify-center" v-for="row in urnMatrix" :key="row">
            <div :class="getUrnStatusColor(urn)" v-for="urn in row" :key="urn" @click="urnDetails(urn)">
              {{urn}}
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <custom-button :label="$t('general_texts.close')" color="secondary" @click="closeModal" />
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="urn-details">
        <div class="flex column gap-20">
          <div class="full-width overflow-auto" style="padding:3px">
            <div class="content-title">{{ $t('pages.reservation.list_title') }}</div>
            <reservation-table-component :urn-id="urnSelected.id" from-map />
          </div>

          <div class="full-width overflow-auto" style="padding:3px">
            <div class="content-title">{{ $t('pages.deposit.list_title') }}</div>
            <deposit-table-component :urn-id="urnSelected.id"  />
          </div>

          <div class="full-width overflow-auto" style="padding:3px" v-if="urnSelected?.relocations?.length > 0">
            <div class="content-title">{{ $t('pages.relocation.list_title') }}</div>
            <relocation-table-component :urn-id="urnSelected.id" from-map />
          </div>

          <div class="flex justify-between">
            <custom-button outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goToNicheMap" />
            <div class="flex gap-5">
              <custom-button :label="$t('general_texts.close')" color="secondary" @click="closeModal" />
            </div>
          </div>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </dialog-component>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import ReservationTableComponent from 'src/components/tables/reservation/reservation-table-component'
import DepositTableComponent from 'src/components/tables/deposit/deposit-table-component'
import RelocationTableComponent from 'src/components/tables/relocation/relocation-table-component'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    DialogComponent,
    ReservationTableComponent,
    DepositTableComponent,
    RelocationTableComponent
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
      step: 'niche-map',
      nicheData: null,
      urnMatrix: [],
      nicheLength: 0,
      lines: 0,
      urnSelected: null,
      calcWidth: computed(() => {
        if (state.step === 'niche-map') {
          const widthNeeded = state.urnMatrix?.length * 50
          if (widthNeeded > 350) {
            return widthNeeded?.toString()
          }
          return '350'
        }
        return '1300'
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

    const urnDetails = (urn) => {
      state.urnSelected = state.nicheData?.urns?.[urn-1]
      state.urnSelected.id = state.urnSelected.id?.toString()
      state.step = 'urn-details'
    }

    const goToNicheMap = () => {
      state.step = 'niche-map'
      state.urnSelected = null
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.urnMatrix = []
      state.nicheData = null
      state.nicheLength = 0
      state.lines = 0
      state.urnSelected = null
      state.step = 'niche-map'
    }

    return {
      ...toRefs(state),
      getUrnStatusColor,
      closeModal,
      urnDetails,
      goToNicheMap
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
  .content-title {
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 10px;
  }
</style>