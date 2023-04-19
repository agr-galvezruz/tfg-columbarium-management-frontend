<template>
  <create-edit-building-modal />
  <delete-building-modal />
  <create-edit-room-modal />
  <delete-room-modal />
  <create-edit-row-modal />
  <delete-row-modal />
  <create-edit-niche-modal />
  <delete-niche-modal />
  <create-edit-urn-modal />
</template>

<script>
import CreateEditBuildingModal from 'src/modals/building/CreateEditBuildingModal'
import DeleteBuildingModal from 'src/modals/building/DeleteBuildingModal'
import CreateEditRoomModal from 'src/modals/room/CreateEditRoomModal'
import DeleteRoomModal from 'src/modals/room/DeleteRoomModal'
import CreateEditRowModal from 'src/modals/row/CreateEditRowModal'
import DeleteRowModal from 'src/modals/row/DeleteRowModal'
import CreateEditNicheModal from 'src/modals/niche/CreateEditNicheModal'
import DeleteNicheModal from 'src/modals/niche/DeleteNicheModal'
import CreateEditUrnModal from 'src/modals/urn/CreateEditUrnModal'

export default {
  components: {
    CreateEditBuildingModal,
    DeleteBuildingModal,
    CreateEditRoomModal,
    DeleteRoomModal,
    CreateEditRowModal,
    DeleteRowModal,
    CreateEditNicheModal,
    DeleteNicheModal,
    CreateEditUrnModal,
  }
}
</script>