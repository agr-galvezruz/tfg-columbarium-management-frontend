<template>
  <q-btn
    v-if="icon"
    class="custom-btn"
    no-caps
    :label="label"
    :icon="icon"
    :rounded="rounded"
    :round="round"
    :unelevated="unelevated"
    :flat="flat"
    :loading="loading">
    <slot></slot>
  </q-btn>

  <q-btn
    v-else
    class="custom-btn"
    no-caps
    :label="label"
    :rounded="rounded"
    :round="round"
    :unelevated="unelevated"
    :flat="flat"
    :loading="loading">
    <slot></slot>
  </q-btn>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    unelevated: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
  }
};
</script>

<style lang="scss" scoped>
  .custom-btn {
    border-radius: 8px;
  }
</style>