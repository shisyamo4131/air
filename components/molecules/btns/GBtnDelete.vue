<script>
import AIconDelete from '~/components/atoms/icons/AIconDelete.vue'
/**
 * ### GBtnDelete
 * @author shisyamo4131
 */
export default {
  components: { AIconDelete },
}
</script>

<template>
  <v-btn v-bind="$attrs" color="error" dark rounded v-on="$listeners">
    <a-icon-delete color="white" left />delete</v-btn
  >
</template>

<style></style>
