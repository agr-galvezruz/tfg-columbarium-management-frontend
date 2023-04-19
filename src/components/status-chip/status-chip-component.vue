<template>
  <div class="status-chip" :class="textColor">
    {{text}}
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    status: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n({})

    const text = computed(() => {
      if (props.status === 'AVAILABLE') return t('components.status.available')
      if (props.status === 'RESERVED') return t('components.status.reserved')
      if (props.status === 'OCCUPIED') return t('components.status.occupied')
      return t('components.status.disabled')
    })

    const textColor = computed(() => {
      if (props.status === 'AVAILABLE') return 'green-chip'
      if (props.status === 'RESERVED') return 'yellow-chip'
      if (props.status === 'OCCUPIED') return 'red-chip'
      return 'black-chip'
    })

    return {
      text,
      textColor
    }
  },
})
</script>

<style lang="scss" scoped>
  .status-chip {
    padding: 2px 8px;
    border-radius: 50px;
    width: 105px;
    text-align: center;
    color: var(--main-text-color);
  }

  .green-chip {
    background-color: #91d79d;
  }
  .yellow-chip {
    background-color: #fbdea2;
  }
  .red-chip {
    background-color: #fba6a1;
  }
  .black-chip {
    background-color: #575e68;
    color: var(--background-color);
  }
</style>