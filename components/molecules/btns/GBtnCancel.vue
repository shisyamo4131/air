<script>
import AIconClose from '~/components/atoms/icons/AIconClose.vue'
/**
 * ### GBtnCancel
 * @author shisyamo4131
 */
export default {
  components: { AIconClose },
}
</script>

<template>
  <v-btn v-bind="$attrs" color="warning" outlined rounded v-on="$listeners">
    <a-icon-close color="warning" left />cancel</v-btn
  >
</template>

<style></style>
