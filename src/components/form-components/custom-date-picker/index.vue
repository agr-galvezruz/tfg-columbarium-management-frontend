<template>
  <div v-if="stackLabel">
    <div class="stack-label">{{label}} {{required ? '*' : ''}}</div>
    <q-input
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
      mask="##/##/####"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="inputValue"
              mask="DD/MM/YYYY"
              :locale="currentLocale"
              first-day-of-week="1"
              minimal
              today-btn
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup :label="$t('components.date.continue')" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  <div v-else>
    <q-input
      :class="{'required-field': required}"
      :filled="filled"
      :label="label"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
      mask="##/##/####"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="inputValue"
              mask="DD/MM/YYYY"
              :locale="currentLocale"
              first-day-of-week="1"
              minimal
              today-btn
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup :label="$t('components.date.continue')" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CustomInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    stackLabel: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    filled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: null
    },
    internalValue: {
      type: String,
      default: null
    },
    bottomSlots: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    customValidationMessage: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      }
    });

    const { t } = useI18n({})
    const errorMessages = reactive({
      data_required: t('components.form_components.data_required'),
      phone_format: t('components.form_components.phone_format'),
      postal_code_format: t('components.form_components.postal_code_format'),
      email_format: t('components.form_components.email_format')
    });

    const currentLocale = reactive({
      days: t('components.date.date_current_locale.days').split('_'),
      daysShort: t('components.date.date_current_locale.daysShort').split('_'),
      months: t('components.date.date_current_locale.months').split('_'),
      monthsShort: t('components.date.date_current_locale.monthsShort').split('_')
    })

    const customRules = computed(() => {
      const rules = props.rules;
      if (props.required) {
        const required_rule = (val => (val && val.length > 0 || (props.customValidationMessage ? props.customValidationMessage : errorMessages.data_required)) );
        rules.unshift(required_rule);
      }
      rules.unshift(v => (v ? (/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi.test(v) || t('components.date.incorrect_format')) : null ))
      return rules;
    });

    return { inputValue, customRules, currentLocale };
  }
};
</script>

<style lang="scss">
.stack-label {
  color: var(--main-text-color);
  font-weight: 500;
  margin-bottom: 5px;
}
.required-field {
  .q-field__label::after {
    content: ' *';
  }
}
</style>