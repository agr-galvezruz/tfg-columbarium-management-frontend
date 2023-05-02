<template>
  <div v-if="stackLabel">
    <div class="stack-label">{{label}} {{required ? '*' : ''}}</div>
    <q-input
      v-if="type === 'internalCode'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      :type="type"
      v-model="inputValue"
      :maxlength="maxlength"
      :bottom-slots="bottomSlots"
    >
      <template v-if="internalValue" v-slot:prepend>
        <div class="internal-value">{{internalValue}}</div>
      </template>
    </q-input>
    <q-input
      v-if="type === 'text'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      :type="type"
      v-model="inputValue"
      :maxlength="maxlength"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'password'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :readonly="readonly"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="customRules"
      :disable="disabled"
      :type="isPwd ? 'password' : 'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-input
      v-if="type === 'phone'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :readonly="readonly"
      :dense="dense"
      :rules="checkNumber"
      :disable="disabled"
      :type="'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'email'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="checkEmail"
      :disable="disabled"
      :type="'text'"
      :readonly="readonly"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'postalCode'"
      :class="{'required-field': required}"
      mask="#####"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="checkPostalCode"
      :disable="disabled"
      :type="'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'number'"
      ref="inputRef"
      v-model="numberValue"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :has-decimals="hasDecimals"
      :rules="customRules"
      :disable="disabled"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'time'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      mask="##:##"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'textarea'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="customRules"
      :readonly="readonly"
      :disable="disabled"
      :type="'textarea'"
      autogrow
      v-model="inputValue"
      :bottom-slots="bottomSlots">
      <div style="height:60px">

      </div>
    </q-input>

    <q-editor
      v-if="type === 'editor'"
      v-model="inputValue"
      min-height="60px"
      :toolbar="[
        ['bold', 'italic', 'underline', 'strike'],
        ['undo', 'redo'],
      ]"
      style="margin-bottom:20px;" />

  </div>
  <div v-else>
    <q-input
      v-if="type === 'text'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      :type="type"
      v-model="inputValue"
      :maxlength="maxlength"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'password'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :readonly="readonly"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="customRules"
      :disable="disabled"
      :type="isPwd ? 'password' : 'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-input
      v-if="type === 'phone'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :readonly="readonly"
      :dense="dense"
      :rules="checkNumber"
      :disable="disabled"
      :type="'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'email'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="checkEmail"
      :disable="disabled"
      :type="'text'"
      :readonly="readonly"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'postalCode'"
      :class="{'required-field': required}"
      mask="#####"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :rules="checkPostalCode"
      :disable="disabled"
      :type="'text'"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'number'"
      ref="inputRef"
      v-model="numberValue"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :readonly="readonly"
      :has-decimals="hasDecimals"
      :rules="customRules"
      :disable="disabled"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'time'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      mask="##:##"
      :readonly="readonly"
      :rules="customRules"
      :disable="disabled"
      v-model="inputValue"
      :bottom-slots="bottomSlots"
    >
      <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-input
      v-if="type === 'textarea'"
      :class="{'required-field': required}"
      :filled="filled"
      :placeholder="placeholder"
      :label="label"
      :outlined="outlined"
      :clearable="clearable"
      :dense="dense"
      :rules="customRules"
      :readonly="readonly"
      :disable="disabled"
      :type="'textarea'"
      autogrow
      v-model="inputValue"
      :bottom-slots="bottomSlots">
      <div style="height:20rem">

      </div>
    </q-input>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';
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
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: null
    },
    hasDecimals: {
      type: Boolean,
      default: false
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
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        if (props.type === 'number') emit('update:modelValue', value);
        else emit('update:modelValue', value);
      }
    });

    const { t } = useI18n({})
    const isPwd = ref(true);
    const errorMessages = reactive({
      data_required: t('components.form_components.data_required'),
      phone_format: t('components.form_components.phone_format'),
      postal_code_format: t('components.form_components.postal_code_format'),
      email_format: t('components.form_components.email_format')
    });

    const customRules = computed(() => {
      const rules = props.rules;
      if (props.required) {
        const required_rule = (val => (val && val.length > 0 || (props.customValidationMessage ? props.customValidationMessage : errorMessages.data_required)) );
        rules.unshift(required_rule);
      }
      return rules;
    });

    const checkNumber = computed(() => {
      const phonePattern = /^((\+34|0034)?(6|7|9|8)([0-9]){8})$/;
      const condition = (val => ( (val && val.length) > 0 ? (phonePattern.test(val) || errorMessages.phone_format) : null));

      if (customRules.value && customRules.value.length > 0) {
        const rules = customRules.value;
        rules.push(condition);
        return rules;
      }
      return [condition];
    });

    const checkPostalCode = computed(() => {
      const cpPattern = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
      const condition = (val => ( (val && val.length) > 0 ? (cpPattern.test(val) || errorMessages.postal_code_format) : null));

      if (customRules.value && customRules.value.length > 0) {
        const rules = customRules.value;
        rules.push(condition);
        return rules;
      }
      return [condition];
    });

    const checkEmail = computed(() => {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const condition = (val => ( (val && val.length) > 0 ? (emailPattern.test(val) || errorMessages.email_format) : null));

      if (customRules.value && customRules.value.length > 0) {
        const rules = customRules.value;
        rules.push(condition);
        return rules;
      }
      return [condition];
    });

    const options = reactive({
      'currency': 'EUR',
      'currencyDisplay': 'hidden',
      'precision': props.hasDecimals ? 2 : 0,
      'hideCurrencySymbolOnFocus': true,
      'hideGroupingSeparatorOnFocus': true,
      'hideNegligibleDecimalDigitsOnFocus': true,
      'autoDecimalDigits': false,
      'autoSign': true,
      'useGrouping': false,
      'accountingSign': false
    });
    const { inputRef } = useCurrencyInput(options);
    const numberValue = ref(props.modelValue);

    watch(inputValue, (newValue) => {
      if (props.type === 'number') {
        if (newValue) {
          numberValue.value = newValue?.toString()?.replace(/-/g, '');
        }
        if (inputValue.value !== 0 && (inputValue.value == null || inputValue.value == undefined)) numberValue.value = '';
      } else if (props.type === 'postalCode') {
        const newValueParsed = newValue ? newValue.toString() : newValue;
        if (newValueParsed) inputValue.value = newValueParsed.replace(/[^0-9]/g, '');
      }
    });

    return { inputValue, customRules, checkNumber, checkPostalCode, checkEmail, isPwd, inputRef, numberValue };
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
.internal-value {
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
}
</style>