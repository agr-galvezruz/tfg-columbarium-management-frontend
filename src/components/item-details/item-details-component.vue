<template>
  <content-container-component class="content-size">
    <div class="card-container">
      <div class="flex no-wrap justify-between items-center gap-10">
        <div class="title-text">{{ title }}</div>
        <slot></slot>
      </div>

      <div class="attr-container flex column gap-5">
        <div class="flex no-wrap items-center gap-5" v-for="item in itemData" :key="item">
          <q-icon color="secondary" size="24px" :name="item.icon"/>
          <div>
            <span class="attr-text">{{ item.label }}:&nbsp;</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </content-container-component>
</template>

<script>
import { defineComponent } from 'vue'
import ContentContainerComponent from 'src/components/content-container/content-container-component'

export default defineComponent({
  components: {
    ContentContainerComponent
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