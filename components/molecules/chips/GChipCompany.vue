<script>
/**
 * ## GChipCompany
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    companyId: { type: String, required: true },
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    item() {
      return this.$store.getters['companies/get'](this.companyId)
    },
  },
}
</script>

<template>
  <v-chip v-bind="$attrs" v-on="$listeners">
    {{ item.abbr }}
  </v-chip>
</template>

<style></style>
