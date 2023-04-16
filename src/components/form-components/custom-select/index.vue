<template>
  <div v-if="stackLabel">
    <div class="stack-label">{{label}} {{required ? '*' : ''}}</div>
    <q-select
      :class="{'required-field': required}"
      :filled="filled"
      :outlined="outlined"
      :dense="dense"
      :placeholder="placeholder"
      :options-dense="optionsDense"
      :clearable="clearable"
      :loading="loading"
      :rules="customRules"
      :options="options"
      :disable="disabled"
      class="single-line-value-select"
      popup-content-class="popup-max-height"
      :bottom-slots="bottomSlots"
      map-options
      emit-value
      v-model="inputValue"
    >
      <template v-if="!inputValue" v-slot:prepend>
        <div class="select-value">{{ $t('components.form_components.no_selected') }}</div>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section>
            {{ noOptions || $t('components.form_components.no_options') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
  <div v-else>
    <q-select
      :class="{'required-field': required}"
      :label="label"
      :filled="filled"
      :outlined="outlined"
      :dense="dense"
      :placeholder="placeholder"
      :options-dense="optionsDense"
      :clearable="clearable"
      :loading="loading"
      :rules="customRules"
      :options="options"
      :disable="disabled"
      class="single-line-value-select"
      popup-content-class="popup-max-height"
      :bottom-slots="bottomSlots"
      map-options
      emit-value
      v-model="inputValue"
      >
    </q-select>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
  name: 'CustomSelect',
  props: {
    modelValue: {
      type: String,
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
    optionsDense: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    noOptions: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    bottomSlots: {
      type: Boolean,
      default: true
    },
    customValidationMessage: {
      type: String,
      default: null
    }
  },
  created() {
    this.errorMessages.data_required = this.$t('components.form_components.data_required');
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      }
    });

    const errorMessages = reactive({
      data_required: null
    });

    const customRules = computed(() => {
      const rules = props.rules;
      if (props.required) {
        const required_rule = (val => (val && val.length > 0 || props.customValidationMessage ? props.customValidationMessage : errorMessages.data_required) );
        rules.unshift(required_rule);
      }
      return rules;
    });
    return { errorMessages, customRules, inputValue };
  }
});
</script>

<style lang="scss">
.required-field {
  .q-field__label::after {
    content: ' *';
  }
}
.popup-max-height {
  max-height: 250px;
}

.single-line-value-select .q-field__native {
  flex-wrap: nowrap;
}
.single-line-value-select .q-field__native > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.select-value {
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
}
</style>