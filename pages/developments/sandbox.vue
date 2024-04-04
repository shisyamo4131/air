<template>
  <div>
    <g-btn-submit />
  </div>
</template>

<script>
import GBtnSubmit from '~/components/molecules/btns/GBtnSubmit.vue'
export default {
  components: { GBtnSubmit },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style></style>
