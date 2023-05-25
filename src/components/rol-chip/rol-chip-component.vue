<template>
  <div class="rol-chip" :class="textColor">
    {{text}}
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    rol: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n({})

    const text = computed(() => {
      if (props.rol === 'ADMIN') return t('components.rol.admin')
      return t('components.rol.consultant')
    })

    const textColor = computed(() => {
      if (props.rol === 'ADMIN') return 'green-chip'
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
  .rol-chip {
    padding: 2px 8px;
    border-radius: 50px;
    width: 120px;
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