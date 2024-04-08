<template>
  <div>
    <g-data-iterator :search.sync="search" />
  </div>
</template>

<script>
import GDataIterator from '~/components/molecules/tables/GDataIterator.vue'
export default {
  components: { GDataIterator },
  data() {
    return {
      search: 'aaa',
    }
  },
}
</script>

<style></style>
