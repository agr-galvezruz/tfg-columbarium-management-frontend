<template>
  <select-create-component v-model="data.tabSelected" :select-label="$t('pages.common.select_person')" :add-label="$t('pages.common.add_person')">
    <template v-slot:select>
      <div class="input-form">
        <div class="full-width">
          <div class="stack-label">{{ personText }} *</div>
          <q-select
            dense
            outlined
            use-input
            :loading="loadingPeopleSelect"
            :rules="[(val => (val && val.length > 0 || $t('components.form_components.data_required')) )]"
            :options="peopleOptions"
            class="single-line-value-select"
            popup-content-class="popup-max-height"
            bottom-slots
            map-options
            emit-value
            clearable
            input-debounce="0"
            @filter="filterFn"
            @update:model-value="updatePersonSelectedLabel"
            v-model="data.personSelected.id"
          >
            <template v-if="!data.personSelected.id" v-slot:prepend>
              <div class="select-value">{{ $t('components.form_components.no_selected') }}</div>
            </template>

            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  {{ $t('components.form_components.no_options') }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <custom-date-picker v-if="requiredDeathdate && data.personSelected.id" v-model="data.personSelected.deathdate" :label="$t('pages.person.deathdate')" style="max-width:230px;min-width:230px;" :placeholder="$t('pages.person.deathdate_placeholder')" :required="requiredDeathdate" />
      </div>
    </template>

    <template v-slot:add>
      <div class="input-form">
        <custom-input v-model="data.newPersonData.dni" :label="$t('pages.person.dni')" class="full-width" :placeholder="$t('pages.person.dni_placeholder')" required />
        <custom-date-picker v-model="data.newPersonData.birthdate" :label="$t('pages.person.birthdate')" class="full-width" :placeholder="$t('pages.person.birthdate_placeholder')" />
        <custom-date-picker v-model="data.newPersonData.deathdate" :label="$t('pages.person.deathdate')" class="full-width" :placeholder="$t('pages.person.deathdate_placeholder')" :required="requiredDeathdate" />
      </div>
      <div class="input-form">
        <custom-input v-model="data.newPersonData.firstName" :label="$t('pages.person.first_name')" class="full-width" :placeholder="$t('pages.person.first_name_placeholder')" required />
        <custom-input v-model="data.newPersonData.lastName1" :label="$t('pages.person.last_name1')" class="full-width" :placeholder="$t('pages.person.last_name1_placeholder')" required />
        <custom-input v-model="data.newPersonData.lastName2" :label="$t('pages.person.last_name2')" class="full-width" :placeholder="$t('pages.person.last_name2_placeholder')" required />
      </div>
      <div class="input-form">
        <custom-input v-model="data.newPersonData.address" :label="$t('pages.person.address')" class="full-width" :placeholder="$t('pages.person.address_placeholder')" required />
        <custom-input v-model="data.newPersonData.state" :label="$t('pages.person.state')" class="full-width" :placeholder="$t('pages.person.state_placeholder')" required />
      </div>
      <div class="input-form">
        <custom-select v-model="data.newPersonData.city" :label="$t('pages.person.city')" class="full-width" :options="provinceOptions" required />
        <custom-input v-model="data.newPersonData.postalCode" :label="$t('pages.person.postal_code')" class="full-width" :placeholder="$t('pages.person.postal_code_placeholder')" type="number" required />
        <custom-select v-model="data.newPersonData.maritalStatus" :label="$t('pages.person.marital_status')" class="full-width" :options="maritalStatusOptions" />
      </div>
      <div class="input-form">
        <custom-input v-model="data.newPersonData.phone" :label="$t('pages.person.phone')" class="full-width" :placeholder="$t('pages.person.phone_placeholder')" required />
        <custom-input v-model="data.newPersonData.email" :label="$t('pages.person.email')" class="full-width" :placeholder="$t('pages.person.email_placeholder')" type="email" />
      </div>
    </template>
  </select-create-component>
</template>

<script>
import SelectCreateComponent from 'src/components/select-create/select-create-component'
import { computed, defineComponent, onMounted, reactive, toRefs, watchEffect } from 'vue'
import { formatDbToEsDate } from 'src/helpers/formatDate'
import { usePersonStore } from 'stores/person'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    SelectCreateComponent
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    requiredDeathdate: {
      type: Boolean,
      default: false
    },
    personText: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      }
    })

    onMounted(() => {
      getAllPeopleNoInCasket()
      getAllProvinces()
    })

    const { t } = useI18n({})
    const personStore = usePersonStore()

    const formData = reactive({
      maritalStatusOptions: [
        { label: t('pages.person.single'), value: 'SINGLE' },
        { label: t('pages.person.married'), value: 'MARRIED' },
        { label: t('pages.person.union'), value: 'UNION' },
        { label: t('pages.person.separate'), value: 'SEPARATE' },
        { label: t('pages.person.divorced'), value: 'DIVORCED' },
        { label: t('pages.person.widower'), value: 'WIDOWER' },
      ],
      provinceOptions: [],
      loadingProvinceSelect: false,
      peopleOptions: [],
      filterOptions: [],
      loadingPeopleSelect: false
    })

    const getAllProvinces = async () => {
      try {
        formData.loadingProvinceSelect = true
        const data = await personStore.getAllProvinces()
        fillProvinceOptions(data?.data)
        formData.loadingProvinceSelect = false
      } catch (error) {
        formData.loadingProvinceSelect = false
      }
    }

    const fillProvinceOptions = (data) => {
      formData.provinceOptions = []
      data.forEach(province => {
        formData.provinceOptions.push({ label: province.name, value: province.name })
      })
    }

    const getAllPeopleNoInCasket = async () => {
      try {
        formData.loadingPeopleSelect = true
        const data = await personStore.getAllPeopleNoInCasket()
        fillPeopleOptions(data?.data)
        formData.loadingPeopleSelect = false
      } catch (error) {
        formData.loadingPeopleSelect = false
      }
    }

    const fillPeopleOptions = (data) => {
      formData.peopleOptions = []
      data.forEach(person => {
        formData.peopleOptions.push({ label: `${person.dni} - ${person.lastName1} ${person.lastName2} ${person.firstName}`, value: person.id.toString(), deathdate: person.deathdate })
      })
      formData.filterOptions = formData.peopleOptions
    }

    const filterFn = (val, update) => {
      update(() => {
        if (val === '') {
          formData.peopleOptions = formData.filterOptions
        }
        else {
          const needle = val.toLowerCase()
          formData.peopleOptions = formData.filterOptions.filter(
            v => v.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    const updatePersonSelectedLabel = (value) => {
      if (!value) {
        data.value.personSelected.label = ''
        return
      }

      data.value.personSelected.label = formData.filterOptions.filter(val => val.value == value)?.[0]?.label
      data.value.personSelected.deathdate = formatDbToEsDate(formData.filterOptions.filter(val => val.value == value)?.[0]?.deathdate)
    }

    watchEffect(() => {
      if (data.value.tabSelected === 'select') {
        data.value.newPersonData.id = ''
        data.value.newPersonData.dni = ''
        data.value.newPersonData.firstName = ''
        data.value.newPersonData.lastName1 = ''
        data.value.newPersonData.lastName2 = ''
        data.value.newPersonData.address = ''
        data.value.newPersonData.city = ''
        data.value.newPersonData.state = ''
        data.value.newPersonData.postalCode = ''
        data.value.newPersonData.phone = ''
        data.value.newPersonData.email = ''
        data.value.newPersonData.maritalStatus = ''
        data.value.newPersonData.birthdate = ''
        data.value.newPersonData.deathdate = ''
        data.value.newPersonData.casketId = ''
      }
      else if (data.value.tabSelected === 'add') {
        data.value.personSelected.id = ''
      }
    })

    return {
      ...toRefs(formData),
      filterFn,
      data,
      updatePersonSelectedLabel
    }
  },
})
</script>

<style lang="scss" scoped>
  .input-form{
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
  }
</style>
