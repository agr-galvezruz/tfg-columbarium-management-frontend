<template>
  <create-edit-building-modal />
  <delete-building-modal />
</template>

<script>
import CreateEditBuildingModal from 'src/modals/building/CreateEditBuildingModal'
import DeleteBuildingModal from 'src/modals/building/DeleteBuildingModal'

export default {
  components: {
    CreateEditBuildingModal,
    DeleteBuildingModal,
  }
}
</script>