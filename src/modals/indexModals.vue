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
  <delete-urn-modal />
  <create-edit-person-modal />
  <delete-person-modal />
  <create-edit-casket-modal />
  <delete-casket-modal />
  <create-edit-user-modal />
  <delete-user-modal />
  <create-edit-reservation-modal />
  <delete-reservation-modal />
  <create-edit-deposit-modal />
  <delete-deposit-modal />
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
import DeleteUrnModal from 'src/modals/urn/DeleteUrnModal'
import CreateEditPersonModal from 'src/modals/person/CreateEditPersonModal'
import DeletePersonModal from 'src/modals/person/DeletePersonModal'
import CreateEditCasketModal from 'src/modals/casket/CreateEditCasketModal'
import DeleteCasketModal from 'src/modals/casket/DeleteCasketModal'
import CreateEditUserModal from 'src/modals/user/CreateEditUserModal'
import DeleteUserModal from 'src/modals/user/DeleteUserModal'
import CreateEditReservationModal from 'src/modals/reservation/CreateEditReservationModal'
import DeleteReservationModal from 'src/modals/reservation/DeleteReservationModal'
import CreateEditDepositModal from 'src/modals/deposit/CreateEditDepositModal'
import DeleteDepositModal from 'src/modals/deposit/DeleteDepositModal'

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
    DeleteUrnModal,
    CreateEditPersonModal,
    DeletePersonModal,
    CreateEditCasketModal,
    DeleteCasketModal,
    CreateEditUserModal,
    DeleteUserModal,
    CreateEditReservationModal,
    DeleteReservationModal,
    CreateEditDepositModal,
    DeleteDepositModal
  }
}
</script>