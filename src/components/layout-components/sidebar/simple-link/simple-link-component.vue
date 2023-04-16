<template>
  <li :class="{ 'active': isRouteSelected }" @click="goToRoute">
    <span class="icon-shape material-icons">{{ icon }}</span>
    <span class="icon-label">{{ $t(label) }}</span>
  </li>
</template>

<script>
import { computed, defineComponent, toRefs, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    parentPath: {
      type: String,
      required: true
    },
    childrenPath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      fullRoutePath: computed(() => `${props.parentPath}${props.childrenPath ? '/' : ''}${props.childrenPath}`),
      isRouteSelected: computed(() => router.currentRoute.value.path === state.fullRoutePath)
    })

    const goToRoute = () => {
      router.push({ path: state.fullRoutePath })
    }

    return {
      ...toRefs(state),
      goToRoute
    }
  },
})
</script>
