<template>
  <q-dialog v-model="isDialogOpen" :persistent="persistent" :transition-duration="transitionDuration" :maximized="maximized">
    <div class="dialog-container" :style="`max-width:${width}px`">
      <div class="dialog-content">
        <div>
          <div v-if="dialogTitle" class="dialog-title">{{ dialogTitle }}</div>
          <div v-if="showDivider" class="divider" />

          <div class="dialog-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    // Value to open/close modal dialog
    modelValue: {
      type: Boolean,
      default: false,
      required: true
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    showDivider: {
      type: Boolean,
      default: true
    },
    transitionDuration: {
      type: String,
      default: '300',
    },
    maximized: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600',
    },
  },
  setup(props, { emit }) {
    const isDialogOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    return {
      isDialogOpen
    }
  }
})
</script>
<style lang="scss" scoped>
  .dialog-container {
    position: relative;
    width: 100%;
    background: var(--background-color);
    color: var(--main-text-color);
    border-radius: 12px !important;
    padding: 15px 12px;
    // font-weight: 500;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    @media(min-width: 768px) {
      padding: 20px;
    }
    .dialog-content {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .dialog-title {
        width: 100%;
        text-align: center;
        font-size: 21px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .divider {
        width: 90%;
        padding: 2px;
        border-radius: 10px;
        background-color: rgb(var(--main-color));
        margin: 10px auto 20px auto;
      }
    }
  }
</style>