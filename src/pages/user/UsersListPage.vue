<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.user.list_title')">
      <template v-slot:button>
        <custom-button v-if="isAdminUser" :unelevated="false" icon="add_circle_outline" :label="$t('pages.user.add_user')" color="secondary" @click="openCreateEditUser()" />
      </template>
    </title-component>

    <user-table-component />
  </div>
</template>

<script>
import UserTableComponent from 'src/components/tables/user/user-table-component'
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { defineComponent, reactive, toRefs } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent,
    UserTableComponent
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const state = reactive({
      isAdminUser: authenticationStore.isAdmin
    })

    const openCreateEditUser = () => {
      bus.$emit('openCreateEditUserModal')
    }

    return {
      ...toRefs(state),
      openCreateEditUser
    }
  }
})
</script>