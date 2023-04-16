<template>
  <create-edit-building-modal />
  <delete-building-modal />
  <create-edit-room-modal />
  <delete-room-modal />
  <create-edit-row-modal />
  <delete-row-modal />
</template>

<script>
import CreateEditBuildingModal from 'src/modals/building/CreateEditBuildingModal'
import DeleteBuildingModal from 'src/modals/building/DeleteBuildingModal'
import CreateEditRoomModal from 'src/modals/room/CreateEditRoomModal'
import DeleteRoomModal from 'src/modals/room/DeleteRoomModal'
import CreateEditRowModal from 'src/modals/row/CreateEditRowModal'
import DeleteRowModal from 'src/modals/row/DeleteRowModal'

export default {
  components: {
    CreateEditBuildingModal,
    DeleteBuildingModal,
    CreateEditRoomModal,
    DeleteRoomModal,
    CreateEditRowModal,
    DeleteRowModal
  }
}
</script>