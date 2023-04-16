<template>
  <create-edit-building-modal />
  <delete-building-modal />
  <create-edit-room-modal />
</template>

<script>
import CreateEditBuildingModal from 'src/modals/building/CreateEditBuildingModal'
import DeleteBuildingModal from 'src/modals/building/DeleteBuildingModal'
import CreateEditRoomModal from 'src/modals/room/CreateEditRoomModal'

export default {
  components: {
    CreateEditBuildingModal,
    DeleteBuildingModal,
    CreateEditRoomModal,
  }
}
</script>