<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.deposit.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.deposit.add_deposit')" color="secondary" @click="openCreateEditDeposit()" />
      </template>
    </title-component>

    <deposit-table-component />
  </div>
</template>

<script>
import DepositTableComponent from 'src/components/tables/deposit/deposit-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    DepositTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditDeposit = () => {
      bus.$emit('openCreateEditDepositModal')
    }

    return {
      ...toRefs(state),
      openCreateEditDeposit
    }
  }
})
</script>