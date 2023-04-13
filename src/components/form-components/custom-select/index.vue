<template>
  <q-select
    :class="{'required-field': required}"
    :label="label"
    :filled="filled"
    :outlined="outlined"
    :dense="dense"
    :options-dense="optionsDense"
    :clearable="clearable"
    :loading="loading"
    :rules="customRules"
    :options="options"
    :disable="disabled"
    @input="$emit('input', value)"
    :style="!required ? 'padding-bottom:20px;' : ''"
    class="single-line-value-select"
    popup-content-class="popup-max-height"
    map-options
    emit-value
    >

   <!-- <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ $t('components.no_data') }}
        </q-item-section>
      </q-item>
    </template>-->

  </q-select>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
  name: 'CustomSelect',
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    filled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
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
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    customValidationMessage: {
      type: String,
      default: null
    }
  },
  created() {
    this.errorMessages.data_required = this.$t('components.form_components.data_required');
  },
  setup(props) {
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
    return { errorMessages, customRules };
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
</style>