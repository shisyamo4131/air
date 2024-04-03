<template>
  <div>
    <g-date v-model="value" />
  </div>
</template>

<script>
import GDate from '~/components/molecules/inputs/GDate.vue'
export default {
  components: { GDate },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style></style>
