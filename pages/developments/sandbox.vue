<template>
  <g-card-company-info v-bind="model" />
</template>

<script>
import GCardCompanyInfo from '~/components/molecules/cards/GCardCompanyInfo.vue'
export default {
  components: { GCardCompanyInfo },
  data() {
    return {
      model: this.$Company(),
    }
  },
  mounted() {
    this.model.fetch('ljlmvPkLNscHUnbkb566')
  },
}
</script>

<style></style>
