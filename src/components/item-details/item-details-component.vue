<template>
  <content-container-component class="content-size">
    <div class="card-container">
      <div class="flex no-wrap justify-between items-center gap-10">
        <div class="title-text">{{ title }}</div>
        <slot></slot>
      </div>

      <div class="attr-container flex column gap-5">
        <div class="flex no-wrap gap-5" :class="item.label !== 'Descripción' ? 'items-center' : null" v-for="item in itemData" :key="item">
          <q-icon color="secondary" size="24px" :name="item.icon"/>
          <div class="flex items-baseline">
            <span class="attr-text">{{ item.label }}:&nbsp;</span>
            <span v-if="item.label !== $t('pages.urn.status')" v-html="item.value"></span>
            <status-chip-component v-else :status="item.value" />
          </div>
        </div>
      </div>
    </div>
  </content-container-component>
</template>

<script>
import { defineComponent } from 'vue'
import ContentContainerComponent from 'src/components/content-container/content-container-component'
import StatusChipComponent from '../status-chip/status-chip-component'

export default defineComponent({
  components: {
    ContentContainerComponent,
    StatusChipComponent
  },
  props: {
    title: {
      type: String,
      required: true
    },
    itemData: {
      type: Array,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
  .content-size {
    // min-width: 330px;
    min-width: max-content;

    .card-container {
      color: var(--main-text-color);

      .title-text {
        font-size: 21px;
        font-weight: 600;
      }
      .attr-container {
        font-size: 15px;
        padding: 5px 0;

        .attr-text {
          font-weight: 500;
        }
      }
    }
  }
</style>