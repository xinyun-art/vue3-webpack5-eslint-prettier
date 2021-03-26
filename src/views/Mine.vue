<template>
  <div>
    <div>Mine.vue</div>
    <v-box />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import VBox from '../components/v-box.vue'
import { useStore } from 'vuex'
export default {
  name: 'Mine',
  components: {
    VBox,
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      const user = store.state.user
      console.log('user:', user)
    })
  },
}
</script>

<style lang="scss">
.mine {
  color: pink;
}
</style>
