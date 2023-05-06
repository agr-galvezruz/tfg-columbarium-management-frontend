<template>
  <dialog-component v-model="isDialogOpen" :dialog-title="type === 'Create' ? $t('pages.casket.modal_create_title') : $t('pages.casket.modal_edit_title')" :width="dialogWidth">
    <q-carousel v-model="step" transition-prev="slide-right" transition-next="slide-left" :swipeable="false" :navigation="false" animated>
    <!-- Step 1 -->
      <q-carousel-slide name="select-add-person">
        <q-form @submit="goToResume">
          <div class="form-container">
            <div class="header-title-component">{{ $t('pages.casket.person_in_casket') }}</div>
            <person-select-create-component v-model="personForm" required-deathdate :person-text="$t('pages.casket.person_in_casket')" />
          </div>

          <div class="flex justify-between" :style="!personForm.tabSelected ? 'margin-top:15px' : null">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button v-if="totalPeople.length > 0" outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="step = 'resume'; clearPersonForm()" />
              <custom-button icon="arrow_forward" :label="$t('general_texts.continue')" color="secondary" type="submit" :disabled="!personForm.tabSelected" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>

      <q-carousel-slide name="resume">
        <q-form @submit="onSubmit">
          <div class="form-container" style="margin-bottom:20px">
            <div class="flex items-baseline justify-between gap-10">
              <div class="stack-label">{{ $t('pages.casket.people_in_casket') }}</div>
              <custom-button outline icon="add_circle_outline" label="Añadir persona" color="secondary" @click="addNewPerson" style="margin-bottom:5px"/>
            </div>
            <div class="flex column gap-5">
              <div class="person-resume" v-for="(person, index) in totalPeople" :key="index" @click="person.clickable ? viewPersonClicked(index) : null" :class="{'clickable': person.clickable}">
                <div>
                  <q-icon name="person" size="24px" class="icon-grey-color" />
                  <span v-if="person.tabSelected === 'select'">{{ person.personSelected.label }}</span>
                  <span v-if="person.tabSelected === 'add'">{{ `${person.newPersonData.dni} - ${person.newPersonData.lastName1} ${person.newPersonData.lastName2} ${person.newPersonData.firstName}` }}</span>
                </div>
                <div class="flex gap-5">
                  <custom-button v-if="person.clickable" padding="none" round color="secondary" flat no-caps icon="visibility" />
                  <custom-button padding="none" round color="negative" flat no-caps icon="delete" @click.stop="deletePerson(index)" />
                </div>
              </div>
            </div>
          </div>
          <div class="input-form">
            <custom-input v-model="casketData.description" :label="$t('pages.casket.description')" class="full-width" :placeholder="$t('pages.casket.description_placeholder')" type="editor" />
          </div>

          <div class="flex justify-between">
            <custom-button outline :label="$t('general_texts.cancel')" color="secondary" @click="closeModal" />
            <div class="flex gap-5">
              <custom-button v-if="type === 'Create'" outline icon="arrow_back" :label="$t('general_texts.back')" color="secondary" @click="goStepBack" />
              <custom-button icon="save" :label="$t('general_texts.save')" color="secondary" type="submit" />
            </div>
          </div>
        </q-form>
      </q-carousel-slide>
    </q-carousel>
  </dialog-component>
</template>

<script>
import { hideLoading, showLoading, showNotification } from 'src/utils/quasarComponents'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount, computed } from 'vue'
import DialogComponent from 'src/modals/component/DialogComponent'
import { useCasketStore } from 'stores/casket'
import { useI18n } from 'vue-i18n'
import bus from 'boot/bus'
import { formatEsToDbDate, formatDbToEsDate } from 'src/helpers/formatDate'
import PersonSelectCreateComponent from 'src/components/select-create/person/person-select-create-component.vue'
import { usePersonStore } from 'stores/person'

export default defineComponent({
  components: {
    DialogComponent,
    PersonSelectCreateComponent
  },
  setup() {
    onMounted(() => {
      bus.$on('openCreateEditCasketModal', (data) => {
        closeModal()
        state.type = data ? 'Edit' : 'Create'
        if (data) setCasketData(data)
        state.isDialogOpen = true
      })
    })

    onBeforeUnmount(() => {
      bus.$off('openCreateEditCasketModal')
    })

    const { t } = useI18n({})
    const casketStore = useCasketStore()
    const personStore = usePersonStore()

    const state = reactive({
      isDialogOpen: false,
      loading: false,
      type: 'Create',
      step: 'select-add-person',
      dialogWidth: computed(() => {
        if (state.step === 'resume') return '700'
        return '820'
      })
    })

    const formData = reactive({
      totalPeople: [],
      casketData: {
        id: '',
        description: ''
      },
      personForm: {
        clickable: true,
        tabSelected: '',
        personSelected: {
          id: '',
          label: '',
          deathdate: ''
        },
        newPersonData: {
          id: '',
          dni: '',
          firstName: '',
          lastName1: '',
          lastName2: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          phone: '',
          email: '',
          maritalStatus: '',
          birthdate: '',
          deathdate: '',
          casketId: ''
        }
      }
    })

    const goToResume = async () => {
      const person = JSON.parse(JSON.stringify(formData.personForm))
      person.newPersonData.birthdate = formatEsToDbDate(person.newPersonData.birthdate)
      person.newPersonData.deathdate = formatEsToDbDate(person.newPersonData.deathdate)
      person.personSelected.deathdate = formatEsToDbDate(person.personSelected.deathdate)

      if (person.tabSelected === 'select') {
        if (formData.totalPeople.findIndex(val => val.personSelected.id === person.personSelected.id) < 0) {
          formData.totalPeople.push(person)
        }
      }
      else if (person.tabSelected === 'add') {
        try {
          const { data } = await personStore.checkExistDni(person.newPersonData.dni)
          if (data.length > 0) {
            showNotification(t('pages.person.unique_error_dni'))
            return
          }

          if (formData.totalPeople.findIndex(val => val.newPersonData.dni === person.newPersonData.dni) < 0) {
            formData.totalPeople.push(person)
          } else {
            showNotification(t('pages.person.unique_error_dni'))
            return
          }
        } catch (error) {
          console.log(error)
          return
        }
      }
      state.step = 'resume'
      clearPersonForm()
    }

    const goStepBack = () => {
      state.step = 'select-add-person'
      formData.personForm = formData.totalPeople.pop()
      if (formData.personForm.tabSelected === 'add') {
        formData.personForm.newPersonData.birthdate = formatDbToEsDate(formData.personForm.newPersonData.birthdate)
        formData.personForm.newPersonData.deathdate = formatDbToEsDate(formData.personForm.newPersonData.deathdate)
      } else if (formData.personForm.tabSelected === 'select') {
        formData.personForm.personSelected.deathdate = formatDbToEsDate(formData.personForm.personSelected.deathdate)
      }
    }

    const deletePerson = (index) => {
      formData.totalPeople.splice(index, 1)
      if (formData.totalPeople.length === 0) {
        state.step = 'select-add-person'
      }
    }

    const viewPersonClicked = (index) => {
      state.step = 'select-add-person'
      formData.personForm = JSON.parse(JSON.stringify(formData.totalPeople?.[index]))
      formData.personForm.personSelected.deathdate = formatDbToEsDate(formData.personForm.personSelected.deathdate)
      formData.personForm.newPersonData.birthdate = formatDbToEsDate(formData.personForm.newPersonData.birthdate)
      formData.personForm.newPersonData.deathdate = formatDbToEsDate(formData.personForm.newPersonData.deathdate)
      formData.totalPeople.splice(index, 1)
    }

    const addNewPerson = () => {
      state.step = 'select-add-person'
    }

    const setCasketData = (data) => {
      formData.casketData = JSON.parse(JSON.stringify(data))
      const people = formData.casketData.people
      delete formData.casketData.people

      people.forEach(person => {
        formData.totalPeople.push({
          clickable: false,
          tabSelected: 'select',
          personSelected: {
            id: person.id,
            label: `${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}`,
            deathdate: person.deathdate
          },
          newPersonData: {
            id: '',
            dni: '',
            firstName: '',
            lastName1: '',
            lastName2: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            phone: '',
            email: '',
            maritalStatus: '',
            birthdate: '',
            deathdate: '',
            casketId: ''
          }
        })
      })
      state.step = 'resume'
    }

    const onSubmit = async () => {
      try {
        state.loading = showLoading()
        if (state.type === 'Create') {
          await casketStore.createCasketWithPeople({ casket: formData.casketData, people: formData.totalPeople })
          showNotification(t('pages.casket.successfully_created'), 'positive')
        }
        else if (state.type === 'Edit') {
          await casketStore.updateCasketWithPeople({ casket: formData.casketData, people: formData.totalPeople })
          showNotification(t('pages.casket.successfully_edited'), 'positive')
        }
        closeModal()
        bus.$emit('refreshCasketData')
        bus.$emit('refreshPersonData')
        bus.$emit('refreshRelocationData')
        state.loading = hideLoading()
      }
      catch (error) {
        state.loading = hideLoading()
      }
    }

    const closeModal = () => {
      state.isDialogOpen = false
      state.loading = false
      state.type = 'Create'
      state.step = 'select-add-person'
      formData.totalPeople = []
      formData.casketData.id = ''
      formData.casketData.description = ''
      clearPersonForm()
    }

    const clearPersonForm = () => {
      formData.personForm.clickable = true
      formData.personForm.tabSelected = ''
      formData.personForm.personSelected.id = ''
      formData.personForm.personSelected.label = ''
      formData.personForm.personSelected.deathdate = ''
      formData.personForm.newPersonData.id = ''
      formData.personForm.newPersonData.dni = ''
      formData.personForm.newPersonData.firstName = ''
      formData.personForm.newPersonData.lastName1 = ''
      formData.personForm.newPersonData.lastName2 = ''
      formData.personForm.newPersonData.address = ''
      formData.personForm.newPersonData.city = ''
      formData.personForm.newPersonData.state = ''
      formData.personForm.newPersonData.postalCode = ''
      formData.personForm.newPersonData.phone = ''
      formData.personForm.newPersonData.email = ''
      formData.personForm.newPersonData.maritalStatus = ''
      formData.personForm.newPersonData.birthdate = ''
      formData.personForm.newPersonData.deathdate = ''
      formData.personForm.newPersonData.casketId = ''
    }

    return {
      ...toRefs(state),
      ...toRefs(formData),
      onSubmit,
      closeModal,
      goToResume,
      goStepBack,
      deletePerson,
      addNewPerson,
      viewPersonClicked,
      clearPersonForm
    };
  }
})
</script>

<style lang="scss" scoped>
  .form-container {
    width: 100%;
    .input-form{
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
    }
  }
  .header-title-component {
    position: relative;
    color: var(--main-text-color);
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 15px;
    text-align: center;
  }

  .person-resume {
    padding: 5px 10px;
    background-color: var(--body-color);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    height: 40px;
    transition: 0.3s all ease;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon-grey-color {
      color: rgba(0, 0, 0, 0.54);
      padding-right: 6px
    }
  }
  .clickable {
    cursor: pointer;
    &:hover {
      border-color: rgba(0, 0, 0, 0.8);
    }
  }
</style>