<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      no-caps
      narrow-indicator
    >
      <q-tab icon="ads_click" name="select" :label="selectLabel" />
      <q-tab icon="add_circle_outline" name="add" :label="addLabel" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="select">
        <slot name="select"></slot>
      </q-tab-panel>

      <q-tab-panel name="add">
        <slot name="add"></slot>
      </q-tab-panel>

    </q-tab-panels>
  </q-card>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    selectLabel: {
      type: String,
      required: true
    },
    addLabel: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const tab = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      }
    })

    return {
      tab
    }
  },
})
</script>
