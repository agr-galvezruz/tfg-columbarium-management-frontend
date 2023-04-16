<template>
  <create-edit-building-modal />
  <delete-building-modal />
  <create-edit-room-modal />
  <delete-room-modal />
</template>

<script>
import CreateEditBuildingModal from 'src/modals/building/CreateEditBuildingModal'
import DeleteBuildingModal from 'src/modals/building/DeleteBuildingModal'
import CreateEditRoomModal from 'src/modals/room/CreateEditRoomModal'
import DeleteRoomModal from 'src/modals/room/DeleteRoomModal'

export default {
  components: {
    CreateEditBuildingModal,
    DeleteBuildingModal,
    CreateEditRoomModal,
    DeleteRoomModal
  }
}
</script>