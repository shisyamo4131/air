<script>
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
/**
 * ### GBtnEdit
 * @author shisyamo4131
 */
export default {
  components: { AIconEdit },
}
</script>

<template>
  <v-btn v-bind="$attrs" color="blue" dark rounded v-on="$listeners">
    <a-icon-edit color="white" left />edit</v-btn
  >
</template>

<style></style>
